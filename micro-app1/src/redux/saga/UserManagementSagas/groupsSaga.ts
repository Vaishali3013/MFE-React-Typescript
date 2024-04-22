import {
    getGroupListServices,
    createGroupServices,
    editGroupServices,
    deactivateGroupService,
    getGroupByGroupIdService,
    getResourceTypeService,
    getResourceTypeByResourceIdService,
    getAllGroupsServices,
} from 'redux/services/UserManagementServices/groupsServices';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from 'redux/types/userManagementTypes';
import { getCountAnalyticsDeatilsServices } from 'redux/services/UserManagementServices/usersServices';

export function* getGroupsListSaga({
    type,
    payload,
}: {
    type: string;
    payload?: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getGroupsListData = yield call(getGroupListServices, payload);
        yield put({
            type: types.GET_GROUPS_LIST_SUCCESS,
            response: getGroupsListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_GROUPS_LIST_FAILURE });
    }
}

export function* getAllGroupsSaga(): Generator<any> {
    try {
        const getAllGroupsData = yield call(getAllGroupsServices);
        yield put({
            type: types.GET_ALL_GROUPS_SUCCESS,
            response: getAllGroupsData,
        });
    } catch (error: any) {}
}

export function* createGroupSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const createGroupData = yield call(createGroupServices, payload);
        yield put({
            type: types.ADD_GROUPS_SUCCESS,
            response: createGroupData,
        });
        yield put({
            type: 'GET_GROUPS_LIST',
            payload: payload?.paginationPayload,
        });
    } catch (error) {}
}

export function* editGroupSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const editGroupData = yield call(editGroupServices, payload);
        yield put({
            type: types.EDIT_GROUP_SUCCESS,
            response: editGroupData,
        });
        if (editGroupData) {
            const getGroupsListData = yield call(
                getGroupListServices,
                payload.paginationPayload
            );
            yield put({
                type: types.GET_GROUPS_LIST_SUCCESS,
                response: getGroupsListData,
            });
        }
    } catch (error: any) {
        yield put({
            type: types.EDIT_GROUP_FAILURE, // Dispatch a failure action
            error,
        });
    }
}

export function* deactivateGroupSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const deactivateGroupData = yield call(deactivateGroupService, payload);
        yield put({
            type: types.DEACTIVATE_GROUP_SUCCESS,
            response: deactivateGroupData,
        });
        if (deactivateGroupData) {
            const getGroupsListData = yield call(
                getGroupListServices,
                payload?.paginationPayload
            );
            yield put({
                type: types.GET_GROUPS_LIST_SUCCESS,
                response: getGroupsListData,
            });
            const getCountAnalytics = yield call(
                getCountAnalyticsDeatilsServices,
                'groups'
            );
            yield put({
                type: types.COUNT_ANALYTICS_SUCCESS,
                response: getCountAnalytics,
            });
        }
    } catch (error: any) {}
}

export function* getGroupByGroupIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getDataByGroupId = yield call(getGroupByGroupIdService, payload);
        yield put({
            type: types.GET_GROUP_BY_GROUPID_SUCCESS,
            response: getDataByGroupId,
        });
    } catch (error: any) {}
}

export function* getResourceTypeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getResourceType = yield call(getResourceTypeService);
        yield put({
            type: types.GET_RESOURCE_TYPE_SUCCESS,
            response: getResourceType,
        });
    } catch (error: any) {}
}

export function* getResourceTypeByResourceIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getDataByResourceId = yield call(
            getResourceTypeByResourceIdService,
            payload
        );
        yield put({
            type: types.GET_RESOURCEBYTYPE_BY_RESOURCEID_SUCCESS,
            response: getDataByResourceId,
        });
    } catch (error: any) {}
}
export function* groupsSaga(): any {
    yield all([takeLatest(types.GET_GROUPS_LIST, getGroupsListSaga)]);
    yield all([takeLatest(types.GET_ALL_GROUPS, getAllGroupsSaga)]);
    yield all([takeLatest(types.ADD_GROUPS, createGroupSaga)]);
    yield all([takeLatest(types.EDIT_GROUP, editGroupSaga)]);
    yield all([takeLatest(types.DEACTIVATE_GROUP, deactivateGroupSaga)]);
    yield all([takeLatest(types.GET_GROUP_BY_GROUPID, getGroupByGroupIdSaga)]);
    yield all([takeLatest(types.GET_RESOURCE_TYPE, getResourceTypeSaga)]);
    yield all([
        takeLatest(
            types.GET_RESOURCEBYTYPE_BY_RESOURCEID,
            getResourceTypeByResourceIdSaga
        ),
    ]);
}
