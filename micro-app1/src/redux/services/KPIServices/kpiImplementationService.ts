import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';

export const getKpiListService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        search: payload?.search,
        nodeTypeId: payload?.nodeTypeId,
        activeStatus: payload?.activeStatus,
    };
    try {
        const response = Api.get(`/kpi`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getNodeLevelListService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    try {
        const response = Api.get(`/node/getNodeType`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getKpiDetailService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/impl/kpi/${payload}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getCalculationCycleListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/calculation/cycle/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const validateKpiServices = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const requestBody = payload;
    try {
        const response = Api.post(`/impl/kpi/add`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};
