import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const addDashboardUrlService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(Api.post(`/menu`, payload));
        message.success(response?.data?.message);
        return response;
    } catch (error: any) {
        error?.response?.data && message.error(error?.response?.data);
        throw error.response.data;
    }
};

export const getReportingListService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(
            Api.get(`/menu`, {
                params: payload,
            })
        );
        return response.data;
    } catch (error: any) {
        error?.response?.data && message.error(error?.response?.data);
        throw error.response.data;    }
};

export const updateDashboardUrlService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(
            Api.put(`/menu/${payload.id}`, payload.getEdditedFilteredItem)
        );
        message.success(response?.data?.message);
        return response;
    } catch (error: any) {
        message.error(error?.response?.data);
        return error;
    }
};

export const deleteDashboardUrlService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(Api.post(`/menu/delete/${payload}`));
        message.success(response?.data?.message);
        return response;
    } catch (error: any) {
        error?.response?.data && message.error(error?.response?.data);
        throw error.response.data;
    }
};