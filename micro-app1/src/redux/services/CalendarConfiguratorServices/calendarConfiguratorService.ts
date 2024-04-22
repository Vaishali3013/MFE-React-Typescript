import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const getTimeZonesListService = async (): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = await Promise.resolve(
            Api.get(`/calendar/getTimeZones`)
        );
        return response;
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getShiftConfigByAssetIdService = async (
    assetId: number
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = await Promise.resolve(
            Api.get(`/calendar/shiftConfig/${assetId}`)
        );
        return response;
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const setShiftConfigDetailsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = Api.put(`/calendar/shiftConfig`, payload);
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

export const setAssetsDetailsService = async (payload: any): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    const params = payload;
    try {
        const response = Api.put(`/calendar/asset`, params);
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

export const getDayConfigByAssetIdService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    const params = payload;
    try {
        const response = Api.get(`/calendar/dayConfig/${params}`);
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

export const getAssetDetailsByIdService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    const params = payload;
    try {
        const response = Api.get(`/calendar/asset/${params}`);
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

export const getMonthsListService = async (): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = await Promise.resolve(
            Api.get(`/calendar/getYearMonths`)
        );
        return response;
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getWeekDaysListService = async (): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = await Promise.resolve(
            Api.get(`/calendar/getWeekDays`)
        );
        return response;
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const setDayConfigDetailsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = Api.put(`/calendar/dayConfig`, payload);
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
