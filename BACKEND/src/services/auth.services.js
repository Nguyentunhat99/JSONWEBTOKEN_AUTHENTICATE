import bcrypt from "bcryptjs";

import db, { sequelize } from "../models/index";
import jwt from "jsonwebtoken";
import config from "../config/auth.config";

const salt = bcrypt.genSaltSync(10);
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

let createAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password.trim());
      await db.users.create({
        username: data.username.trim(),
        email: data.email.trim(),
        password: hashPasswordFromBcrypt,
      });
      resolve({
        status: "success",
        message: "Added user successfully!",
        email: data.email.trim(),
      });
      let userFind = await db.users.findOne({
        where: {
          email: data.email,
        },
      });
      let roles = await db.roles.findAll({
        where: {
          name: {
            [Op.or]: data.roles,
          },
        },
        attributes: {
          exclude: ["name", "createdAt", "updatedAt"],
        },
      });
      roles.map((role) => {
        role.userId = userFind.id;
        role.roleId = role.id;
        delete role.id;
        return role;
      });
      let userRoles = roles;
      await db.User_Roles.bulkCreate(userRoles);
    } catch (error) {
      reject(error);
    }
  });
};

let handleAuthLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.users.findOne({
          where: {
            email: email,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        if (user) {
          let userRoles = await db.User_Roles.findAll({
            where: {
              userId: user.id,
            },
            attributes: {
              exclude: ["userId", "createdAt", "updatedAt"],
            },
          });

          let roleId = [];
          userRoles.map((userRole) => {
            roleId.push(userRole.roleId);
          });

          let rolesDB = await db.roles.findAll({
            where: {
              id: {
                [Op.or]: roleId,
              },
            },
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          });

          let roles = [];
          rolesDB.map((role) => {
            roles.push("role_" + role.name);
          });

          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: config.jwtExpiration,
          });
          let expiredAt = new Date();
          expiredAt.setSeconds(
            expiredAt.getSeconds() + config.jwtRefreshExpiration
          );
          let refreshToken = uuidv4();
          await db.refresh_tokens.create({
            token: refreshToken,
            user_Id: user.id,
            expiryDate: expiredAt.getTime(),
          });

          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            response.status = "success";
            response.message = "Logged in successfully";
            user.roles = roles;
            delete user.password;
            response.user = user;
            response.accessToken = token;
            response.refreshToken = refreshToken;
          } else {
            response.accessToken = null;
            response.status = "error";
            response.message = "Wrong password";
          }
        } else {
          response.status = "error";
          response.message = `User does not exist`;
          resolve(response);
        }
      } else {
        response.status = "error";
        response.message = `Your email does not exist. Please re-enter!`;
      }
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let refreshToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { refreshToken } = data; //req.body
      if (refreshToken === null) {
        resolve({
          status: "error",
          message: "Refresh Token is required!",
        });
      }

      let refreshTokenDB = await db.refresh_tokens.findOne({
        where: {
          token: refreshToken,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // console.log(refreshTokenDB);

      if (!refreshTokenDB) {
        resolve({
          status: "error",
          message: "Refresh token is not in database!",
        });
      }
      if (refreshTokenDB.expiryDate.getTime() < new Date().getTime()) {
        await db.refresh_tokens.destroy({
          where: {
            id: refreshTokenDB.id,
          },
        });
        resolve({
          status: "error",
          message:
            "Refresh token was expired. Please make a new signin request",
        });
      }

      let newAccessToken = jwt.sign(
        { id: refreshTokenDB.user_Id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: config.jwtExpiration,
        }
      );
      resolve({
        status: "success",
        accessToken: newAccessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createAccount,
  handleAuthLogin,
  refreshToken,
};
