import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';
import { reasonCodeFilterOptions } from 'types/enums';

export const getDownTimesService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        pageNum: payload?.page,
        pageSize: payload?.pageSize,
        assetId: payload?.assetId,
        assignFilterId: payload.assignFilterId
            ? payload.assignFilterId
            : reasonCodeFilterOptions.ALL,
    };
    try {
        const response = Api.get(`/reasonCode/getPagedDownTimeDetails`, {
            params: params,
        });

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getReasonFactorService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        reasonCategoryId: payload?.reasonCategoryId,
    };
    try {
        const response = Api.get(
            `/reasonCode/getReasonFactorsByReasonCategory`,
            {
                params: params,
            }
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getReasonCodeService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/reasonCode/getAllReasonCodes`);

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getReasonCategoryService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.get(`/reasonCode/getReasonCategories`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createReasonCodeService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    try {
        const response = Api.put(
            `/reasonCode?downTimeDetailsId=${payload?.downTimeDetailsId}&reasonCodeId=${payload?.reasonCodeId}`
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getNodeDetailsService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    const nodeName = 'Line-3';
    try {
        const response = Api.get(`/node/getDetailsByName?nodeName=${nodeName}`);

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};
