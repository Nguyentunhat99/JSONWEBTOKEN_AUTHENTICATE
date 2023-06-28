import actionTypes from "../actions/actionTypes";

const initialState = {
  dataRoles: [],
  dataRegister: {},
  userInfo: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  emailRegister: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES_START:
      let copyState = { ...state };
      return {
        ...copyState,
      };
    case actionTypes.GET_ROLES_SUCCESS:
      state.dataRoles = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ROLES_FAILED:
      state.dataRoles = [];
      return {
        ...state,
      };
    case actionTypes.ADD_USER_SUCCESS:
      state.dataRegister = action.data;
      state.emailRegister = action.data.email;

      return {
        ...state,
      };
    case actionTypes.ADD_USER_FAILED:
      state.dataRegister = action.data;
      return {
        ...state,
      };
    case actionTypes.USER_LOGIN_SUCCESS: //luu localstorage
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
        accessToken: action.userInfo.accessToken,
        refreshToken: action.userInfo.refreshToken,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        accessToken: null,
        refreshToken: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        emailRegister: "",
      };
    case actionTypes.UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    default:
      return state;
  }
};

export default authReducer;
