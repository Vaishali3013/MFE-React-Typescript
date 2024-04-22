import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';

export const getAttributeImplementationListsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        assignStatus: payload?.assignStatus,
        search: payload?.search,
        assetId: payload?.assetId,
    };
    try {
        const response = Api.get(`/impl/attribute`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const AssignAttributeService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        ...payload,
    };
    try {
        const response = await Promise.resolve(
            Api.put(`/impl/attribute/assign`, params)
        );
        return response;
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const validateStaticValueAttributeService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const requestBody = {
        assetId: payload?.assetId,
        requestedBy: payload?.requestedBy,
        attributeId: payload?.attributeId,
        value: payload?.value,
    };
    try {
        const response = await Promise.resolve(
            Api.post(`/impl/attribute/value`, requestBody)
        );
        return response;
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const editAttributeValueService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    try {
        const response = await Promise.resolve(
            Api.put(`/impl/attribute/value`, payload)
        );
        message.success(response?.data?.message);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};
export const getTagList = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('asset');
    const params = {
        tagName :payload?.tagName,
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        assignStatus: payload?.assignStatus,
        search: payload?.search,
        assetId: payload?.assetId,
        includeChildNode:payload?.includeChildNode
    };
    try {
        const response = Api.get(`/stream/paginated/list/${payload?.id}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const validateTagValueAttributeService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const requestBody = {
        assetId: payload?.assetId,
        requestedBy: payload?.requestedBy,
        attributeId: payload?.attributeId,
        value: payload?.value,
    };
    try {
        const response = await Promise.resolve(
            Api.post(`/impl/attribute/value`, requestBody)
        );
        return response;
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const validateTagValueAttributeEditService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const requestBody = {
        assetId: payload?.assetId,
        requestedBy: payload?.requestedBy,
        attributeId: payload?.attributeId,
        value: payload?.value,
    };
    try {
        const response = await Promise.resolve(
            Api.put(`/impl/attribute/value`, requestBody)
        );
        return response;
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

