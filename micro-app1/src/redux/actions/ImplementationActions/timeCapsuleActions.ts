import * as types from 'redux/types/implementationTypes';

export const getAssignedTimeCapsuleList = (payload: any): any => ({
    type: types.GET_ASSIGNED_TIME_CAPSULE_LIST,
    payload: payload,
});

export const getUnassignedTimeCapsuleList = (payload: any): any => ({
    type: types.GET_UNASSIGNED_TIME_CAPSULE_LIST,
    payload: payload,
});

export const assignTimeCapsuleToAsset = (payload: any): any => ({
    type: types.ASSIGN_TIME_CAPSULE_TO_ASSET,
    payload: payload,
});

export const removeTimeCapsuleFromAsset = (payload: any): any => ({
    type: types.REMOVE_TIME_CAPSULE_FROM_ASSET,
    payload: payload,
});
