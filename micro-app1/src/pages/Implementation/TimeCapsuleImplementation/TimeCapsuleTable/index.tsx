import Table, { type ColumnsType } from 'antd/es/table';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { Popover, Spin, Tooltip } from 'antd';
import { sortOrder, timeCapsuleImpl, timeCapsuleSortOption } from 'types/enums';
import { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { type DataType } from 'types/interfaces/PropsInterfaces';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const TimeCapsuleTable: React.FC<any> = ({
    data,
    selectedRowIds,
    setSelectedRowIds,
    setSortColumn,
    setSortOrder,
    setPage,
    pageSize,
}) => {
    const { t } = useTranslation('translation');
    const [tableData, setTableData] = useState<any>([]);
    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item?.id,
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
    const unassignedTimeCapsuleListLoading = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.unassignedTimeCapsuleListLoading
    );
    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record?.id]);
            } else {
                setSelectedRowIds(
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
            } else {
                setSelectedRowIds([]);
            }
        },
    };

    const SearchNoDataText = (
        <EmptyDataComponent
            customClassName="SearchEmptyComponent"
            textValue={t('implementation.noResultFoundInSearch')}
            loading={unassignedTimeCapsuleListLoading}
        />
    );
    const unassignedTimeCapsuleList = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.unassignedTimeCapsuleList
    );
    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('commonStr.name')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder?.ascending);
                                setSortColumn(
                                    timeCapsuleSortOption?.TIME_CAPSULE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder?.descending);
                                setSortColumn(
                                    timeCapsuleSortOption?.TIME_CAPSULE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            width: '169px',
            className: 'column__name',
            render: (_: any, data: any) => (
                <>
                    <div>
                        <div>
                            <span className="fs-14 fw-500 name">
                                {data?.name?.length <
                                timeCapsuleImpl?.timeCapsuleNameLength ? (
                                    <>{data?.name}</>
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={<div>{data?.name}</div>}
                                        visible={isPopoverVisibles[data?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        {data?.name?.length >
                                        timeCapsuleImpl?.timeCapsuleNameLength
                                            ? `${data?.name?.slice(
                                                  0,
                                                  timeCapsuleImpl?.timeCapsuleNameLength
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
                </div>
            ),
            dataIndex: 'description',
            key: 'description',
            width: '328px',
            className: 'column__description',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description.replace(/\s/g, '')?.length <
                            timeCapsuleImpl?.timeCapsuleDescriptionLength ? (
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
                                    timeCapsuleImpl?.timeCapsuleDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,

                                              timeCapsuleImpl?.timeCapsuleDescriptionLength
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
                    <div>{t('implementation.timeCapsule.attributes')}</div>
                </div>
            ),
            dataIndex: 'attributes',
            key: 'attributes',
            width: '264px',
            className: 'column__industry',
            render: (_: any, data: any) => {
                const array: string[] = [];
                data?.attributeName?.map((item: any) => {
                    array?.push(item);
                });
                const maxLength = 30;
                const dataLength = 200;
                const joinedArray = array?.join(', ');
                let truncatedData = joinedArray;
                let remainingData: string[] = [];
                if (joinedArray?.length > maxLength) {
                    const ellipsisLength = 3;
                    const remainingLength = maxLength - ellipsisLength;
                    truncatedData =
                        joinedArray?.substring(0, remainingLength) + '...';
                    const lastCommaIndex = truncatedData?.lastIndexOf(',');
                    if (
                        lastCommaIndex !== -1 &&
                        lastCommaIndex < remainingLength
                    ) {
                        const remainingString = truncatedData?.substring(
                            lastCommaIndex + 1,
                            remainingLength
                        );
                        remainingData = [
                            remainingString +
                                joinedArray
                                    ?.substring(remainingLength)
                                    ?.split(',')[0],
                            ...joinedArray
                                ?.substring(remainingLength)
                                ?.split(',')
                                ?.slice(1),
                        ];
                    } else {
                        remainingData = joinedArray
                            ?.substring(remainingLength)
                            ?.split(',');
                    }
                }
                return (
                    <div className="attributeTableWrapper__subItems">
                        <span>{truncatedData}</span>
                        {remainingData?.length > 0 && (
                            <Tooltip
                                overlayClassName={
                                    remainingData?.join(', ')?.length >
                                    dataLength
                                        ? 'attributesToolTip'
                                        : ''
                                }
                                title={remainingData?.join(', ')}
                            >
                                <span className="attributeTable__subItems">
                                    +{remainingData?.length}
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
            {unassignedTimeCapsuleListLoading ? (
                <div className="timeCapsuleLoader">
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
                    scroll={
                        unassignedTimeCapsuleList?.pageResponse?.totalRecords >
                        pageSize
                            ? { y: 'calc(100vh - 530px)' }
                            : { y: 'calc(100vh - 474px)' }
                    }
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}
        </>
    );
};
export default TimeCapsuleTable;
