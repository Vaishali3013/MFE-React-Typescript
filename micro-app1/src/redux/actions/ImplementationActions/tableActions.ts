import * as types from 'redux/types/implementationTypes';

export const getAssignedTableList = (payload: any): any => ({
    type: types.GET_ASSIGNED_TABLE_LIST,
    payload: payload,
});
export const getUnassignedTableList = (payload: any): any => ({
    type: types.GET_UNASSIGNED_TABLE_LIST,
    payload: payload,
});
export const assignTableToAsset = (payload: any): any => ({
    type: types.ASSIGN_TABLE_TO_ASSET,
    payload: payload,
});
export const unassignTableToAsset = (payload: any): any => ({
    type: types.UNASSIGN_TABLE_TO_ASSET,
    payload: payload,
});
export const getTableValues = (payload: any): any => ({
    type: types.GET_TABLE_VALUES,
    payload: payload,
});
export const validateTable = (payload: any): any => ({
    type: types.VALIDATE_TABLE,
    payload: payload,
});
export const editTable = (payload: any): any => ({
    type: types.EDIT_TABLE,
    payload: payload,
});