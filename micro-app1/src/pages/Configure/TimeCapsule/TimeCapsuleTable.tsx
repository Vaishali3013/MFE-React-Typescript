import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { ReactComponent as ExpandIcon } from 'assets/icons/ExpandIcon.svg';
import { ReactComponent as CollapseIcon } from 'assets/icons/CollapseIcon.svg';
import './TimeCapsuleTable.scss';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector, useDispatch } from 'react-redux';
import {
    sortOrder,
    attributeSortOption,
    TIMECAPSULETYPE,
    timeCapsule,
} from 'types/enums';
import {
    getTimeCapsuleDetails,
    getTimeCapsuleList,
    setTimeCapsuleState,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import TimeCapsuleMoreContent from './TimeCapsuleMoreContent';
import TimeCapsuleMultipleActiveDeactive from './TimeCapsuleMoreContent/TimeCapsuleMultipleActivateDeactivate';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';

const TimeCapsuleTable: React.FC<any> = ({ data, payload, search }) => {
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

    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleListLoading
    );

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );

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
            setExpandedRowKeys([]);
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

    const SearchNoDataText = (
        <EmptyDataComponent
            textValue="No Results, Try a different search item"
            loading={timeCapsuleListLoading}
        />
    );

    const [showPopover, setShowPopover] = useState(false);
    const [showHeaderPopover, setShowHeaderPopover] = useState(false);
    useEffect(() => {
        // Check if selectedRowIds has any entries
        setShowPopover(selectedRowIds.length <= 1);
        setShowHeaderPopover(selectedRowIds.length > 1);
    }, [selectedRowIds]);

    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);

    const handleExpand = (expanded: any, record: any): any => {
        if (expanded) {
            setExpandedRowKeys([record.key]);
        } else {
            setExpandedRowKeys([]);
        }
    };
    const customExpandIcon = ({ expanded, onExpand, record }: any): any => {
        return expanded && record?.id === timeCapsuleDetails?.id ? (
            <CollapseIcon
                className="collapseIconTimeCapsule"
                onClick={() => onExpand(record, false)}
            />
        ) : (
            <div
                className="expandIconTimeCapsule"
                onClick={() => {
                    onExpand(record, true);
                    dispatch(
                        getTimeCapsuleDetails({
                            id: record?.id,
                            page: -1,
                        })
                    );
                }}
            >
                <ExpandIcon />
                <div className="timeCapsuleIconTextStyle">View More</div>
            </div>
        );
    };

    const expandedRowRender = (record: any): any => {
        const columns: any = [
            {
                title: (
                    <div className="attributeTableWrapper__columnTitle">
                        <div>Name</div>
                    </div>
                ),
                dataIndex: 'name',
                key: 'name',
                className: 'column__attributeName',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__nameData">
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
                                    timeCapsule.attributeNameLength ? (
                                        data?.name
                                    ) : (
                                        <Popover
                                            overlayClassName="customOverlay"
                                            content={
                                                <div className="blaName">
                                                    {data?.name}
                                                </div>
                                            }
                                            visible={
                                                isPopoverVisibles[data?.key]
                                            }
                                            onVisibleChange={
                                                handlePopoverVisibleChanges
                                            }
                                            placement="topLeft"
                                        >
                                            {data?.name?.length >
                                            timeCapsule.attributeNameLength
                                                ? `${data?.name?.slice(
                                                      0,
                                                      timeCapsule.attributeNameLength
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
                    <div className="attributeTableWrapper__columnTitle">
                        <div>Description</div>
                    </div>
                ),
                dataIndex: 'description',
                key: 'description',
                className: 'column__attributeDescription',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__subItems">
                            <span className="fs-14 fw-500 name">
                                {data?.description?.replace(/\s/g, '')?.length <
                                timeCapsule?.attributeDescriptionLength ? (
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
                                        timeCapsule?.attributeDescriptionLength
                                            ? `${data?.description?.slice(
                                                  0,
                                                  timeCapsule?.attributeDescriptionLength
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
                    <div className="attributeTableWrapper__columnTitle">
                        <div>Properties</div>
                    </div>
                ),
                dataIndex: 'properties',
                key: 'properties',
                className: 'column__properties',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__status">
                            {data?.properties?.name}
                        </div>
                    </>
                ),
            },
            {
                title: (
                    <div className="attributeTableWrapper__columnTitle">
                        <div>Category</div>
                    </div>
                ),
                key: 'category',
                dataIndex: 'category',
                className: 'column__category',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__status">
                            {data?.category?.name?.replace(/\s/g, '')?.length <
                            timeCapsule?.attributeDescriptionLength ? (
                                data?.category?.name
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {data?.category?.name}
                                        </div>
                                    }
                                    visible={isPopoverVisibles[data?.key]}
                                    onVisibleChange={
                                        handlePopoverVisibleChanges
                                    }
                                    placement="topLeft"
                                >
                                    {data?.category?.name?.length >
                                    timeCapsule?.attributeNameLength
                                        ? `${data?.category?.name?.slice(
                                              0,
                                              timeCapsule?.attributeNameLength
                                          )}...`
                                        : data?.category?.name}
                                </Popover>
                            )}
                        </div>
                    </>
                ),
            },
            {
                title: (
                    <div className="attributeTableWrapper__columnTitle">
                        <div>UOM</div>
                    </div>
                ),
                dataIndex: 'uom',
                key: 'uom',
                className: 'column__uom',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__status">
                            {data?.unitOfMeasurement?.name}
                        </div>
                    </>
                ),
            },
            {
                title: (
                    <div className="attributeTableWrapper__columnTitle">
                        <div>Value Type</div>
                    </div>
                ),
                dataIndex: 'valueType',
                key: 'valueType',
                className: 'column__valueType',
                render: (_: any, data: any) => (
                    <>
                        <div className="attributeTableWrapper__status">
                            {data?.dataType?.name}
                        </div>
                    </>
                ),
            },
        ];

        return (
            record?.id === timeCapsuleDetails?.id && (
                <Table
                    columns={columns}
                    dataSource={timeCapsuleDetails?.pageResponse?.records}
                    pagination={false}
                />
            )
        );
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
                                    <TimeCapsuleMultipleActiveDeactive
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
            width: 15,
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
                                    <TimeCapsuleMoreContent
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
                <div className="timeCapsuleWrapper__columnTitle">
                    <div>Time Capsule Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleList({
                                        ...payload,
                                        search: search,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn:
                                            attributeSortOption.ATTRIBUTE_NAME,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleList({
                                        ...payload,
                                        search: search,
                                        sortOrder: sortOrder.descending,
                                        sortColumn:
                                            attributeSortOption.ATTRIBUTE_NAME,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__name',
            width: 130,
            render: (_: any, data: any) => (
                <>
                    <div
                        className="timeCapsuleWrapper__nameData"
                        onClick={() => {
                            dispatch(
                                getTimeCapsuleDetails({
                                    id: data?.id,
                                    page: PAGE,
                                    pageSize: PAGE_SIZE,
                                })
                            );
                            dispatch(setTimeCapsuleState(TIMECAPSULETYPE.view));
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
                                timeCapsule.timeCapsuleNameLength ? (
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
                                        timeCapsule.timeCapsuleNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  timeCapsule.timeCapsuleNameLength
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
                <div className="timeCapsuleWrapper__columnTitle">
                    <div>Description</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleList({
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
                                    getTimeCapsuleList({
                                        ...payload,
                                        search: search,
                                        sortOrder: sortOrder.descending,
                                        sortColumn:
                                            attributeSortOption.DESCRIPTION,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'description',
            key: 'description',
            className: 'column__description',
            width: 180,
            render: (_: any, data: any) => (
                <>
                    <div className="timeCapsuleWrapper__description">
                        <span className="fs-14 fw-500 name">
                            {data?.description?.length <
                            timeCapsule.timeCapsuleDescriptionLength ? (
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
                                    timeCapsule.timeCapsuleDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,
                                              timeCapsule.timeCapsuleDescriptionLength
                                          )}...`
                                        : data?.description}
                                </Popover>
                            )}
                        </span>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {timeCapsuleListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowIds,
                        columnWidth: 10,
                    }}
                    expandable={{
                        expandedRowKeys,
                        onExpand: handleExpand,
                        expandedRowRender,
                        expandIcon: customExpandIcon,
                        expandIconColumnIndex:
                            columns.findIndex(
                                (col) => col.key === 'description'
                            ) + 2,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={timeCapsuleListLoading}
                    scroll={{ y: 'calc(100vh - 390px)' }}
                    locale={{
                        emptyText: SearchNoDataText,
                    }}
                />
            )}
        </>
    );
};

export default TimeCapsuleTable;
