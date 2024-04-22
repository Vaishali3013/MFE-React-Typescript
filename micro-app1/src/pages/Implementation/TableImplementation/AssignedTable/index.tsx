import Table, { type ColumnsType } from 'antd/es/table';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { Badge, Popover, Spin } from 'antd';
import {
    EMPTY,
    implementationTableSortOption,
    implementationTableState,
    sortOrder,
    tableImplementation,
} from 'types/enums';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DATE_ONLY_FORMAT, PAGE } from 'utils/constants';
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons';
import './index.scss';
import { useSelector } from 'react-redux';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import TableMultipleMoreContent from './TableMultipleMoreContent';
import TableMoreContent from './TableMoreContent';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AssignedTable: React.FC<any> = ({
    assignedTableData,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSortOrder,
    setSortColumn,
    setShowTableDetails,
    setSelectedTable,
    search,
}) => {
    const { t } = useTranslation('translation');
    const { currentTab } = useParams();
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const [popoverheaderVisible, setPopoverheaderVisible] = useState({
        actions: false,
    });
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    useEffect(() => {
        setSelectedRowIds([]);
    }, [search, page, pageSize, selectedAsset, currentTab]);

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState: any) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };
    const handleHeaderPopoverItemClick = (): void => {
        setPopoverheaderVisible({ actions: false });
    };
    const handlePopoverItemClick = (): void => {
        setPopoverVisible({ actions: false });
    };
    const tableListLoading = useSelector(
        (state: any) => state?.implementation?.table?.tableListLoading
    );
    const assignedTotalCount = useSelector(
        (state: any) => state?.implementation?.table?.assignedTotalCount
    );
    const SearchNoDataText = (
        <EmptyDataComponent
            textValue={t('implementation.noResultFoundInSearch')}
            loading={tableListLoading}
            customClassName="SearchEmptyComponent"
        />
    );
    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
            const tempRowIds: number[] = [];
            selectedRows.map((item: any) => {
                tempRowIds.push(item?.id);
            });
            setSelectedRowIds(tempRowIds);
        },
        onSelectAll: (selected: boolean, selectedRows: any) => {
            const tempRowIds: number[] = [];
            selectedRows.map((item: any) => {
                tempRowIds.push(item?.id);
            });
            setSelectedRowIds(tempRowIds);
        },
    };
    const tableDataMapper = (): [] => {
        const temp: any = [];
        assignedTableData?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item?.id,
                value: item?.id,
                label: item?.name,
            });
        });
        return temp;
    };
    const columns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {selectedRowIds?.length > 1 ? (
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
                                    <TableMultipleMoreContent
                                        selectedRowIds={selectedRowIds}
                                        onItemClick={
                                            handleHeaderPopoverItemClick
                                        }
                                        setSelectedRowIds={setSelectedRowIds}
                                    />
                                </div>
                            }
                            placement="bottomLeft"
                            trigger="click"
                            overlayStyle={{ width: '118px' }}
                            overlayClassName="tableMultiplePopover"
                        >
                            <MoreOutlined />
                        </Popover>
                    ) : (
                        EMPTY.string
                    )}
                </div>
            ),
            key: 'more',
            width: 26,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {' '}
                            {selectedRowIds?.length <= 1 ? (
                                <Popover
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    placement="bottomLeft"
                                    trigger="click"
                                    content={
                                        <TableMoreContent
                                            selectedRowIds={[record?.id]}
                                            onItemClick={handlePopoverItemClick}
                                            setSelectedRowIds={
                                                setSelectedRowIds
                                            }
                                            setShowTableDetails={
                                                setShowTableDetails
                                            }
                                            selectedRow={record}
                                            setSelectedTable={setSelectedTable}
                                        />
                                    }
                                    overlayStyle={{ width: '162px' }}
                                    overlayClassName="tableMultiplePopover"
                                >
                                    <MoreOutlined />
                                </Popover>
                            ) : (
                                <MoreOutlined />
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            title: (
                <div className="assignedTableWrapper__columnTitle">
                    <div>{t('commonStr.name')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setPage(PAGE);
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    implementationTableSortOption.tableName
                                );
                                setSelectedRowIds([]);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setPage(PAGE);
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    implementationTableSortOption.tableName
                                );
                                setSelectedRowIds([]);
                            }}
                        />
                    </div>
                </div>
            ),
            width: 180,
            dataIndex: 'name',
            key: 'name',
            render: (_: any, data: any) => (
                <>
                    <div className="assignedTableWrapper__nameData">
                        <div className="assignedTableWrapper__statusText">
                            <span
                                className="fs-14 fw-500 name"
                                onClick={() => {
                                    if (data?.isValidated) {
                                        setShowTableDetails(
                                            implementationTableState.VIEW
                                        );
                                        setSelectedTable(data);
                                        setSelectedRowIds([]);
                                    }
                                }}
                            >
                                {data?.name?.length <
                                tableImplementation.tableNameLength ? (
                                    <>{data?.name}</>
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
                                        tableImplementation.tableNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  tableImplementation.tableNameLength
                                              )}...`
                                            : data?.name}
                                    </Popover>
                                )}
                            </span>
                        </div>
                        {data?.isValidated ? (
                            <div className="assignedTableWrapper__statusValidated">
                                <span className="fs-14 fw-500">
                                    <CheckCircleFilled />
                                </span>
                            </div>
                        ) : (
                            <div className="assignedTableWrapper__statusNotValidated">
                                <span
                                    className="fs-14 fw-500"
                                    onClick={() => {
                                        if (!data?.isValidated) {
                                            setShowTableDetails(
                                                implementationTableState.VALIDATE
                                            );
                                            setSelectedTable(data);
                                            setSelectedRowIds([]);
                                        }
                                    }}
                                >
                                    <Badge
                                        count={t('implementation.validate')}
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="assignedTableWrapper__columnTitle">
                    <div>{t('commonStr.description')}</div>
                </div>
            ),
            width: 430,
            dataIndex: 'description',
            key: 'description',
            render: (_: any, data: any) => (
                <>
                    <div className="assignedTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description?.replace(/\s/g, EMPTY.string)
                                ?.length <
                            tableImplementation.tableDescriptionLength ? (
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
                                    tableImplementation.tableDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,
                                              tableImplementation.tableDescriptionLength
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
                <div className="assignedTableWrapper__columnTitle">
                    <div>{t('implementation.table.modifiedOn')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setPage(PAGE);
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    implementationTableSortOption.updatedOn
                                );
                                setSelectedRowIds([]);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setPage(PAGE);
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    implementationTableSortOption.updatedOn
                                );
                                setSelectedRowIds([]);
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'updatedOn',
            width: 218,
            dataIndex: 'updatedOn',
            render: (_: any, record: any) => (
                <>
                    <div className="assignedTableWrapper__status">
                        {moment(record.updatedOn).format(DATE_ONLY_FORMAT)}
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            {tableListLoading ? (
                <div className="implementation_loader">
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
                    dataSource={tableDataMapper()}
                    pagination={false}
                    scroll={
                        assignedTotalCount > pageSize
                            ? { y: 'calc(100vh - 450px)' }
                            : { y: 'calc(100vh - 390px)' }
                    }
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}
        </>
    );
};
export default AssignedTable;
