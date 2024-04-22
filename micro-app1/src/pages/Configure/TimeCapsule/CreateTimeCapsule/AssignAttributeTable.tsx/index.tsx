import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin, Tooltip } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './index.scss';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector, useDispatch } from 'react-redux';
import {
    sortOrder,
    ATTRIBUTETYPE,
    attribute,
    attributeSortOption,
} from 'types/enums';
import {
    getAttributeDetails,
    getAttributesList,
    setAttributeState,
} from 'redux/actions/ConfigureActions/attributeActions';
import { getTimeCapsuleDetails } from 'redux/actions/ConfigureActions/timeCapsuleActions';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
const AssignAttributeTable: React.FC<any> = ({
    data,
    payload,
    search,
    status,
    setAttributesSelectedIds,
    capsuleId,
    isAssign,
    totalCountWithoutSearch,
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const dispatch = useDispatch();

    const attributeListLoading = useSelector(
        (state: any) => state.configure?.attributes?.attributesListLoading
    );

    const timeCapsuleDetailLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
    );

    const SearchNoDataText = (
        <EmptyDataComponent
            textValue={
                totalCountWithoutSearch > 0
                    ? 'No Results, Try a different search item'
                    : 'No Attributes added yet'
            }
            loading={attributeListLoading}
        />
    );

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
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
        setAttributesSelectedIds([]);
        setSelectedRowIds([]);
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
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record?.id]);
            } else {
                setSelectedRowIds(
                    selectedRowIds?.filter((id: number) => id !== record?.id)
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
            if (selected) {
                const newSelectedIds = selectedRows?.map(
                    (record) => record?.id
                );
                setSelectedRowIds(newSelectedIds);
            } else {
                setSelectedRowIds([]);
            }
        },
    };

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    useEffect(() => {
        setAttributesSelectedIds(selectedRowIds);
    }, [selectedRowIds]);

    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.ATTRIBUTE_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
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
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.ATTRIBUTE_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
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
            className: 'column__nameColumn',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="attributeTableWrapper__nameData"
                        onClick={() => {
                            dispatch(getAttributeDetails(data?.id));
                            dispatch(setAttributeState(ATTRIBUTETYPE.view));
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
                                        visible={isPopoverVisibles[data?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
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
                    <div>Description</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DESCRIPTION,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
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
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DESCRIPTION,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
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
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description?.length <
                            attribute.attributeDescriptionLength ? (
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
                                    attribute.attributeNameLength
                                        ? `${data?.description?.slice(
                                              0,
                                              attribute.attributeDescriptionLength
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
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.PROPERTIES_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.PROPERTIES_NAME,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.PROPERTIES_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.PROPERTIES_NAME,
                                          })
                                      );
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
                    <div>Category</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.CATEGORY_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.CATEGORY_NAME,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.CATEGORY_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.CATEGORY_NAME,
                                          })
                                      );
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
                        {data?.category?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>UOM</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.UOM_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.UOM_NAME,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.UOM_NAME,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.UOM_NAME,
                                          })
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
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DATA_TYPE,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DATA_TYPE,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DATA_TYPE,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DATA_TYPE,
                                          })
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
                    <div className="attributeTableWrapper__status">
                        {data?.dataType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>Data Reference</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DATA_REFERENCE,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DATA_REFERENCE,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DATA_REFERENCE,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DATA_REFERENCE,
                                          })
                                      );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'dataReference',
            key: 'dataReference',
            className: 'column__dataReference',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status">
                        {data?.dataReference?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>Display Digits</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DISPLAY_DIGITS,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.ascending,
                                              sortColumn:
                                                  attributeSortOption.DISPLAY_DIGITS,
                                          })
                                      );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                capsuleId
                                    ? dispatch(
                                          getTimeCapsuleDetails({
                                              ...payload,
                                              id: capsuleId,
                                              isAssign: isAssign,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DISPLAY_DIGITS,
                                          })
                                      )
                                    : dispatch(
                                          getAttributesList({
                                              ...payload,
                                              search: search,
                                              status: status,
                                              sortOrder: sortOrder.descending,
                                              sortColumn:
                                                  attributeSortOption.DISPLAY_DIGITS,
                                          })
                                      );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'displayDigits',
            key: 'displayDigits',
            className: 'column__displayDigits',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status">
                        {data?.displayDigit || 'N/A'}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>Industry</div>
                </div>
            ),
            dataIndex: 'industryList',
            key: 'industryList',
            className: 'column__industry',
            render: (_: any, data: any) => {
                const array: string[] = [];
                data?.industryList?.map((item: any) => {
                    array?.push(item.name);
                });
                const maxLength = 10;
                const joinedArray = array.join(',');
                let truncatedData = joinedArray;
                let remainingData: string[] = [];

                if (joinedArray.length > maxLength) {
                    const ellipsisLength = 3;
                    const remainingLength = maxLength - ellipsisLength;
                    truncatedData =
                        joinedArray.substring(0, remainingLength) + '...';
                    const lastCommaIndex = truncatedData.lastIndexOf(',');
                    // Logic for show the name of Industry form an array of object.
                    if (
                        lastCommaIndex !== -1 &&
                        lastCommaIndex < remainingLength
                    ) {
                        const remainingString = truncatedData.substring(
                            lastCommaIndex + 1,
                            remainingLength
                        );
                        remainingData = [
                            remainingString +
                                joinedArray
                                    .substring(remainingLength)
                                    .split(',')[0],
                            ...joinedArray
                                .substring(remainingLength)
                                .split(',')
                                .slice(1),
                        ];
                    } else {
                        remainingData = joinedArray
                            .substring(remainingLength)
                            .split(',');
                    }
                }

                return (
                    <div className="attributeTableWrapper__subItems">
                        <span>{truncatedData}</span>
                        {remainingData.length > 0 && (
                            <Tooltip
                                title={remainingData.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            >
                                <span className="attributeTable__subItems">
                                    +{remainingData.length}
                                </span>
                            </Tooltip>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            {attributeListLoading || timeCapsuleDetailLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={attributeListLoading || timeCapsuleDetailLoading}
                    scroll={
                        capsuleId
                            ? totalCountWithoutSearch > 50
                                ? { y: 'calc(100vh - 475px)' }
                                : { y: 'calc(100vh - 415px)' }
                            : totalCountWithoutSearch > 50
                            ? { y: 'calc(100vh - 625px)' }
                            : { y: 'calc(100vh - 565px)' }
                    }
                    locale={{
                        emptyText: SearchNoDataText,
                    }}
                />
            )}
        </>
    );
};

export default AssignAttributeTable;
