import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    GET_ALL_OPERATOR_ENTRY_PARAMS,
    GET_ALL_OPERATOR_ENTRY_PARAMS_SUCCESS,
    GET_ALL_OPERATOR_ENTRY_PARAMS_FAIL,
    SET_OPERATOR_ENTRY_VALUE_PARAMS_SUCCESS,
    SET_OPERATOR_ENTRY_VALUE_PARAMS_FAIL,
    SET_OPERATOR_ENTRY_VALUE_PARAMS,
    GET_ALL_SUPERVISOR_PARAMS_SUCCESS,
    GET_ALL_SUPERVISOR_PARAMS_FAIL,
    GET_ALL_SUPERVISOR_PARAMS,
    GET_OPERATOR_LAST_SHIFT_DATA_SUCCESS,
    GET_OPERATOR_LAST_SHIFT_DATA_FAIL,
    GET_OPERATOR_LAST_SHIFT_DATA,
} from 'redux/types/nocilDashboardTypes';
import {
    createOperatorParamService,
    getAllOperatorParamsService,
    getOperatorLastShiftDataService,
} from 'redux/services/KPIServices/operatorEntryService';

export function* getAllSupervisorParamsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getAllOperatorEntryData = yield call(
            getAllOperatorParamsService,
            payload
        );
        yield put({
            type: GET_ALL_SUPERVISOR_PARAMS_SUCCESS,
            response: getAllOperatorEntryData,
        });
    } catch (error: any) {
        yield put({
            type: GET_ALL_SUPERVISOR_PARAMS_FAIL,
            response: error,
        });
    }
}
export function* getAllOperatorParamsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getAllOperatorEntryData = yield call(
            getAllOperatorParamsService,
            payload
        );
        yield put({
            type: GET_ALL_OPERATOR_ENTRY_PARAMS_SUCCESS,
            response: getAllOperatorEntryData,
        });
    } catch (error: any) {
        yield put({
            type: GET_ALL_OPERATOR_ENTRY_PARAMS_FAIL,
            response: error,
        });
    }
}

export function* setOperatorParamsValueSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const setOperatorEntryData = yield call(
            createOperatorParamService,
            payload
        );
        yield put({
            type: SET_OPERATOR_ENTRY_VALUE_PARAMS_SUCCESS,
            response: setOperatorEntryData,
        });
        const operatorLastShiftData = yield call(
            getOperatorLastShiftDataService,
            payload?.assetId
        );
        yield put({
            type: GET_OPERATOR_LAST_SHIFT_DATA_SUCCESS,
            response: operatorLastShiftData,
        });
    } catch (error: any) {
        yield put({
            type: SET_OPERATOR_ENTRY_VALUE_PARAMS_FAIL,
            response: error,
        });
    }
}

export function* getOperatorLastShiftDataSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const operatorLastShiftData = yield call(
            getOperatorLastShiftDataService,
            payload
        );
        yield put({
            type: GET_OPERATOR_LAST_SHIFT_DATA_SUCCESS,
            response: operatorLastShiftData,
        });
    } catch (error: any) {
        yield put({
            type: GET_OPERATOR_LAST_SHIFT_DATA_FAIL,
            response: error,
        });
    }
}

export function* operatorSaga(): any {
    yield all([
        takeLatest(GET_ALL_OPERATOR_ENTRY_PARAMS, getAllOperatorParamsSaga),
    ]);
    yield all([
        takeLatest(SET_OPERATOR_ENTRY_VALUE_PARAMS, setOperatorParamsValueSaga),
    ]);
    yield all([
        takeLatest(GET_ALL_SUPERVISOR_PARAMS, getAllSupervisorParamsSaga),
    ]);
    yield all([
        takeLatest(GET_OPERATOR_LAST_SHIFT_DATA, getOperatorLastShiftDataSaga),
    ]);
}

export default operatorSaga;
