import actionTypes from "./actionTypes";
import { getRolesService, addUserService } from "../../services/authService";
import { toast } from "react-toastify";

export const getRolesStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getRolesService();
      if (res && res.data.length > 0) {
        dispatch(getRolesSuccess(res.data));
      } else {
        dispatch(getRolesFailed());
      }
    } catch (error) {
      dispatch(getRolesFailed());
      console.log("getRolesStart error:", error);
    }
  };
};

export const getRolesSuccess = (rolesData) => ({
  type: actionTypes.GET_ROLES_SUCCESS,
  data: rolesData,
});

export const getRolesFailed = () => ({
  type: actionTypes.GET_ROLES_FAILED,
});

export const addUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await addUserService(data);
      if (res && res.status === "success") {
        dispatch(addUserSuccess(res));
        toast.success(res.message);
      } else {
        toast.error(res.message);
        dispatch(addUserFailed(res));
      }
    } catch (error) {
      dispatch(addUserFailed());
      console.log("addUserStart error:", error);
    }
  };
};

export const addUserSuccess = (data) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  data: data,
});

export const addUserFailed = (data) => ({
  type: actionTypes.ADD_USER_FAILED,
  data: data,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const updateAccessToken = (accessToken) => ({
  type: actionTypes.UPDATE_ACCESS_TOKEN,
  accessToken: accessToken,
});
