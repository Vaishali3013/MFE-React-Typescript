import { Button, Collapse, Input, Switch, Tooltip, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './createopcform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from 'redux/actions/DeviceManagementActions/deviceAction';
import { type CreateOPCDevice } from 'types/interfaces/PropsInterfaces/DeviceManagement/devices.interface';
import { deviceType,communicationInterfaceDevice } from 'types/enums';
import { parseJwt } from 'utils/jwtTokenFunction';
import {
    debounceError,
    handleKeyInput,
    useCharacterLimit,
} from 'utils/commonFunction';
import { maxDeviceNameLength, maxInputLength } from 'utils/constants';
import { useTranslation } from 'react-i18next';

export const genDeviceInformation = (): any => {
    const { t } = useTranslation('translation');
    return (
        <>
            <div className="header">
                <div className="heading">
                    {t('deviceMang.devices.deviceInformation')}
                </div>
                <Tooltip title={t('deviceMang.devices.deviceDetailsToolTip')}>
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
        </>
    );
};

export const genConnectionInformation = (
    selectedCommunicationInterface: string
): any => {
    const { t } = useTranslation('translation');
    return (
        <>
            <div className="header">
                <div className="heading">
                    {t('deviceMang.devices.connectionSettings')}
                </div>
                <Tooltip
                    title={t('deviceMang.devices.connectionSettingConfig')}
                >
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
        </>
    );
};
// commented as not required yet acc. to Product Requirement

// export const genDeviceAuthentication = (): any => {
//     const { t } = useTranslation('translation');
//     return (
//         <>
//             <div className="header">
//                 <div className="heading">
//                     {t('deviceMang.devices.deviceAuthentication')}
//                 </div>
//                 <Tooltip title={t('deviceMang.devices.deviceMechanismDescp')}>
//                     <InfoCircleOutlined />
//                 </Tooltip>
//             </div>
//         </>
//     );
// };

// will use later as not required for now ,therefore commenting the code

// export const genDeviceAuthentication = (): any => {
//     const { t } = useTranslation('translation');
//     return (
//         <>
//             <div className="header">
//                 <div className="heading">
//                     {t('deviceMang.devices.deviceAuthentication')}
//                 </div>
//                 <Tooltip title={t('deviceMang.devices.deviceMechanismDescp')}>
//                     <InfoCircleOutlined />
//                 </Tooltip>
//             </div>
//         </>
//     );
// };

export const CreateOPCForm: any = (
   {selectedCommunicationInterface,blaDetails,setShowDrawer}:any
 
) => {
  
    const { t } = useTranslation('translation');
    const [mandatoryField, setmandatoryField] = useState({
        endPointURL: '',
        ipAddress: '',
        portNo: '',
        serverPort: '',
        serverName: '',
        deviceName:''
    });
    const emptyFormObject: CreateOPCDevice = {
        deviceName: '',
        description: '',
        location: '',
        readOnly: true,
        deviceType: '',
        endPointURL: '',
        securityMode: '',
        securityPolicy: '',
        connectionTimeout: '3',
        opcUserName: '',
        opcPassword: '',
        deviceId: '',
        requestTimeOut: '1000',
        attemptsBeforeTimeout: '3',
        scanRate: '5000',
        portNo: '',
        serverName: '',
        serverPort: '',
        ipAddress: '',
    };

    const userDetails = parseJwt();
    const [createOPCDevice, setOPCDevice] =
        useState<CreateOPCDevice>(emptyFormObject);
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const blaIdDevices = useSelector(
        (state: any) => state.deviceManagement.devices?.selectedBla[0]?.blaId
    );
    const blaId = useSelector(
        (state: any) => state.deviceManagement.blas.blaId
    );

    const selectedBlaBlasTab = useSelector(
        (state: any) =>
            state.deviceManagement.blas.lastCreatedBla?.blaDetails?.data.blaId
    );

    const showMessageError = useCallback(
        debounceError((errorMsg: string) => {
            message.error(errorMsg);
        }, 100),
        []
    );

    const setOPCNumberProperty = (val: any, property: any): void => {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(val)) {
            showMessageError('Please enter a valid number');
        } else if (val.length > 8) {
            return undefined;
        } else {
            setOPCDevice({ ...createOPCDevice, [property]: val });
        }
    };
    const createNewDevice = (selectedCommunicationInterface: any): any => {
        const formObject: CreateOPCDevice = createOPCDevice;
        const payload: any = {};
        const errors: any = {};
        const selectedInterface =
            selectedCommunicationInterface;
        switch (selectedInterface) {
            case communicationInterfaceDevice.OPC :
                payload.deviceTypeId = deviceType.opcUa;
                payload.opcUaConnectionDetails = {
                    endpointUrl: formObject.endPointURL,
                    secMode: formObject.securityMode,
                    secPolicy: formObject.securityPolicy,
                };
                break;
            case communicationInterfaceDevice.OPCDA:
                payload.deviceTypeId = deviceType.opcDa;
                payload.opcDaConnectionSettings = {
                    ipAddress: formObject.ipAddress,
                    serverName: formObject.serverName,
                    serverPort: formObject.serverPort,
                };
                break;
            case communicationInterfaceDevice.BACNET:
                payload.deviceTypeId = deviceType.bacnet;
                payload.bacnetConnectionDetails = {
                    clientIpAddress: formObject.ipAddress,
                    clientPort: formObject.serverPort,

                    localNetworkInterface: '',
                    portNumber: 0,
                    subDevices: [
                        {
                            address: '',
                            id: 0,
                            name: '',
                        },
                    ],
                };
                break;
            case communicationInterfaceDevice.MODBUSTCPDEVICES:
                payload.deviceTypeId = deviceType.modbus;
                payload.modbusConnectionDetails = {
                    ipAddress: formObject.ipAddress,
                    port: formObject.portNo,
                };
                break;
            default:
                payload.deviceTypeId = '';
                break;
        }
        payload.name = formObject.deviceName;
        payload.description = formObject.description;

        payload.blaId =
            selectedBlaBlasTab ||
            blaIdDevices ||
            blaDetails?.blaId ||
            blaId;
        payload.location = formObject.location;
        payload.readOnly = formObject.readOnly;
        // commented as not required yet acc. to Product Requirement

        // payload.deviceAuthentication = {
        //     username: formObject.opcUserName,
        //     password: formObject.opcPassword,
        // };
        payload.scanRate = formObject.scanRate;
        payload.requestTimeOut = formObject.requestTimeOut;
        payload.attemptsBeforeTimeout = formObject.attemptsBeforeTimeout;
        payload.connectionTimeout = formObject.connectionTimeout;
        payload.requestedBy = userDetails.username;
        dispatch(addDevice(payload));
        // Validate Host Name
        if (!formObject.endPointURL) {
            errors.endPointURL = 'EndPointUrl is required';
        }
        // Validate Ip Address
        if (!formObject.ipAddress) {
            errors.ipAddress = 'IP Address is required';
        }
        // Validate Port Number
        if (!formObject.portNo) {
            errors.portNo = 'Port Number is required';
        }

        // Validate Port Number
        if (!formObject.serverPort) {
            errors.serverPort = 'Server Port Number is required';
        }
        // Validate Server name
        if (!formObject.serverName) {
            errors.serverName = 'Server Name Number is required';
        }
          // Validate device name
          if (!formObject.deviceName) {
            errors.deviceName = 'Device Name is required';
        }

        if (Object.keys(errors).length > 0) {
            // Set errors and return if any field is empty
            setmandatoryField(errors);
        }
    };

    const removeForm = (): any => {
        setOPCDevice(emptyFormObject);
        setShowDrawer(false);
        setmandatoryField({
        endPointURL: '',
        ipAddress: '',
        portNo: '',
        serverPort: '',
        serverName: '',
        deviceName:''
        })
    };
    useEffect(() => {
        setmandatoryField({
            endPointURL: '',
            ipAddress: '',
            portNo: '',
            serverPort: '',
            serverName: '',
            deviceName:''
        });
    }, [selectedCommunicationInterface]);
    const { showInputError } = useCharacterLimit();

    return (
        <>
            <div className="opcForm form-container">
                <p className="form-heading fs-14 fw-400">
                    {t('deviceMang.devices.newDeviceOpcServer')}
                </p>

                <Collapse defaultActiveKey={['1', '2', '3']}>
                    <Panel
                        className="opcForm__collapse devices-panel"
                        header={genDeviceInformation()}
                        key="1"
                    >
                        <div className="form-row">
                            <label>{t('commonStr.deviceName')}</label>
                            <span className="error-message">*</span>
                            
                            <Input
                                value={createOPCDevice?.deviceName}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterDeviceName'
                                )}
                                required
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        deviceName: e.target.value,
                                    });
                                    setmandatoryField({
                                        ...mandatoryField,
                                        deviceName: '',
                                    });
                                }}
                                onKeyPress={(e) => {
                                    if (
                                        createOPCDevice?.deviceName?.length ===
                                        maxDeviceNameLength
                                    ) {
                                        showInputError(maxDeviceNameLength);
                                    }
                                    handleKeyInput(
                                        e,
                                        createOPCDevice?.deviceName
                                    );
                                }}
                                maxLength={maxDeviceNameLength}
                            />
                             {mandatoryField.deviceName && (
                                        <span className="error-message">
                                            {mandatoryField.deviceName}
                                        </span>
                                    )}
                            
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.description')}</label>
                            <Input
                                value={createOPCDevice.description}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.placeholderDeviceDesp'
                                )}
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        description: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createOPCDevice?.description?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.location')}</label>
                            <Input
                                value={createOPCDevice?.location}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterDeviceLocation'
                                )}
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        location: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createOPCDevice?.location?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="last-row">
                            <div>{t('deviceMang.devices.readOnly')}</div>
                            <Tooltip
                                className="tooltip"
                                title={t(
                                    'deviceMang.devices.viewNotChangeOrDelete'
                                )}
                            >
                                <InfoCircleOutlined />
                            </Tooltip>
                            <Switch
                                checked={createOPCDevice?.readOnly}
                                className="opc-form-switch"
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        readOnly: e,
                                    });
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel
                        className="devices-panel"
                        header={genConnectionInformation(
                            selectedCommunicationInterface
                        )}
                        key="2"
                    >                       
                        <div className="form-row">                            
                            <label>
                                {selectedCommunicationInterface ===
                                communicationInterfaceDevice.OPC
                                    ? t('deviceMang.devices.endPointUrl')
                                    : t(
                                          'deviceMang.devices.hostNameOrIPAddress'
                                      )}
                                <Tooltip
                                    className="tooltip"
                                    title={t(
                                        'deviceMang.devices.webAddressClient'
                                    )}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </label>
                            <span className="error-message">*</span>
                            {selectedCommunicationInterface ===
                            communicationInterfaceDevice.OPC ? (
                                <>
                                    <Input
                                        value={createOPCDevice.endPointURL}
                                        className="input"
                                        placeholder={t(
                                            'deviceMang.devices.opcEndpoint'
                                        )}
                                        onChange={(e) => {
                                            setOPCDevice({
                                                ...createOPCDevice,
                                                endPointURL: e.target.value,
                                            });
                                            setmandatoryField({
                                                ...mandatoryField,
                                                endPointURL: '',
                                            });
                                        }}
                                        maxLength={maxInputLength}
                                    />

                                    {mandatoryField.endPointURL && (
                                        <span className="error-message">
                                            {mandatoryField.endPointURL}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Input
                                        value={createOPCDevice.ipAddress}
                                        className="input"
                                        placeholder={t(
                                            'deviceMang.devices.ipaAddress'
                                        )}
                                        onChange={(e) => {
                                            setOPCDevice({
                                                ...createOPCDevice,
                                                ipAddress: e.target.value,
                                            });
                                            setmandatoryField({
                                                ...mandatoryField,
                                                ipAddress: '',
                                            });
                                        }}
                                        maxLength={maxInputLength}
                                    />
                                    {mandatoryField.ipAddress && (
                                        <span className="error-message">
                                            {mandatoryField.ipAddress}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        {selectedCommunicationInterface ===
                           communicationInterfaceDevice.OPCDA && (
                            <div className="form-row">
                                <label>
                                    Server Name
                                    <Tooltip
                                        className="tooltip"
                                        title="It is a server name through which clients of a specific service can access it."
                                    >
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                </label>
                                <span className="error-message">*</span>
                                <Input
                                    value={createOPCDevice.serverName}
                                    className="input"
                                    placeholder="Enter Server Name"
                                    onChange={(e) => {
                                        setOPCDevice({
                                            ...createOPCDevice,
                                            serverName: e.target.value,
                                        });
                                        setmandatoryField({
                                            ...mandatoryField,
                                            serverName: '',
                                        });
                                    }}
                                    maxLength={maxInputLength}
                                />
                                {mandatoryField.serverName && (
                                    <span className="error-message">
                                        {mandatoryField.serverName}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="form-row">
                        {selectedCommunicationInterface !== 'OPC' && (
    <>
    <label>
        {selectedCommunicationInterface === 'BACnet' ||
        selectedCommunicationInterface === 'OPC DA'
            ? t('deviceMang.devices.serverPortNo')
            : t('deviceMang.devices.portNo')}
        <Tooltip
            className="tooltip"
            title={t('deviceMang.devices.portOnDeviceRuns')}
        >
            <InfoCircleOutlined />
        </Tooltip>
    </label>
    <span className="error-message">*</span>
    </>
)}
                            
                            {selectedCommunicationInterface ===
                                communicationInterfaceDevice.BACNET ||
                            selectedCommunicationInterface ===
                            communicationInterfaceDevice.OPCDA ? (
                                <>
                                    <Input
                                        value={createOPCDevice.serverPort}
                                        className="input"
                                        placeholder={t(
                                            'deviceMang.devices.enterServerPortNumber'
                                        )}
                                        onChange={(e) => {
                                            setOPCNumberProperty(
                                                e.target.value,
                                                'serverPort'
                                            );
                                            setmandatoryField({
                                                ...mandatoryField,
                                                serverPort: '',
                                            });
                                        }}
                                        maxLength={maxInputLength}
                                    />
                                    {mandatoryField.serverPort && (
                                        <span className="error-message">
                                            {mandatoryField.serverPort}
                                        </span>
                                    )}
                                </>
                            ) : selectedCommunicationInterface !==
                              'OPC' ? (
                                <>
                                    <Input
                                        value={createOPCDevice.portNo}
                                        className="input"
                                        placeholder={t(
                                            'deviceMang.devices.enterPortNumber'
                                        )}
                                        onChange={(e) => {
                                            setOPCNumberProperty(
                                                e.target.value,
                                                'portNo'
                                            );
                                            setmandatoryField({
                                                ...mandatoryField,
                                                portNo: '',
                                            });
                                        }}
                                        maxLength={maxInputLength}
                                    />
                                    {mandatoryField.portNo && (
                                        <span className="error-message">
                                            {mandatoryField.portNo}
                                        </span>
                                    )}
                                </>
                            ) : null}
                        </div>

                        <div className="form-row">
                            <label>
                                {t('deviceMang.devices.scanRate')}
                                <Tooltip
                                    className="tooltip"
                                    title={t(
                                        'deviceMang.devices.scanRateExplanation'
                                    )}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </label>
                            <Input
                                value={createOPCDevice?.scanRate}
                                onChange={(e) => {
                                    setOPCNumberProperty(
                                        e.target.value,
                                        'scanRate'
                                    );
                                }}
                                className="input"
                                placeholder={t('deviceMang.devices.scanRate')}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>
                                {t(
                                    'deviceMang.devices.connectionTimeoutSeconds'
                                )}
                                <Tooltip
                                    className="tooltip"
                                    title={t(
                                        'deviceMang.devices.connectionTimeoutExplanation'
                                    )}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </label>
                            <Input
                                value={createOPCDevice?.connectionTimeout}
                                onChange={(e) => {
                                    setOPCNumberProperty(
                                        e.target.value,
                                        'connectionTimeout'
                                    );
                                }}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterTimeMillisec'
                                )}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>
                                {t('deviceMang.devices.requestTimeoutSeconds')}
                                <Tooltip
                                    className="tooltip"
                                    title={t(
                                        'deviceMang.devices.requestTimeoutExplanation'
                                    )}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </label>
                            <Input
                                value={createOPCDevice.requestTimeOut}
                                onChange={(e) => {
                                    setOPCNumberProperty(
                                        e.target.value,
                                        'requestTimeOut'
                                    );
                                }}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterTimeMillisec'
                                )}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>
                                {t('deviceMang.devices.attemptsBeforeTimeout')}
                                <Tooltip
                                    className="tooltip"
                                    title={t(
                                        'deviceMang.devices.attemptsExplanation'
                                    )}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </label>
                            <Input
                                value={createOPCDevice?.attemptsBeforeTimeout}
                                onChange={(e) => {
                                    setOPCNumberProperty(
                                        e.target.value,
                                        'attemptsBeforeTimeout'
                                    );
                                }}
                                className="number"
                                placeholder={t(
                                    'deviceMang.devices.enterAttempts'
                                )}
                                maxLength={maxInputLength}
                            />
                        </div>
                    </Panel>

                    {/* 
   
                    {/* commented the code as per the requirement it's not needed yet
                    
                     <Panel
                        className="devices-panel"
                        header={genDeviceAuthentication()}
                        key="3"
                    >
                        <div className="form-row">
                            <label>{t('deviceMang.devices.userName')}</label>
                            <Input
                                value={createOPCDevice.opcUserName}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterUserNameConfigure'
                                )}
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        opcUserName: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createOPCDevice?.opcUserName?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.password')}</label>
                            <Input.Password
                                className="inputPassword"
                                placeholder={t('commonStr.password')}
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                value={createOPCDevice.opcPassword}
                                onChange={(e) => {
                                    setOPCDevice({
                                        ...createOPCDevice,
                                        opcPassword: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createOPCDevice?.opcPassword?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                maxLength={maxInputLength}
                            />
                        </div>
                    </Panel> */}
                </Collapse>
                <div className="form-action-btns">
                    <Button
                        className="back-btn"
                        onClick={removeForm}
                        size="middle"
                    >
                        {t('commonStr.cancel')}
                    </Button>
                    <Button
                        onClick={() => {
                            createNewDevice(selectedCommunicationInterface);
                        }}
                        className="next-btn"
                        type="default"
                        size="middle"
                    >
                        {t('deviceMang.devices.createDevice')}
                    </Button>
                </div>
            </div>
        </>
    );
};
