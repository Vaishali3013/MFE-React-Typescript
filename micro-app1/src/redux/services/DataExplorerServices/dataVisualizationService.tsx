import { areAllValuesDefined, baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import dayjs from 'dayjs';
import {
    TemplateTypeAsset,
    dateFormat,
    fileExtensionTypes,
    sortingOrder,
} from 'types/enums';
import { message } from 'antd';
export const getNodeListService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    const params = {
        cloudPushEligible: 0,
    };
    try {
        // Note: this is a fixed value and must be changed while keeping backend in picture
        const response = Api.get(`/node/${payload}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getModelListService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    try {
        const response = Api.get(`/model/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getStreamTagListService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    const params = {
        tagOriginId: 0,
        parentNodeId: payload,
    };
    try {
        const response = Api.get(`/stream/list`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAggregatedChartDataService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('asset');
    const params = { ...payload, sortOrder: sortingOrder.descending };
    try {
        const response = Api.get(`/tag/aggregate/data`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getDataTableListService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');
    const params = { ...payload };
    try {
        const response = Api.get(`/tag/raw/data`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAssetCSVDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('asset');

    const idList = Array.isArray(payload?.tagUuidList)
        ? payload.tagUuidList.join(',')
        : payload?.tagUuidList;

    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        tagUuidList: idList,
        templateType: payload?.templateType,
        tagOriginId: payload?.tagOriginId,
        timeZone: payload?.timeZone,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = await Api.get(`/tag/export/raw/data`, {
                params: params,
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileExtension =
                params.templateType === TemplateTypeAsset.csv
                    ? fileExtensionTypes.csv
                    : fileExtensionTypes.pdf;
            link.setAttribute(
                'download',
                `TAGS_Data_${dayjs().format(
                    dateFormat.format
                )}.${fileExtension}`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return await Promise.resolve(response);
        } catch (error: any) {
            message.error(
                error.response.data.message
                    ? error.response.data.message
                    : 'Internal Server Error'
            );
            throw new Error(error);
        }
    }
};
