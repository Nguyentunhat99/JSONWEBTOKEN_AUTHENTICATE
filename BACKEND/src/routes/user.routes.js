import express from "express";

import userController from "../controller/user.controller";
import {
  verifyToken,
  isAdmin,
  isModerator,
  isUser,
} from "../middleware/authJwt.middleware";

let router = express.Router();

const initUserRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/test/all", userController.allAccess);

  router.get("/test/user", [verifyToken, isUser], userController.userBoard);

  router.get(
    "/test/moderator",
    [verifyToken, isModerator],
    userController.moderatorBoard
  );

  router.get("/test/admin", [verifyToken, isAdmin], userController.adminBoard);
  router.get("/getRoles", userController.getRoles);

  return app.use("/api/v1/", router);
};

export default initUserRoute;
