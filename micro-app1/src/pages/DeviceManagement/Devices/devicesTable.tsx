import { Button, Popover, Switch, Table } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { type ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MoreOutlined,
    FireOutlined,
    WarningOutlined,
    DisconnectOutlined,
} from '@ant-design/icons';
import MoreContent from './DevicesMoreContent';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import moment from 'moment';
import {
    activateDeactivateDevices,
    getDeviceList,
    setDeviceStart,
    setDeviceStop,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import {
    deviceManagement,
    deviceSortOption,
    screenName,
    sortOrderApi,
} from 'types/enums';
import { languageChangeHandler } from 'utils/commonFunction';
import '../index.scss';
import { DATE_FORMAT } from 'utils/constants';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const DevicesTable: React.FC<any> = ({
    setDeviceState,
    deviceTableDataList,
    search,
    pageType,
    setRecord,
    setSuccessModalState,
}) => {
    const { currentTab } = useParams();
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const [selectedKeyRecord, setSelectedKeyRecord] = useState<any>(null);
    const [tableData, setTableData] = useState<any>([]);
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [headerPopoverVisible, setHeaderPopoverVisible] = useState(false);
    const [deviceToggleLoading, setDeviceToggleLoading] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const [deactivateModalState, setDeactivateModalState] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const details = parseJwt();
    const tableDataMapper = (): [] => {
        const temp: any = [];
        deviceTableDataList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.deviceId,
            });
        });
        return temp;
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
        (state: any) => state.deviceManagement?.devices?.devicesListLoading
    );

    const deviceStartLoading = useSelector(
        (state: any) => state.deviceManagement?.devices?.deviceStart
    );

    const deviceStopLoading = useSelector(
        (state: any) => state.deviceManagement?.devices?.deviceStop
    );

    useEffect(() => {
        setSelectedRowKeys([]);
        setSelectedActiveIds([]);
        setSelectedInactiveIds([]);
    }, [currentTab]);

    useEffect(() => {
        setDeviceToggleLoading(deviceStartLoading || deviceStopLoading);
    }, [deviceStartLoading, deviceStopLoading]);

    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowKeys([]);
    }, [deviceTableDataList]);

    const language = useSelector(
        (state: any) =>
            state?.userManagement?.users?.loggedInUserDetails?.language
                ?.languageCode
    );

    const [showPopover, setShowPopover] = useState(false);
    useEffect(() => {
        setShowPopover(selectedRowKeys?.length <= 1);
    }, [selectedRowKeys]);

    const headerClickHandler = (): void => {
        if (selectedActiveIds.length > 0 && selectedInactiveIds.length > 0) {
            setDeactivateModalState(true);
        } else if (
            selectedActiveIds.length > 0 &&
            selectedInactiveIds.length === 0
        ) {
            setConfirmModalState('deactivate');
        } else if (
            selectedActiveIds.length === 0 &&
            selectedInactiveIds.length > 0
        ) {
            setConfirmModalState('activateMultiple');
        }
        setHeaderPopoverVisible(false);
    };

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
        setConfirmModalState('activateMultiple');
        setDeactivateModalState(false);
    };
    const handleDeactivate = (): void => {
        setConfirmModalState('deactivate');
        setDeactivateModalState(false);
    };

    const clickHandler = (record: any): void => {
        if (record?.isReadingStarted) {
            dispatch(
                setDeviceStop({
                    deviceId: record?.deviceId,
                })
            );
            setDeviceToggleLoading(true);
        } else {
            dispatch(
                setDeviceStart({
                    deviceId: record?.deviceId,
                })
            );
            setDeviceToggleLoading(true);
        }
    };

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const TableColumns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {selectedRowKeys.length > 1 && (
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
                    )}{' '}
                </div>
            ),
            key: 'more',
            width: 26,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {currentTab ===
                                screenName.deviceManagementDevices && (
                                <Popover
                                    overlayClassName="devicesTablePopover"
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    placement="bottomLeft"
                                    trigger={showPopover ? 'click' : []}
                                    content={
                                        <MoreContent
                                            record={record}
                                            setRecord={setRecord}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            setDeviceState={setDeviceState}
                                            search={search}
                                            pageType={pageType}
                                            setSuccessModalState={
                                                setSuccessModalState
                                            }
                                        />
                                    }
                                    overlayStyle={{ width: '162px' }}
                                >
                                    <MoreOutlined />
                                </Popover>
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            key: 'deviceName',
            width: 159,
            title: (
                <>
                    <div className="devicesTableWrapper__columnTitle deviceName">
                        <div>
                            {languageChangeHandler(language, 'UM-device-name')}
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'deviceName',
            sorter: true,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div
                            className="devicesTableWrapper__nameData__info"
                            onClick={() => {
                                setDeviceState(true);
                                setRecord(record);
                            }}
                        >
                            <div className="devicesTableWrapper__status">
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
                                </span>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'blaName',
            width: 100,
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>{languageChangeHandler(language, 'UM-bla-name')}</div>
                </div>
            ),
            dataIndex: 'blaName',
            sorter: true,
            render: (_: any, record: any) => {
                return (
                    <>
                        <span className="fs-14 fw-500 name">
                            {record?.blaName?.length <
                            deviceManagement.blaNameLength ? (
                                record?.blaName
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {record?.blaName}
                                        </div>
                                    }
                                    visible={isPopoverVisibles[record?.key]}
                                    onVisibleChange={
                                        handlePopoverVisibleChanges
                                    }
                                    placement="topLeft"
                                >
                                    {record?.blaName?.length >
                                    deviceManagement.blaNameLength
                                        ? `${record?.blaName?.slice(
                                              0,
                                              deviceManagement.blaNameLength
                                          )}...`
                                        : record?.blaName}
                                </Popover>
                            )}
                        </span>
                    </>
                );
            },
        },
        {
            key: 'mappedTags',
            width: 215,
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>
                        {languageChangeHandler(language, 'UM-mapped-tags')}
                    </div>
                    <div className="sortArrows"></div>
                </div>
            ),
            dataIndex: 'mappedTags',
            render: (_: any, record: any) => (
                <>
                    <div className="devicesTableWrapper__connectedDevices">
                        <Button
                            className="activeButton"
                            disabled
                            icon={<FireOutlined />}
                        >
                            {record?.activeTagsCount
                                ? `${record?.activeTagsCount}`
                                : '0'}
                        </Button>
                        <Button
                            className="inactiveButton"
                            disabled
                            icon={<WarningOutlined />}
                        >
                            {record?.inactiveTagsCount
                                ? `${record?.inactiveTagsCount}`
                                : '0'}
                        </Button>
                    </div>
                </>
            ),
        },
        {
            key: 'communicationInterface',
            width: 139,
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>
                        {languageChangeHandler(
                            language,
                            'UM-communication-interface'
                        )}
                    </div>
                </div>
            ),
            dataIndex: 'communicationInterface',
            sorter: true,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>{record?.communicationInterface}</div>
                    </>
                );
            },
        },
        {
            key: 'isReadingStarted',
            width: 132,
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>
                        {languageChangeHandler(language, 'UM-data-streaming')}
                    </div>
                </div>
            ),
            dataIndex: 'isReadingStarted',
            sorter: true,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="device__switch">
                            <Switch
                                size="small"
                                key={record.key}
                                checked={record?.isReadingStarted}
                                loading={
                                    record.key ===
                                        selectedKeyRecord?.deviceId &&
                                    deviceToggleLoading
                                }
                                onClick={() => {
                                    setSelectedKeyRecord(record);
                                    clickHandler(record);
                                }}
                            />
                        </div>
                    </>
                );
            },
        },
        {
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>
                        {languageChangeHandler(language, 'UM-last-modified')}
                    </div>
                </div>
            ),
            key: 'updatedOn',
            sorter: true,
            width: 142,
            dataIndex: 'updatedOn',
            render: (_: any, record: any) => (
                <>
                    <div>{moment(record?.updatedOn).format(DATE_FORMAT)}</div>
                </>
            ),
        },
        {
            title: (
                <div className="devicesTableWrapper__columnTitle">
                    <div>
                        {languageChangeHandler(language, 'UM-created-on')}
                    </div>
                </div>
            ),
            key: 'createdOn',
            sorter: true,
            width: 142,
            dataIndex: 'createdOn',
            render: (_: any, record: any) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {moment(record?.createdOn).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
    ];

    const handleTableChange = (
        pagination: any,
        filters: any,
        sorter: any
    ): any => {
        dispatch(
            getDeviceList({
                sortOrder: sortOrderApi[sorter.order],
                sortColumn: deviceSortOption[sorter.columnKey],
                search: search,
                page: pageType?.page,
                pageSize: pageType?.pageSize,
            })
        );
    };

    return (
        <>
            <div className="blaTableWrapper">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowKeys,
                    }}
                    pagination={false}
                    columns={TableColumns}
                    dataSource={tableData}
                    loading={devicesListLoading}
                    onChange={handleTableChange}
                    showSorterTooltip={false}
                    scroll={{ y: 'calc(100vh - 410px)' }}
                />
            </div>
            <ActivateDeactivateMultipleModal
                open={deactivateModalState}
                text="Devices"
                onCancel={setDeactivateModalState}
                activeIds={selectedActiveIds}
                inActiveIds={selectedInactiveIds}
                handleActivate={handleActivate}
                handleDeactivate={handleDeactivate}
            />
            <ConfirmationModal
                open={confirmModalState}
                icon={
                    confirmModalState === 'activateMultiple' ? (
                        <ActivateIcon />
                    ) : (
                        <DeactivateIcon />
                    )
                }
                onOk={() => {
                    if (confirmModalState === 'activateMultiple') {
                        dispatch(
                            activateDeactivateDevices({
                                id: selectedInactiveIds,
                                isActive: true,
                                requestedBy: details.username,
                            })
                        );
                        setSelectedRowKeys([]);
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateDevices({
                                id: selectedActiveIds,
                                isActive: false,
                                requestedBy: details.username,
                            })
                        );
                        setSelectedRowKeys([]);
                    }
                    setSuccessModalState(`${confirmModalState}`);
                    setConfirmModalState(null);
                }}
                onCancel={() => {
                    setConfirmModalState(null);
                }}
                text={`${t('commonStr.areyouSureWant')} ${
                    confirmModalState === 'activateMultiple'
                        ? 'activate'
                        : 'deactivate'
                } ${t('commonStr.selectedDevices')}`}
            />
        </>
    );
};

export default DevicesTable;
