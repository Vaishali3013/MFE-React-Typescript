import React, { useEffect, useState } from 'react';
import './index.scss';
import {
    Row,
    Col,
    Drawer,
    Tabs,
    Button,
    Switch,
    Typography,
    Divider,
    Popover,
} from 'antd';
import { type EditBlaProps } from 'types/interfaces/PropsInterfaces';
import { CloseOutlined } from '@ant-design/icons';
import EditDevicesTable from './editDevicesTable';
import TextArea from 'antd/es/input/TextArea';
import CustomButton from 'components/common/CustomButton';
import { ReactComponent as SettingIcon } from 'assets/icons/settingIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    activateDeactivateDevices,
    editDevice,
    getDeviceDetails,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { mapDeviceDetailsToRequestBody } from '../editDeviceCommonCode';
import { ROLETYPE, StatusType, deviceManagement } from 'types/enums';
import AddTagDrawer from 'pages/DeviceManagement/Tags/addTagDrawer';
import { useParams } from 'react-router-dom';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { maxInputLength } from 'utils/constants';
import PopOverComponent from 'components/common/PopOverComponent';
import { useCharacterLimit } from 'utils/commonFunction';
import { useTranslation } from 'react-i18next';

const EditDevices: React.FC<EditBlaProps> = ({
    open,
    setBlaState,
    setShowSettings,
    record,
    setOpenEditDevice,
    setDeviceDescription,
    setDetails,
    onClose,
    tagListByDeviceId,
    setDeviceTagPage,
    setDeviceTagPageSize,
    deviceTagPage,
    setDeviceTagStatus,
    deviceTagPageSize,
    setSuccessModalState,
}) => {
    const [editState, setEditState] = useState(false);
    const { t } = useTranslation('translation');
    const [description, setDescription] = useState('');
    const [currentTabKey, setCurrentTabKey] = useState('1');
    const [openAddTag, setOpenAddTag] = useState(false);
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };
    const [successModalOpen, setSuccessModalOpen] = useState<string | null>(
        null
    );
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const details = parseJwt();
    const { showInputError } = useCharacterLimit();
    const dispatch = useDispatch();
    const deviceStatusChanged = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusChanged
    );
    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );
    useEffect(() => {
        record && open && dispatch(getDeviceDetails(record?.deviceId));
    }, [record, open, deviceStatusChanged]);
    useEffect(() => {
        editState && setDescription(deviceDetails?.description || '');
    }, [editState]);
    useEffect(() => {
        !open && setEditState(false);
    }, [open]);

    const handleDescriptionChange = (event: any): any => {
        const { value } = event.target;
        setDescription(value);
        setDeviceDescription(value);
    };
    useEffect(() => {
        setDetails(deviceDetails);
    }, [deviceDetails]);

    const { currentTab } = useParams();
    useEffect(() => {
        setOpenAddTag(false);
    }, [currentTab]);

    const saveDetails = (): void => {
        const requestBody: any = mapDeviceDetailsToRequestBody(deviceDetails);
        requestBody.deviceId = deviceDetails?.deviceId;
        requestBody.description = description;
        requestBody.requestedBy = details?.username;
        dispatch(editDevice(requestBody));
        setEditState(false);
        setOpenEditDevice(false);
        setDeviceTagStatus(StatusType.All);
        onClose();
    };

    const onChange = (key: string): void => {
        setCurrentTabKey(key);
        if (key === '2') {
            setDeviceTagStatus(StatusType.Active);
            setDeviceTagPage(1);
        } else if (key === '3') {
            setDeviceTagStatus(StatusType.Deactivate);
            setDeviceTagPage(1);
        } else {
            setDeviceTagStatus(StatusType.All);
            setDeviceTagPage(1);
        }
    };

    return (
        <>
            <Drawer
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
                            <Col span={16}>
                                <Row>
                                    <Col
                                        span={24}
                                        className="editBlaDrawer__heading fw-500 fs-18"
                                    >
                                        <PopOverComponent
                                            text={deviceDetails?.deviceName}
                                            record={record}
                                        />
                                    </Col>
                                    <Col
                                        span={24}
                                        className="editBlaDrawer__subHeading fw-400 fs-14"
                                    >
                                        {editState ? (
                                            <TextArea
                                                className="addBlaWrapper__textArea"
                                                value={description}
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                                onKeyPress={() => {
                                                    if (
                                                        description?.length ===
                                                        maxInputLength
                                                    ) {
                                                        showInputError(
                                                            maxInputLength
                                                        );
                                                    }
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        ) : (
                                            <span>
                                                {deviceDetails?.description}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                            {editState ? (
                                <Col span={6}>
                                    <Button
                                        className="editBlaDrawer__icon"
                                        type="primary"
                                        icon={<SettingIcon />}
                                        onClick={() => {
                                            setShowSettings(true);
                                            setOpenEditDevice(false);
                                            setDeviceTagStatus(StatusType.All);
                                        }}
                                    />
                                </Col>
                            ) : (
                                <Col span={6}>
                                    <Button
                                        disabled={!deviceDetails?.isActive}
                                        className="editBlaDrawer__icon"
                                        onClick={() => {
                                            setEditState(true);
                                        }}
                                        type="primary"
                                        ghost
                                    >
                                        {t('commonStr.edit')}
                                    </Button>
                                </Col>
                            )}
                            <Col span={2}>
                                <Button
                                    className="editBlaDrawer__icon"
                                    type="text"
                                    onClick={() => {
                                        setEditState(false);
                                        setOpenEditDevice(false);
                                        setDeviceTagStatus(StatusType.All);
                                        setCurrentTabKey('1');
                                        onClose();
                                    }}
                                    icon={<CloseOutlined />}
                                ></Button>
                            </Col>
                        </Row>
                        <Row
                            className={`${
                                deviceDetails?.isActive
                                    ? ''
                                    : 'editBlaDrawer__table'
                            } fw-500 fs-16 blaEditDrawer`}
                        >
                            <Col span={24}>
                                <Tabs
                                    defaultActiveKey="1"
                                    activeKey={currentTabKey}
                                    onChange={onChange}
                                    key={`${currentTabKey}_${
                                        deviceDetails?.deviceId
                                    }_${openAddTag}_${
                                        successModalOpen ? '' : successModalOpen
                                    }`}
                                    items={[
                                        {
                                            key: '1',
                                            label: `All`,
                                            children: (
                                                <EditDevicesTable
                                                    recordsLength={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.totalRecords
                                                    }
                                                    editState={editState}
                                                    tagListByDeviceId={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.records
                                                    }
                                                    deviceTagPageSize={
                                                        deviceTagPageSize
                                                    }
                                                    deviceTagPage={
                                                        deviceTagPage
                                                    }
                                                    setDeviceTagPage={
                                                        setDeviceTagPage
                                                    }
                                                    setDeviceTagPageSize={
                                                        setDeviceTagPageSize
                                                    }
                                                    setOpenAddTag={
                                                        setOpenAddTag
                                                    }
                                                    successModalOpen={
                                                        successModalOpen
                                                    }
                                                    setSuccessModalOpen={
                                                        setSuccessModalOpen
                                                    }
                                                />
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: `Active`,
                                            children: (
                                                <EditDevicesTable
                                                    editState={editState}
                                                    recordsLength={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.totalRecords
                                                    }
                                                    tagListByDeviceId={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.records
                                                    }
                                                    deviceTagPageSize={
                                                        deviceTagPageSize
                                                    }
                                                    setDeviceTagPage={
                                                        setDeviceTagPage
                                                    }
                                                    deviceTagPage={
                                                        deviceTagPage
                                                    }
                                                    setDeviceTagPageSize={
                                                        setDeviceTagPageSize
                                                    }
                                                    setOpenAddTag={
                                                        setOpenAddTag
                                                    }
                                                    successModalOpen={
                                                        successModalOpen
                                                    }
                                                    setSuccessModalOpen={
                                                        setSuccessModalOpen
                                                    }
                                                />
                                            ),
                                        },
                                        {
                                            key: '3',
                                            label: `Inactive`,
                                            children: (
                                                <EditDevicesTable
                                                    editState={editState}
                                                    recordsLength={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.totalRecords
                                                    }
                                                    tagListByDeviceId={
                                                        tagListByDeviceId
                                                            ?.paginatedResponse
                                                            ?.records
                                                    }
                                                    setDeviceTagPage={
                                                        setDeviceTagPage
                                                    }
                                                    deviceTagPage={
                                                        deviceTagPage
                                                    }
                                                    deviceTagPageSize={
                                                        deviceTagPageSize
                                                    }
                                                    setDeviceTagPageSize={
                                                        setDeviceTagPageSize
                                                    }
                                                    setOpenAddTag={
                                                        setOpenAddTag
                                                    }
                                                    successModalOpen={
                                                        successModalOpen
                                                    }
                                                    setSuccessModalOpen={
                                                        setSuccessModalOpen
                                                    }
                                                />
                                            ),
                                        },
                                    ]}
                                    tabBarExtraContent={{
                                        right: (
                                            <div className="editBlaDrawer__tabContent fw-400 fs-14">
                                                <Typography.Text
                                                    type="secondary"
                                                    className="editBlaDrawer__deviceDetails"
                                                >
                                                    {deviceDetails?.blaName
                                                        ?.length <
                                                    deviceManagement.blaNameLength ? (
                                                        deviceDetails?.blaName
                                                    ) : (
                                                        <Popover
                                                            overlayClassName="customOverlay"
                                                            content={
                                                                <div className="blaName">
                                                                    {
                                                                        deviceDetails?.blaName
                                                                    }
                                                                </div>
                                                            }
                                                            visible={
                                                                isPopoverVisibles[
                                                                    deviceDetails
                                                                        ?.blaName
                                                                ]
                                                            }
                                                            onVisibleChange={
                                                                handlePopoverVisibleChanges
                                                            }
                                                            placement="topLeft"
                                                        >
                                                            {deviceDetails
                                                                ?.blaName
                                                                ?.length >
                                                            deviceManagement.blaNameLength
                                                                ? `${deviceDetails?.blaName?.slice(
                                                                      0,
                                                                      deviceManagement.blaNameLength
                                                                  )}...`
                                                                : deviceDetails?.blaName}
                                                        </Popover>
                                                    )}
                                                    |
                                                    {deviceDetails?.deviceUUID
                                                        ?.length <
                                                    deviceManagement.blaNameLength ? (
                                                        deviceDetails?.deviceUUID
                                                    ) : (
                                                        <Popover
                                                            overlayClassName="customOverlay"
                                                            content={
                                                                <div className="blaName">
                                                                    {
                                                                        deviceDetails?.deviceUUID
                                                                    }
                                                                </div>
                                                            }
                                                            visible={
                                                                isPopoverVisibles[
                                                                    deviceDetails
                                                                        ?.deviceUUID
                                                                ]
                                                            }
                                                            onVisibleChange={
                                                                handlePopoverVisibleChanges
                                                            }
                                                            placement="topLeft"
                                                        >
                                                            {deviceDetails
                                                                ?.deviceUUID
                                                                ?.length >
                                                            deviceManagement.blaNameLength
                                                                ? `${deviceDetails?.deviceUUID?.slice(
                                                                      0,
                                                                      deviceManagement.blaNameLength
                                                                  )}...`
                                                                : deviceDetails?.deviceUUID}
                                                        </Popover>
                                                    )}
                                                </Typography.Text>
                                                <Switch
                                                    className="editBlaDrawer__switch"
                                                    size="small"
                                                    checked={
                                                        deviceDetails?.isActive
                                                    }
                                                    onChange={() => {
                                                        setConfirmModalState(
                                                            deviceDetails?.isActive
                                                                ? 'deactivate'
                                                                : 'activate'
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ),
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                    {editState && (
                        <div className="editBlaDrawer__button">
                            <Divider />
                            <Row className="editBlaDrawer__footerButtons">
                                <Col
                                    span={4}
                                    className="editBlaDrawer__cancelButton"
                                >
                                    <CustomButton
                                        type={'Cancel'}
                                        disabled={false}
                                        handleClick={() => {
                                            setEditState(false);
                                        }}
                                    />
                                </Col>
                                <Col
                                    span={4}
                                    className="editBlaDrawer__saveButton"
                                >
                                    <CustomButton
                                        type={'Save'}
                                        disabled={false}
                                        typeOfButton={'submit'}
                                        handleClick={() => {
                                            saveDetails();
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    )}
                </>
            </Drawer>
            {openAddTag && (
                <AddTagDrawer
                    open={openAddTag}
                    setAddDrawerState={setOpenAddTag}
                    deviceId={record?.deviceId}
                    type={ROLETYPE.add}
                    record={record}
                    deviceDetails={deviceDetails}
                />
            )}
            <ConfirmationModal
                open={confirmModalState}
                icon={
                    confirmModalState === 'activate' ? (
                        <ActivateIcon />
                    ) : (
                        <DeactivateIcon />
                    )
                }
                onOk={() => {
                    if (confirmModalState === 'activate') {
                        dispatch(
                            activateDeactivateDevices({
                                id: [record?.deviceId],
                                isActive: true,
                                requestedBy: details?.username,
                            })
                        );
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateDevices({
                                id: [record?.deviceId],
                                isActive: false,
                                requestedBy: details?.username,
                            })
                        );
                    }
                    setSuccessModalState(`${confirmModalState}`);
                    setConfirmModalState(null);
                }}
                onCancel={() => {
                    setConfirmModalState(null);
                }}
                text={`Are you sure you want to ${confirmModalState} selected Device?`}
            />
        </>
    );
};
export default EditDevices;
