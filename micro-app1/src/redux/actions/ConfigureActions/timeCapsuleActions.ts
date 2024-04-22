import * as types from 'redux/types/configureTypes';

export const setTimeCapsuleState = (payload: string): any => ({
    type: types.SET_TIME_CAPSULE_STATE,
    payload: payload,
});

export const getTimeCapsuleList = (payload: any): any => ({
    type: types.GET_TIME_CAPSULE_LIST,
    payload: payload,
});

export const createTimeCapsule = (payload: any): any => ({
    type: types.CREATE_TIME_CAPSULE,
    payload: payload,
});

export const changeSuccessStateOfTimeCapsule = (): any => ({
    type: types.CHANGE_SUCCESS_STATUS_OF_TIMECAPSULE,
});
export const getTimeCapsuleDetails = (payload: any): any => ({
    type: types.GET_TIME_CAPSULE_DETAILS,
    payload: payload,
});

export const updateTimeCapsuleDataForLocal = (payload: any): any => ({
    type: types.UPDATE_TIMECAPSULE_DATA_FOR_LOCAL,
    payload: payload,
});

export const statusUpdateTimeCapsule = (payload: any): any => ({
    type: types.STATUS_UPDATE_TIME_CAPSULE,
    payload: payload,
});

export const updateTimeCapsule = (payload: any): any => ({
    type: types.UPDATE_TIME_CAPSULE,
    payload: payload,
});

export const assignTimeCapsule = (payload: any): any => ({
    type: types.ASSIGN_TIME_CAPSULE,
    payload: payload,
});
