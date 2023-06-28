import jwt from "jsonwebtoken";

import db, { sequelize } from "../models/index";

let { TokenExpiredError } = jwt;
let catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(200).json({
      status: "error",
      message: "Unauthorized! Access Token was expired!",
    });
  }
  return res.sendStatus(200).json({
    status: "error",
    message: "Unauthorized!",
  });
};

let verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

let isAdmin = async (req, res, next) => {
  let user = await db.users.findOne({
    where: {
      id: req.userId,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  let userRoles = await db.User_Roles.findAll({
    where: {
      userId: user.id,
    },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
  });
  for (let i = 0; i < userRoles.length; i++) {
    if (userRoles[i].roleId === 1) {
      next();
      return;
    }
  }
  return res.status(200).json({
    status: "error",
    message: "Require Admin Role!",
  });
};

let isModerator = async (req, res, next) => {
  let user = await db.users.findOne({
    where: {
      id: req.userId,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  let userRoles = await db.User_Roles.findAll({
    where: {
      userId: user.id,
    },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
  });

  for (let i = 0; i < userRoles.length; i++) {
    if (userRoles[i].roleId === 2) {
      next();
      return;
    }
  }
  return res.status(200).json({
    status: "error",
    message: "Require User Role!",
  });
};

let isUser = async (req, res, next) => {
  let user = await db.users.findOne({
    where: {
      id: req.userId,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  let userRoles = await db.User_Roles.findAll({
    where: {
      userId: user.id,
    },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
  });

  for (let i = 0; i < userRoles.length; i++) {
    if (userRoles[i].roleId === 3) {
      next();
      return;
    }
  }
  return res.status(200).json({
    status: "error",
    message: "Require User Role!",
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isUser,
};
