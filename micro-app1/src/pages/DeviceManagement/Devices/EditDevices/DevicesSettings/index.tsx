import { Button, Col, Divider, Drawer, Form, Input, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useEffect, useState } from 'react';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useDispatch } from 'react-redux';
import { editDevice } from 'redux/actions/DeviceManagementActions/deviceAction';
import { mapDeviceDetailsToRequestBody } from '../../editDeviceCommonCode';
import { maxInputLength } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { deviceInterface } from 'types/enums';

const DevicesSettings: React.FC<any> = ({
    open,
    setBlaState,
    deviceDescription,
    deviceDetails,
    setOpenEditDevice,
    onClose,
    showSettings,
    openEditDevicesDrawer,
}) => {
    const details = parseJwt();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [payload, setPayload] = useState({
        scanRate: '',
        requestTimeOut: '',
        connectionTimeout: '3',
        serverPort: '',
        port: '',
        cpuSlotNumber: '',
        cpuRack: '',
        scanTime: '',
        serverName: '',
        attemptsBeforeTimeout:''
    });
    const {
        scanRate,
        requestTimeOut,
        connectionTimeout,
        attemptsBeforeTimeout,
        serverPort,
        port,
        cpuSlotNumber,
        cpuRack,
        scanTime,
        serverName,
    } = payload;

    const [deviceRequestBody, setDeviceRequestBody] = useState<any>({});

    useEffect(() => {
        setDeviceRequestBody(deviceDetails);
    }, [deviceDetails]);
    const detailsHandler = (
        property: string,
        value: string | boolean
    ): void => {
        setPayload({ ...payload, [property]: value });
    };
    const submitDetails = (): void => {
        const requestBody: any =
            mapDeviceDetailsToRequestBody(deviceRequestBody);

        requestBody.deviceId = deviceDetails?.deviceId;
        requestBody.description = deviceDescription;
        requestBody.requestedBy = details?.username;
        requestBody.scanRate = scanRate;
        requestBody.requestTimeOut = requestTimeOut;
        requestBody.serverPort = serverPort;
        requestBody.connectionTimeout = connectionTimeout;
        requestBody.attemptsBeforeTimeout = attemptsBeforeTimeout
        requestBody.port = port;
        requestBody.cpuSlotNumber = cpuSlotNumber;
        requestBody.cpuRack = cpuRack;
        requestBody.scanTime = scanTime;
        requestBody.serverName = serverName;
        dispatch(editDevice(requestBody));
        setOpenEditDevice(false);
        openEditDevicesDrawer();
        showSettings(false);
        onClose();
    };

    const initialValues = {
        scanRate: deviceDetails?.scanRate || '',
        requestTimeOut: deviceDetails?.requestTimeOut || '',
        connectionTimeout: deviceDetails?.connectionTimeout || 3,
        attemptsBeforeTimeout: deviceDetails?.attemptsBeforeTimeOut,
        hostName:
            deviceDetails?.opcUaConnectionDetails?.endpointUrl ||
            deviceDetails?.plcAbConnectionDetails?.ipAddress ||
            deviceDetails?.opcDaConnectionSettings?.ipAddress ||
            deviceDetails?.modbusConnectionDetails?.ipAddress ||
            deviceDetails?.plcSiemensConnectionDetails?.ipAddress ||
            deviceDetails?.plcMitsubishiConnectionDetails?.ipAddress ||
            '',
        port:
            deviceDetails?.plcAbConnectionDetails?.port ||
            deviceDetails?.plcSiemensConnectionDetails?.port ||
            deviceDetails?.modbusConnectionDetails?.port ||
            '',
        cpuSlotNumber: deviceDetails?.plcAbConnectionDetails?.cpuSlot,
        cpuRack: deviceDetails?.plcSiemensConnectionDetails?.cpuRack,
        scanTime: deviceDetails?.plcSiemensConnectionDetails?.scanTime || '',
        serverName: deviceDetails?.opcDaConnectionSettings?.serverName || '',
        serverPort: deviceDetails?.opcDaConnectionSettings?.serverPort || '',
    };

    switch (deviceDetails?.communicationInterface) {
        case deviceInterface.OPC:
            initialValues.hostName =
                deviceDetails?.opcUaConnectionDetails?.endpointUrl || '';
            break;
        case deviceInterface.OPCDA:
            initialValues.hostName =
                deviceDetails?.opcDaConnectionSettings?.ipAddress || '';
            initialValues.serverPort =
                deviceDetails?.opcDaConnectionSettings?.serverPort || '';
            initialValues.serverName =
                deviceDetails?.opcDaConnectionSettings?.serverName || '';
            break;
        case deviceInterface.PLCAB:
            initialValues.hostName =
                deviceDetails?.plcAbConnectionDetails?.ipAddress || '';
            initialValues.port =
                deviceDetails?.plcAbConnectionDetails?.port || '';
            initialValues.cpuSlotNumber =
                deviceDetails?.plcAbConnectionDetails?.cpuSlot;
            break;
        case deviceInterface.PLCSIEMENS:
            initialValues.hostName =
                deviceDetails?.plcSiemensConnectionDetails?.ipAddress || '';
            initialValues.port =
                deviceDetails?.plcSiemensConnectionDetails?.port || '';
            initialValues.cpuSlotNumber =
                deviceDetails?.plcSiemensConnectionDetails?.cpuSlot;
            initialValues.cpuRack =
                deviceDetails?.plcSiemensConnectionDetails?.cpuRack;
            initialValues.scanTime =
                deviceDetails?.plcSiemensConnectionDetails?.scanTime || '';
            break;
        case deviceInterface.MODBUS:
            initialValues.hostName =
                deviceDetails?.modbusConnectionDetails?.ipAddress || '';
            initialValues.port =
                deviceDetails?.modbusConnectionDetails?.port || '';
            break;
        case deviceInterface.PLCMITSUBISHI:
            initialValues.hostName =
                deviceDetails?.plcMitsubishiConnectionDetails?.ipAddress || '';
            initialValues.port =
                deviceDetails?.plcMitsubishiConnectionDetails?.port || '';

            // Add other modbus specific fields as needed
            break;
        default:
            // Handle unsupported or unknown connection types
            break;
    }

    const { t } = useTranslation('translation');

    const isFieldNameValid = (fieldName: any): any => {
        return Object.prototype.hasOwnProperty.call(
            form.getFieldsValue(),
            fieldName
        )
            ? form.getFieldValue(fieldName)
            : true;
    };
    /**  Function for checking mandatory input field */
    const isFormValid = (): any => {
        const { hostName } = form.getFieldsValue();
        return (
            hostName &&
            isFieldNameValid('cpuSlotNumber') &&
            isFieldNameValid('serverName') &&
            isFieldNameValid('serverPort') &&
            (deviceDetails?.communicationInterface === deviceInterface.MODBUS
                ? form.getFieldValue('port')
                : true) &&
            isFieldNameValid('cpuRack')
        );
    };

    return (
        <>
            <Drawer
                key={open}
                className="editBlaDrawer"
                placement="right"
                getContainer={false}
                size="large"
                closable={false}
                open={open}
            >
                <>
                    <div>
                        <Row>
                            <Col span={2}>
                                <Button
                                    type="text"
                                    onClick={() => showSettings(false)}
                                    icon={<BackIcon />}
                                ></Button>
                            </Col>
                            <Col span={18}>
                                <span className="drawer-title">
                                    {t('commonStr.settings')}
                                </span>
                            </Col>
                            <Col span={4}>
                                <Button
                                    type="text"
                                    onClick={() => setBlaState(false)}
                                    icon={<CloseOutlined />}
                                ></Button>
                            </Col>
                        </Row>

                        <Divider />
                        <Row>
                            <Col span={8}>{t('commonStr.deviceName')}</Col>
                            <Col span={8}>
                                {t('deviceMang.devices.deviceType')}
                            </Col>
                            <Col span={8}>
                                {t('deviceMang.devices.plcModel')}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="device__details">
                                {deviceDetails?.deviceName}
                            </Col>
                            <Col span={8} className="device__details">
                                {deviceDetails?.communicationInterface}
                            </Col>
                            <Col span={8} className="device__details">
                                {deviceDetails?.plcModel}
                            </Col>
                        </Row>
                        <Divider />
                        <Form
                            form={form}
                            layout="vertical"
                            className={'editDeviceWrapper__deviceEditList'}
                            onFinish={submitDetails}
                            initialValues={initialValues}
                        >
                            <div className="editDeviceWrapper__FieldSpace">
                                {/* NOT REQUIRED ACC. TO REQUIREMENT HENCE COMMENTING}
                                {/* <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t(
                                                'deviceMang.devices.parentLabel'
                                            )}
                                            name="parentLabel"
                                        >
                                            <Select placeholder="Select" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t(
                                                'deviceMang.devices.filterTag'
                                            )}
                                            name="filterTags"
                                        >
                                            <Select placeholder="Select" />
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t(
                                                'deviceMang.devices.connectionTimeout'
                                            )}
                                            name="connectionTimeout"
                                        >
                                            <Input
                                                className="input-field"
                                                value={connectionTimeout}
                                                onChange={(e) => {
                                                    detailsHandler(
                                                        'connectionTimeout',
                                                        e.target.value
                                                    );
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t(
                                                'deviceMang.devices.requestTimeout'
                                            )}
                                            name="requestTimeOut"
                                        >
                                            <Input
                                                className="input-field"
                                                value={requestTimeOut}
                                                onChange={(e) => {
                                                    detailsHandler(
                                                        'requestTimeOut',
                                                        e.target.value
                                                    );
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t(
                                                'deviceMang.devices.scanRate'
                                            )}
                                            name="scanRate"
                                        >
                                            <Input
                                                className="input-field"
                                                value={scanRate}
                                                onChange={(e) => {
                                                    detailsHandler(
                                                        'scanRate',
                                                        e.target.value
                                                    );
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item
                                            label={t(
                                                'deviceMang.devices.attemptsBeforeTimeout'
                                            )}
                                            name="attemptsBeforeTimeout"
                                        >
                                            <Input
                                                className="input-field"
                                                value={attemptsBeforeTimeout}
                                                onChange={(e) => {
                                                    detailsHandler(
                                                        'attemptsBeforeTimeout',
                                                        e.target.value
                                                    );
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        </Form.Item>
                                       
                                    </Col>
                                </Row>
                                <Row gutter={12}>
                                    {deviceDetails?.communicationInterface ===
                                        deviceInterface.OPC ||
                                    deviceDetails?.communicationInterface ===
                                        deviceInterface.MODBUS ||
                                    deviceDetails?.communicationInterface ===
                                        deviceInterface.OPCDA ||
                                    deviceDetails?.communicationInterface ===
                                        deviceInterface.PLCMITSUBISHI ? null : (
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'deviceMang.devices.cpuSlot'
                                                )}
                                                name="cpuSlotNumber"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'CPU Slot is required',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    maxLength={maxInputLength}
                                                    className="input-field"
                                                    onChange={(e) => {
                                                        if (
                                                            deviceRequestBody?.plcSiemensConnectionDetails
                                                        ) {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcSiemensConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcSiemensConnectionDetails,
                                                                            cpuSlot:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        },
                                                                }
                                                            );
                                                        }
                                                        setDeviceRequestBody({
                                                            ...deviceRequestBody,
                                                            plcAbConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.plcAbConnectionDetails,
                                                                    cpuSlot:
                                                                        e.target
                                                                            .value,
                                                                },
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    {deviceDetails?.communicationInterface ===
                                        deviceInterface.PLCSIEMENS && (
                                        <>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={t(
                                                        'deviceMang.devices.cpuRackNo'
                                                    )}
                                                    name="cpuRack"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'CPU Rack is required',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        maxLength={
                                                            maxInputLength
                                                        }
                                                        className="input-field"
                                                        onChange={(e) => {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcSiemensConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcSiemensConnectionDetails,
                                                                            cpuRack:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        },
                                                                }
                                                            );
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            {/* <Col span={12}>
                                                <Form.Item
                                                    label={t(
                                                        'deviceMang.devices.scanTime'
                                                    )}
                                                    name="scanTime"
                                                >
                                                    <Input
                                                        maxLength={
                                                            maxInputLength
                                                        }
                                                        className="input-field"
                                                        onChange={(e) => {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcSiemensConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcSiemensConnectionDetails,
                                                                            scanTime:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        },
                                                                }
                                                            );
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col> */}
                                        </>
                                    )}

                                    {deviceDetails?.communicationInterface ===
                                        deviceInterface.OPC ||
                                    deviceDetails?.communicationInterface ===
                                        deviceInterface.OPCDA ||
                                    deviceDetails?.communicationInterface ===
                                        deviceInterface.PLCMITSUBISHI ? null : (
                                        <Col span={12}>
                                            <Form.Item
                                                label="Port"
                                                name="port"
                                                rules={
                                                    deviceDetails?.communicationInterface ===
                                                    deviceInterface.MODBUS
                                                        ? [
                                                              {
                                                                  required:
                                                                      true,
                                                                  message:
                                                                      'Port is required',
                                                              },
                                                          ]
                                                        : []
                                                }
                                            >
                                                <Input
                                                    maxLength={maxInputLength}
                                                    className="input-field"
                                                    onChange={(e) => {
                                                        if (
                                                            deviceRequestBody?.modbusConnectionDetails
                                                        ) {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    modbusConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.modbusConnectionDetails,
                                                                            port: e
                                                                                .target
                                                                                .value,
                                                                        },
                                                                }
                                                            );
                                                        }
                                                        if (
                                                            deviceRequestBody?.plcAbConnectionDetails
                                                        )
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcAbConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcAbConnectionDetails,
                                                                            port: e
                                                                                .target
                                                                                .value,
                                                                        },
                                                                }
                                                            );
                                                        if (
                                                            deviceRequestBody?.plcSiemensConnectionDetails
                                                        ) {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcSiemensConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcSiemensConnectionDetails,
                                                                            port: e
                                                                                .target
                                                                                .value,
                                                                        },
                                                                }
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    {deviceDetails?.communicationInterface ===
                                        deviceInterface.PLCMITSUBISHI && (
                                        <Col span={12}>
                                            <Form.Item
                                                label="Server Port"
                                                name="port"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Server Port is required',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    maxLength={maxInputLength}
                                                    className="input-field"
                                                    onChange={(e) => {
                                                        if (
                                                            deviceRequestBody?.plcMitsubishiConnectionDetails
                                                        ) {
                                                            setDeviceRequestBody(
                                                                {
                                                                    ...deviceRequestBody,
                                                                    plcMitsubishiConnectionDetails:
                                                                        {
                                                                            ...deviceRequestBody?.plcMitsubishiConnectionDetails,
                                                                            port: e
                                                                                .target
                                                                                .value,
                                                                        },
                                                                }
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    {deviceDetails?.communicationInterface ===
                                        deviceInterface.OPCDA && (
                                        <>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Server Name"
                                                    name="serverName"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Server Name is required',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        maxLength={
                                                            maxInputLength
                                                        }
                                                        className="input-field"
                                                        onChange={(e) => {
                                                            if (
                                                                deviceRequestBody?.opcDaConnectionSettings
                                                            ) {
                                                                setDeviceRequestBody(
                                                                    {
                                                                        ...deviceRequestBody,
                                                                        opcDaConnectionSettings:
                                                                            {
                                                                                ...deviceRequestBody?.opcDaConnectionSettings,
                                                                                serverName:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col span={12}>
                                                <Form.Item
                                                    label="Server Port"
                                                    name="serverPort"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Server Port is required',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        maxLength={
                                                            maxInputLength
                                                        }
                                                        className="input-field"
                                                        onChange={(e) => {
                                                            if (
                                                                deviceRequestBody?.opcDaConnectionSettings
                                                            ) {
                                                                setDeviceRequestBody(
                                                                    {
                                                                        ...deviceRequestBody,
                                                                        opcDaConnectionSettings:
                                                                            {
                                                                                ...deviceRequestBody?.opcDaConnectionSettings,
                                                                                serverPort:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )}
                                    <Col span={12}>


                                    <Form.Item
                                        
                                            label={
                                                deviceDetails?.communicationInterface ===
                                                deviceInterface.OPC
                                                    ? t(
                                                          'deviceMang.devices.endPointUrl'
                                                      )
                                                    : t(
                                                          'deviceMang.devices.hostNameOrIPAddress'
                                                      )
                                            }
                                            name="hostName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Endpoint URL is required',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="input-field"
                                                maxLength={maxInputLength}
                                                onChange={(e) => {
                                                    if (
                                                        deviceRequestBody?.opcUaConnectionDetails
                                                    ) {
                                                        setDeviceRequestBody({
                                                            ...deviceRequestBody,
                                                            opcUaConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.opcUaConnectionDetails,
                                                                    endpointUrl:
                                                                        e.target
                                                                            .value,
                                                                },
                                                        });
                                                    }

                                                    if (
                                                        deviceRequestBody?.modbusConnectionDetails ||
                                                        deviceRequestBody?.opcDaConnectionSettings ||
                                                        deviceRequestBody?.plcSiemensConnectionDetails ||
                                                        deviceRequestBody?.plcMitsubishiConnectionDetails ||
                                                        deviceRequestBody?.plcAbConnectionDetails
                                                    ) {
                                                        setDeviceRequestBody({
                                                            ...deviceRequestBody,
                                                            modbusConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.modbusConnectionDetails,
                                                                    ipAddress:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            opcDaConnectionSettings:
                                                                {
                                                                    ...deviceRequestBody?.opcDaConnectionSettings,
                                                                    ipAddress:
                                                                        e.target
                                                                            .value,
                                                                },

                                                            plcAbConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.plcAbConnectionDetails,
                                                                    ipAddress:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            plcMitsubishiConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.plcMitsubishiConnectionDetails,
                                                                    ipAddress:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            plcSiemensConnectionDetails:
                                                                {
                                                                    ...deviceRequestBody?.plcSiemensConnectionDetails,
                                                                    ipAddress:
                                                                        e.target
                                                                            .value,
                                                                },
                                                        });
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                     
                                </Row>
                            </div>

                            <div className="button">
                                <Divider />
                                <Row className="footerButtons">
                                    <Col
                                        span={4}
                                        className="deviceSettingDrawer__cancelButton"
                                    >
                                        <CustomButton
                                            type={'Cancel'}
                                            disabled={false}
                                            handleClick={() => {
                                                setOpenEditDevice(false);
                                                openEditDevicesDrawer();
                                                showSettings(false);
                                                onClose();
                                            }}
                                        />
                                    </Col>
                                    <Col
                                        span={4}
                                        className="deviceSettingDrawer__saveButton"
                                    >
                                        <CustomButton
                                            type={'Save'}
                                            disabled={!isFormValid()}
                                            typeOfButton={'submit'}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </>
            </Drawer>
        </>
    );
};

export default DevicesSettings;
