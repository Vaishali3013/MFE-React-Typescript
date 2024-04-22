import React, { type ReactNode, useState, useEffect } from 'react';
import { Popover, Table, Button } from 'antd';
import './index.scss';
import { type ColumnsType } from 'antd/es/table';
import {
    MoreOutlined,
    FireOutlined,
    WarningOutlined,
    DisconnectOutlined,
} from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
    getBlasList,
    activateDeactivateBlas,
} from 'redux/actions/DeviceManagementActions/blasAction';
import {
    BLASSORT,
    screenName,
    deviceManagement,
    sortOrderApi,
} from 'types/enums';
import MoreContent from './BlaMoreContent';
import { addSelectedBLAToRedux } from 'redux/actions/DeviceManagementActions/deviceAction';
import { DATE_FORMAT } from 'utils/constants';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import { parseJwt } from 'utils/jwtTokenFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ascendingSort, decendingSort } from 'utils/commonFunction';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlaTable: React.FC<any> = ({
    setBlaState,
    blaTableDataList,
    search,
    pageType,
    setRecord,
    screen,
    setSuccessModalState,
    isAddDeviceClicked,
}) => {
    const { currentTab } = useParams();
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState<any>([]);
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [deactivateModalState, setDeactivateModalState] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const [headerPopoverVisible, setHeaderPopoverVisible] = useState(false);

    const details = parseJwt();
    const { t } = useTranslation('translation');
    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };

    const handleActivate = (): void => {
        setConfirmModalState('activate');
        setDeactivateModalState(false);
    };
    const handleDeactivate = (): void => {
        setConfirmModalState('deactivate');
        setDeactivateModalState(false);
    };

    const selectedRowDataList = useSelector(
        (state: any) => state.deviceManagement?.devices?.selectedBla
    );

    useEffect(() => {
        const blaId: any = selectedRowDataList.map((item: any) => item.blaId);
        const uniqueUserIds: any = Array.from(
            new Set([...selectedRowKeys, ...blaId])
        );
        setSelectedRowKeys(uniqueUserIds);
    }, [selectedRowDataList]);

    const rowSelection: any = {
        onSelect: (record: any, selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.blaId)
                    : selectedInactiveRows.push(item.blaId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            // dispatch(addSelectedBLAToRedux(selectedRows));
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.blaId)
                    : selectedInactiveRows.push(item.blaId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedRowKeys(selectedRowKeys);
            dispatch(addSelectedBLAToRedux(selectedRows));
        },
    };

    // function handleRowSelectionChange(selectedRowKeys: any): void {
    //     setSelectedRowKeys(selectedRowKeys);
    //     //dispatch(addSelectedBLAToRedux(selectedRowKeys));

    //   }

    const tableDataMapper = (): [] => {
        const temp: any = [];
        blaTableDataList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.blaId,
                name: item.name,
            });
        });
        return temp;
    };

    useEffect(() => {
        setTableData(tableDataMapper());
        if (screen !== 'devices') {
            setSelectedRowKeys([]);
        }
    }, [blaTableDataList]);

    const blasListLoading = useSelector(
        (state: any) => state.deviceManagement?.blas?.blasListLoading
    );

    useEffect(() => {
        setSelectedRowKeys([]);
        setSelectedActiveIds([]);
        setSelectedInactiveIds([]);
    }, [currentTab]);

    const [showPopover, setShowPopover] = useState(false);
    useEffect(() => {
        setShowPopover(selectedRowKeys?.length <= 1);
    }, [selectedRowKeys]);

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
                                values.map((item) => {
                                    return (
                                        <li
                                            key={item.title}
                                            className="blaMoreContent_items"
                                        >
                                            <span
                                                className="moreContent__option"
                                                onClick={() => {
                                                    if (
                                                        selectedActiveIds.length >
                                                            0 &&
                                                        selectedInactiveIds.length >
                                                            0
                                                    ) {
                                                        setDeactivateModalState(
                                                            true
                                                        );
                                                    } else if (
                                                        selectedActiveIds.length >
                                                            0 &&
                                                        selectedInactiveIds.length ===
                                                            0
                                                    ) {
                                                        setConfirmModalState(
                                                            'deactivate'
                                                        );
                                                    } else if (
                                                        selectedActiveIds.length ===
                                                            0 &&
                                                        selectedInactiveIds.length >
                                                            0
                                                    ) {
                                                        setConfirmModalState(
                                                            'activate'
                                                        );
                                                    }
                                                    setHeaderPopoverVisible(
                                                        false
                                                    );
                                                }}
                                            >
                                                <span className="moreContentIcon">
                                                    {item.icon}
                                                </span>
                                                {item.title}
                                            </span>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </>
        );
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
                    {selectedRowKeys?.length > 1 && (
                        <Popover
                            overlayClassName="blaMultiplePopover"
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
                            {screen !== screenName.deviceManagementDevices &&
                                currentTab ===
                                    screenName.deviceManagementBlas && (
                                    <Popover
                                        visible={popoverVisible[record.key]}
                                        overlayClassName="blaTablePopover"
                                        trigger={showPopover ? 'click' : []}
                                        onVisibleChange={(visible) => {
                                            handlePopoverVisibleChange(
                                                visible,
                                                record
                                            );
                                        }}
                                        content={
                                            <div className="moreContent__popOver">
                                                <MoreContent
                                                    record={record}
                                                    setPopoverVisible={
                                                        setPopoverVisible
                                                    }
                                                    setBlaState={setBlaState}
                                                    setRecord={setRecord}
                                                    setSuccessModalState={
                                                        setSuccessModalState
                                                    }
                                                />
                                            </div>
                                        }
                                        placement="bottomLeft"
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
            key: 'name',
            width: 159,
            title: (
                <>
                    <div className="blaTableWrapper__columnTitle">
                        <div className="pl-15">
                            {t('deviceMang.bla.blaName')}
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'name',
            sorter: true,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div
                            className="blaTableWrapper__nameData__info"
                            onClick={() => {
                                screen !== screenName.deviceManagementDevices &&
                                    setBlaState(true);
                                setRecord(record);
                            }}
                        >
                            <div className="blaTableWrapper__status">
                                {record.isActive ? (
                                    <>
                                        <ActiveDotIcon />
                                    </>
                                ) : (
                                    <InactiveDotIcon />
                                )}

                                <span className="fs-14 fw-500 name">
                                    {record?.name?.length <
                                    deviceManagement.blaNameLength ? (
                                        record?.name
                                    ) : (
                                        <Popover
                                            overlayClassName="customOverlay"
                                            content={
                                                <div className="blaName">
                                                    {record?.name}
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
                                            {record?.name?.length >
                                            deviceManagement.blaNameLength
                                                ? `${record?.name?.slice(
                                                      0,
                                                      deviceManagement.blaNameLength
                                                  )}...`
                                                : record?.name}
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
            key: 'uuid',
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.uniqueIdentity')}</div>
                    {/* <div className="sortArrows">
                        <UpArrow />
                        <DownArrow fill="white" />
                    </div> */}
                </div>
            ),
            dataIndex: 'uuid',
        },
        {
            key: 'connectedDevices',
            width: 300,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.connectedDevices')}</div>
                    <div className="sortArrows">
                        {/* <UpArrow />
                        <DownArrow fill="white" /> */}
                    </div>
                </div>
            ),
            dataIndex: 'connectedDevices',
            render: (_: any, record: any) => (
                <>
                    <div className="blaTableWrapper__connectedDevices">
                        <Button
                            className="activeButton"
                            disabled
                            icon={<FireOutlined />}
                        >
                            {record?.activeDevicesCount
                                ? `${record?.activeDevicesCount}`
                                : '0'}
                        </Button>
                        <Button
                            className="inactiveButton"
                            disabled
                            icon={<WarningOutlined />}
                        >
                            {record?.inActiveDevicesCount
                                ? `${record?.inActiveDevicesCount}`
                                : '0'}
                        </Button>
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.lastModified')}</div>
                </div>
            ),
            key: 'updatedOn',
            width: 218,
            sorter: true,
            dataIndex: 'updatedOn',
            render: (_: any, record: any) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {moment(record.updatedOn).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('deviceMang.bla.createdOn')}</div>
                </div>
            ),
            key: 'createdOn',
            width: 218,
            sorter: true,
            dataIndex: 'createdOn',
            render: (_: any, record: any) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {moment(record.createdOn).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
    ];
    const [selectionType, setSelectionType] = useState('checkbox');

    useEffect(() => {
        if (screen === screenName.deviceManagementDevices)
            setSelectionType('radio');
    }, [screen]);

    const handleTableChange = (
        pagination: any,
        filters: any,
        sorter: any
    ): any => {
        if (screen === 'devices') {
            if (sorter.order === 'ascend') {
                setTableData(ascendingSort(sorter.columnKey, [...tableData]));
            } else {
                setTableData(decendingSort(sorter.columnKey, [...tableData]));
            }
        } else {
            dispatch(
                getBlasList({
                    sortOrder: sortOrderApi[sorter.order],
                    sortColumn: BLASSORT[sorter.columnKey],
                    search: search,
                    page: pageType?.page,
                    pageSize: pageType?.pageSize,
                })
            );
        }
    };
    return (
        <>
            <div className="blaTableWrapper">
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        // ...onchange,
                        selectedRowKeys: selectedRowKeys,
                        // onChange: handleRowSelectionChange,
                    }}
                    pagination={false}
                    columns={TableColumns}
                    dataSource={tableData}
                    loading={blasListLoading}
                    scroll={{ y: 'calc(100vh - 400px)' }}
                    onChange={handleTableChange}
                    showSorterTooltip={false}
                />
            </div>
            <ActivateDeactivateMultipleModal
                open={deactivateModalState}
                text="BLAs"
                onCancel={setDeactivateModalState}
                activeIds={selectedActiveIds}
                inActiveIds={selectedInactiveIds}
                handleActivate={handleActivate}
                handleDeactivate={handleDeactivate}
            />
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
                            activateDeactivateBlas({
                                id: selectedInactiveIds,
                                active: true,
                                updatedBy: details.username,
                            })
                        );
                        setSelectedRowKeys([]);
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateBlas({
                                id: selectedActiveIds,
                                active: false,
                                updatedBy: details.username,
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
                text={`Are you sure you want to ${confirmModalState} selected BLAs?`}
            />
        </>
    );
};

export default BlaTable;
