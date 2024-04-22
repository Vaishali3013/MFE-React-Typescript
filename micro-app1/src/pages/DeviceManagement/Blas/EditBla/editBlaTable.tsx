import React, { type ReactNode, useState, useEffect } from 'react';
import { Col, Row, Popover, Table, Button, Pagination, Cascader } from 'antd';
import './index.scss';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/BlaIcon/ActiveDeactivate.svg';
import { type ColumnsType } from 'antd/es/table';
import {
    MoreOutlined,
    FireOutlined,
    WarningOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    CopyOutlined,
    DisconnectOutlined,
} from '@ant-design/icons';
import {
    getAllBlasList,
    getDevicesInBlaList,
    removeDeviceInBla,
} from 'redux/actions/DeviceManagementActions/blasAction';
import {
    activateDeactivateDevices,
    getAllDevicesList,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/BlaIcon/Activate.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/BlaIcon/Deactivate.svg';
import { ReactComponent as RemoveIcon } from 'assets/icons/deviceManagemntRemoveIcon.svg';
import { ReactComponent as CloneIcon } from 'assets/icons/cloneIcon.svg';
import { editBlaOptionsData } from 'json/DeviceManagement/blas';
import CustomDropDown from 'components/common/CustomDropDown';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import CustomModal from 'components/common/Modals/CustomModal';
import { cancelHandle, okHandle } from 'utils/modalFunction';
import DeviceClone from '../deviceClone';
import { parseJwt } from 'utils/jwtTokenFunction';
import { filter } from 'utils/commonFunction';
import { deviceManagement, deviceSortOption, sortOrderApi } from 'types/enums';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import { useTranslation } from 'react-i18next';

const EditBlaTable: React.FC<any> = ({
    editState,
    editBlaTableData,
    blaId,
    status,
    setShowAddNewDeviceWizard,
    emptyText,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [deactivateModalState, setDeactivateModalState] = useState<
        string | null
    >(null);
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [cloneModalOpen, setCloneModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState<string | null>(
        null
    );
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [headerPopoverVisible, setHeaderPopoverVisible] = useState(false);
    const [multipleActDeactModalState, setMultipleActDeactModalState] =
        useState(false);
    const [cloneFormModal, setCloneFormModal] = useState(false);
    const [tableData, setTableData] = useState<any>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>({});
    const allBlasList = useSelector(
        (state: any) => state.deviceManagement.blas.allBlasList
    );
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const details = parseJwt();
    const { SHOW_CHILD } = Cascader;

    const allDevicesListByBla = useSelector(
        (state: any) => state.deviceManagement.devices.allDevicesListByBla
    );

    useEffect(() => {
        dispatch(getAllBlasList());
    }, []);
    useEffect(() => {
        dispatch(getAllDevicesList({ blaId: blaId, status: status }));
    }, [blaId, status]);

    const deviceStatusResponse = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusResponse
    );
    const blaStatusChanged = useSelector(
        (state: any) => state.deviceManagement.blas.blaStatusChanged
    );
    const deviceIsRemoved = useSelector(
        (state: any) => state.deviceManagement.blas.deviceIsRemoved
    );

    useEffect(() => {
        deviceStatusResponse && setSuccessModalOpen(`${deactivateModalState}`);
        deviceIsRemoved && setSuccessModalOpen('remove');
        setDeactivateModalState(null);
        setRemoveModalOpen(false);
    }, [deviceStatusResponse, deviceIsRemoved]);

    useEffect(() => {
        blaId &&
            dispatch(
                getDevicesInBlaList({
                    pageNumber: page,
                    pageSize: pageSize,
                    blaId: blaId,
                    status: status,
                    search: selectedValues,
                })
            );
    }, [
        page,
        blaId,
        status,
        successModalOpen,
        selectedValues,
        blaStatusChanged,
    ]);

    useEffect(() => {
        setSelectedValues([]);
    }, [status]);

    const selectValues = (value: any[], selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };
    const tableDataMapper = (): [] => {
        const temp: any = [];
        editBlaTableData?.paginatedResponse?.records?.map(
            (item: any, index: number) => {
                temp.push({
                    ...item,
                    key: item?.deviceId,
                    value: item?.deviceId,
                    label: item?.deviceName,
                });
            }
        );
        return temp;
    };

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const searchMapperconst = (): [] => {
        const temp: any = [];
        allDevicesListByBla?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item?.deviceId,
                value: item?.deviceId,
                label: item?.deviceName,
            });
        });
        return temp;
    };

    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowKeys([]);
    }, [editBlaTableData]);

    const onShowSizeChange = (current: any, size: any): void => {
        setPageSize(size);
    };

    const headerClickHandler = (): void => {
        if (selectedActiveIds.length > 0 && selectedInactiveIds.length > 0) {
            setMultipleActDeactModalState(true);
        } else if (
            selectedActiveIds.length > 0 &&
            selectedInactiveIds.length === 0
        ) {
            setDeactivateModalState('deactivate');
        } else if (
            selectedActiveIds.length === 0 &&
            selectedInactiveIds.length > 0
        ) {
            setDeactivateModalState('activate');
        }
        setHeaderPopoverVisible(false);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

    const rowSelection: any = {
        onSelect: (record: any, selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.deviceId)
                    : selectedInactiveRows.push(item.deviceId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.deviceId)
                    : selectedInactiveRows.push(item.deviceId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const headerDropdown = (): ReactNode => {
        const values = [
            {
                title: '',
                icon: <DisconnectOutlined />,
            },
        ];
        if (selectedActiveIds?.length > 0 && selectedInactiveIds?.length > 0) {
            values[0].title = 'Activate/Deactivate';
        } else if (
            selectedActiveIds.length > 0 &&
            selectedInactiveIds.length === 0
        ) {
            values[0].title = 'Deactivate';
        } else if (
            selectedActiveIds.length === 0 &&
            selectedInactiveIds.length > 0
        ) {
            values[0].title = 'Activate';
        }
        return (
            <>
                <div className="more-container">
                    <div className={`more-content`}>
                        <ul>
                            {values &&
                                values.length > 0 &&
                                values.map((item) => (
                                    <li
                                        key={item.title}
                                        className="blaMoreContent_items"
                                    >
                                        <span
                                            className="moreContent__option"
                                            onClick={() => {
                                                headerClickHandler();
                                            }}
                                        >
                                            <span className="moreContentIcon">
                                                {item.icon}
                                            </span>
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    };
    const handleActivate = (): void => {
        setDeactivateModalState('activate');
        setMultipleActDeactModalState(false);
    };
    const handleDeactivate = (): void => {
        setDeactivateModalState('deactivate');
        setMultipleActDeactModalState(false);
    };

    const moreContent = (record: any, setPopoverVisible: any): ReactNode => {
        const values = [
            {
                title: record.isActive ? 'Deactivate' : 'Activate',
                icon: <DeactivateGroupIcon />,
            },
            {
                title: t('deviceMang.bla.removeBla'),
                icon: <MinusCircleOutlined />,
            },
            {
                title: t('deviceMang.bla.cloneDevice'),
                icon: <CopyOutlined />,
            },
        ];
        if (record?.activeTagsCount > 0 || record?.inactiveTagsCount > 0) {
            values.splice(1, 1);
        }

        return (
            <>
                <div className="more-container">
                    <div className={`more-content`}>
                        <ul>
                            {values &&
                                values.length > 0 &&
                                values.map((item) => (
                                    <li
                                        key={item.title}
                                        className="moreContent__blaItems"
                                    >
                                        <span
                                            className="moreContent__option"
                                            onClick={() => {
                                                setSelectedDevice(record);
                                                if (item.title === 'Activate') {
                                                    setDeactivateModalState(
                                                        'activate'
                                                    );
                                                } else if (
                                                    item.title === 'Deactivate'
                                                ) {
                                                    setDeactivateModalState(
                                                        'deactivate'
                                                    );
                                                } else if (
                                                    item.title ===
                                                    'Remove from BLA'
                                                ) {
                                                    setRemoveModalOpen(true);
                                                } else if (
                                                    item.title ===
                                                    'Clone Device'
                                                ) {
                                                    setSelectedDevice(record);
                                                    setCloneModalOpen(true);
                                                }
                                                setPopoverVisible(false);
                                            }}
                                        >
                                            <span className="moreContentIcon">
                                                {item.icon}
                                            </span>
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const successText = (): string => {
        if (successModalOpen === 'deactivate') {
            return 'Deactivated Successfully';
        } else if (successModalOpen === 'activate') {
            return 'Activated Successfully';
        } else if (successModalOpen === 'remove') {
            return 'Removed device from BLA Successfully';
        } else if (successModalOpen === 'clone') {
            return 'Device successfully cloned to selected BLA';
        }
        return '';
    };
    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const devicesListLoading = useSelector(
        (state: any) => state.deviceManagement.blas.deviceInBlaLoader
    );

    const handleTableChange = (
        pagination: any,
        filters: any,
        sorter: any
    ): any => {
        dispatch(
            getDevicesInBlaList({
                sortOrder: sortOrderApi[sorter.order],
                sortColumn: deviceSortOption[sorter.columnKey],
                search: selectedValues,
                pageNumber: page,
                pageSize: pageSize,
                blaId: blaId,
            })
        );
    };

    const TableColumns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {(selectedActiveIds.length > 0 ||
                        selectedInactiveIds.length > 0) && (
                        <Popover
                            content={
                                <div className="blaTableWrapper__popover">
                                    {headerDropdown()}
                                </div>
                            }
                            placement="bottomLeft"
                            visible={headerPopoverVisible}
                            onVisibleChange={setHeaderPopoverVisible}
                            trigger="click"
                        >
                            <MoreOutlined />
                        </Popover>
                    )}
                </div>
            ),
            key: 'more',
            width: 26,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            <Popover
                                overlayClassName="editBlaDrawerPopover"
                                className="blaTableWrapper__popover"
                                content={moreContent(record, setPopoverVisible)}
                                placement="bottomLeft"
                                visible={popoverVisible[record.key]}
                                onVisibleChange={(visible) => {
                                    handlePopoverVisibleChange(visible, record);
                                }}
                                trigger={'click'}
                            >
                                <MoreOutlined />
                            </Popover>
                        </div>
                    </>
                );
            },
        },
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
            key: 'communicationInterface',
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
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.mappedtags')}</div>
                    <div className="sortArrows">
                        {/* <UpArrow />
                        <DownArrow fill="white" /> */}
                    </div>
                </div>
            ),
            dataIndex: 'mappedTags',
            render: (_: any, { activeTagsCount, inactiveTagsCount }: any) => (
                <>
                    <div className="blaTableWrapper__connectedDevices">
                        <Button
                            className="activeButton"
                            disabled
                            icon={<FireOutlined />}
                        >
                            {activeTagsCount ? `${activeTagsCount}` : '0'}
                        </Button>
                        <Button
                            className="inactiveButton"
                            disabled
                            icon={<WarningOutlined />}
                        >
                            {inactiveTagsCount ? `${inactiveTagsCount}` : '0'}
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

    const onChange = (pageNumber: number): void => {
        setPage(pageNumber);
    };

    return (
        <>
            <div className="editBlaWrapper">
                <div
                    className={
                        editState
                            ? 'editBlaWrapper__editCard'
                            : 'editBlaWrapper__viewCard'
                    }
                >
                    <>
                        <Row gutter={14} align="middle">
                            <Col span={9}>
                                <Cascader
                                    key={status}
                                    multiple
                                    maxTagCount="responsive"
                                    options={searchMapperconst()}
                                    onChange={selectValues}
                                    className="editBlaWrapper__search"
                                    placeholder="Search Device Name"
                                    showSearch={{ filter }}
                                    showCheckedStrategy={SHOW_CHILD}
                                />
                            </Col>
                            <Col span={4}>
                                <CustomDropDown
                                    optionsData={editBlaOptionsData}
                                    placeholder={t('commonStr.export')}
                                    disabled={true}
                                />
                            </Col>
                            <Col span={5}>
                                <CustomDropDown
                                    optionsData={editBlaOptionsData}
                                    placeholder={t('commonStr.bulkUpload')}
                                    disabled={true}
                                />
                            </Col>
                            <Col span={6}>
                                <Button
                                    icon={<PlusOutlined />}
                                    className="editBlaWrapper__buttonGroup"
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
                        {tableData?.length > 0 ? (
                            <Row
                                className={
                                    editState
                                        ? 'editBlaWrapper__blaEditList'
                                        : 'editBlaWrapper__blaList'
                                }
                            >
                                <Col span={24}>
                                    <div className="blaTableWrapper">
                                        <Table
                                            rowSelection={{
                                                type: 'checkbox',
                                                ...rowSelection,
                                                selectedRowKeys:
                                                    selectedRowKeys,
                                            }}
                                            pagination={false}
                                            columns={TableColumns}
                                            dataSource={tableData}
                                            loading={devicesListLoading}
                                            onChange={handleTableChange}
                                            showSorterTooltip={false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <>
                                <div className="editBlaWrapper__blaTableEmpty">
                                    <EmptyDataComponent textValue={emptyText} />
                                </div>
                            </>
                        )}
                    </>
                </div>
                {editBlaTableData?.paginatedResponse?.totalRecords >
                pageSize ? (
                    <>
                        <div className="editPagination">
                            <Pagination
                                total={editBlaTableData?.totalCount}
                                showTotal={(total: Number) =>
                                    `${page ?? '1'} of ${total} items`
                                }
                                defaultCurrent={1}
                                showSizeChanger
                                onChange={onChange}
                                defaultPageSize={50}
                                onShowSizeChange={onShowSizeChange}
                            />
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
            <ConfirmationModal
                open={cloneModalOpen}
                icon={<CloneIcon />}
                onOk={() => {
                    setCloneModalOpen(false);
                    setCloneFormModal(true);
                }}
                onCancel={() => {
                    setCloneModalOpen(false);
                }}
                text={t('deviceMang.bla.cloneSuccess')}
            />
            <ConfirmationModal
                open={removeModalOpen}
                icon={<RemoveIcon />}
                onOk={() => {
                    dispatch(
                        removeDeviceInBla({ id: selectedDevice?.deviceId })
                    );
                    setSelectedDevice({});
                }}
                onCancel={() => {
                    setRemoveModalOpen(false);
                    setSelectedDevice({});
                }}
                text={t('deviceMang.bla.removeSelectedMessage')}
            />
            <ActivateDeactivateMultipleModal
                open={multipleActDeactModalState}
                text={t('commonStr.devices')}
                onCancel={setMultipleActDeactModalState}
                activeIds={selectedActiveIds}
                inActiveIds={selectedInactiveIds}
                handleActivate={handleActivate}
                handleDeactivate={handleDeactivate}
            />
            <ConfirmationModal
                open={deactivateModalState}
                icon={
                    deactivateModalState === 'activate' ? (
                        <ActivateIcon />
                    ) : (
                        <DeactiveIcon />
                    )
                }
                onOk={() => {
                    if (deactivateModalState === 'activate') {
                        dispatch(
                            activateDeactivateDevices({
                                id: selectedDevice.deviceId
                                    ? [selectedDevice?.deviceId]
                                    : selectedInactiveIds,
                                isActive: true,
                                requestedBy: details.username,
                            })
                        );
                    } else if (deactivateModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateDevices({
                                id: selectedDevice.deviceId
                                    ? [selectedDevice?.deviceId]
                                    : selectedActiveIds,
                                isActive: false,
                                requestedBy: details.username,
                            })
                        );
                    }
                    setSelectedDevice({});
                }}
                onCancel={() => {
                    setDeactivateModalState(null);
                    setSelectedDevice({});
                }}
                text={`Are you sure you want to ${deactivateModalState} selected devices?`}
            />
            <CustomModal
                open={cloneFormModal}
                onCancel={() => {
                    cancelHandle(cloneFormModal, setCloneFormModal);
                    setSelectedDevice({});
                }}
                onOk={() => {
                    okHandle(cloneFormModal, setCloneFormModal);
                    setSelectedDevice({});
                }}
                customClassName="cloneDeviceModal"
                footer={null}
            >
                <DeviceClone
                    cloneFormModal={cloneFormModal}
                    setCloneFormModal={setCloneFormModal}
                    selectedDevice={selectedDevice}
                    allBlasList={allBlasList}
                    handleCancle={() =>
                        cancelHandle(cloneFormModal, setCloneFormModal)
                    }
                />
            </CustomModal>
            <SuccessfulModal
                open={successModalOpen}
                onOk={() => {
                    setSuccessModalOpen(null);
                }}
                onCancel={() => {
                    setSuccessModalOpen(null);
                }}
                text={successText()}
            />
        </>
    );
};

export default EditBlaTable;
