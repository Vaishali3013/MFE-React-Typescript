import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import React, { useState, useEffect } from 'react';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector } from 'react-redux';
import { sortOrder, attribute, attributeSortOption } from 'types/enums';

import EmptyDataComponent from 'components/common/EmptyDataComponent';

import { PAGE } from 'utils/constants';
import { useTranslation } from 'react-i18next';
const UnassignAttributeTable: React.FC<any> = ({
    data,
    payload,
    search,
    selectedAssetkey,
    setAttributeListId,
    setSelectedRowIds,
    selectedRowIds,
    setSortOrder,
    setSortColumn,
    setPage,
    pageSize,
}) => {
    const { t } = useTranslation('translation');
    const [tableData, setTableData] = useState<any>([]);

    const attributeListLoading = useSelector(
        (state: any) => state.implementation?.attribute?.attributesListLoading
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
        setSelectedRowIds([]);
    }, [data]);

    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record?.id]);
                setAttributeListId([...selectedRowIds, record?.id]);
            } else {
                setSelectedRowIds(
                    selectedRowIds?.filter((id: number) => id !== record?.id)
                );
                setAttributeListId(
                    selectedRowIds?.filter((id: number) => id !== record?.id)
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: DataType[]) => {
            if (selected) {
                const newSelectedIds = selectedRows?.map(
                    (record) => record?.id
                );
                setSelectedRowIds(newSelectedIds);
                setAttributeListId(newSelectedIds);
            } else {
                setSelectedRowIds([]);
            }
        },
    };

    const SearchNoDataText = (
        <EmptyDataComponent
            customClassName="SearchEmptyComponent"
            textValue={t('implementation.noResultFoundInSearch')}
            loading={attributeListLoading}
        />
    );
    const attributeUnassignData = useSelector(
        (state: any) => state.implementation?.attribute?.UnassignedAttributeList
    );

    const columns: ColumnsType<any> = [
        {
            key: 'more',
            width: 56,
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('commonStr.name')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__name',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="attributeTableWrapper__nameData"
                        // onClick={() => {
                        //     dispatch(getAttributeDetails(data?.id));
                        // }}
                    >
                        <div className="blaTableWrapper__status">
                            <span className="fs-14 fw-500 name">
                                {data?.name?.length <
                                attribute.attributeNameLength ? (
                                    data?.name
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {data?.name}
                                            </div>
                                        }
                                        placement="topLeft"
                                    >
                                        {data?.name?.length >
                                        attribute.attributeNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  attribute.attributeNameLength
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
                    <div>{t('commonStr.description')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
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
                    <div className="attributeTableWrapper__subItems">
                        <span className="fs-14  name">
                            {data?.description?.length <
                            attribute?.attributeDescriptionLength ? (
                                data?.description
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {data?.description}
                                        </div>
                                    }
                                    placement="topLeft"
                                >
                                    {data?.description?.length >
                                    attribute?.attributeNameLength
                                        ? `${data?.description?.slice(
                                              0,
                                              attribute?.attributeDescriptionLength
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
                    <div>{t('implementation.attribute.properties')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
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
                    <div>{t('implementation.attribute.category')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'category',
            dataIndex: 'category',
            className: 'column__category',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status">
                        {data?.category?.name.replace(/\s/g, '')?.length <
                        attribute?.attributeDescriptionLength ? (
                            data?.category?.name
                        ) : (
                            <Popover
                                overlayClassName="customOverlay"
                                content={
                                    <div className="blaName">
                                        {data?.category?.name}
                                    </div>
                                }
                                placement="topLeft"
                            >
                                {data?.category?.name?.length >
                                attribute?.attributeNameLength
                                    ? `${data?.category?.name?.slice(
                                          0,
                                          attribute?.attributeNameLength
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
                    <div>{t('implementation.attribute.uom')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
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
                    <div className="attributeTableWrapper__status">
                        {data?.unitOfMeasurement?.name}
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {attributeListLoading ? (
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
                    dataSource={tableData}
                    pagination={false}
                    loading={attributeListLoading}
                    locale={{ emptyText: SearchNoDataText }}
                    scroll={
                        attributeUnassignData?.pageResponse?.totalRecords >
                        pageSize
                            ? { y: 'calc(100vh - 525px)' }
                            : { y: 'calc(100vh - 470px)' }
                    }
                />
            )}
        </>
    );
};

export default UnassignAttributeTable;
