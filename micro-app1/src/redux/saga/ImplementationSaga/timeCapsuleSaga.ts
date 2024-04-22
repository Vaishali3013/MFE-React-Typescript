import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/implementationTypes';
import {
    assignTimeCapsuleToAssetService,
    getAssignedTimeCapsuleListService,
    getUnAssignedTimeCapsuleListService,
    removeTimeCapsuleFromAssetService,
} from 'redux/services/ImplementationServices/timeCapsuleServices';
import { message } from 'antd';
export function* getAssignedTimeCapsuleListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAssignedTimeCapsuleListData = yield call(
            getAssignedTimeCapsuleListService,
            payload
        );
        yield put({
            type: types.GET_ASSIGNED_TIME_CAPSULE_LIST_SUCCESS,
            response: getAssignedTimeCapsuleListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ASSIGNED_TIME_CAPSULE_LIST_FAILURE });
    }
}

export function* getUnassignedTimeCapsuleListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getUnassignedTimeCapsuleListData = yield call(
            getUnAssignedTimeCapsuleListService,
            payload
        );
        yield put({
            type: types.GET_UNASSIGNED_TIME_CAPSULE_LIST_SUCCESS,
            response: getUnassignedTimeCapsuleListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_UNASSIGNED_TIME_CAPSULE_LIST_FAILURE });
    }
}

export function* assignTimeCapsuleToAssetSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const assignTimeCapsuleToAssetData = yield call(
            assignTimeCapsuleToAssetService,
            payload
        );
        yield put({
            type: types.ASSIGN_TIME_CAPSULE_TO_ASSET_SUCCESS,
            response: assignTimeCapsuleToAssetData,
        });
        message.success('Time Capsule are assigned successfully');
    } catch (error: any) {}
}

export function* removeTimeCapsuleFromAssetSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const removeTimeCapsuleFromAssetData = yield call(
            removeTimeCapsuleFromAssetService,
            payload
        );
        yield put({
            type: types.REMOVE_TIME_CAPSULE_FROM_ASSET_SUCCESS,
            response: removeTimeCapsuleFromAssetData,
        });
        message.success('Removed successfully ');
    } catch (error: any) {}
}

export function* timeCapsuleImplementationSaga(): any {
    yield all([
        takeLatest(
            types.GET_ASSIGNED_TIME_CAPSULE_LIST,
            getAssignedTimeCapsuleListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.GET_UNASSIGNED_TIME_CAPSULE_LIST,
            getUnassignedTimeCapsuleListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.ASSIGN_TIME_CAPSULE_TO_ASSET,
            assignTimeCapsuleToAssetSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.REMOVE_TIME_CAPSULE_FROM_ASSET,
            removeTimeCapsuleFromAssetSaga
        ),
    ]);
}
