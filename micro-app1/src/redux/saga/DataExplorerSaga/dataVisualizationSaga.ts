import { all, call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import {
  GET_AGGREGATED_CHART_DATA,
  GET_AGGREGATED_CHART_DATA_FAILURE,
  GET_AGGREGATED_CHART_DATA_LOADING,
  GET_AGGREGATED_CHART_DATA_SUCCESS,
  GET_ASSET_CSV_DATA,
  GET_ASSET_CSV_DATA_FAILURE,
  GET_ASSET_CSV_DATA_SUCCESS,
  GET_DATA_TABLE_LIST,
  GET_DATA_TABLE_LIST_FAILURE,
  GET_DATA_TABLE_LIST_SUCCESS,
  GET_MODEL_LIST,
  GET_MODEL_LIST_FAILURE,
  GET_MODEL_LIST_SUCCESS,
  GET_NODE_LIST,
  GET_NODE_LIST_FAILURE,
  GET_NODE_LIST_SUCCESS,
  GET_STREAM_TAG_LIST,
  GET_STREAM_TAG_LIST_FAILURE,
  GET_STREAM_TAG_LIST_SUCCESS,
} from "redux/actions/actionTypes";
import {
  getAggregatedChartDataService,
  getAssetCSVDataService,
  getDataTableListService,
  getModelListService,
  getNodeListService,
  getStreamTagListService,
} from "redux/services/DataExplorerServices/dataVisualizationService";

export function* getNodeListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const nodeList: any = yield call(getNodeListService, payload);

    yield put({
      type: GET_NODE_LIST_SUCCESS,
      payload: nodeList.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_NODE_LIST_FAILURE,
    });
    return message.error("error");
  }
}

export function* getStreamTagListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const tagList: any = yield call(getStreamTagListService, payload);

    yield put({
      type: GET_STREAM_TAG_LIST_SUCCESS,
      payload: tagList.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_STREAM_TAG_LIST_FAILURE,
    });
    return message.error("error");
  }
}

export function* getAggregatedChartDataSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    yield put({
      type: GET_AGGREGATED_CHART_DATA_LOADING,
    });
    const aggregatedChartData: any = yield call(
      getAggregatedChartDataService,
      payload
    );

    yield put({
      type: GET_AGGREGATED_CHART_DATA_SUCCESS,
      payload: aggregatedChartData.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_AGGREGATED_CHART_DATA_FAILURE,
    });
    return message.error("error");
  }
}

export function* getDataTableListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const dataTableListData: any = yield call(
      getDataTableListService,
      payload
    );
    yield put({
      type: GET_DATA_TABLE_LIST_SUCCESS,
      payload: dataTableListData?.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_DATA_TABLE_LIST_FAILURE,
    });
    return message.error('error');
  }
}

export function* getModelListSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const nodeList: any = yield call(getModelListService, payload);

    yield put({
      type: GET_MODEL_LIST_SUCCESS,
      payload: nodeList.data,
    });
  } catch (error: any) {
    yield put({
      type: GET_MODEL_LIST_FAILURE,
    });
    return message.error("error");
  }
}
export function* getAssetCSVDataSaga({
  type,
  payload,
}: {
  type: string;
  payload: any;
}): Generator<any> {
  try {
    const tagList: any = yield call(getAssetCSVDataService, payload);

    yield put({
      type: GET_ASSET_CSV_DATA_SUCCESS,
      response: tagList,
    });
  } catch (error: any) {
    yield put({
      type: GET_ASSET_CSV_DATA_FAILURE,
      response: error,
    });
    return message.error("error");
  }
}

export function* dataVisualizationSaga(): any {
  yield all([takeLatest(GET_NODE_LIST, getNodeListSaga)]);
  yield all([takeLatest(GET_STREAM_TAG_LIST, getStreamTagListSaga)]);
  yield all([
    takeLatest(GET_AGGREGATED_CHART_DATA, getAggregatedChartDataSaga),
  ]);
  yield all([takeLatest(GET_MODEL_LIST, getModelListSaga)]);
  yield all([takeLatest(GET_ASSET_CSV_DATA, getAssetCSVDataSaga)]);
  yield all([takeLatest(GET_DATA_TABLE_LIST, getDataTableListSaga)]);
}
