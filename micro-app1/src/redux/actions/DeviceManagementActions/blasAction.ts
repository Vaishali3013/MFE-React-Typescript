import * as types from 'redux/types/deviceManagementTypes';
import { ADD_SELECTED_DEVICE_TO_REDUX } from '../actionTypes';

export const setAddBlaState = (payload: string): any => ({
    type: types.SET_ADD_BLA_STATE,
    payload: payload,
});

export const setBlaId = (payload: number | null): any => ({
    type: types.SET_BLA_ID,
    payload: payload,
});

export const setDeviceId = (payload: number | null): any => ({
    type: types.SET_DEVICE_ID,
    payload: payload,
});

export const editBla = (payload: any): any => ({
    type: types.EDIT_BLA,
    payload: payload,
});
export const getBlasList = (payload: any): any => ({
    type: types.GET_BLAS_LIST,
    payload: payload,
});

export const getAllBlasList = (payload?: any): any => ({
    type: types.GET_ALL_BLAS_LIST,
    payload: payload,
});

export const getBlaDetails = (payload: any): any => ({
    type: types.GET_BLA_DETAILS,
    payload: payload,
});

export const activateDeactivateBlas = (payload: any): any => ({
    type: types.ACTIVATE_DEACTIVATE_BLAS,
    payload: payload,
});

export const createBla = (payload: any): any => ({
    type: types.SET_BLA_LIST,
    payload: payload,
});

export const getDevicesInBlaList = (payload: any): any => ({
    type: types.GET_DEVICES_BLA_LIST,
    payload: payload,
});

export const removeDeviceInBla = (payload: any): any => ({
    type: types.REMOVE_DEVICE_BLA,
    payload: payload,
});

export const addSelectedDeviceToRedux = (payload: any): any => ({
    type: ADD_SELECTED_DEVICE_TO_REDUX,
    payload,
});

export const removeLastSelectedBlaFromRedux = (): any => ({
    type: types.REMOVE_LAST_CREATED_BLA,
});

export const removeSelectedDeviceFromRedux = (): any => ({
    type: types.REMOVE_SELECTED_DEVICE,
});

export const setSidebarNavigate = (payload: any): any => ({
    type: types.SET_SIDEBAR_NAVIGATE,
    payload: payload,
});

