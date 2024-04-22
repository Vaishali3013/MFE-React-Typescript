import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    GET_ALL_MANUAL_ENTRY_PARAMS_SUCCESS,
    GET_ALL_MANUAL_ENTRY_PARAMS,
    GET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
    GET_MANUAL_ENTRY_VALUE_PARAMS,
    SET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
    SET_MANUAL_ENTRY_VALUE_PARAMS,
    GET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
    GET_ALL_MANUAL_ENTRY_PARAMS_FAIL,
    SET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
} from 'redux/types/nocilDashboardTypes';
import {
    createManualParamService,
    getAllManualParamsService,
    getManualParamsValueService,
} from 'redux/services/KPIServices/manualEntryService';

export function* getAllManualParamsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getAllManualEntryData = yield call(
            getAllManualParamsService,
            payload
        );
        yield put({
            type: GET_ALL_MANUAL_ENTRY_PARAMS_SUCCESS,
            response: getAllManualEntryData,
        });
    } catch (error: any) {
        yield put({
            type: GET_ALL_MANUAL_ENTRY_PARAMS_FAIL,
            response: error,
        });
    }
}

export function* getManualParamsValueSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getManualEntryData = yield call(
            getManualParamsValueService,
            payload
        );
        yield put({
            type: GET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
            response: getManualEntryData,
        });
    } catch (error: any) {
        yield put({
            type: GET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
            response: error,
        });
    }
}

export function* setManualParamsValueSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const setManualEntryData = yield call(
            createManualParamService,
            payload
        );
        yield put({
            type: SET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
            response: setManualEntryData,
        });
    } catch (error: any) {
        yield put({
            type: SET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
            response: error,
        });
    }
}

export function* manualSaga(): any {
    yield all([
        takeLatest(GET_ALL_MANUAL_ENTRY_PARAMS, getAllManualParamsSaga),
    ]);
    yield all([
        takeLatest(GET_MANUAL_ENTRY_VALUE_PARAMS, getManualParamsValueSaga),
    ]);
    yield all([
        takeLatest(SET_MANUAL_ENTRY_VALUE_PARAMS, setManualParamsValueSaga),
    ]);
}

export default manualSaga;
