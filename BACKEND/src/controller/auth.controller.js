import authService from "../services/auth.services";

let handleRegister = async (req, res) => {
  try {
    let message = await authService.createAccount(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: "Error from server...",
    });
  }
};

let handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(200).json({
        status: "error",
        message: "Missing inputs parameter !",
      });
    }
    let userData = await authService.handleAuthLogin(email, password);

    return res.status(200).json({
      status: userData.status,
      message: userData.message,
      userInfo: userData.user ? userData.user : {},
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error from server...",
    });
  }
};

let handlerefreshToken = async (req, res) => {
  try {
    let dataToken = await authService.refreshToken(req.body);
    return res.status(200).json({
      status: dataToken.status,
      message: dataToken.message,
      accessToken: dataToken.accessToken,
      refreshToken: dataToken.refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error from server...",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handlerefreshToken,
};
