import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    createTableService,
    deleteTableRowService,
    getTableByIdService,
    getTableListsService,
    statusUpdateTableService,
    updateTableService,
} from 'redux/services/ConfigureServices/tableServices';
import * as types from 'redux/types/configureTypes';

export function* getTableListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTableListData = yield call(getTableListsService, payload);
        yield put({
            type: types.GET_TABLE_LIST_SUCCESS,
            response: getTableListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TABLE_LIST_FAILURE });
    }
}

export function* getTableDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTableDetails = yield call(getTableByIdService, payload);
        yield put({
            type: types.GET_TABLE_DETAIL_SUCCESS,
            response: getTableDetails,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TABLE_DETAIL_FAILURE });
    }
}

export function* createTableSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setTableDetails = yield call(createTableService, payload);
        yield put({
            type: types.CREATE_TABLE_SUCCESS,
            response: setTableDetails,
        });
        message.success('Table has been created Successfully');
    } catch (error: any) {}
}

export function* statusUpdateTableSaga({
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
        const timeCapsuleStatus = yield call(
            statusUpdateTableService,
            payload?.updatedPayload
        );
        yield put({
            type: types.STATUS_UPDATE_TABLE_SUCCESS,
            response: timeCapsuleStatus,
        });
        if (timeCapsuleStatus) {
            const getTableListData = yield call(
                getTableListsService,
                paginatedPayload
            );
            yield put({
                type: types.GET_TABLE_LIST_SUCCESS,
                response: getTableListData,
            });
        }
    } catch (error) {}
}

export function* updateTableSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setTableDetails = yield call(updateTableService, payload);
        yield put({
            type: types.UPDATE_TABLE_SUCCESS,
            response: setTableDetails,
        });
        message.success('Table has been saved Successfully');
    } catch (error: any) {}
}

export function* deleteTableRowSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const response: any = yield call(deleteTableRowService, payload);
        yield put({
            type: types.DELETE_TABLE_ROW_SUCCESS,
            response: response,
        });
        message.success('Table row has been deleted successfully');
    } catch (error: any) {
        yield put({
            type: types.DELETE_TABLE_ROW_FAILURE,
            response: error,
        });
        return error;
    }
}

export function* tableDefinitionSaga(): any {
    yield all([
        takeLatest(types.GET_TABLE_LIST, getTableListSaga),
        takeLatest(types.CREATE_TABLE, createTableSaga),
        takeLatest(types.GET_TABLE_DETAILS, getTableDetailsSaga),
        takeLatest(types.UPDATE_TABLE, updateTableSaga),
        takeLatest(types.DELETE_TABLE_ROW, deleteTableRowSaga),
        takeLatest(types.STATUS_UPDATE_TABLE, statusUpdateTableSaga),
    ]);
}
