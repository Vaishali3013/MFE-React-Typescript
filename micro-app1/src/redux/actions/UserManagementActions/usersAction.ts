import * as types from "redux/types/userManagementTypes";

export const getUsersList = (payload: any): any => ({
  type: types.GET_USERS_LIST,
  payload: payload,
});

export const getUserDetails = (payload: any): any => ({
  type: types.GET_USER_DETAILS,
  payload: payload,
});

export const getLoggedInUserDetails = (payload: any): any => ({
  type: types.GET_LOGIN_USER_DETAILS,
  payload: payload,
});

export const addUser = (payload: any): any => ({
  type: types.ADD_USER,
  payload: payload,
});

export const getUserPreferences = (): any => ({
  type: types.GET_USER_PREFERENCES_LIST,
});

export const updateUserDetails = (payload: any): any => ({
  type: types.UPDATE_USER_DETAILS,
  payload: payload,
});

export const updateUserPreferences = (payload: any): any => ({
  type: types.UPDATE_USER_PREFERENCES,
  payload: payload,
});

export const editUser = (payload: any): any => ({
  type: types.EDIT_USER,
  payload: payload,
});

export const activateDeactivateUser = (payload: any): any => ({
  type: types.ACTIVATE_DEACTIVATE_USER,
  payload: payload,
});

export const getCountAnalyticsDeatils = (payload: any): any => ({
  type: types.COUNT_ANALYTICS,
  payload: payload,
});

export const getAllUsers = (): any => ({
  type: types.GET_ALL_USERS,
});

export const getLoggedInUserScreenPermissinonList = (payload: any): any => ({
  type: types.GET_LOGIN_USER_PERMISSION_LIST,
  payload: payload,
});

export const getAllReprtingRoleList = (): any => ({
  type: types.GET_ALL_REPORTING_ROLES,
});

export const getAllReprtingDashboardList = (): any => ({
  type: types.GET_ALL_REPORTING_DASHBOARD,
});

export const dashboardEmbeddedUuid = (payload: any): any => ({
  type: types.DASHBOARD_EMBEDDED_UUID,
  payload: payload,
});
