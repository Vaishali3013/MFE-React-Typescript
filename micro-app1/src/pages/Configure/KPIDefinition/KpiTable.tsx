import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './KpiTable.scss';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector, useDispatch } from 'react-redux';
import { sortOrder, KPITYPE, kpiSortOption, kpiDefinition } from 'types/enums';
import KpiMultipleActiveDeactive from './KpiMoreContent/KpiMultipleActivateDeactivate';
import KpiMoreContent from './KpiMoreContent';
import { PAGE } from 'utils/constants';
import {
    getKpiDetails,
    getKpiList,
    setKpiState,
} from 'redux/actions/ConfigureActions/kpiActions';
import EmptyDataComponent from 'components/common/EmptyDataComponent';

const KpiTable: React.FC<any> = ({
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

    const kpiListLoading = useSelector(
        (state: any) => state.configure?.kpi?.kpiListLoading
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

    const SearchNoDataText = (
        <EmptyDataComponent
            textValue="No Results, Try a different search item"
            loading={kpiListLoading}
        />
    );

    const sortingFunction = (
        columnTobeSorted: number,
        orderOfSort: number
    ): void => {
        dispatch(
            getKpiList({
                ...payload,
                search: search,
                sortOrder: orderOfSort,
                sortColumn: columnTobeSorted,
            })
        );
        setSortOrder(orderOfSort);
        setSortColumn(columnTobeSorted);
        setPage(PAGE);
    };

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
                                    <KpiMultipleActiveDeactive
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
            width: 56,
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
                                    <KpiMoreContent
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
                <div className="kpiTableWrapper__columnTitle">
                    <div>KPIs Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_NAME,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_NAME,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__kpiName',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="kpiTableWrapper__nameData"
                        onClick={() => {
                            dispatch(getKpiDetails(data?.id));
                            dispatch(setKpiState(KPITYPE?.view));
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
                                kpiDefinition.kpiNameLength ? (
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
                                        kpiDefinition.kpiNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  kpiDefinition.kpiNameLength
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
                <div className="kpiTableWrapper__columnTitle">
                    <div>Description</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_DESCRIPTION,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_DESCRIPTION,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'description',
            key: 'description',
            className: 'column__description',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description?.replace(/\s/g, '')?.length <
                            kpiDefinition?.kpiDescriptionLength ? (
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
                                    kpiDefinition?.kpiDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,
                                              kpiDefinition?.kpiDescriptionLength
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
                <div className="kpiTableWrapper__columnTitle">
                    <div>Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_TYPE,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.KPI_TYPE,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'type',
            key: 'type',
            className: 'column__type',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.kpiType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Node Level</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.NODE_LEVEL,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.NODE_LEVEL,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'nodeLevel',
            dataIndex: 'nodeLevel',
            className: 'column__nodeLevel',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.nodeType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Value Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.DATA_TYPE,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.DATA_TYPE,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'valueType',
            key: 'valueType',
            className: 'column__valueType',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.valueType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>UOM</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.UOM,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.UOM,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'uom',
            key: 'uom',
            className: 'column__uom',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.unitOfMeasurement?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Aggregation Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.AGGREGATION_TYPE,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.AGGREGATION_TYPE,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'aggregationType',
            key: 'aggregationType',
            className: 'column__aggregationType',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.aggregationType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Target Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.TARGET_TYPE,
                                    sortOrder.ascending
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                sortingFunction(
                                    kpiSortOption.TARGET_TYPE,
                                    sortOrder.descending
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'targetType',
            key: 'targetType',
            className: 'column__targetType',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.targetType?.name}
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {kpiListLoading ? (
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
                    loading={kpiListLoading}
                    scroll={{ y: 'calc(100vh - 390px)' }}
                    locale={{
                        emptyText: SearchNoDataText,
                    }}
                    onRow={(record: any) => {
                        return {
                            onMouseLeave: () => {
                                // Set popover visibility for the current record
                                handlePopoverVisibleChange(false, record);
                            },
                        };
                    }}
                />
            )}
        </>
    );
};

export default KpiTable;
