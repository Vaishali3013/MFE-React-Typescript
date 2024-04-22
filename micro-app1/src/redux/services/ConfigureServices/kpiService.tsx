import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';

export const getKpiTypeListService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/kpi/type/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getTargetTypeListService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/target/type/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getAggregationTypeListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/aggregation/type/list`);
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

export const createKpiService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = payload;
    try {
        const response = Api.post(`/kpi/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getKpiListsService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        ...(payload?.sortColumn !== ''
            ? { sortColumn: payload?.sortColumn }
            : {}),
        ...(payload?.sortOrder !== '' ? { sortOrder: payload?.sortOrder } : {}),
        ...(payload?.search !== '' ? { search: payload?.search } : {}),
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

export const getKpiByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = payload;
    try {
        const response = Api.get(`/kpi/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const statusUpdateKpiService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');

    try {
        const response = Api.put(`/kpi/status`, payload);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const updateKpiService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        ...payload,
    };
    delete params?.kpiId;
    try {
        const response = Api.put(`/kpi/edit/${payload?.kpiId}`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};
