import userService from "../services/user.services";

let allAccess = (req, res) => {
  return res.status(200).send("Public Content (^_^)");
};

let userBoard = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "User Content (^_^)",
  });
};

let adminBoard = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Admin Content (^_^)",
  });
};

let moderatorBoard = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Moderator Content (^_^)",
  });
};

let getRoles = async (req, res) => {
  try {
    let data = await userService.getRolesService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error from server",
    });
  }
};

module.exports = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  getRoles,
};
