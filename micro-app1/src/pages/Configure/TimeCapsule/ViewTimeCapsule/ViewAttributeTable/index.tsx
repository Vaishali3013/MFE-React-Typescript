import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin, Tooltip } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { sortOrder, attribute, attributeSortOption } from 'types/enums';
import { getTimeCapsuleDetails } from 'redux/actions/ConfigureActions/timeCapsuleActions';
const ViewAttributeTable: React.FC<any> = ({
    data,
    payload,
    search,
    capsuleId,
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const dispatch = useDispatch();

    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
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
    }, [data]);

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
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
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
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
            className: 'capsuleColumn__name',
            render: (_: any, data: any) => (
                <>
                    <div className="viewCapsuleAttributeTableWrapper__nameData">
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
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Description</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
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
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
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
            render: (_: any, data: any) => (
                <>
                    <div className="viewCapsuleAttributeTableWrapper__subItems">
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
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Properties</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.properties?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Category</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.category?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>UOM</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.unitOfMeasurement?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Value Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.dataType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Data Reference</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.dataReference?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
                    <div>Display Digits</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                                dispatch(
                                    getTimeCapsuleDetails({
                                        id: capsuleId,
                                        ...payload,
                                        search: search,
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
                    <div className="viewCapsuleAttributeTableWrapper__status">
                        {data?.displayDigit || 'N/A'}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="viewCapsuleAttributeTableWrapper__columnTitle">
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
                    <div className="viewCapsuleAttributeTableWrapper__subItems">
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
            {timeCapsuleListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={timeCapsuleListLoading}
                    scroll={{ y: 'calc(100vh - 350px)' }}
                />
            )}
        </>
    );
};

export default ViewAttributeTable;
