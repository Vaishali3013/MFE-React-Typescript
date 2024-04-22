import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Row,
    Typography,
    Button,
    Steps,
    Tabs,
    Switch,
    Input,
    message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    createBla,
    setAddBlaState,
    activateDeactivateBlas,
    getBlaDetails,
    editBla,
    setBlaId,
    setDeviceId,
    getBlasList,
} from 'redux/actions/DeviceManagementActions/blasAction';
import {
    activateDeactivateDevices,
    getDeviceDetails,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import DeviceTable from './deviceTable';
import CommunicationInterface from 'pages/DeviceManagement/Devices/AddDevice/CommunicationInterface';
import {
    handleKeyInput,
    isValidUUID,
    useCharacterLimit,
} from 'utils/commonFunction';
import {
    getAllTagList,
    // getTagList,
    getTagListByDeviceId,
} from 'redux/actions/DeviceManagementActions/tagAction';
import { BUTTONTYPE, ROLETYPE } from 'types/enums';
import AddTagDrawer from 'pages/DeviceManagement/Tags/addTagDrawer';
import EditDevicesTable from 'pages/DeviceManagement/Devices/EditDevices/editDevicesTable';
import { useParams } from 'react-router-dom';
import { parseJwt } from 'utils/jwtTokenFunction';
import { maxDeviceNameLength, maxInputLength } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import CreateAttribute from 'pages/Configure/AttributeDefinition/CreateUom';
const details = parseJwt();

const { Text } = Typography;

const AddBlaStep1: React.FC<any> = ({
    setNameState,
    setDescriptionState,
    setUuidState,
}) => {
    const blaDetails = useSelector(
        (state: any) => state.deviceManagement.blas.blaDetails
    );
    const { t } = useTranslation('translation');
    const [blaName, setBlaName] = useState(blaDetails?.name);
    const [uuid, setUuid] = useState(blaDetails?.uuid);
    const [description, setDescription] = useState(blaDetails?.description);
    const pathParams = useParams();
    const { showInputError } = useCharacterLimit();
    useEffect(() => {
        if (blaDetails?.blaId) {
            setBlaName(blaDetails?.name);
            setNameState(blaDetails?.name);
            setUuid(blaDetails?.uuid);
            setUuidState(blaDetails?.uuid);
            setDescription(blaDetails?.description);
            setDescriptionState(blaDetails?.description);
        }
    }, [pathParams.currentTab, blaDetails]);

    return (
        <>
            <div className="addBlaWrapper__addBlaContent">
                <div className="addBlaWrapper__addBlaInnerContent">
                    <Text
                        type="secondary"
                        strong
                        className="addBlaWrapper__addBlaInnerContentText"
                    >
                        <span className="mandatoryClass">*</span>{' '}
                        {t('deviceMang.bla.nameOfBla')}
                    </Text>
                    <Input
                        className="addBlaWrapper__addBlaInnerContentInput"
                        placeholder={t('deviceMang.bla.enterBlaName')}
                        value={blaName}
                        onChange={(e) => {
                            setNameState(e.target.value);
                            setBlaName(e.target.value);
                        }}
                        disabled={!!blaDetails?.name}
                        onKeyPress={(e) => {
                            if (blaName?.length === maxDeviceNameLength) {
                                showInputError(maxDeviceNameLength);
                            }
                            handleKeyInput(e, blaName);
                        }}
                        maxLength={maxDeviceNameLength}
                    />
                </div>
                <div className="addBlaWrapper__addBlaInnerContent">
                    <Text
                        type="secondary"
                        strong
                        className="addBlaWrapper__addBlaInnerContentText"
                    >
                        <span className="mandatoryClass">*</span>{' '}
                        {t('deviceMang.bla.uniqueId')}
                    </Text>
                    <Input
                        className="addBlaWrapper__addBlaInnerContentInput"
                        placeholder={t('deviceMang.bla.enterUuid')}
                        value={uuid}
                        onChange={(e) => {
                            setUuidState(e.target.value);
                            setUuid(e.target.value);
                        }}
                        disabled={!!blaDetails?.uuid}
                    />
                </div>
                <div className="addBlaWrapper__addBlaInnerContent">
                    <Text
                        type="secondary"
                        strong
                        className="addBlaWrapper__addBlaInnerContentText"
                    >
                        {t('deviceMang.bla.description')}
                    </Text>
                    <TextArea
                        className="addBlaWrapper__addBlaInnerContentInput"
                        rows={4}
                        placeholder={t('deviceMang.bla.enterDesciption')}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setDescriptionState(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (description?.length === maxInputLength) {
                                showInputError(maxInputLength);
                            }
                        }}
                        maxLength={maxInputLength}
                    />
                </div>
            </div>
        </>
    );
};

const AddBlaStep2: React.FC<any> = ({ setShowAddNewDeviceWizard, blaId }) => {
    const dispatch = useDispatch();
    const blaStatusChanged = useSelector(
        (state: any) => state.deviceManagement.blas.blaStatusChanged
    );
    const allDevicesList = useSelector(
        (state: any) => state.deviceManagement.devices.allDevicesListByBla
    );
    useEffect(() => {
        blaId && dispatch(getBlaDetails(blaId));
    }, [blaId, blaStatusChanged]);

    const blaDetails = useSelector(
        (state: any) => state.deviceManagement.blas.blaDetails
    );
    const { t } = useTranslation('translation');
    return (
        <>
            <Row className="addBlaWrapper__tableHeader fw-500 fs-16">
                <Col span={24}>
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                key: '1',
                                label: `All Devices`,
                                children: (
                                    <DeviceTable
                                        setShowAddNewDeviceWizard={
                                            setShowAddNewDeviceWizard
                                        }
                                        showAddNewDeviceWizard
                                        allDevicesList={allDevicesList}
                                        label="devices"
                                    />
                                ),
                            },
                            {
                                key: '2',
                                label: `Active`,
                                children: (
                                    <DeviceTable
                                        setShowAddNewDeviceWizard={
                                            setShowAddNewDeviceWizard
                                        }
                                        showAddNewDeviceWizard
                                        allDevicesList={allDevicesList.filter(
                                            (element: any) => {
                                                if (element.isActive)
                                                    return element;
                                            }
                                        )}
                                        label="active devices"
                                    />
                                ),
                            },
                            {
                                key: '3',
                                label: `Inactive`,
                                children: (
                                    <DeviceTable
                                        setShowAddNewDeviceWizard={
                                            setShowAddNewDeviceWizard
                                        }
                                        showAddNewDeviceWizard
                                        allDevicesList={allDevicesList.filter(
                                            (element: any) => {
                                                if (!element.isActive)
                                                    return element;
                                            }
                                        )}
                                        label="inactive devices"
                                    />
                                ),
                            },
                        ]}
                        tabBarExtraContent={{
                            right: (
                                <div className="editBlaDrawer__tabContent fw-400 fs-14">
                                    <Typography.Text type="secondary">
                                        {t('deviceMang.bla.uniqueId')}{' '}
                                        {blaDetails?.uuid}
                                    </Typography.Text>
                                    <Switch
                                        key={blaDetails?.isActive}
                                        className="editBlaDrawer__switch"
                                        size="small"
                                        defaultChecked={blaDetails?.isActive}
                                        onChange={() => {
                                            dispatch(
                                                activateDeactivateBlas({
                                                    id: [blaId],
                                                    active: !blaDetails?.isActive,
                                                    updatedBy:
                                                        details?.username,
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            ),
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

const AddBlaStep3: React.FC<any> = ({ openAddTag, setOpenAddTag }) => {
    const dispatch = useDispatch();

    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );
    const deviceId = useSelector(
        (state: any) => state.deviceManagement.blas.deviceId
    );
    const deviceStatusChanged = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusChanged
    );
    useEffect(() => {
        deviceId && dispatch(getDeviceDetails(deviceId));
    }, [deviceStatusChanged]);

    const [deviceTagPage, setDeviceTagPage] = useState<number>(1);
    const [deviceTagPageSize, setDeviceTagPageSize] = useState<number>(50);
    const [currentTabKey, setCurrentTabKey] = useState('1');

    const [deviceTagStatus, setDeviceTagStatus] = useState(0);
    const record = deviceDetails;
    // this for wizard tag listing with pagination will use later
    // const tagsList = useSelector(
    //     (state: any) => state.deviceManagement.tags.tagsList
    // );
    const tagsListByDeviceId = useSelector(
        (state: any) => state.deviceManagement.tags.tagListByDeviceId
    );
    const createTagState = useSelector(
        (state: any) => state.deviceManagement?.tags?.createTagState
    );
    useEffect(() => {
        const payload = { deviceId: deviceId };
        dispatch(getAllTagList(payload));
    }, [deviceId, openAddTag, createTagState]);
    useEffect(() => {
        // this for wizard tag listing with pagination will use later
        // dispatch(
        //     getTagList({
        //         page: deviceTagPage,
        //         pageSize: deviceTagPageSize,
        //         deviceId: record.deviceId,
        //         status: deviceTagStatus,
        //     })
        // );
        dispatch(
            getTagListByDeviceId({
                deviceId: record?.deviceId,
                status: deviceTagStatus,
            })
        );
    }, [record, deviceTagStatus, openAddTag]);
    const onChange = (key: string): void => {
        setCurrentTabKey(key);
        if (key === '2') {
            setDeviceTagStatus(1);
            setDeviceTagPage(1);
        } else if (key === '3') {
            setDeviceTagStatus(2);
            setDeviceTagPage(1);
        } else {
            setDeviceTagStatus(0);
            setDeviceTagPage(1);
        }
    };
    const { t } = useTranslation('translation');
    return (
        <>
            <Row className="addBlaWrapper__tableHeader fw-500 fs-16">
                <Col span={24}>
                    <Tabs
                        activeKey={currentTabKey}
                        onChange={onChange}
                        defaultActiveKey="1"
                        items={[
                            {
                                key: '1',
                                label: `All Tags`,
                                children: (
                                    <>
                                        <EditDevicesTable
                                            openInWizard={'bla'}
                                            editState={true}
                                            tagListByDeviceId={
                                                tagsListByDeviceId
                                            }
                                            deviceTagPageSize={
                                                deviceTagPageSize
                                            }
                                            deviceTagPage={deviceTagPage}
                                            setDeviceTagPage={setDeviceTagPage}
                                            setDeviceTagPageSize={
                                                setDeviceTagPageSize
                                            }
                                            record={record}
                                            setOpenAddTag={setOpenAddTag}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: '2',
                                label: `Active`,
                                children: (
                                    <>
                                        <EditDevicesTable
                                            openInWizard={'bla'}
                                            editState={true}
                                            tagListByDeviceId={
                                                tagsListByDeviceId
                                            }
                                            deviceTagPageSize={
                                                deviceTagPageSize
                                            }
                                            deviceTagPage={deviceTagPage}
                                            setDeviceTagPage={setDeviceTagPage}
                                            setDeviceTagPageSize={
                                                setDeviceTagPageSize
                                            }
                                            record={record}
                                            setOpenAddTag={setOpenAddTag}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: '3',
                                label: `Inactive`,
                                children: (
                                    <>
                                        <>
                                            <EditDevicesTable
                                                openInWizard={'bla'}
                                                editState={true}
                                                tagListByDeviceId={
                                                    tagsListByDeviceId
                                                }
                                                deviceTagPageSize={
                                                    deviceTagPageSize
                                                }
                                                deviceTagPage={deviceTagPage}
                                                setDeviceTagPage={
                                                    setDeviceTagPage
                                                }
                                                setDeviceTagPageSize={
                                                    setDeviceTagPageSize
                                                }
                                                record={record}
                                                setOpenAddTag={setOpenAddTag}
                                            />
                                        </>
                                    </>
                                ),
                            },
                        ]}
                        tabBarExtraContent={{
                            right: (
                                <div className="editBlaDrawer__tabContent fw-400 fs-14">
                                    <Typography.Text type="secondary">
                                        {t('deviceMang.bla.uniqueId')}{' '}
                                        {deviceDetails?.deviceUUID}
                                    </Typography.Text>
                                    <Switch
                                        key={deviceDetails?.isActive}
                                        className="editBlaDrawer__switch"
                                        size="small"
                                        defaultChecked={deviceDetails?.isActive}
                                        onChange={() => {
                                            dispatch(
                                                activateDeactivateDevices({
                                                    id: [deviceId],
                                                    isActive:
                                                        !deviceDetails?.isActive,
                                                    requestedBy:
                                                        details?.username,
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            ),
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

const AddBla: React.FC<any> = ({ screen }) => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [openAddTag, setOpenAddTag] = useState(false);
    const [nameState, setNameState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');
    const [uuidState, setUuidState] = useState('');
    const [showAddNewDeviceWizard, setShowAddNewDeviceWizard] = useState(false);
    const [isUomOpen, setIsUomOpen] = useState(false);

    const payload: any = {
        blaName: nameState,
        uuid: uuidState,
        description: descriptionState,
        // createdBy: 'string',
    };

    const [editPayload, setEditPayload] = useState({
        blaName: '',
        description: '',
        updatedBy: '',
        blaId: '',
    });

    const createBlaResponse = useSelector(
        (state: any) => state.deviceManagement.blas.createBlaState
    );
    const blaId = useSelector(
        (state: any) => state.deviceManagement.blas.blaId
    );

    const deviceId = useSelector(
        (state: any) => state.deviceManagement.blas.deviceId
    );
    const selectedDevice = useSelector(
        (state: any) => state.deviceManagement.blas.selectedDevice
    );
    const lastAddedBlaDetails = useSelector(
        (state: any) => state.deviceManagement.blas.lastCreatedBla
    );
    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );

    useEffect(() => {
        selectedDevice && dispatch(getDeviceDetails(selectedDevice?.deviceId));
    }, [selectedDevice]);

    useEffect(() => {
        if (blaId) {
            if (deviceId) {
                setCount(2);
            } else {
                setCount(1);
            }
        }
    }, [blaId, deviceId]);
    useEffect(() => {
        setEditPayload({
            blaName: nameState,
            description: descriptionState,
            updatedBy: details?.username,
            blaId: blaId,
        });
    }, [descriptionState]);
    useEffect(() => {
        dispatch(getBlasList({ page: 1, search: [] }));
    }, []);

    const onOkHandler = (): any => {
        if (count === 0) {
            if (blaId) {
                setEditPayload({
                    ...editPayload,
                    description: descriptionState,
                });
                dispatch(editBla(editPayload));
            } else if (!blaId) {
                if (isValidUUID(payload.uuid)) {
                    dispatch(createBla(payload));
                } else {
                    message.error('Please enter valid uuid');
                }
            }
            if (screen && screen === 'devices')
                lastAddedBlaDetails && dispatch(setAddBlaState('view'));
            blaId && setCount(count + 1);
        } else if (count === 1) {
            if (selectedDevice) {
                dispatch(setDeviceId(selectedDevice?.deviceId));
                setCount(count + 1);
            } else message.error('Select a device');
        } else {
            createBlaResponse && setCount(count + 1);
        }
    };

    useEffect(() => {
        if (lastAddedBlaDetails) {
            if (screen && screen === 'devices')
                lastAddedBlaDetails &&
                    dispatch(setAddBlaState('view')) &&
                    dispatch(setBlaId(null));
            else {
                setCount(count + 1);
                !blaId &&
                    dispatch(
                        setBlaId(lastAddedBlaDetails?.blaDetails?.data?.blaId)
                    );
            }
        }
    }, [lastAddedBlaDetails]);

    // For Design changes reference
    // useEffect(() => {
    //     createBlaResponse &&
    //         modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
    //     okHandle(isModalOpen, setIsModalOpen);
    // }, [createBlaResponse]);
    const lastAddedDevice = useSelector(
        (state: any) => state.deviceManagement.devices.lastAddedDevice
    );

    useEffect(() => {
        setShowAddNewDeviceWizard(false);
    }, [lastAddedDevice]);
    const { t } = useTranslation('translation');
    return (
        <>
            {showAddNewDeviceWizard ? (
                <>
                    <Row className="deviceWrapper__headerWrapper">
                        <Col span={18} className="deviceWrapper__heading">
                            <div className="deviceWrapper__backIcon">
                                <BackIcon
                                    onClick={() => {
                                        setShowAddNewDeviceWizard(false);
                                    }}
                                />
                            </div>
                            <div className="deviceWrapper__screenNameHeading">
                                <ScreenNameHeading
                                    heading={t('deviceMang.bla.addDevice')}
                                    subHeading={''}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="selectInterfaceParent">
                        <CommunicationInterface />
                    </div>
                </>
            ) : (
                <>
                    {isUomOpen ? (
                        <CreateAttribute setIsUomOpen={setIsUomOpen} />
                    ) : (
                        <div className="addBlaWrapper">
                            <Card bordered={false}>
                                <Row className="addBlaWrapper__headerWrapper">
                                    <Col
                                        span={24}
                                        className="addBlaWrapper__heading"
                                    >
                                        <div className="addBlaWrapper__backIcon">
                                            <BackIcon
                                                onClick={() => {
                                                    dispatch(
                                                        setAddBlaState('view')
                                                    );
                                                    dispatch(setBlaId(null));
                                                    dispatch(setDeviceId(null));
                                                }}
                                            />
                                        </div>
                                        <div className="addBlaWrapper__screenNameHeading">
                                            <ScreenNameHeading
                                                heading={t(
                                                    'deviceMang.bla.addNewBla'
                                                )}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <div className="addBlaWrapper__stepperContent">
                                    {screen !== 'devices' ? (
                                        <Steps
                                            className="addBlaWrapper__stepper"
                                            current={count}
                                            items={[
                                                {
                                                    title: 'Add BLA',
                                                },
                                                {
                                                    title: 'Add Device',
                                                },
                                                {
                                                    title: 'Add Tag',
                                                },
                                            ]}
                                        />
                                    ) : null}
                                </div>
                                {count === 0 ? (
                                    <AddBlaStep1
                                        setNameState={setNameState}
                                        setDescriptionState={
                                            setDescriptionState
                                        }
                                        setUuidState={setUuidState}
                                    />
                                ) : count === 1 ? (
                                    <AddBlaStep2
                                        setShowAddNewDeviceWizard={
                                            setShowAddNewDeviceWizard
                                        }
                                        blaId={blaId}
                                    />
                                ) : (
                                    <AddBlaStep3
                                        openAddTag={openAddTag}
                                        setOpenAddTag={setOpenAddTag}
                                    />
                                )}
                                <div className="addBlaWrapper__addBlaFooter">
                                    <div className="addBlaWrapper__footerButtonWrapper">
                                        <CustomButton
                                            type={
                                                count <= 0 ? 'Cancel' : 'Back'
                                            }
                                            disabled={false}
                                            handleClick={() => {
                                                count <= 0
                                                    ? dispatch(
                                                          setAddBlaState('view')
                                                      ) &&
                                                      dispatch(
                                                          setBlaId(null)
                                                      ) &&
                                                      dispatch(
                                                          setDeviceId(null)
                                                      )
                                                    : count === 1
                                                    ? blaId &&
                                                      dispatch(
                                                          getBlaDetails(blaId)
                                                      ) &&
                                                      setCount(count - 1)
                                                    : dispatch(
                                                          setDeviceId(null)
                                                      ) && setCount(count - 1);
                                            }}
                                        />
                                    </div>
                                    <div className="addBlaWrapper__footerButtonWrapper">
                                        {count > 1 ? (
                                            <CustomButton
                                                type={
                                                    count === 2
                                                        ? 'Finish'
                                                        : 'Save'
                                                }
                                                disabled={
                                                    count === 2
                                                        ? false
                                                        : nameState === '' ||
                                                          uuidState === ''
                                                }
                                                handleClick={() => {
                                                    modalShow(
                                                        isModalOpen,
                                                        setIsModalOpen
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <Button
                                                    disabled={
                                                        count === 0
                                                            ? nameState ===
                                                                  '' ||
                                                              uuidState === ''
                                                            : !selectedDevice
                                                    }
                                                    onClick={onOkHandler}
                                                    type="primary"
                                                >
                                                    {count === 0
                                                        ? BUTTONTYPE.saveAndNext
                                                        : BUTTONTYPE.next}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                    {count > 0 && count < 2 && (
                                        <div className="addBlaWrapper__footerButtonWrapper">
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    dispatch(
                                                        setAddBlaState(
                                                            ROLETYPE.view
                                                        )
                                                    );
                                                    dispatch(setBlaId(null));
                                                    dispatch(setDeviceId(null));
                                                }}
                                            >
                                                {'Skip>>'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            {openAddTag && (
                                <AddTagDrawer
                                    open={openAddTag}
                                    setAddDrawerState={setOpenAddTag}
                                    deviceId={deviceId}
                                    type={ROLETYPE.add}
                                    deviceDetails={deviceDetails}
                                    record={deviceDetails}
                                    setIsUomOpen={setIsUomOpen}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                onOk={() => {
                    modalShow(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                    okHandle(isModalOpen, setIsModalOpen);
                    dispatch(setAddBlaState(ROLETYPE.view));
                    dispatch(setBlaId(null));
                    dispatch(setDeviceId(null));
                }}
                text={t('deviceMang.bla.newBla')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onCancel={() => {
                    dispatch(setAddBlaState('view'));
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                }}
                text={t('deviceMang.bla.newBlasuccess')}
            />
        </>
    );
};

export default AddBla;
