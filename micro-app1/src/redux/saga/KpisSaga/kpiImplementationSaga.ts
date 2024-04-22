import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    getCalculationCycleListService,
    getKpiDetailService,
    getKpiListService,
    getNodeLevelListService,
    validateKpiServices,
} from 'redux/services/KPIServices/kpiImplementationService';
import * as types from 'redux/types/kpiTypes';
import { message } from 'antd';

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
        const getKpiListData = yield call(getKpiListService, payload);
        yield put({
            type: types.GET_KPI_DATA_SUCCESS,
            response: getKpiListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_KPI_DATA_FAILURE });
    }
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

export function* getKpiDetailSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getKpiDetailData = yield call(getKpiDetailService, payload);
        yield put({
            type: types.GET_KPI_DETAILS_SUCCESS,
            response: getKpiDetailData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_KPI_DETAILS_FAILURE });
    }
}

export function* getCalculationCycleListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getCalculationCycleList = yield call(
            getCalculationCycleListService,
            payload
        );
        yield put({
            type: types.GET_CIRCULATIONCYCLE_LIST_SUCCESS,
            response: getCalculationCycleList,
        });
    } catch (error: any) {}
}

export function* setValidateKpiSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setValidateKpi = yield call(validateKpiServices, payload);
        yield put({
            type: types.SET_VALIDATE_SUCCESS,
            response: setValidateKpi,
        });
        message.success('KPI has been validated Successfully');
    } catch (error: any) {
        yield put({ type: types.SET_VALIDATE_FAILURE });
    }
}

export function* kpiImplementationSaga(): any {
    yield all([takeLatest(types.GET_KPI_DATA, getKpiListSaga)]);
    yield all([takeLatest(types.GET_NODE_LEVEL_LIST, getNodeLevelListSaga)]);
    yield all([takeLatest(types.GET_KPI_DETAILS, getKpiDetailSaga)]);
    yield all([
        takeLatest(
            types.GET_CIRCULATIONCYCLE_LIST,
            getCalculationCycleListSaga
        ),
    ]);
    yield all([takeLatest(types.SET_VALIDATE, setValidateKpiSaga)]);
}
