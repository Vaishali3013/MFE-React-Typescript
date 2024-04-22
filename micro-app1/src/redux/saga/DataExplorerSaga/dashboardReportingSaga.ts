import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  addDashboardUrlService,
  deleteDashboardUrlService,
  getReportingListService,
  updateDashboardUrlService,
} from "redux/services/DataExplorerServices/dashboardReportingService";
import {
  ADD_DASHBOARD_URL,
  ADD_DASHBOARD_URL_FAILURE,
  ADD_DASHBOARD_URL_SUCCESS,
  DELETE_DASHBOARD_URL,
  DELETE_DASHBOARD_URL_FAILURE,
  DELETE_DASHBOARD_URL_SUCCESS,
  GET_REPORTING_LIST,
  GET_REPORTING_LIST_FAILURE,
  GET_REPORTING_LIST_SUCCESS,
  UPDATE_DASHBOARD_URL,
  UPDATE_DASHBOARD_URL_FAILURE,
  UPDATE_DASHBOARD_URL_SUCCESS,
} from "redux/types/dashboardReportingTypes";

export function* getReportingListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const reportingList: any = yield call(getReportingListService, payload);
    yield put({
      type: GET_REPORTING_LIST_SUCCESS,
      response: reportingList,
    });
  } catch (error: any) {
    yield put({
      type: GET_REPORTING_LIST_FAILURE,
      response: error,
    });
    return error;
  }
}

export function* addDashboardUrlSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const response: any = yield call(
      addDashboardUrlService,
      payload.isNewFilteredItem
    );
    yield put({
      type: ADD_DASHBOARD_URL_SUCCESS,
      response: response,
    });
    if (response) {
      const reportingList: any = yield call(getReportingListService, {
        parentId: payload.parentId,
      });
      yield put({
        type: GET_REPORTING_LIST_SUCCESS,
        response: reportingList,
      });
    }
  } catch (error: any) {
    yield put({
      type: ADD_DASHBOARD_URL_FAILURE,
      response: error,
    });
    return error;
  }
}

export function* updateDashboardUrlSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const response: any = yield call(updateDashboardUrlService, payload);
    yield put({
      type: UPDATE_DASHBOARD_URL_SUCCESS,
      response: response,
    });
    if (response) {
      const reportingList: any = yield call(getReportingListService, {
        parentId: payload.parentId,
      });
      yield put({
        type: GET_REPORTING_LIST_SUCCESS,
        response: reportingList,
      });
    }
  } catch (error: any) {
    yield put({
      type: UPDATE_DASHBOARD_URL_FAILURE,
      response: error,
    });
    return error;
  }
}

export function* deleteDashboardUrlSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const response: any = yield call(
      deleteDashboardUrlService,
      payload
    );
    yield put({
      type: DELETE_DASHBOARD_URL_SUCCESS,
      response: response,
    });
    if (response) {
      const reportingList: any = yield call(getReportingListService, {
        parentId: payload.parentId,
      });
      yield put({
        type: GET_REPORTING_LIST_SUCCESS,
        response: reportingList,
      });
    }
  } catch (error: any) {
    yield put({
      type: DELETE_DASHBOARD_URL_FAILURE,
      response: error,
    });
    return error;
  }
}

export function* dashboardReportingSaga(): any {
  yield all([takeLatest(ADD_DASHBOARD_URL, addDashboardUrlSaga)]);
  yield all([takeLatest(GET_REPORTING_LIST, getReportingListSaga)]);
  yield all([takeLatest(UPDATE_DASHBOARD_URL, updateDashboardUrlSaga)]);
  yield all([takeLatest(DELETE_DASHBOARD_URL, deleteDashboardUrlSaga)]);

}
