import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';

export const getTableListsService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        ...(payload?.search !== '' ? { search: payload?.search } : {}),
    };
    try {
        const response = Api.get(`/table/paginated/list`, {
            params: params,
        });

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createTableService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/table/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getTableByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.get(`/table/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const statusUpdateTableService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');

    try {
        const response = Api.put(`/table/status`, payload);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const updateTableService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        ...payload,
    };
    delete params?.id;
    try {
        const response = Api.put(`/table/edit/${payload?.id}`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const deleteTableRowService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.put(`/table/column/remove`, {...payload});
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};
