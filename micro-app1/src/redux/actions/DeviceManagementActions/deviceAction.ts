import { ADD_SELECTED_BLA_TO_REDUX, ADD_DEVICE } from '../actionTypes';
import * as types from 'redux/types/deviceManagementTypes';

export const addDevice = (payload: string): any => ({
    type: ADD_DEVICE,
    payload,
});

export const setAddDeviceState = (payload: boolean): any => ({
    type: types.SET_CURRENT_STATE,
    payload: payload,
});

export const addSelectedBLAToRedux = (payload: any): any => ({
    type: ADD_SELECTED_BLA_TO_REDUX,
    payload,
});

export const getDeviceList = (payload: any): any => ({
    type: types.GET_DEVICE_LIST,
    payload: payload,
});

export const getAllDevicesList = (payload?: any): any => ({
    type: types.GET_ALL_DEVICES_LIST,
    payload: payload,
});

export const getDeviceDetails = (payload: any): any => ({
    type: types.GET_DEVICE_DETAILS,
    payload: payload,
});

export const editDevice = (payload: any): any => ({
    type: types.EDIT_DEVICE,
    payload: payload,
});

export const setDeviceStart = (payload: any): any => ({
    type: types.SET_DEVICE_START,
    payload: payload,
});

export const setDeviceStop = (payload: any): any => ({
    type: types.SET_DEVICE_STOP,
    payload: payload,
});
    
export const activateDeactivateDevices = (payload: any): any => ({
    type: types.ACTIVATE_DEACTIVATE_DEVICES,
    payload: payload,
});

export const setDeviceResponseState = (): any => ({
    type: types.SET_DEVICE_RESPONSE_STATE,
});

export const cloneTag = (payload: any): any => ({
    type: types.CLONE_DEVICES,
    payload: payload,
});
