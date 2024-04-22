import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    createRoleService,
    getALLRolesService,
    getResourceTypeByIdService,
    getResourceTypeListService,
    getRoleByIdService,
    getRolesListsService,
    roleActivateDeactivateServices,
    updateRoleService,
} from 'redux/services/UserManagementServices/rolesService';
import { getCountAnalyticsDeatilsServices } from 'redux/services/UserManagementServices/usersServices';
import * as types from 'redux/types/userManagementTypes';

export function* getAllRolesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllRolesData = yield call(getALLRolesService, payload);
        yield put({
            type: types.GET_ALL_ROLES_SUCCESS,
            response: getAllRolesData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* getRolesList({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getRolesListData = yield call(getRolesListsService, payload);
        yield put({
            type: types.GET_ROLES_LIST_SUCCESS,
            response: getRolesListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ROLES_LIST_FAILURE });
        return message.error(error.response);
    }
}

export function* getAllRoles({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getAllRolesData = yield call(getALLRolesService, payload);
        yield put({
            type: types.GET_ALL_ROLES_SUCCESS,
            response: getAllRolesData,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* getRoleDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getRoleDetails = yield call(getRoleByIdService, payload);
        yield put({
            type: types.GET_ROLE_DETAIL_SUCCESS,
            response: getRoleDetails,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* createRoleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setRoleDetails = yield call(createRoleService, payload);
        yield put({
            type: types.SET_ROLE_LIST_SUCCESS,
            response: setRoleDetails,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* updateRoleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setupdatedRoleDetails = yield call(updateRoleService, payload);
        yield put({
            type: types.UPDATE_ROLE_LIST_SUCCESS,
            response: setupdatedRoleDetails,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* getResouceTypeSaga({
    type,
}: {
    type: string;
}): Generator<any> {
    try {
        // Api call
        const getResourceTypeData = yield call(getResourceTypeListService);
        yield put({
            type: types.GET_RESOURCE_TYPE_SUCCESS,
            response: getResourceTypeData,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* getResourceTypeDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getResourcetypeDetails = yield call(
            getResourceTypeByIdService,
            payload
        );
        yield put({
            type: types.GET_RESOURCE_TYPE_DETAILS_SUCCESS,
            response: getResourcetypeDetails,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* activateDeactivateRoleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const isRoleStatus = yield call(
            roleActivateDeactivateServices,
            payload
        );

        yield put({
            type: types.ACTIVATE_DEACTIVATE_ROLE_SUCCESS,
            response: isRoleStatus,
        });
        if (isRoleStatus) {
            const rolesDataList = yield call(
                getRolesListsService,
                payload?.paginationPayload
            );
            yield put({
                type: types.GET_ROLES_LIST_SUCCESS,
                response: rolesDataList,
            });
            const getCountAnalytics = yield call(
                getCountAnalyticsDeatilsServices,
                'roles'
            );
            yield put({
                type: types.COUNT_ANALYTICS_SUCCESS,
                response: getCountAnalytics,
            });
        }
    } catch (error) {}
}

export function* roleSaga(): any {
    yield all([takeLatest(types.GET_ROLES_LIST, getRolesList)]);
    yield all([takeLatest(types.GET_ALL_ROLES, getAllRoles)]);
    yield all([takeLatest(types.GET_ROLE_DETAILS, getRoleDetailsSaga)]);
    yield all([takeLatest(types.SET_ROLE_LIST, createRoleSaga)]);
    yield all([takeLatest(types.UPDATE_ROLE_LIST, updateRoleSaga)]);
    yield all([takeLatest(types.GET_RESOURCE_TYPE, getResouceTypeSaga)]);
    yield all([
        takeLatest(types.GET_RESOURCE_TYPE_DETAILS, getResourceTypeDetailsSaga),
    ]);
    yield all([
        takeLatest(types.ACTIVATE_DEACTIVATE_ROLE, activateDeactivateRoleSaga),
    ]);
}
