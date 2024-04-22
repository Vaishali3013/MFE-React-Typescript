import { Badge, Popover, Spin, Tooltip } from 'antd';
import Table, { type ColumnsType } from 'antd/es/table';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { sortOrder, timeCapsuleImpl, timeCapsuleSortOption } from 'types/enums';
import TimeCapsuleMultipleMoreContent from './TimeCapsuleMultipleMoreContent';
import { type DataType } from 'types/interfaces/PropsInterfaces';
import { useSelector } from 'react-redux';
import './index.scss';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import TimeCapsuleRemoveEdit from './TimeCapsuleRemoveEdit';
import { PAGE } from 'utils/constants';
import { useTranslation } from 'react-i18next';
const AssignedTimeCapsuleTable: React.FC<any> = ({
    data,
    setSortColumn,
    setSortOrder,
    setPage,
    selectedRowIds,
    setSelectedRowIds,
}) => {
    const { t } = useTranslation('translation');
    const [tableData, setTableData] = useState<any>([]);
    const [popoverheaderVisible, setPopoverheaderVisible] = useState({
        actions: false,
    });
    const assignedTimeCapsuleListLoading = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.assignedTimeCapsuleListLoading
    );
    const handlePopoverItemClick = (): void => {
        setPopoverheaderVisible({ actions: false });
    };
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
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState: any) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const handleItemClick = (): void => {
        setPopoverVisible({ action: false });
    };
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [showPopover, setShowPopover] = useState(false);

    const [showHeaderPopover, setShowHeaderPopover] = useState(false);

    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
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
    useEffect(() => {
        setShowPopover(selectedRowIds?.length <= 1);
        setShowHeaderPopover(selectedRowIds?.length > 1);
    }, [selectedRowIds, selectedRows]);

    const SearchNoDataText = (
        <EmptyDataComponent
            customClassName="SearchEmptyComponent"
            textValue={t('implementation.noResultFoundInSearch')}
            loading={assignedTimeCapsuleListLoading}
        />
    );
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
                                    <TimeCapsuleMultipleMoreContent
                                        setSelectedRowIds={setSelectedRowIds}
                                        selectedRowIds={selectedRowIds}
                                        onItemClick={handlePopoverItemClick}
                                    />
                                </div>
                            }
                            placement="bottomLeft"
                            trigger="click"
                            overlayStyle={{ width: '118px' }}
                            overlayClassName="timeCapsuleMultiplePopover"
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
                            {showPopover ? (
                                <Popover
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    placement="bottomLeft"
                                    trigger={showPopover ? 'click' : []}
                                    content={
                                        <TimeCapsuleRemoveEdit
                                            record={[record?.id]}
                                            setSelectedRowIds={
                                                setSelectedRowIds
                                            }
                                            onItemClick={handleItemClick}
                                        />
                                    }
                                    overlayStyle={{ width: '162px' }}
                                    overlayClassName="timeCapsuleMultiplePopover"
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
                <div className="timeCapsuleTableWrapper__columnTitle">
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
            width: '190px',
            className: 'column__name',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="timeCapsuleTableWrapper__nameData"
                        onClick={() => {}}
                    >
                        <div className="blaTableWrapper__status">
                            <span className="fs-14 fw-500 name">
                                {data?.name?.length <
                                timeCapsuleImpl?.assignedTimeCapsuleName ? (
                                    <>
                                        {data?.name} <Badge count="Validate" />
                                    </>
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
                                        timeCapsuleImpl?.assignedTimeCapsuleName
                                            ? `${data?.name?.slice(
                                                  0,
                                                  timeCapsuleImpl?.assignedTimeCapsuleName
                                              )}...`
                                            : data?.name}{' '}
                                        <span>
                                            <Badge count="Validate" />
                                        </span>
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
                <div className="timeCapsuleTableWrapper__columnTitle">
                    <div>{t('commonStr.description')}</div>
                </div>
            ),
            dataIndex: 'description',
            key: 'description',
            width: '285px',
            className: 'column__description',
            render: (_: any, data: any) => (
                <>
                    <div className="timeCapsuleTableWrapper__subItems">
                        <span className="fs-14 fw-500 name">
                            {data?.description.replace(/\s/g, '')?.length <
                            timeCapsuleImpl?.assignTimeCapsuleDescriptionLength ? (
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
                                    timeCapsuleImpl?.assignTimeCapsuleDescriptionLength
                                        ? `${data?.description?.slice(
                                              0,
                                              timeCapsuleImpl?.assignTimeCapsuleDescriptionLength
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
                <div className="timeCapsuleTableWrapper__columnTitle">
                    <div>{t('implementation.timeCapsule.attributes')}</div>
                </div>
            ),
            dataIndex: 'attributes',
            key: 'attributes',
            width: '259px',
            className: 'column__attributes',
            render: (_: any, data: any) => {
                const array: string[] = [];
                data?.attributeName?.map((item: any) => {
                    array?.push(item);
                });
                const maxLength = 30;
                const dataLength= 200;
                const joinedArray = array?.join(', ');
                let truncatedData = joinedArray;
                let remainingData: string[] = [];
                if (joinedArray?.length > maxLength) {
                    const ellipsisLength = 3;
                    const remainingLength = maxLength - ellipsisLength;
                    truncatedData =
                        joinedArray.substring(0, remainingLength) + '...';
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
                    <div className="timeCapsuleTableWrapper__subItems">
                        <span>{truncatedData}</span>
                        {remainingData?.length > 0 && (
                            <Tooltip
                                overlayClassName={
                                    remainingData?.join(', ')?.length > dataLength
                                        ? 'attributesToolTip'
                                        : ''
                                }
                                title={remainingData?.join(', ')}

                            >
                                <span className="timeCapsuleTable__subItems">
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
            {assignedTimeCapsuleListLoading ? (
                <div className="timeCapsuleLoader">
                    <Spin />
                </div>
            ) : (
                <Table
                    className={
                        data?.length > 0
                            ? 'tablePaginated'
                            : 'tableNotPaginated'
                    }
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowIds,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ y: 'calc(100vh - 450px)' }}
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}
        </>
    );
};
export default AssignedTimeCapsuleTable;
