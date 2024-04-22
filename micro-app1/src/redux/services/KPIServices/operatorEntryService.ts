import { baseUrlSetter } from '../../../utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const getAllOperatorParamsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    const params = {
        roleId: payload?.roleId,
    };
    try {
        const response = Api.get(`/shiftOperator/contact/list`, { params });
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

export const createOperatorParamService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');
    try {
        const response = Api.post(
            `/shiftOperator/add/operator`,
            payload?.paramValue
        );
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
export const getOperatorLastShiftDataService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('calendarConfigurator');

    try {
        const response = Api.get(`/shiftOperator/lastShiftData/${payload}`);
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
