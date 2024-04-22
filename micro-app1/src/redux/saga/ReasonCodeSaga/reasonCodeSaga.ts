import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    GET_ALL_DOWNTIMES,
    GET_ALL_DOWNTIMES_FAIL,
    GET_ALL_DOWNTIMES_SUCCESS,
    GET_ALL_REASON_CATEGORY,
    GET_ALL_REASON_CATEGORY_FAIL,
    GET_ALL_REASON_CATEGORY_SUCCESS,
    GET_ALL_REASON_CODE,
    GET_ALL_REASON_CODE_FAIL,
    GET_ALL_REASON_CODE_SUCCESS,
    GET_ALL_REASON_FACTOR,
    GET_ALL_REASON_FACTOR_FAIL,
    GET_ALL_REASON_FACTOR_SUCCESS,
    GET_REASON_CODE_NODE_DETAILS,
    GET_REASON_CODE_NODE_DETAILS_FAIL,
    GET_REASON_CODE_NODE_DETAILS_SUCCESS,
    SET_REASON_CODE,
    SET_REASON_CODE_SUCCESS,
} from 'redux/types/reasonCodeTypes';
import {
    createReasonCodeService,
    getDownTimesService,
    getNodeDetailsService,
    getReasonCategoryService,
    getReasonCodeService,
    getReasonFactorService,
} from 'redux/services/ReasonCodeServices/reasonCodeService';
import { SHOW_LOADER_SUCCESS } from 'redux/types/deviceManagementTypes';
import { message } from 'antd';

export function* getAllDownTimesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllDownTimesData = yield call(getDownTimesService, payload);
        yield put({
            type: GET_ALL_DOWNTIMES_SUCCESS,
            response: getAllDownTimesData,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: GET_ALL_DOWNTIMES_FAIL,
            response: error,
        });
    }
}

export function* getNodeDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllNodeDetailsData = yield call(
            getNodeDetailsService,
            payload
        );
        yield put({
            type: GET_REASON_CODE_NODE_DETAILS_SUCCESS,
            response: getAllNodeDetailsData,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: GET_REASON_CODE_NODE_DETAILS_FAIL,
            response: error,
        });
    }
}

export function* getAllReasonCodeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllReasonCodeData = yield call(getReasonCodeService, payload);
        yield put({
            type: GET_ALL_REASON_CODE_SUCCESS,
            response: getAllReasonCodeData,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: GET_ALL_REASON_CODE_FAIL,
            response: error,
        });
    }
}

export function* getAllReasonCategorySaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllReasonCategoryData = yield call(
            getReasonCategoryService,
            payload
        );
        yield put({
            type: GET_ALL_REASON_CATEGORY_SUCCESS,
            response: getAllReasonCategoryData,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: GET_ALL_REASON_CATEGORY_FAIL,
            response: error,
        });
    }
}

export function* getAllReasonFactorSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllReasonFactorData = yield call(
            getReasonFactorService,
            payload
        );
        yield put({
            type: GET_ALL_REASON_FACTOR_SUCCESS,
            response: getAllReasonFactorData,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: GET_ALL_REASON_FACTOR_FAIL,
            response: error,
        });
    }
}

export function* createReasonCodeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setReasonCodeDetails = yield call(
            createReasonCodeService,
            payload
        );
        yield put({
            type: SET_REASON_CODE_SUCCESS,
            response: setReasonCodeDetails,
        });
        message.success('Assign Reason Code Created');
    } catch (error: any) {}
}

export function* reasonCodeSaga(): any {
    yield all([takeLatest(GET_ALL_DOWNTIMES, getAllDownTimesSaga)]);
    yield all([takeLatest(GET_ALL_REASON_CODE, getAllReasonCodeSaga)]);
    yield all([takeLatest(GET_ALL_REASON_CATEGORY, getAllReasonCategorySaga)]);
    yield all([takeLatest(GET_ALL_REASON_FACTOR, getAllReasonFactorSaga)]);
    yield all([takeLatest(SET_REASON_CODE, createReasonCodeSaga)]);
    yield all([takeLatest(GET_REASON_CODE_NODE_DETAILS, getNodeDetailsSaga)]);
}
