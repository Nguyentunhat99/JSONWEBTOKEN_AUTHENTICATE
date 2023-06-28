import db, { sequelize } from "../models/index";

let checkEmail = async (req, res, next) => {
  let email = req.body.email;
  if (!email)
    return res.status(200).json({
      status: "error",
      message: "Invalid email",
    });
  let user = await db.users.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(200).json({
      status: "error",
      message: "Failed! Email is already in use!",
    });
  } else {
    next();
  }
};

let checkPassword = async (req, res, next) => {
  let password = req.body.password;
  let repassword = req.body.repassword;
  if (password.length < 8) {
    return res.status(200).json({
      status: "error",
      message: "Password needs to be at least 8 characters long",
    });
  } else if (password != repassword) {
    return res.status(200).json({
      status: "error",
      message: "Re-entered password is incorrect !",
    });
  } else {
    next();
  }
};
let checkRolesExisted = async (req, res, next) => {
  let arrRoles = [];
  let roles = req.body.roles;
  let rolesDB = await db.roles.findAll({
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
  });
  rolesDB.map((roles) => {
    arrRoles.push(roles.name);
  });
  if (roles && roles.length > 0) {
    for (let i = 0; i < roles.length; i++) {
      if (!arrRoles.includes(roles[i].toLowerCase())) {
        return res.status(200).json({
          status: "error",
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
      }
    }
    next();
  } else {
    return res.status(200).json({
      status: "error",
      message: "Invalid roles ",
    });
  }
};

module.exports = {
  checkEmail,
  checkPassword,
  checkRolesExisted,
};
