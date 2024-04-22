import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const getAssignedTimeCapsuleListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        isAssign: payload?.isAssign,
        search: payload?.search,
    };
    try {
        const response = Api.get(`/configure/timeCapsule/${payload?.assetId}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getUnAssignedTimeCapsuleListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        isAssign: payload?.isAssign,
        search: payload?.search,
    };
    try {
        const response = Api.get(`/configure/timeCapsule/${payload?.assetId}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const assignTimeCapsuleToAssetService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = await Promise.resolve(
            Api.put(`/configure/timeCapsule/assign`, params)
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message?.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const removeTimeCapsuleFromAssetService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = await Promise.resolve(
            Api.put(`/configure/timeCapsule/assign`, params)
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message?.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
