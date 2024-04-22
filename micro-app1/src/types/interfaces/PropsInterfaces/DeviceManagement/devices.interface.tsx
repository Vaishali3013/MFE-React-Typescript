export interface CreatePLCDevice {
    plcModel: string;
    plcOEM:string;
    deviceName: string;
    description: string;
    location: string;
    readOnly: boolean;
    deviceType: string;
    hostName: string;
    port: string;
    cpuRack: number | string;
    serverPort:string;
    rackNumber?: string;
    cpuSlotNumber: string;
    scanRate: string;
    connectionTimeout: string;
    requestTimeOut: string;
    userName: string;
    password: string;
    parentLevel: string[];
    filterTags: string[];
    deviceId: string;
    attemptsBeforeTimeout: string;
    ASCII: boolean;
    scanTime:number | string;
    ipAddress:string;

}

export interface CreateOPCDevice {
    deviceName: string;
    description: string;
    location: string;
    readOnly: boolean;
    deviceType: string;
    endPointURL: string;
    securityMode: string;
    securityPolicy: string;
    connectionTimeout: string;
    requestTimeOut: string;
    opcUserName: string;
    opcPassword: string;
    deviceId: string;
    scanRate: string;
    attemptsBeforeTimeout: string;
    portNo: string;
    serverPort:string;
    serverName:string;
    ipAddress:string;
}
