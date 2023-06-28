import express from "express";

import authController from "../controller/auth.controller";
import {
  checkEmail,
  checkPassword,
  checkRolesExisted,
} from "../middleware/verifySignUp.middleware";

let router = express.Router();

const initAuthRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/register",
    [checkEmail, checkPassword, checkRolesExisted],
    authController.handleRegister
  );

  router.post("/login", authController.handleLogin);

  router.post("/refreshtoken", authController.handlerefreshToken);

  return app.use("/api/v1/auth", router);
};

export default initAuthRoute;
