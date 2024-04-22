import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const getTableListService = async (payload: any): Promise<any> => {
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
        const response = Api.get(`/impl/table/paginated/list`, {
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

export const assignTableToAssetService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        tableList: payload?.tableList,
        assetId: payload?.assetId,
        doAssign: payload?.doAssign,
        childConfigurationFlag: payload?.childNode,
        requestedBy: payload?.updatedBy, 
    };
    try {
        const response = await Api.put(`/impl/table/assign`, params);
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

export const getTableValuesService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        tableId: payload?.tableId,
        search: payload?.search,
        assetId: payload?.assetId,
        isPaginationRequired: payload?.isPaginationRequired,
    };
    try {
        const response = Api.get(`/impl/table/paginated/values`, {
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

export const validateTableService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/impl/table/validate`, params);
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

export const editTableService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.put(`/impl/table/update`, params);
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