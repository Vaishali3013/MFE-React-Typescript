import {
  addUserServices,
  editUserServices,
  getALLUsersService,
  getCountAnalyticsDeatilsServices,
  getDashboardEmbeddedUuidServices,
  getReportingDashboardListServices,
  getReportingRolesListServices,
  getUserById,
  getUsersListsServices,
  getUsersPreferences,
  updateUserDetailsService,
  updateUserPreferencesService,
  userActivateDeactivateServices,
} from "redux/services/UserManagementServices/usersServices";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/userManagementTypes";
import { message } from "antd";

export function* getUsersListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const usersDataList = yield call(getUsersListsServices, payload);
    yield put({
      type: types.GET_USERS_LIST_SUCCESS,
      response: usersDataList,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* getUserDetailsSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const getUserData = yield call(getUserById, payload);
    yield put({
      type: types.GET_USER_DETAIL_SUCCESS,
      response: getUserData,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response?.data);
  }
}
export function* getLoggedInUserDetailsSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const getLoggedInUserData = yield call(getUserById, payload);
    yield put({
      type: types.GET_LOGIN_USER_DETAILS_SUCCESS,
      response: getLoggedInUserData,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response?.data);
  }
}
export function* getUserPreferencesSaga({
  type,
}: {
  type: string;
}): Generator<any> {
  try {
    const getUserPreferences = yield call(getUsersPreferences);
    yield put({
      type: types.GET_USER_PREFERENCES_LIST_SUCCESS,
      response: getUserPreferences,
    });
  } catch (error: any) {
    return message.error(error.response);
  }
}
export function* updateUserDetailsSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const updatedUser = yield call(updateUserDetailsService, payload);
    yield put({
      type: types.UPDATE_USER_DETAILS_SUCCESS,
      response: updatedUser,
    });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* addUserSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const isUserAdded = yield call(addUserServices, payload);
    yield put({
      type: types.ADD_USER_SUCCESS,
      response: isUserAdded,
    });
    if (isUserAdded) {
      message.success("User created Sucessfully");
      const usersDataList = yield call(
        getUsersListsServices,
        payload?.paginationPayload
      );
      yield put({
        type: types.GET_USERS_LIST_SUCCESS,
        response: usersDataList,
      });
      const getCountAnalytics = yield call(
        getCountAnalyticsDeatilsServices,
        "users"
      );
      yield put({
        type: types.COUNT_ANALYTICS_SUCCESS,
        response: getCountAnalytics,
      });
      const getAllUsersData = yield call(getALLUsersService, payload);
      yield put({
        type: types.GET_ALL_USERS_SUCCESS,
        response: getAllUsersData,
      });
    }
  } catch (error: any) {
    return error;
  }
}

export function* editUserSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    // Api call
    const isUserEdited = yield call(editUserServices, payload);
    yield put({
      type: types.EDIT_USER_SUCCESS,
      response: isUserEdited,
    });
    if (isUserEdited) {
      const usersDataList = yield call(
        getUsersListsServices,
        payload?.paginationPayload
      );
      yield put({
        type: types.GET_USERS_LIST_SUCCESS,
        response: usersDataList,
      });
    }
  } catch (error: any) {
    return message.error(error.response);
  }
}
export function* updateUserPreferencesSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const updatedPreference = yield call(updateUserPreferencesService, payload);
    yield put({
      type: types.UPDATE_USER_PREFERENCES_SUCCESS,
      response: updatedPreference,
    });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* activateDeactivateUserSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    // Api call
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const isUsersStatus = yield call(userActivateDeactivateServices, payload);
    yield put({
      type: types.ACTIVATE_DEACTIVATE_USER_SUCCESS,
      response: isUsersStatus,
    });
    if (isUsersStatus) {
      const usersDataList = yield call(
        getUsersListsServices,
        payload?.paginationPayload
      );
      if (payload) {
        yield put({
          type: types.GET_USERS_LIST_SUCCESS,
          response: usersDataList,
        });
      }

      const getCountAnalytics = yield call(
        getCountAnalyticsDeatilsServices,
        "users"
      );
      yield put({
        type: types.COUNT_ANALYTICS_SUCCESS,
        response: getCountAnalytics,
      });
    }
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* getAllUsersSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    // Api call
    const getAllUsersData = yield call(getALLUsersService, payload);
    yield put({
      type: types.GET_ALL_USERS_SUCCESS,
      response: getAllUsersData,
    });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* countAnalyticsSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    // Api call
    const getCountAnalytics = yield call(
      getCountAnalyticsDeatilsServices,
      payload
    );
    yield put({
      type: types.COUNT_ANALYTICS_SUCCESS,
      response: getCountAnalytics,
    });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* getReportingRolesListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const reportingRoles = yield call(getReportingRolesListServices, payload);
    yield put({
      type: types.GET_ALL_REPORTING_ROLES_SUCCESS,
      response: reportingRoles,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* getReportingDashboardSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const reportingDashboard = yield call(
      getReportingDashboardListServices,
      payload
    );
    yield put({
      type: types.GET_ALL_REPORTING_DASHBOARD_SUCCESS,
      response: reportingDashboard,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    return message.error(error.response);
  }
}

export function* getDashboardEmbeddedUuidSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
    const reportingDashboardEmbeddedUuid = yield call(
      getDashboardEmbeddedUuidServices,
      payload
    );
    yield put({
      type: types.DASHBOARD_EMBEDDED_UUID_SUCCESS,
      response: reportingDashboardEmbeddedUuid,
    });
    yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
  } catch (error: any) {
    yield put({
      type: types.DASHBOARD_EMBEDDED_UUID_FAILED,
      response: error,
    });
    return error;
  }
}

export function* usersSaga(): any {
  yield all([takeLatest(types.GET_USERS_LIST, getUsersListSaga)]);
  yield all([takeLatest(types.GET_USER_DETAILS, getUserDetailsSaga)]);
  yield all([
    takeLatest(types.GET_LOGIN_USER_DETAILS, getLoggedInUserDetailsSaga),
  ]);
  yield all([takeLatest(types.GET_ALL_USERS, getAllUsersSaga)]);
  yield all([takeLatest(types.ADD_USER, addUserSaga)]);
  yield all([
    takeLatest(types.GET_USER_PREFERENCES_LIST, getUserPreferencesSaga),
  ]);
  yield all([takeLatest(types.UPDATE_USER_DETAILS, updateUserDetailsSaga)]);
  yield all([takeLatest(types.EDIT_USER, editUserSaga)]);
  yield all([
    takeLatest(types.ACTIVATE_DEACTIVATE_USER, activateDeactivateUserSaga),
  ]);
  yield all([
    takeLatest(types.UPDATE_USER_PREFERENCES, updateUserPreferencesSaga),
  ]);
  yield all([takeLatest(types.COUNT_ANALYTICS, countAnalyticsSaga)]);
  yield all([
    takeLatest(types.GET_ALL_REPORTING_ROLES, getReportingRolesListSaga),
  ]);
  yield all([
    takeLatest(types.GET_ALL_REPORTING_DASHBOARD, getReportingDashboardSaga),
  ]);
  yield all([
    takeLatest(types.DASHBOARD_EMBEDDED_UUID, getDashboardEmbeddedUuidSaga),
  ]);
}
