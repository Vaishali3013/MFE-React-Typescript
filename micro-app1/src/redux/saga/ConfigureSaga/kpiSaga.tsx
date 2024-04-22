import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    createKpiService,
    getAggregationTypeListService,
    getKpiByIdService,
    getKpiListsService,
    getKpiTypeListService,
    getNodeLevelListService,
    getTargetTypeListService,
    statusUpdateKpiService,
    updateKpiService,
} from 'redux/services/ConfigureServices/kpiService';
import * as types from 'redux/types/configureTypes';

export function* getKpiTypeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getKpiTypeList = yield call(getKpiTypeListService, payload);
        yield put({
            type: types.GET_KPI_TYPE_LIST_SUCCESS,
            response: getKpiTypeList,
        });
    } catch (error: any) {}
}

export function* getTargetTypeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getTargetTypeList = yield call(getTargetTypeListService, payload);
        yield put({
            type: types.GET_TARGET_TYPE_LIST_SUCCESS,
            response: getTargetTypeList,
        });
    } catch (error: any) {}
}

export function* getAggregationTypeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getAggregationTypeList = yield call(
            getAggregationTypeListService,
            payload
        );
        yield put({
            type: types.GET_AGGREGATION_TYPE_LIST_SUCCESS,
            response: getAggregationTypeList,
        });
    } catch (error: any) {}
}

export function* getNodeLevelListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getNodeLevelList = yield call(getNodeLevelListService, payload);
        yield put({
            type: types.GET_NODE_LEVEL_LIST_SUCCESS,
            response: getNodeLevelList,
        });
    } catch (error: any) {}
}

export function* createKpiSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setKpi = yield call(createKpiService, payload);
        yield put({
            type: types.CREATE_KPI_SUCCESS,
            response: setKpi,
        });
    } catch (error: any) {}
}

export function* getKpiListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getKpiListData = yield call(getKpiListsService, payload);
        yield put({
            type: types.GET_KPI_LIST_SUCCESS,
            response: getKpiListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_KPI_LIST_FAILURE });
    }
}

export function* getKpiDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getKpiDetails = yield call(getKpiByIdService, payload);
        yield put({
            type: types.GET_KPI_DETAIL_SUCCESS,
            response: getKpiDetails,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_KPI_DETAIL_FAILURE });
    }
}

export function* statusUpdateKpiSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const paginatedPayload = {
            ...payload?.paginatedPayload,
            search: payload?.searchPayload,
        };
        const kpiStatus = yield call(
            statusUpdateKpiService,
            payload?.updatedPayload
        );
        yield put({
            type: types.STATUS_UPDATE_KPI_SUCCESS,
            response: kpiStatus,
        });
        if (kpiStatus) {
            const getKpiListData = yield call(
                getKpiListsService,
                paginatedPayload
            );
            yield put({
                type: types.GET_KPI_LIST_SUCCESS,
                response: getKpiListData,
            });
        }
    } catch (error) {}
}

export function* updateKpiSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setKpiDetails = yield call(updateKpiService, payload);
        yield put({
            type: types.UPDATE_KPI_SUCCESS,
            response: setKpiDetails,
        });
    } catch (error: any) {}
}

export function* kpiSaga(): any {
    yield all([takeLatest(types.GET_KPI_TYPE_LIST, getKpiTypeListSaga)]);
    yield all([takeLatest(types.GET_TARGET_TYPE_LIST, getTargetTypeListSaga)]);
    yield all([
        takeLatest(types.GET_AGGREGATION_TYPE_LIST, getAggregationTypeListSaga),
    ]);
    yield all([takeLatest(types.GET_NODE_LEVEL_LIST, getNodeLevelListSaga)]);
    yield all([takeLatest(types.CREATE_KPI, createKpiSaga)]);
    yield all([takeLatest(types.GET_KPI_LIST, getKpiListSaga)]);
    yield all([takeLatest(types.GET_KPI_DETAILS, getKpiDetailsSaga)]);
    yield all([takeLatest(types.STATUS_UPDATE_KPI, statusUpdateKpiSaga)]);
    yield all([takeLatest(types.UPDATE_KPI, updateKpiSaga)]);
}
