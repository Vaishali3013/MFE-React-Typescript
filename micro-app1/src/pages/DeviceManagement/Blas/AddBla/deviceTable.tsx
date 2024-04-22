import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Table, Button, Popover } from 'antd';
import './index.scss';
import { type ColumnsType } from 'antd/es/table';
import {
    FireOutlined,
    WarningOutlined,
    SearchOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as RemoveIcon } from 'assets/icons/deviceManagemntRemoveIcon.svg';
import { deviceTableOptionsData } from 'json/DeviceManagement/blas';
import CustomDropDown from 'components/common/CustomDropDown';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedDeviceToRedux } from 'redux/actions/DeviceManagementActions/blasAction';
import { getAllDevicesList } from 'redux/actions/DeviceManagementActions/deviceAction';
import {
    ascendingSort,
    decendingSort,
    searchFilter,
} from 'utils/commonFunction';
import { deviceManagement } from 'types/enums';
import { useTranslation } from 'react-i18next';

const DeviceTable: React.FC<any> = ({
    setShowAddNewDeviceWizard,
    showAddNewDeviceWizard,
    allDevicesList,
    label,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [deviceList, setDeviceList] = useState(allDevicesList);
    const [successModalState, setSuccessModalState] = useState<string | null>(
        null
    );
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const selectedDevice = useSelector(
        (state: any) => state.deviceManagement.blas.selectedDevice
    );
    const [isPopoverVisible, setIsPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChange = (visible: any): any => {
        setIsPopoverVisible(visible);
    };

    const handleChange = (pagination: any, filters: any, sorter: any): any => {
        if (sorter.order === 'ascend') {
            setDeviceList(ascendingSort(sorter.columnKey, [...deviceList]));
        } else {
            setDeviceList(decendingSort(sorter.columnKey, [...deviceList]));
        }
    };

    const tableColumns: ColumnsType<any> = [
        {
            key: 'deviceName',
            sorter: true,
            title: (
                <>
                    <div className="blaTableWrapper__columnTitle__namePopup">
                        <div className="pl-15">
                            {t('deviceMang.bla.deviceName')}
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'deviceName',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="blaTableWrapper__nameData">
                            <div className="blaTableWrapper__status">
                                {record.isActive ? (
                                    <>
                                        <ActiveDotIcon />
                                    </>
                                ) : (
                                    <InactiveDotIcon />
                                )}
                                <span className="fs-14 fw-500 name">
                                    {record?.deviceName?.length <
                                    deviceManagement.blaNameLength ? (
                                        record?.deviceName
                                    ) : (
                                        <Popover
                                            overlayClassName="customOverlay"
                                            content={
                                                <div className="blaName">
                                                    {record?.deviceName}
                                                </div>
                                            }
                                            visible={
                                                isPopoverVisibles[record?.key]
                                            }
                                            onVisibleChange={
                                                handlePopoverVisibleChanges
                                            }
                                            placement="topLeft"
                                        >
                                            {record?.deviceName?.length >
                                            deviceManagement.blaNameLength
                                                ? `${record?.deviceName?.slice(
                                                      0,
                                                      deviceManagement.blaNameLength
                                                  )}...`
                                                : record?.deviceName}
                                        </Popover>
                                    )}
                                </span>{' '}
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'description',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.description')}</div>
                </div>
            ),
            dataIndex: 'description',
            width: '230px',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {record?.description?.length <
                            deviceManagement.deviceDescriptionLength ? (
                                record?.description
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {record?.description}
                                        </div>
                                    }
                                    visible={isPopoverVisible[record?.key]}
                                    onVisibleChange={handlePopoverVisibleChange}
                                    placement="topLeft"
                                >
                                    {record?.description?.length >
                                    deviceManagement.deviceDescriptionLength
                                        ? `${record?.description?.slice(
                                              0,
                                              deviceManagement.deviceDescriptionLength
                                          )}...`
                                        : record?.description}
                                </Popover>
                            )}
                        </div>{' '}
                    </>
                );
            },
        },
        {
            key: 'type',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.communicationInter')}</div>
                </div>
            ),
            dataIndex: 'communicationInterface',
        },
        {
            key: 'mappedTags',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.mappedtags')}</div>
                </div>
            ),
            dataIndex: 'mappedTags',
            render: (_: any, { mappedTags }: any) => (
                <>
                    <div className="blaTableWrapper__connectedDevices">
                        <Button
                            className="activeButton"
                            disabled
                            icon={<FireOutlined />}
                        >
                            {mappedTags?.active
                                ? `${mappedTags?.active?.length}`
                                : '0'}
                        </Button>
                        <Button
                            className="inactiveButton"
                            disabled
                            icon={<WarningOutlined />}
                        >
                            {mappedTags?.inactive
                                ? `${mappedTags?.inactive?.length}`
                                : '0'}
                        </Button>
                    </div>
                </>
            ),
        },
        {
            key: 'createdOn',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.createdOn')}</div>
                </div>
            ),
            dataIndex: 'createdOn',
        },
    ];
    const rowSelection: any = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
            dispatch(addSelectedDeviceToRedux(selectedRows[0]));
        },
    };

    const blaId = useSelector(
        (state: any) => state.deviceManagement.blas.blaId
    );

    const deviceId = useSelector(
        (state: any) => state.deviceManagement.blas.deviceId
    );

    useEffect(() => {
        if (blaId) {
            dispatch(
                getAllDevicesList({
                    blaId: blaId,
                })
            );
        }
    }, [blaId, showAddNewDeviceWizard, deviceId]);

    useEffect(() => {
        searchFilter(allDevicesList, searchValue, setDeviceList);
    }, [searchValue, allDevicesList]);
    return (
        <>
            <div className="deviceTableWrapper">
                <div className="deviceTableWrapper__card">
                    <>
                        <Row>
                            <Col
                                span={24}
                                className="deviceTableWrapper__header"
                            >
                                <Input
                                    className="deviceTableWrapper__search"
                                    placeholder="Search for Devices"
                                    prefix={<SearchOutlined />}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                                <CustomDropDown
                                    optionsData={deviceTableOptionsData}
                                    placeholder={t('commonStr.bulkUpload')}
                                    disabled={true}
                                />
                                <Button
                                    icon={<PlusOutlined />}
                                    className="deviceTableWrapper__buttonGroup"
                                    onClick={() => {
                                        setShowAddNewDeviceWizard(true);
                                    }}
                                >
                                    <span className="fw-400 fs-14">
                                        {t('deviceMang.bla.addNewdevice')}
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                        {allDevicesList.length > 0 ? (
                            <Row className="deviceTableWrapper__blaList">
                                <Col span={24}>
                                    <div className="blaTableWrapper">
                                        <Table
                                            rowSelection={{
                                                selectedRowKeys: [
                                                    selectedDevice?.deviceId,
                                                ],
                                                type: 'radio',
                                                ...rowSelection,
                                            }}
                                            pagination={false}
                                            columns={tableColumns}
                                            dataSource={deviceList}
                                            rowKey={'deviceId'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <>
                                <div className="deviceTableWrapper__blaTableEmpty">
                                    <EmptyDataComponent
                                        textValue={`No ${label} found in this BLA`}
                                    />
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
            <ConfirmationModal
                open={removeModalOpen}
                icon={<RemoveIcon />}
                onOk={() => {
                    setRemoveModalOpen(false);
                    setSuccessModalState('remove');
                }}
                onCancel={() => {
                    setRemoveModalOpen(false);
                }}
                text={t('deviceMang.bla.removeSelectedMessage')}
            />
            <ConfirmationModal
                open={deactivateModalOpen}
                icon={<DeactivateIcon />}
                onOk={() => {
                    setDeactivateModalOpen(false);
                    setSuccessModalState('deactivate');
                }}
                onCancel={() => {
                    setDeactivateModalOpen(false);
                }}
                text={t('deviceMang.bla.deactivateSelectedDevice')}
            />
            <SuccessfulModal
                open={successModalState}
                onOk={() => {
                    setSuccessModalState(null);
                }}
                onCancel={() => {
                    setSuccessModalState(null);
                }}
                text={
                    successModalState === 'deactivate'
                        ? t('commonStr.deactivateSuccess')
                        : successModalState === 'remove'
                        ? t('deviceMang.bla.removeDeviceBla')
                        : ''
                }
            />
        </>
    );
};

export default DeviceTable;
