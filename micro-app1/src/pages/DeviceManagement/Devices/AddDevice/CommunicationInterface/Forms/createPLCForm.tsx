import { Button, Collapse, Input, message, Switch, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './createopcform.scss';
import { addDevice } from 'redux/actions/DeviceManagementActions/deviceAction';
import { useDispatch, useSelector } from 'react-redux';
import { type CreatePLCDevice } from 'types/interfaces/PropsInterfaces/DeviceManagement/devices.interface';
import { communicationInterfaceDevice, deviceType } from 'types/enums';
import {
    debounceError,
    handleKeyInput,
    useCharacterLimit,
} from 'utils/commonFunction';
import { maxDeviceNameLength, maxInputLength } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import CustomDropDown from 'components/common/CustomDropDown';

export const CreatePLCForm: any = (props: any) => {
    const dispatch = useDispatch();
    const [selectedPLCOEM, setSelectedPLCOEM] = useState('');
    const [mandatoryField, setmandatoryField] = useState({
        ipAddress: '',
        cpuSlotNumber: '',
        cpuRack: '',
        serverPort: '',
        deviceName:''
    });
    const [selectedPLCModal, setSelectedPLCModal] = useState('');
    const { t } = useTranslation('translation');
    const emptyForm: CreatePLCDevice = {
        plcModel: '',
        plcOEM: '',
        deviceName: '',
        description: '',
        location: '',
        readOnly: true,
        deviceType: '',
        hostName: '',
        port: '102',
        serverPort: '',
        cpuSlotNumber: '',
        connectionTimeout: '3',
        userName: '',
        password: '',
        parentLevel: [],
        filterTags: [],
        scanRate: '5000',
        requestTimeOut: '1000',
        deviceId: '',
        attemptsBeforeTimeout: '3',
        cpuRack: '',
        scanTime: '',
        ASCII: false,
        ipAddress: '',
    };

    const [createPLCDevice, setPLCDevice] =
        useState<CreatePLCDevice>(emptyForm);
    const { Panel } = Collapse;

    const removeForm = (): any => {
        setPLCDevice(emptyForm);
        props?.setShowDrawer(false);
        setmandatoryField({
            ipAddress: '',
            cpuSlotNumber: '',
            cpuRack: '',
            serverPort: '',
            deviceName:''
            })
    };
    useEffect(() => {
        setmandatoryField({
            ipAddress: '',
            cpuSlotNumber: '',
            cpuRack: '',
            serverPort: '',
            deviceName:''
        });
    }, [selectedPLCModal,selectedPLCOEM]);
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
    //  PLC OEM Data
    const PLCData = [
        { value: 'Allen bradley', label: 'Allen bradley' },
        { value: 'Siemens', label: 'Siemens' },
        { value: 'Mitsubishi', label: 'Mitsubishi' },
    ];

    const handleSelect = (value: string): any => {
        setSelectedPLCOEM(value);
        setSelectedPLCModal(value);
    };
    //  plc modal data
    const PLCModalData = [
        { value: 'Allen bradley', label: 'Allen bradley' },
        { value: 'Siemens', label: 'Siemens' },
        { value: 'Mitsubishi', label: 'Mitsubishi' },
    ];
    const handleSelectPlcModal = (value: string): any => {
        setSelectedPLCOEM(value);
        setSelectedPLCModal(value);
    };
    const createNewPLCDevice = (): void => {
        const formObject: CreatePLCDevice = createPLCDevice;
        const payload: any = {};
        const errors: any = {};
        // Note: 'All to be integrated' values are to be given
        payload.plcOem = selectedPLCOEM;
        payload.plcModel = selectedPLCModal;
        payload.name = formObject.deviceName;
        payload.description = formObject.description;
        payload.blaId =
            selectedBlaBlasTab ||
            blaIdDevices ||
            props?.blaDetails?.blaId ||
            blaId;
        payload.location = formObject.location;
        payload.readOnly = formObject.readOnly;

        // Set device type based on PLC OEM and model
        if (
            selectedPLCOEM === communicationInterfaceDevice.ALLENBRADLEY &&
            selectedPLCModal === communicationInterfaceDevice.ALLENBRADLEY
        ) {
            payload.deviceTypeId = deviceType.plcAb;
            payload.plcAbConnectionDetails = {
                ipAddress: formObject.ipAddress,
                port: formObject.port,
                cpuSlot: formObject.cpuSlotNumber,
            };
        } else if (
            selectedPLCOEM === communicationInterfaceDevice.SIEMENS &&
            selectedPLCModal === communicationInterfaceDevice.SIEMENS
        ) {
            payload.deviceTypeId = deviceType.plcSiemens;
            payload.plcSiemensConnectionDetails = {
                ipAddress: formObject.ipAddress,
                port: formObject.port,
                cpuRack: formObject.cpuRack,
                scanTime: formObject.scanTime,
                cpuSlot: formObject.cpuSlotNumber,
            };
        } else {
            payload.deviceTypeId = deviceType.plcMitsubishi;
            payload.plcMitsubishiConnectionDetails = {
                ipAddress: formObject.ipAddress,
                port: formObject.serverPort,
                ASCII: formObject.ASCII,
            };
        }
        // Commenting as not required for now might be used later

        // payload.deviceAuthentication = {
        //     username: formObject.userName,
        //     password: formObject.password,
        // };
        // payload.cpuSlot = formObject.cpuSlotNumber,
        payload.scanRate = formObject.scanRate;
        payload.requestTimeOut = formObject.requestTimeOut;
        payload.attemptsBeforeTimeout = formObject.attemptsBeforeTimeout;
        payload.requestedBy = 'To be integrated';
        dispatch(addDevice(payload));
        // Validate Host Name
        if (!formObject.ipAddress) {
            errors.ipAddress = 'Ip Address is required';
        }

        // Validate CPU Slot Number
        if (!formObject.cpuSlotNumber) {
            errors.cpuSlotNumber = 'CPU Slot Number is required';
        }
        // Validate CPU Rack Number
        if (!formObject.cpuRack) {
            errors.cpuRack = 'CPU rackNumber is required';
        }
        // Validate Server port Number
        if (!formObject.serverPort) {
            errors.serverPort = 'Server  Port is required';
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

    const showMessageError = useCallback(
        debounceError((errorMsg: string) => {
            message.error(errorMsg);
        }, 100),
        []
    );

    const setPLCNumberProperty = (val: any, property: any): void => {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(val)) {
            showMessageError('Please enter a valid number');
        } else if (val.length > 8) {
            return undefined;
        } else {
            setPLCDevice({ ...createPLCDevice, [property]: val });
        }
    };
    const { showInputError } = useCharacterLimit();

    
    return (
        <>
            <div className="form-container">
                <p className="form-heading">
                    {t('deviceMang.devices.newdeviceController')}
                </p>
                <div className="plc-dropdown">
                    <div className="title">
                        <label className="label">
                            {t('deviceMang.devices.plcOem')}
                        </label>
                        <Tooltip
                            className="tooltip"
                            title={t('deviceMang.devices.selectThePlc')}
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    </div>
                    <CustomDropDown
                        optionsData={PLCData}
                        placeholder={t(
                            'deviceMang.devices.selectPlcOemPlaceholder'
                        )}
                        selcetHandler={handleSelect}
                        value={selectedPLCOEM}
                    />
                </div>
                <div className="plc-dropdown-modal">
                    <div className="title">
                        <label className="label">
                            {t('deviceMang.devices.plcModel')}
                        </label>
                        <Tooltip
                            className="tooltip"
                            title={t('deviceMang.devices.selectThePlc')}
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    </div>

                    <CustomDropDown
                        optionsData={PLCModalData}
                        placeholder={t(
                            'deviceMang.devices.selectPlcdeviceModel'
                        )}
                        selcetHandler={handleSelectPlcModal}
                        value={selectedPLCModal}
                    />
                </div>
                <Collapse defaultActiveKey={['1', '2', '3']}>
                    <Panel header={'Device Information'} key="1">
                        <div className="form-row">
                            <label>{t('commonStr.deviceName')}</label>
                            <span className="error-message">*</span>
                            <Input
                                value={createPLCDevice?.deviceName}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        deviceName: e.target.value,
                                    });
                                    setmandatoryField({
                                        ...mandatoryField,
                                        deviceName: '',
                                    });
                                }}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterDeviceName'
                                )}
                                onKeyPress={(e) => {
                                    if (
                                        createPLCDevice?.deviceName?.length ===
                                        maxDeviceNameLength
                                    ) {
                                        showInputError(maxDeviceNameLength);
                                    }
                                    handleKeyInput(
                                        e,
                                        createPLCDevice?.deviceName
                                    );
                                }}
                                maxLength={maxDeviceNameLength}
                            />
                             {mandatoryField?.deviceName && (
                                        <span className="error-message">
                                            {mandatoryField?.deviceName}
                                        </span>
                                    )}
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.description')}</label>
                            <Input
                                value={createPLCDevice.description}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        description: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createPLCDevice?.description?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.placeholderDeviceDesp'
                                )}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.location')}</label>
                            <Input
                                value={createPLCDevice.location}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        location: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createPLCDevice?.location?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                className="input"
                                placeholder={t(
                                    'deviceMang.devices.enterDeviceLocation'
                                )}
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
                                checked={createPLCDevice.readOnly}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        readOnly: e,
                                    });
                                }}
                                className="opc-form-switch"
                            />
                        </div>
                    </Panel>
                    {selectedPLCOEM && selectedPLCModal && (
                        <Panel header={'Connection Settings'} key="2">
                            <div className="form-row">
                                <label>
                                    {t(
                                        'deviceMang.devices.hostNameOrIPAddress'
                                    )}
                                    <Tooltip
                                        className="tooltip"
                                        title={t(
                                            'deviceMang.devices.enterHostOrIPAddress'
                                        )}
                                    >
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                </label>
                                <span className="error-message">*</span>

                                <Input
                                    value={createPLCDevice.ipAddress}
                                    onChange={(e) => {
                                        setPLCDevice({
                                            ...createPLCDevice,
                                            ipAddress: e.target.value,
                                        });

                                        setmandatoryField({
                                            ...mandatoryField,
                                            ipAddress: '',
                                        });
                                    }}
                                    className="input"
                                    placeholder={t(
                                        'deviceMang.devices.enterControllerHostOrIPAddress'
                                    )}
                                />
                                {mandatoryField?.ipAddress && (
                                    <span className="error-message">
                                        {mandatoryField?.ipAddress}
                                    </span>
                                )}
                            </div>
                            {(selectedPLCOEM &&
                                selectedPLCModal === communicationInterfaceDevice.ALLENBRADLEY) ||
                            (selectedPLCOEM &&
                                selectedPLCModal === communicationInterfaceDevice.SIEMENS) ? (
                                <>
                                    <div className="form-row">
                                        <label>
                                            {t('deviceMang.devices.portNo')}
                                            <Tooltip
                                                className="tooltip"
                                                title={t(
                                                    'deviceMang.devices.specifyPortNo'
                                                )}
                                            >
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </label>
                                        <Input
                                            value={createPLCDevice.port}
                                            onChange={(e) => {
                                                setPLCNumberProperty(
                                                    e.target.value,
                                                    'port'
                                                );
                                            }}
                                            className="input"
                                            placeholder={t(
                                                'deviceMang.devices.enterPortID'
                                            )}
                                            maxLength={maxInputLength}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label>
                                            {t('deviceMang.devices.cpuSlotNo')}
                                            <Tooltip
                                                className="tooltip"
                                                title={t(
                                                    'deviceMang.devices.enterCpuSlotNoDescp'
                                                )}
                                            >
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </label>
                                        <span className="error-message">*</span>
                                        <Input
                                            value={
                                                createPLCDevice.cpuSlotNumber
                                            }
                                            onChange={(e) => {
                                                setPLCNumberProperty(
                                                    e.target.value,
                                                    'cpuSlotNumber'
                                                );
                                                setmandatoryField({
                                                    ...mandatoryField,
                                                    cpuSlotNumber: '',
                                                });
                                            }}
                                            className="input"
                                            placeholder={t(
                                                'deviceMang.devices.enterCpuSlotNoPlaceholder'
                                            )}
                                            maxLength={maxInputLength}
                                        />
                                        {mandatoryField?.cpuSlotNumber && (
                                            <span className="error-message">
                                                {mandatoryField?.cpuSlotNumber}
                                            </span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="form-row">
                                    <label>
                                        {t('deviceMang.devices.serverPortNo')}
                                        <Tooltip
                                            className="tooltip"
                                            title={t(
                                                'deviceMang.devices.specifyPortNo'
                                            )}
                                        >
                                            <InfoCircleOutlined />
                                        </Tooltip>
                                    </label>
                                    <span className="error-message">*</span>
                                    <Input
                                        value={createPLCDevice.serverPort}
                                        onChange={(e) => {
                                            setPLCNumberProperty(
                                                e.target.value,
                                                'serverPort'
                                            );
                                            setmandatoryField({
                                                ...mandatoryField,
                                                serverPort: '',
                                            });
                                        }}
                                        className="input"
                                        placeholder={t(
                                            'deviceMang.devices.enterPortID'
                                        )}
                                        maxLength={maxInputLength}
                                    />
                                    {mandatoryField?.serverPort && (
                                        <span className="error-message">
                                            {mandatoryField?.serverPort}
                                        </span>
                                    )}
                                </div>
                            )}

                            {selectedPLCOEM &&
                                selectedPLCModal === communicationInterfaceDevice.SIEMENS && (
                                    <>
                                        <div className="form-row">
                                            <label>
                                                {t(
                                                    'deviceMang.devices.cpuRackNo'
                                                )}
                                                <Tooltip
                                                    className="tooltip"
                                                    title={t(
                                                        'deviceMang.devices.enterCpuRackNoDescp'
                                                    )}
                                                >
                                                    <InfoCircleOutlined />
                                                </Tooltip>
                                            </label>
                                            <span className="error-message">
                                                *
                                            </span>
                                            <Input
                                                value={createPLCDevice.cpuRack}
                                                onChange={(e) => {
                                                    setPLCNumberProperty(
                                                        e.target.value,
                                                        'cpuRack'
                                                    );
                                                    setmandatoryField({
                                                        ...mandatoryField,
                                                        cpuRack: '',
                                                    });
                                                }}
                                                className="input"
                                                placeholder={t(
                                                    'deviceMang.devices.enterCpuRackNoPlaceholder'
                                                )}
                                                maxLength={maxInputLength}
                                            />
                                            {mandatoryField?.cpuRack && (
                                                <span className="error-message">
                                                    {mandatoryField?.cpuRack}
                                                </span>
                                            )}
                                        </div>
                                        {/* NOT REQ FOR NOW HENCE COMMENTING */}
                                        
                                        {/* <div className="form-row">
                                            <label>
                                                {t(
                                                    'deviceMang.devices.scanTime'
                                                )}
                                                <Tooltip
                                                    className="tooltip"
                                                    title={t(
                                                        'deviceMang.devices.scanTimeExplanation'
                                                    )}
                                                >
                                                    <InfoCircleOutlined />
                                                </Tooltip>
                                            </label>
                                            <Input
                                                value={createPLCDevice.scanTime}
                                                onChange={(e) => {
                                                    setPLCNumberProperty(
                                                        e.target.value,
                                                        'scanTime'
                                                    );
                                                }}
                                                className="input"
                                                placeholder={t(
                                                    'deviceMang.devices.enterScanRate'
                                                )}
                                                maxLength={maxInputLength}
                                            />
                                        </div> */}
                                    </>
                                )}

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
                                    value={createPLCDevice.scanRate}
                                    onChange={(e) => {
                                        setPLCNumberProperty(
                                            e.target.value,
                                            'scanRate'
                                        );
                                    }}
                                    className="input"
                                    placeholder={t(
                                        'deviceMang.devices.enterScanRate'
                                    )}
                                    maxLength={maxInputLength}
                                />
                            </div>
                            {selectedPLCOEM &&
                                selectedPLCModal === communicationInterfaceDevice.MITSUBISHI && (
                                    <div className="last-row-mb-20">
                                        <label>
                                            {t('deviceMang.devices.ascii')}
                                            <Tooltip
                                                className="tooltip"
                                                title={t(
                                                    'deviceMang.devices.asciiExplanantion'
                                                )}
                                            >
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </label>
                                        <Switch
                                            checked={createPLCDevice.ASCII}
                                            onChange={(e) => {
                                                setPLCDevice({
                                                    ...createPLCDevice,
                                                    ASCII: e,
                                                });
                                            }}
                                            className="opc-form-switch"
                                        />
                                    </div>
                                )}

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
                                    value={createPLCDevice.connectionTimeout}
                                    onChange={(e) => {
                                        setPLCNumberProperty(
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
                                    {t(
                                        'deviceMang.devices.requestTimeoutSeconds'
                                    )}
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
                                    value={createPLCDevice.requestTimeOut}
                                    onChange={(e) => {
                                        setPLCNumberProperty(
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
                                    {t(
                                        'deviceMang.devices.attemptsBeforeTimeout'
                                    )}
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
                                    value={
                                        createPLCDevice.attemptsBeforeTimeout
                                    }
                                    onChange={(e) => {
                                        setPLCNumberProperty(
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
                    )}
                    {/*    commented the code as device authentication is not required for now as per the requirement
                    <Panel header={'Device Authentication'} key="3">
                        <div className="form-row">
                            <label>{t('deviceMang.devices.userName')}</label>
                            <Input
                                value={createPLCDevice.userName}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        userName: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createPLCDevice?.userName?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                className="input"
                                placeholder={t('deviceMang.devices.enterUserNameConfigure')}
                                maxLength={maxInputLength}
                            />
                        </div>
                        <div className="form-row">
                            <label>{t('commonStr.password')}</label>
                            <Input.Password
                                value={createPLCDevice.password}
                                onChange={(e) => {
                                    setPLCDevice({
                                        ...createPLCDevice,
                                        password: e.target.value,
                                    });
                                }}
                                onKeyPress={() => {
                                    if (
                                        createPLCDevice?.password?.length ===
                                        maxInputLength
                                    ) {
                                        showInputError(maxInputLength);
                                    }
                                }}
                                className="input"
                                placeholder={t('commonStr.password')}
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
                        onClick={createNewPLCDevice}
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
