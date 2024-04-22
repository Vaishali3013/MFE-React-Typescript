import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';
import { StatusType } from 'types/enums';

export const getAttributeListsService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        search: payload?.search,
        status: payload.status ? payload.status : StatusType.All,
    };
    try {
        const response = Api.get(`/attribute`, {
            params: params,
        });

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getAttributeByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.get(`/attribute/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getIndustryListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/industry/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getCategoryListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/category/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getValueTypeListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/data/type/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getPropertyListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/property/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getDataReferenceListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/data/reference/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getUomListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/uom/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getUomClassListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/uom/class/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getUomMetricListService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = Api.get(`/uom/metric/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createUomClassService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/uom/class/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createCategoryService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;

    try {
        const response = Api.post(`/category/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createIndustryService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/industry/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createUomService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/uom/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createAttributeService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/attribute/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const updateAttributeService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        ...payload,
    };
    delete params?.attributeId;
    try {
        const response = Api.put(
            `/attribute/edit/${payload?.attributeId}`,
            params
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const statusUpdateAttributeService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');

    try {
        const response = Api.put(`/attribute/status`, payload);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};
