import {
    areAllValuesDefined,
    baseUrlSetter,
} from '../../../utils/commonFunction';
import Api from '..';
import { message } from 'antd';
import { TemplateTypeKpi, dateFormat, fileExtensionTypes } from 'types/enums';
import dayjs from 'dayjs';

export const getUtilizationDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        id: payload?.id,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/reporting/getUtilization`, {
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
    }
};
export const getCurrentDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;
    const params = {
        idList: idList,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/reporting/getCurrentTagValues`, {
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
    }
};
export const getKPIMetaService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;
    const params = {
        idList: idList,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/kpi/getKpiMetaData`, {
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
    }
};

export const getAggregatedValuesService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;

    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        idList: idList,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/reporting/getAggValues`, {
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
    }
};
export const getSteamRateDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        id: payload?.id,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/reporting/getSteamRate`, {
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
    }
};
export const getTrendDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;
    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        idList: idList,
        enableBroadSampling: payload?.enableBroadSampling,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = Api.get(`/reporting/getTrend`, {
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
    }
};
export const getKPIDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;

    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        idList: idList,
        templateType: payload?.templateType,
        timeZone: payload?.timeZone,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = await Api.get(`/reporting/export`, {
                params: params,
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileExtension =
                params.templateType === TemplateTypeKpi.csv
                    ? fileExtensionTypes.csv
                    : fileExtensionTypes.pdf;
            link.setAttribute(
                'download',
                `KPI_Data_${dayjs().format(dateFormat.format)}.${fileExtension}`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error: any) {
            message.error(
                error.message ? error.message : 'Internal Server Error'
            );
            throw new Error(error);
        }
    }
};

export const getKPIAggDataService = async (payload: any): Promise<any> => {
    baseUrlSetter('kpi');
    const idList = Array.isArray(payload?.id)
        ? payload.id.join(',')
        : payload?.id;

    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        idList: idList,
        templateType: payload?.templateType,
        timeZone: payload?.timeZone,
    };
    const checkValues: boolean = areAllValuesDefined(params);
    if (checkValues) {
        try {
            const response = await Api.get(`/reporting/exportAggregatedData`, {
                params: params,
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileExtension =
                params.templateType === TemplateTypeKpi.csv
                    ? fileExtensionTypes.csv
                    : fileExtensionTypes.pdf;
            link.setAttribute(
                'download',
                `KPI_Data_Aggregated_${dayjs().format(dateFormat.format)}.${fileExtension}`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error: any) {
            message.error(
                error.message ? error.message : 'Internal Server Error'
            );
            throw new Error(error);
        }
    }
};
