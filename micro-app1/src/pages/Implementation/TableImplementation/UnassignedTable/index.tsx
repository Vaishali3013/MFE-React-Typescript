import Table, { type ColumnsType } from 'antd/es/table';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { Popover, Spin } from 'antd';
import {
    implementationTableSortOption,
    sortOrder,
    tableImplementation,
} from 'types/enums';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DATE_ONLY_FORMAT, PAGE } from 'utils/constants';
import './index.scss';
import { useSelector } from 'react-redux';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useTranslation } from 'react-i18next';
const UnassignedTable: React.FC<any> = ({
    search,
    selectedRowIds,
    setSelectedRowIds,
    pageSize,
    setPage,
    setPageSize,
    setSortColumn,
    setSortOrder,
}) => {
    const { t } = useTranslation('translation');
    const tableListLoading = useSelector(
        (state: any) => state?.implementation?.table?.tableListLoading
    );
    const unassignedTable = useSelector(
        (state: any) => state?.implementation?.table?.unassignedTableList
    );
    const unassignedTotalCount = useSelector(
        (state: any) => state?.implementation?.table?.unassignedTotalCount
    );
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    useEffect(() => {
        setSelectedRowIds([]);
    }, [search]);
    const tableDataMapper = (): [] => {
        const temp: any = [];
        unassignedTable?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item?.id,
                value: item?.id,
                label: item?.name,
            });
        });
        return temp;
    };
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };
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
    const SearchNoDataText = (
        <EmptyDataComponent
            textValue={t('implementation.noResultFoundInSearch')}
            loading={tableListLoading}
            customClassName="SearchEmptyComponent"
        />
    );
    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="unassignedTableWrapper__columnTitle">
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
                    <div className="unassignedTableWrapper__nameData">
                        <div className="unassignedTableWrapper__statusText">
                            <span className="fs-14 fw-500 name">
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
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="unassignedTableWrapper__columnTitle">
                    <div>{t('commonStr.description')}</div>
                </div>
            ),
            width: 430,
            dataIndex: 'description',
            key: 'description',
            render: (_: any, data: any) => (
                <>
                    <div className="unassignedTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description.replace(/\s/g, '').length <
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
                <div className="unassignedTableWrapper__columnTitle">
                    <div>{t('commonStr.createdOn')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setPage(PAGE);
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    implementationTableSortOption.createdOn
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
                                    implementationTableSortOption.createdOn
                                );
                                setSelectedRowIds([]);
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'createdOn',
            width: 218,
            dataIndex: 'createdOn',
            render: (_: any, record: any) => (
                <>
                    <div className="unassignedTableWrapper__status">
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
                        unassignedTotalCount > pageSize
                            ? { y: 'calc(100vh - 510px)' }
                            : { y: 'calc(100vh - 450px)' }
                    }
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}
        </>
    );
};
export default UnassignedTable;
