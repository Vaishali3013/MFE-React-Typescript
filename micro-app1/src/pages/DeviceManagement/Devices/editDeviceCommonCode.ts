export const mapDeviceDetailsToRequestBody = (deviceDetails: any): any => {
    const requestBody: any = {};

    switch (deviceDetails?.communicationInterfaceId) {
        case 1: // Communication Interface = OpcUa
            requestBody.opcUaConnectionDetails = {
                endpointUrl: deviceDetails?.opcUaConnectionDetails?.endpointUrl,
                secMode: deviceDetails?.opcUaConnectionDetails?.secMode,
                secPolicy: deviceDetails?.opcUaConnectionDetails?.secPolicy,
            };
            break;

        case 2: // Communication Interface = PlcAb
            requestBody.plcAbConnectionDetails = {
                cpuSlot: deviceDetails?.plcAbConnectionDetails?.cpuSlot,
                ipAddress: deviceDetails?.plcAbConnectionDetails?.ipAddress,
                port: deviceDetails?.plcAbConnectionDetails?.port,
            };
            break;

        case 3: // Communication Interface = PlcSiemens
            requestBody.plcSiemensConnectionDetails = {
                ipAddress:
                    deviceDetails?.plcSiemensConnectionDetails?.ipAddress,
                port: deviceDetails?.plcSiemensConnectionDetails?.port,
                cpuSlot: deviceDetails?.plcSiemensConnectionDetails?.cpuSlot,
                cpuRack: deviceDetails?.plcSiemensConnectionDetails?.cpuRack,
                scanTime: deviceDetails?.plcSiemensConnectionDetails?.scanTime,
            };
            break;

        case 5: // Communication Interface = PlcMitsubishi
            requestBody.plcMitsubishiConnectionDetails = {
                ipAddress:
                    deviceDetails?.plcMitsubishiConnectionDetails?.ipAddress,
                port: deviceDetails?.plcMitsubishiConnectionDetails?.port,
                ASCII: deviceDetails?.plcMitsubishiConnectionDetails?.ASCII,
            };
            break;

        case 6: // Communication Interface = OpcDa
            requestBody.opcDaConnectionSettings = {
                ipAddress: deviceDetails?.opcDaConnectionSettings?.ipAddress,
                serverPort: deviceDetails.opcDaConnectionSettings?.serverPort,
                serverName: deviceDetails?.opcDaConnectionSettings?.serverName,
            };
            break;

        case 7: // Communication Interface = Bacnet
            requestBody.bacnetConnectionDetails = {
                subDevices: [
                    {
                        address:
                            deviceDetails?.bacnetConnectionDetails?.subDevices
                                ?.address,
                        id: deviceDetails?.bacnetConnectionDetails?.subDevices
                            ?.id,
                        name: deviceDetails?.bacnetConnectionDetails?.subDevices
                            ?.name,
                    },
                ],
                clientIpAddress:
                    deviceDetails?.bacnetConnectionDetails?.clientIpAddress,
                clientPort: deviceDetails?.bacnetConnectionDetails?.clientPort,
                localNetworkInterface:
                    deviceDetails?.bacnetConnectionDetails
                        ?.localNetworkInterface,
                portNumber: deviceDetails?.bacnetConnectionDetails?.portNumber,
            };
            break;

        case 9: // Communication Interface = Modbus
            requestBody.modbusConnectionDetails = {
                ipAddress: deviceDetails?.modbusConnectionDetails?.ipAddress,
                port: deviceDetails?.modbusConnectionDetails?.port,
            };
            break;

        default:
            break;
    }
    return requestBody;
};
