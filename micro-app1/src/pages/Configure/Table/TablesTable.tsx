import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './TablesTable.scss';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector, useDispatch } from 'react-redux';
import {
    sortOrder,
    TABLETYPE,
    tableSortOptions,
    tableLength,
} from 'types/enums';
import TableMoreContent from './TableMoreContent';
import TableMultipleActivateDeactivate from './TableMoreContent/TableMultipleActivateDeactivate';
import {
    getTableDetails,
    getTableList,
    setTableState,
} from 'redux/actions/ConfigureActions/tableAction';
import moment from 'moment';
import { DATE_ONLY_FORMAT, PAGE } from 'utils/constants';

const TablesTable: React.FC<any> = ({
    data,
    payload,
    search,
    setSortColumn,
    setSortOrder,
    setPage,
}) => {
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [tableData, setTableData] = useState<any>([]);

    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const dispatch = useDispatch();

    const tableListLoading = useSelector(
        (state: any) => state.configure?.table?.tableListLoading
    );

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.id,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
        // Timeout is used to delay the popUp confirmation message for 1sec
        setTimeout(() => {
            setSelectedRowIds([]);
            setSelectedRows([]);
        }, 1000);
    }, [data]);

    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows?.map((item: any) =>
                item?.isActive
                    ? selectedActiveRows.push(item?.id)
                    : selectedInactiveRows.push(item?.id)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record?.id]);
                setSelectedRows([...selectedRows, record]);
            } else {
                setSelectedRowIds(
                    selectedRowIds?.filter((id: number) => id !== record?.id)
                );
                setSelectedRows(
                    selectedRows.filter((row: any) => row?.key !== record?.key)
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: DataType[]) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows?.map((item: any) =>
                item?.isActive
                    ? selectedActiveRows.push(item?.id)
                    : selectedInactiveRows.push(item?.id)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                const newSelectedIds = selectedRows?.map(
                    (record) => record?.id
                );
                setSelectedRowIds(newSelectedIds);
                setSelectedRows(selectedRows);
            } else {
                setSelectedRowIds([]);
                setSelectedRows([]);
            }
        },
    };

    const [popoverheaderVisible, setPopoverheaderVisible] = useState({
        actions: false,
    });

    const handlePopoverItemClick = (): void => {
        setPopoverheaderVisible({ actions: false });
    };

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const [showPopover, setShowPopover] = useState(false);
    const [showHeaderPopover, setShowHeaderPopover] = useState(false);
    useEffect(() => {
        // Check if selectedRowIds has any entries
        setShowPopover(selectedRowIds.length <= 1);
        setShowHeaderPopover(selectedRowIds.length > 1);
    }, [selectedRowIds]);

    const columns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {showHeaderPopover ? (
                        <Popover
                            visible={popoverheaderVisible.actions}
                            onVisibleChange={(visible) => {
                                setPopoverheaderVisible((prevState: any) => ({
                                    ...prevState,
                                    actions: visible,
                                }));
                            }}
                            content={
                                <div className="custom-popover-content">
                                    <TableMultipleActivateDeactivate
                                        multipleRecord={selectedRows}
                                        selectedUserIds={selectedRowIds}
                                        onItemClick={handlePopoverItemClick}
                                        selectedActiveIds={selectedActiveIds}
                                        selectedInactiveIds={
                                            selectedInactiveIds
                                        }
                                        paginatedPayload={payload}
                                        searchPayload={search}
                                    />
                                </div>
                            }
                            placement="bottomLeft"
                            trigger="click"
                        >
                            <MoreOutlined />
                        </Popover>
                    ) : (
                        ''
                    )}
                </div>
            ),
            key: 'more',
            width: '5%',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            <Popover
                                visible={
                                    // record?.isActive &&
                                    popoverVisible[record.key]
                                }
                                onVisibleChange={(visible) => {
                                    handlePopoverVisibleChange(visible, record);
                                }}
                                placement="bottomLeft"
                                trigger={showPopover ? 'click' : []}
                                content={
                                    <TableMoreContent
                                        record={record}
                                        setPopoverVisible={setPopoverVisible}
                                        paginatedPayload={payload}
                                        searchPayload={search}
                                    />
                                }
                                overlayStyle={{ width: '162px' }}
                            >
                                <MoreOutlined />
                            </Popover>
                        </div>
                    </>
                );
            },
        },
        {
            title: (
                <div className="tableDefinitionWrapper__columnTitle">
                    <div>Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        page: PAGE,
                                        pageSize: payload?.pageSize,
                                        search: search,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: tableSortOptions.TABLE_NAME,
                                    })
                                );
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(tableSortOptions.TABLE_NAME);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        page: PAGE,
                                        pageSize: payload?.pageSize,
                                        search: search,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: tableSortOptions.TABLE_NAME,
                                    })
                                );
                                setSortOrder(sortOrder.descending);
                                setSortColumn(tableSortOptions.TABLE_NAME);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__name',
            width: '20%',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="tableDefinitionWrapper__nameData"
                        onClick={() => {
                            dispatch(getTableDetails(data?.id));
                            dispatch(setTableState(TABLETYPE.view));
                        }}
                    >
                        <div className="blaTableWrapper__status">
                            {data.isActive ? (
                                <>
                                    <ActiveDotIcon />
                                </>
                            ) : (
                                <InactiveDotIcon />
                            )}

                            <span className="fs-14 fw-500 name">
                                {data?.name?.length <
                                tableLength.tableNameLength ? (
                                    data?.name
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {data?.name}
                                            </div>
                                        }
                                        visible={isPopoverVisibles[data?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        {data?.name?.length >
                                        tableLength.tableNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  tableLength.tableNameLength
                                              )}...`
                                            : data?.name}
                                    </Popover>
                                )}
                            </span>
                        </div>
                    </div>
                </>
            ),
        },

        {
            title: (
                <div className="tableDefinitionWrapper__columnTitle">
                    <div>Description</div>
                    {/* Will use later on if required */}
                    {/* <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        ...payload,
                                        search: search,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn:
                                            attributeSortOption.DESCRIPTION,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        ...payload,
                                        search: search,
                                        sortOrder: sortOrder.descending,
                                        sortColumn:
                                            attributeSortOption.DESCRIPTION,
                                    })
                                );
                            }}
                        />
                    </div> */}
                </div>
            ),
            dataIndex: 'description',
            key: 'description',
            className: 'column__description',
            width: '50%',
            render: (_: any, data: any) => (
                <>
                    <div className="tableDefinitionWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description.replace(/\s/g, '').length <
                            tableLength.tableDescriptionLength ? (
                                data?.description
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {data?.description}
                                        </div>
                                    }
                                    visible={isPopoverVisibles[data?.key]}
                                    onVisibleChange={
                                        handlePopoverVisibleChanges
                                    }
                                    placement="topLeft"
                                >
                                    {data?.description?.length >
                                    tableLength.tableDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,
                                              tableLength.tableDescriptionLength
                                          )}...`
                                        : data?.description}
                                </Popover>
                            )}
                        </span>
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="tableDefinitionWrapper__columnTitle">
                    <div>Created On</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        page: PAGE,
                                        pageSize: payload?.pageSize,
                                        search: search,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: tableSortOptions.CREATED_ON,
                                    })
                                );
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(tableSortOptions.CREATED_ON);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTableList({
                                        page: PAGE,
                                        pageSize: payload?.pageSize,
                                        search: search,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: tableSortOptions.CREATED_ON,
                                    })
                                );
                                setSortOrder(sortOrder.descending);
                                setSortColumn(tableSortOptions.CREATED_ON);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'createOn',
            key: 'createOn',
            className: 'column__createOn',
            width: '20%',
            render: (_: any, data: any) => (
                <>
                    <div className="tableDefinitionWrapper__status">
                        {moment(data?.createdOn).format(DATE_ONLY_FORMAT)}
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {tableListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowIds,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={tableListLoading}
                    scroll={{ y: 'calc(100vh - 390px)' }}
                />
            )}
        </>
    );
};

export default TablesTable;
