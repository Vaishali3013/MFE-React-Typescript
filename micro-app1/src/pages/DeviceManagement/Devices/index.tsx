import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card, Cascader, Col, Row } from 'antd';
import CustomButton from 'components/common/CustomButton';
import { blasOptionsData } from 'json/DeviceManagement/blas';
import CustomDropDown from 'components/common/CustomDropDown';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import DevicesTable from './devicesTable';
import CustomPagination from 'components/common/CustomPagination';
import AddDevice from './AddDevice';
import { cancelHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as NoBlaIcon } from 'assets/icons/noBla.svg';
import EditDevices from './EditDevices';
import DevicesSettings from './EditDevices/DevicesSettings';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllDevicesList,
    getDeviceList,
    setAddDeviceState,
    setDeviceResponseState,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import { useParams, useNavigate } from 'react-router-dom';
import { filter } from 'utils/commonFunction';
import {
    getTagList,
    setTagResponseState,
} from 'redux/actions/DeviceManagementActions/tagAction';
import { StatusType, resourceName, screenName } from 'types/enums';
import {
    getAllBlasList,
    removeLastSelectedBlaFromRedux,
} from 'redux/actions/DeviceManagementActions/blasAction';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';

const Devices: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [deviceTagPage, setDeviceTagPage] = useState<number>(1);
    const [deviceTagPageSize, setDeviceTagPageSize] = useState<number>(50);
    const [deviceTagStatus, setDeviceTagStatus] = useState(StatusType.All);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDevicesDrawer, setShowDevicesDrawer] = useState(false);
    const [record, setRecord] = useState<any>('');
    const [deviceDescription, setDeviceDescription] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });

    const [successModalState, setSuccessModalState] = useState<String | any>(
        null
    );
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const [openEditDevice, setOpenEditDevice] = useState(false);
    const [details, setDetails] = useState({});
    const { SHOW_CHILD } = Cascader;
    const addDeviceHandler = (): any => {
        dispatch(setAddDeviceState(true));
    };
    const deviceTableDataList = useSelector(
        (state: any) => state.deviceManagement.devices.deviceList
    );

    const addDeviceState = useSelector(
        (state: any) => state.deviceManagement.devices.addDeviceState
    );

    const allDevicesList = useSelector(
        (state: any) => state.deviceManagement.devices.allDevicesList
    );

    const deviceStartloading = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStart
    );

    const deviceStoploading = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStop
    );

    const tagsList = useSelector(
        (state: any) => state.deviceManagement.tags.tagsList
    );
    const createTagState = useSelector(
        (state: any) => state.deviceManagement.tags.createTagState
    );
    const deviceStatusChanged = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusChanged
    );
    const allBlasList = useSelector(
        (state: any) => state.deviceManagement.blas.allBlasList
    );
    const tagStatusChanged = useSelector(
        (state: any) => state.deviceManagement.tags.tagStatusChanged
    );

    const lastAddedDevice = useSelector(
        (state: any) => state.deviceManagement.devices.lastAddedDevice
    );

    const deviceStatusResponse = useSelector(
        (state: any) => state.deviceManagement?.devices?.deviceStatusResponse
    );

    const isEdited = useSelector(
        (state: any) => state.deviceManagement?.devices?.isEdited
    );

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        dispatch(getAllBlasList());
    }, []);
    useEffect(() => {
        dispatch(getDeviceList({ ...payload, search: selectedValues }));
    }, [
        payload,
        selectedValues,
        deviceStatusChanged,
        deviceStartloading,
        deviceStoploading,
        lastAddedDevice,
        addDeviceState,
        showDevicesDrawer,
        isEdited,
    ]);
    useEffect(() => {
        !showDevicesDrawer && setShowSettings(false);
    }, [showDevicesDrawer]);
    const { currentTab } = useParams();

    useEffect(() => {
        dispatch(getAllDevicesList());
        setSelectedValues([]);
        setShowDevicesDrawer(false);
    }, [currentTab, addDeviceState]);

    const selectValues = (value: any[], selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };
    const tableDataMapper = (): [] => {
        const temp: any = [];
        allDevicesList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                value: item?.deviceId,
                label: `${item?.deviceName}`,
            });
        });
        return temp;
    };

    const handleEditDevicesClose = (): void => {
        setShowDevicesDrawer(false);
    };
    const openEditDevicesDrawer = (): void => {
        setOpenEditDevice(true);
    };
    useEffect(() => {
        dispatch(
            getTagList({
                page: deviceTagPage,
                pageSize: deviceTagPageSize,
                deviceId: record?.deviceId,
                status: deviceTagStatus,
            })
        );
    }, [
        record,
        deviceTagPage,
        deviceTagPageSize,
        deviceTagStatus,
        createTagState,
        tagStatusChanged,
    ]);
    useEffect(() => {
        dispatch(removeLastSelectedBlaFromRedux());
    }, []);

    return (
        <>
            {addDeviceState ? (
                <AddDevice isAddDeviceClicked={true} />
            ) : (
                <>
                    <div className="devicesWrapper">
                        <Card bordered={false}>
                            <PermissionComponent
                                screenName={resourceName.devices}
                            >
                                {deviceTableDataList?.paginatedResponse
                                    ?.totalRecords > 0 ? (
                                    <>
                                        <Row>
                                            <Col
                                                span={24}
                                                className="devicesWrapper__header"
                                            >
                                                <Cascader
                                                    key={currentTab}
                                                    multiple
                                                    maxTagCount="responsive"
                                                    options={tableDataMapper()}
                                                    onChange={selectValues}
                                                    className="blaWrapper__search"
                                                    placeholder="Search BLA / Device Name"
                                                    showSearch={{ filter }}
                                                    showCheckedStrategy={
                                                        SHOW_CHILD
                                                    }
                                                />
                                                <CustomDropDown
                                                    optionsData={
                                                        blasOptionsData
                                                    }
                                                    placeholder="Export"
                                                    disabled={true}
                                                />
                                                <CustomDropDown
                                                    optionsData={
                                                        blasOptionsData
                                                    }
                                                    placeholder={t(
                                                        'commonStr.bulkUpload'
                                                    )}
                                                    disabled={true}
                                                />
                                                <CustomButton
                                                    type={'Add Device'}
                                                    disabled={false}
                                                    handleClick={
                                                        addDeviceHandler
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="devicesWrapper__blaList">
                                            <Col span={24}>
                                                <DevicesTable
                                                    setDeviceState={
                                                        setShowDevicesDrawer
                                                    }
                                                    deviceTableDataList={
                                                        deviceTableDataList
                                                            ?.paginatedResponse
                                                            ?.records
                                                    }
                                                    setSuccessModalState={
                                                        setSuccessModalState
                                                    }
                                                    search={selectedValues}
                                                    pagetype={payload}
                                                    setRecord={setRecord}
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <div className="devicesWrapper__tableEmpty">
                                            <EmptyDataComponent
                                                textValue={t(
                                                    'deviceMang.devices.noDevicesAdded'
                                                )}
                                                buttonType={{
                                                    name: 'Add Device',
                                                    disable: false,
                                                }}
                                                buttonClickHandler={() => {
                                                    if (
                                                        allBlasList.length > 0
                                                    ) {
                                                        dispatch(
                                                            setAddDeviceState(
                                                                true
                                                            )
                                                        );
                                                    } else {
                                                        setIsModalOpen(true);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </PermissionComponent>
                        </Card>
                    </div>
                    {deviceTableDataList?.paginatedResponse?.totalRecords >
                    50 ? (
                        <CustomPagination
                            totalRecords={
                                deviceTableDataList?.paginatedResponse
                                    ?.totalRecords
                            }
                            page={page}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            pageSize={pageSize}
                        />
                    ) : (
                        ''
                    )}
                </>
            )}
            <EditDevices
                open={showDevicesDrawer}
                setBlaState={setShowDevicesDrawer}
                setShowSettings={setShowSettings}
                record={record}
                setOpenEditDevice={setOpenEditDevice}
                setDeviceDescription={setDeviceDescription}
                setDetails={setDetails}
                onClose={handleEditDevicesClose}
                tagListByDeviceId={tagsList}
                setDeviceTagPage={setDeviceTagPage}
                setDeviceTagPageSize={setDeviceTagPageSize}
                deviceTagPage={deviceTagPage}
                setDeviceTagStatus={setDeviceTagStatus}
                deviceTagPageSize={deviceTagPageSize}
                setSuccessModalState={setSuccessModalState}
            />

            <ConfirmationModal
                customClassName="confirmationModal noBla"
                open={isModalOpen}
                icon={<NoBlaIcon />}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('deviceMang.devices.noBlaAddedClick')}
                onOk={() => {
                    navigate('/device-management/blas');
                    setIsModalOpen(false);
                }}
            />
            {showSettings && (
                <DevicesSettings
                    open={showDevicesDrawer}
                    setBlaState={setShowDevicesDrawer}
                    deviceDescription={deviceDescription}
                    deviceDetails={details}
                    setOpenEditDevice={setOpenEditDevice}
                    onClose={handleEditDevicesClose}
                    showSettings={setShowSettings}
                    openEditDevicesDrawer={openEditDevicesDrawer} // Pass the function here
                />
            )}
            {openEditDevice && (
                <EditDevices
                    open={showDevicesDrawer}
                    setBlaState={setShowDevicesDrawer}
                    setShowSettings={setShowSettings}
                    record={record}
                    setOpenEditDevice={setOpenEditDevice}
                    setDeviceDescription={setDeviceDescription}
                    setDetails={setDetails}
                    onClose={handleEditDevicesClose}
                    tagListByDeviceId={tagsList}
                    setDeviceTagPage={setDeviceTagPage}
                    setDeviceTagPageSize={setDeviceTagPageSize}
                    deviceTagPage={deviceTagPage}
                    setDeviceTagStatus={setDeviceTagStatus}
                    deviceTagPageSize={deviceTagPageSize}
                    setSuccessModalState={setSuccessModalState}
                />
            )}
            {currentTab === screenName.deviceManagementDevices && (
                <SuccessfulModal
                    customClassName="successfulModal deviceActivated"
                    open={deviceStatusResponse}
                    onOk={() => {
                        dispatch(setDeviceResponseState());
                        dispatch(setTagResponseState());
                    }}
                    onCancel={() => {
                        dispatch(setDeviceResponseState());
                        dispatch(setTagResponseState());
                    }}
                    text={
                        successModalState === 'activateMultiple'
                            ? t('commonStr.activateSuccess')
                            : successModalState === 'activate'
                            ? t('deviceMang.devices.accociatedTagsActivate')
                            : t('commonStr.deactivateSuccess')
                    }
                />
            )}
        </>
    );
};

export default Devices;
