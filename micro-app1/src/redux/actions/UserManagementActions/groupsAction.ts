import * as types from 'redux/types/userManagementTypes';

export const getGroupsList = (payload?: any): any => ({
    type: types.GET_GROUPS_LIST,
    payload: payload,
});

export const getAllGroups = (): any => ({
    type: types.GET_ALL_GROUPS,
});

export const createGroup = (payload: any): any => ({
    type: types.ADD_GROUPS,
    payload: payload,
});

export const editGroup = (payload: any): any => ({
    type: types.EDIT_GROUP,
    payload: payload,
});

export const deactivateGroup = (payload: any): any => ({
    type: types.DEACTIVATE_GROUP,
    payload: payload,
});

export const getGroupByGroupId = (payload: any): any => ({
    type: types.GET_GROUP_BY_GROUPID,
    payload: payload,
});

export const getResourceType = (): any => ({
    type: types.GET_RESOURCE_TYPE,
});

export const getResourceByTypeByResourceId = (payload: any): any => ({
    type: types.GET_RESOURCEBYTYPE_BY_RESOURCEID,
    payload: payload,
});

export const removeGroupState = (payload?: any): any => ({
    type: types.REMOVE_EDIT_GROUP,
    payload: payload,
});
