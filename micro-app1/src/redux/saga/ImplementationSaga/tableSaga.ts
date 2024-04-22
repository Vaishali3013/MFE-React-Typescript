import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/implementationTypes';
import { assignTableToAssetService, editTableService, getTableListService, getTableValuesService, validateTableService } from 'redux/services/ImplementationServices/tableServices';
import { message } from 'antd';

export function* getAssignedTableListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAssignedTableListData = yield call(getTableListService, payload);
        yield put({
            type: types.GET_ASSIGNED_TABLE_LIST_SUCCESS,
            response: getAssignedTableListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ASSIGNED_TABLE_LIST_FAILURE });
    }
}

export function* getUnassignedTableListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getUnassignedTableListData = yield call(getTableListService, payload);
        yield put({
            type: types.GET_UNASSIGNED_TABLE_LIST_SUCCESS,
            response: getUnassignedTableListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_UNASSIGNED_TABLE_LIST_FAILURE });
    }
}

export function* assignTableToAssetSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const assignTableToAssetData = yield call(
            assignTableToAssetService,
            payload
        );
        yield put({
            type: types.ASSIGN_TABLE_TO_ASSET_SUCCESS,
            response: assignTableToAssetData,
        });
        message.success('Assigned successfully ');
    } catch (error: any) {
        yield put({ type: types.ASSIGN_TABLE_TO_ASSET_FAILURE });
     }
}

export function* unassignTableToAssetSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const unassignTableToAssetData = yield call(
            assignTableToAssetService,
            payload
        );
        yield put({
            type: types.UNASSIGN_TABLE_TO_ASSET_SUCCESS,
            response: unassignTableToAssetData,
        });
        message.success('Removed successfully ');
    } catch (error: any) {
        yield put({ type: types.UNASSIGN_TABLE_TO_ASSET_FAILURE });
     }
}

export function* getTableValuesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTableValuesData = yield call(getTableValuesService, payload);
        yield put({
            type: types.GET_TABLE_VALUES_SUCCESS,
            response: getTableValuesData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TABLE_VALUES_FAILURE });
    }
}

export function* validateTableSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const validateTableData = yield call(
            validateTableService,
            payload
        );
        yield put({
            type: types.VALIDATE_TABLE_SUCCESS,
            response: validateTableData,
        });
        message.success('Validated successfully ');
    } catch (error: any) {
        yield put({ type: types.VALIDATE_TABLE_FAILURE });
     }
}

export function* editTableSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const editTableData = yield call(
            editTableService,
            payload
        );
        yield put({
            type: types.EDIT_TABLE_SUCCESS,
            response: editTableData,
        });
        message.success('Updated successfully ');
    } catch (error: any) {
        yield put({ type: types.EDIT_TABLE_FAILURE });
     }
}

export function* tableSaga(): any {
    yield all([takeLatest(types.GET_ASSIGNED_TABLE_LIST, getAssignedTableListSaga)]);
    yield all([takeLatest(types.GET_UNASSIGNED_TABLE_LIST, getUnassignedTableListSaga)]);
    yield all([takeLatest(types.ASSIGN_TABLE_TO_ASSET, assignTableToAssetSaga)]);
    yield all([takeLatest(types.UNASSIGN_TABLE_TO_ASSET, unassignTableToAssetSaga)]);
    yield all([takeLatest(types.GET_TABLE_VALUES, getTableValuesSaga)]);
    yield all([takeLatest(types.VALIDATE_TABLE, validateTableSaga)]);
    yield all([takeLatest(types.EDIT_TABLE, editTableSaga)]);
}
