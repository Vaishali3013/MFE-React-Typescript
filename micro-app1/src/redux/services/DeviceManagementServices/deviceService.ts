import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';
export const getDevicesListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');

    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        status: payload?.status,
        deviceList: payload?.search.toString() || [],
    };
    try {
        const response = Api.get(`/device/list/paginated`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getAllDevicesListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        let response;

        if (payload) {
            response = Api.get(`/device/list`, { params: payload });
        } else {
            response = Api.get(`/device/list`);
        }

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getDeviceByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = payload;
    try {
        const response = Api.get(`/device/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const editDeviceServices = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        deviceId: payload?.deviceId,
    };
   
    const requestBody: any = {
        description: payload?.description,
        requestedBy: payload?.requestedBy,
        opcUaConnectionDetails: {},
        plcAbConnectionDetails: {},
        plcSiemensConnectionDetails: {},
        plcMitsubishiConnectionDetails: {},
        opcDaConnectionSettings: {},
        bacnetConnectionDetails: {},
        modbusConnectionDetails:{},
        scanRate: payload?.scanRate,
        requestTimeOut: payload?.requestTimeOut,
        connectionTimeout: payload?.connectionTimeout,
        attemptsBeforeTimeout:payload?.attemptsBeforeTimeout
    };
   
    if (payload?.opcUaConnectionDetails) {
        requestBody.opcUaConnectionDetails = {
            endpointUrl: payload.opcUaConnectionDetails.endpointUrl,
            secMode: payload.opcUaConnectionDetails.secMode,
            secPolicy: payload.opcUaConnectionDetails.secPolicy,
        };
    } else if (payload?.plcAbConnectionDetails) {
        requestBody.plcAbConnectionDetails = {
            cpuSlot: payload.plcAbConnectionDetails.cpuSlot,
            ipAddress: payload.plcAbConnectionDetails.ipAddress,
            port: payload.plcAbConnectionDetails.port,
        };
    } else if (payload?.plcSiemensConnectionDetails) {
        requestBody.plcSiemensConnectionDetails = {
            ipAddress: payload.plcSiemensConnectionDetails.ipAddress,
            port: payload.plcSiemensConnectionDetails.port,
            cpuSlot: payload.plcSiemensConnectionDetails.cpuSlot,
            cpuRack: payload.plcSiemensConnectionDetails.cpuRack,
            scanTime: payload.plcSiemensConnectionDetails.scanTime,
        };
    } else if (payload?.plcMitsubishiConnectionDetails) {
        requestBody.plcMitsubishiConnectionDetails = {
            ipAddress: payload.plcMitsubishiConnectionDetails.ipAddress,
            port: payload.plcMitsubishiConnectionDetails.port,
            ASCII: payload.plcMitsubishiConnectionDetails.ASCII,
        };
    } else if (payload?.opcDaConnectionSettings) {
        requestBody.opcDaConnectionSettings = {
            ipAddress: payload?.opcDaConnectionSettings?.ipAddress,
            serverPort: payload.opcDaConnectionSettings?.serverPort,
            serverName: payload?.opcDaConnectionSettings?.serverName,
        };
    } else if (payload?.bacnetConnectionDetails) {
        requestBody.bacnetConnectionDetails = {
            subDevicesAddress:
                payload.bacnetConnectionDetails.subDevices[0].address,
            subDevicesId: payload.bacnetConnectionDetails.subDevices[0].id,
            subDevicesName: payload.bacnetConnectionDetails.subDevices[0].name,
            clientIpAddress: payload.bacnetConnectionDetails.clientIpAddress,
            clientPort: payload.bacnetConnectionDetails.clientPort,
            localNetworkInterface:
                payload.bacnetConnectionDetails.localNetworkInterface,
            portNumber: payload.bacnetConnectionDetails.portNumber,
        };
    } else if (payload?.modbusConnectionDetails) {
        requestBody.modbusConnectionDetails = {
            ipAddress: payload?.modbusConnectionDetails?.ipAddress,
            port: payload?.modbusConnectionDetails?.port,
        };
    }

    try {
        const response = Api.put(
            `/device/edit/${params?.deviceId}`,
            requestBody
        );
        return await Promise.resolve(response);
    } catch (error: any) { 
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const deviceStartService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const requestBody = {
        driverId: payload?.deviceId,
    };
    try {
        const response = Api.post(`/device/start`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const deviceStopService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const requestBody = {
        driverId: payload?.deviceId,
    };
    try {
        const response = Api.post(`/device/stop`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const activateDeactivateDevicesService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        isActive: payload?.isActive,
        deviceIdList: payload?.id,
        requestedBy: payload?.requestedBy,
    };
    try {
        const response = await Api.put(`/device/status`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};
export const cloneDevicesService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = await Promise.resolve(
            Api.post(`/device/clone`, payload)
        );
        message.success(response?.data?.message);
        return response;
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};
