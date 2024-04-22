import { baseUrlSetter } from '../../../utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const getAllManualParamsService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/manualParam/all`);
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

export const getManualParamsValueService = async (
    payload: any
): Promise<any> => {
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;
    const params = {
        idList: idList,
    };
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/manualParam`, {
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

export const createManualParamService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = [
        {
            id: payload?.id,
            value: payload?.value,
        },
    ];
    try {
        const response = Api.post(`/manualParam`, params);
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
