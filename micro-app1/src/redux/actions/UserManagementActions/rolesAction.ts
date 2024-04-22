import * as types from 'redux/types/userManagementTypes';

export const setEditRoleState = (payload: string): any => ({
    type: types.SET_EDIT_ROLE_STATE,
    payload: payload,
});

export const setRoleData = (payload: any): any => ({
    type: types.SET_ROLE_DATA,
    payload: payload,
});

export const getAllRoles = (): any => ({
    type: types.GET_ALL_ROLES,
});

export const getRolesList = (payload: any): any => ({
    type: types.GET_ROLES_LIST,
    payload: payload,
});

export const getRoleDetails = (payload: any): any => ({
    type: types.GET_ROLE_DETAILS,
    payload: payload,
});

export const createRoles = (payload: any): any => ({
    type: types.SET_ROLE_LIST,
    payload: payload,
});

export const updateRole = (payload: any): any => ({
    type: types.UPDATE_ROLE_LIST,
    payload: payload,
});

export const getResourceType = (): any => ({
    type: types.GET_RESOURCE_TYPE,
});

export const getResourcetypeDetails = (payload: any): any => ({
    type: types.GET_RESOURCE_TYPE_DETAILS,
    payload: payload,
});

export const setResourceTypeSubItems = (payload: []): any => ({
    type: types.SET_RESOURCE_TYPE_SUBITEMS,
    payload: payload,
});

export const removeResourceTypeSubItems = (payload: []): any => ({
    type: types.REMOVE_RESOURCE_TYPE_SUBITEMS,
    payload: payload,
});

export const setResourceTypePayload = (payload: any): any => ({
    type: types.SET_RESOURCE_TYPE_PAYLOAD,
    payload: payload,
});

export const activateDeactivateRole = (payload: any): any => ({
    type: types.ACTIVATE_DEACTIVATE_ROLE,
    payload: payload,
});

export const setUserRolePayload = (payload: []): any => ({
    type: types.SET_USERS_ROLE_PAYLOAD,
    payload: payload,
});
