import * as types from 'redux/types/configureTypes';

export const setTableState = (payload: string): any => ({
    type: types.SET_TABLE_STATE,
    payload: payload,
});

export const getTableList = (payload: any): any => ({
    type: types.GET_TABLE_LIST,
    payload: payload,
});

export const createTable = (payload: any): any => ({
    type: types.CREATE_TABLE,
    payload: payload,
});

export const changeSuccessStateOfTable = (): any => ({
    type: types.CHANGE_SUCCESS_STATUS_OF_TABLE,
});
export const getTableDetails = (payload: any): any => ({
    type: types.GET_TABLE_DETAILS,
    payload: payload,
});

export const updateTableDataForLocal = (payload: any): any => ({
    type: types.UPDATE_TABLE_DATA_FOR_LOCAL,
    payload: payload,
});

export const statusUpdateTable = (payload: any): any => ({
    type: types.STATUS_UPDATE_TABLE,
    payload: payload,
});

export const updateTable = (payload: any): any => ({
    type: types.UPDATE_TABLE,
    payload: payload,
});

export const deleteTableRowAction = (payload: any): any => ({
    type: types.DELETE_TABLE_ROW,
    payload: payload,
});
