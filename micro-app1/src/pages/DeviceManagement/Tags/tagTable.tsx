import React, { useState, useEffect, type ReactNode } from 'react';
import { Popover, Table } from 'antd';
import './index.scss';
import { type ColumnsType } from 'antd/es/table';
import { MoreOutlined, DisconnectOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    activateDeactivateTags,
    getTagList,
} from 'redux/actions/DeviceManagementActions/tagAction';
import {
    dateFormat,
    tagSort,
    deviceManagement,
    sortOrderApi,
    screenName,
} from 'types/enums';
import moment from 'moment';
import MoreContent from './MoreContent/TagsMoreContent';
import { parseJwt } from 'utils/jwtTokenFunction';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { useParams } from 'react-router-dom';
import PopOverComponent from 'components/common/PopOverComponent';
import { useTranslation } from 'react-i18next';

const TagTable: React.FC<any> = ({
    setViewDrawerState,
    tagData,
    search,
    pageType,
    setRecord,
    setSuccessModalState,
    setOpenAddTag,
}) => {
    const { currentTab } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [tableData, setTableData] = useState<any>([]);
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const details = parseJwt();

    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [deactivateModalState, setDeactivateModalState] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const [headerPopoverVisible, setHeaderPopoverVisible] = useState(false);
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };

    const rowSelection: any = {
        onSelect: (record: any, selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.timeSeriesId)
                    : selectedInactiveRows.push(item.timeSeriesId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.timeSeriesId)
                    : selectedInactiveRows.push(item.timeSeriesId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        tagData?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.timeSeriesId,
                name: item.tagName,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowKeys([]);
    }, [tagData]);

    const tagsListLoading = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagsListLoading
    );

    useEffect(() => {
        setSelectedRowKeys([]);
        setSelectedActiveIds([]);
        setSelectedInactiveIds([]);
    }, [currentTab]);

    const [showPopover, setShowPopover] = useState(false);
    useEffect(() => {
        setShowPopover(selectedRowKeys?.length <= 1);
    }, [selectedRowKeys]);

    const headerDropdown = (): ReactNode => {
        const values = [
            {
                title: '',
                icon: <DisconnectOutlined />,
            },
        ];
        if (selectedActiveIds.length > 0 && selectedInactiveIds.length > 0) {
            values[0].title = 'Activate/Deactivate';
        } else if (
            selectedActiveIds.length > 0 &&
            selectedInactiveIds.length === 0
        ) {
            values[0].title = 'Deactivate';
        } else if (
            selectedActiveIds.length === 0 &&
            selectedInactiveIds.length > 0
        ) {
            values[0].title = 'Activate';
        }
        return (
            <>
                <div className="more-container">
                    <div className={`more-content`}>
                        <ul>
                            {values &&
                                values.length > 0 &&
                                values.map((item) => (
                                    <li
                                        key={item.title}
                                        className="blaMoreContent_items"
                                    >
                                        <span
                                            className="moreContent__option"
                                            onClick={() => {
                                                if (
                                                    selectedActiveIds.length >
                                                        0 &&
                                                    selectedInactiveIds.length >
                                                        0
                                                ) {
                                                    setDeactivateModalState(
                                                        true
                                                    );
                                                } else if (
                                                    selectedActiveIds.length >
                                                        0 &&
                                                    selectedInactiveIds.length ===
                                                        0
                                                ) {
                                                    setConfirmModalState(
                                                        'deactivate'
                                                    );
                                                } else if (
                                                    selectedActiveIds.length ===
                                                        0 &&
                                                    selectedInactiveIds.length >
                                                        0
                                                ) {
                                                    setConfirmModalState(
                                                        'activate'
                                                    );
                                                }
                                                setHeaderPopoverVisible(false);
                                            }}
                                        >
                                            <span className="moreContentIcon">
                                                {item.icon}
                                            </span>
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const handleActivate = (): void => {
        setConfirmModalState('activate');
        setDeactivateModalState(false);
    };
    const handleDeactivate = (): void => {
        setConfirmModalState('deactivate');
        setDeactivateModalState(false);
    };
  
    const tableColumns: ColumnsType<any> = [
        
        {
            title: (
                <div>
                    {selectedRowKeys?.length > 1 && (
                        <Popover
                            overlayClassName="tagsMultiplePopover"
                            content={
                                <div className="blaTableWrapper__popover">
                                    {headerDropdown()}
                                </div>
                            }
                            placement="bottomLeft"
                            trigger="click"
                            visible={headerPopoverVisible}
                            onVisibleChange={setHeaderPopoverVisible}
                        >
                            <MoreOutlined />
                        </Popover>
                    )}
                </div>
            ),
            key: 'more',
            width: 26,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {currentTab === screenName.deviceManagementTags && (
                                <Popover
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    overlayClassName="popover"
                                    content={
                                        <div className="moreContent__popOver">
                                            <MoreContent
                                                record={record}
                                                setPopoverVisible={
                                                    setPopoverVisible
                                                }
                                                setViewDrawerState={
                                                    setViewDrawerState
                                                }
                                                setOpenAddTag={setOpenAddTag}
                                                setRecord={setRecord}
                                                setSuccessModalState={
                                                    setSuccessModalState
                                                }
                                            />
                                        </div>
                                    }
                                    placement="bottomLeft"
                                    trigger={showPopover ? 'click' : []}
                                    overlayStyle={{ width: '162px' }}
                                >
                                    <MoreOutlined />
                                </Popover>
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            key: 'tagName',
            sorter: true,
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.tagname')}</div>
                </div>
            ),
            dataIndex: 'tagName',
            render: (_: any, record: any) => {
                return (
                    <div
                        className="tagTableWrapper__nameData__info"
                        onClick={() => {
                            setViewDrawerState(true);
                            setRecord(record);
                        }}
                    >
                        <div className="tagTableWrapper__status">
                            {record.isActive ? (
                                <ActiveDotIcon />
                            ) : (
                                <InactiveDotIcon />
                            )}
                            <span className="fs-14 fw-500 name">
                                {record?.tagName?.length <
                                deviceManagement.blaNameLength ? (
                                    record?.tagName
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {record?.tagName}
                                            </div>
                                        }
                                        visible={isPopoverVisibles[record?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        {record?.tagName?.length >
                                        deviceManagement.blaNameLength
                                            ? `${record?.tagName?.slice(
                                                  0,
                                                  deviceManagement.blaNameLength
                                              )}...`
                                            : record?.tagName}
                                    </Popover>
                                )}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'tagId',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.tagId')}</div>
                    <div className="sortArrows">
                        {/* <UpArrow />
                        <DownArrow fill="white" /> */}
                    </div>
                </div>
            ),
            dataIndex: 'tagId',
            render: (_: any, record: any) => {
                return (
                    <>
                        <span className="fs-14 fw-500 name">
                            {record?.tagId?.length <
                            deviceManagement.blaNameLength ? (
                                record?.tagId
                            ) : (
                                <Popover
                                    overlayClassName="customOverlay"
                                    content={
                                        <div className="blaName">
                                            {record?.tagId}
                                        </div>
                                    }
                                    visible={isPopoverVisibles[record?.key]}
                                    onVisibleChange={
                                        handlePopoverVisibleChanges
                                    }
                                    placement="topLeft"
                                >
                                    {record?.tagId?.length >
                                    deviceManagement.blaNameLength
                                        ? `${record?.tagId?.slice(
                                              0,
                                              deviceManagement.blaNameLength
                                          )}...`
                                        : record?.tagId}
                                </Popover>
                            )}
                        </span>
                    </>
                );
            },
        },
        {
            key: 'dataType',
            sorter: true,
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.dataType')}</div>
                </div>
            ),
            dataIndex: 'dataType',
        },
        {
            key: 'address',
            sorter: true,
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.address')}</div>
                </div>
            ),
            dataIndex: 'address',
            render: (_: any, record: any) => {
                return (
                    <>
                        <PopOverComponent
                            text={record?.address}
                            record={record}
                        />
                    </>
                );
            },
        },
        {
            key: 'pollingInterval',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('deviceMang.tags.pollingInterval')}</div>
                    <div className="sortArrows">
                        {/* <UpArrow />
                        <DownArrow fill="white" /> */}
                    </div>
                </div>
            ),
            dataIndex: 'pollingInterval',
        },
        {
            key: 'updatedOn',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.lastModified')}</div>
                </div>
            ),
            dataIndex: 'updatedOn',
            sorter: true,
            render: (_: any, record: any) => (
                <div className="rolesTableWrapper__status">
                    {moment(record.updatedOn).format(dateFormat.format)}
                </div>
            ),
        },
        {
            key: 'createdOn',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.createdOn')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'createdOn',
            render: (_: any, record: any) => (
                <div className="rolesTableWrapper__status">
                    {moment(record.createdOn).format(dateFormat.format)}
                </div>
            ),
        },
        {
            key: 'additionalFactor',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.additionFactor')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'additionalFactor',
            render: (_: any, record: any) => (
                <div>{record?.additionalFactor}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
        {
            
            key: 'multiplicationFactor',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.multiplicationFactor')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'multiplicationFactor',
            render: (_: any, record: any,) => (
                
                <div>{record?.multiplicationFactor}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
        {
            
            key: 'aggregateMethod',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.aggregateMethod')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'aggregateMethod',
            render: (_: any, record: any,) => (
                
                <div>{record?.aggregateMethod}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
        {
            
            key: 'deviceName',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.deviceName')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'deviceName',
            render: (_: any, record: any,) => (
                
                <div>{record?.deviceName}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
        {
            
            key: 'unit',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.uom')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'unit',
            render: (_: any, record: any,) => (
                
                <div>{record?.unit}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
        {
            
            key: 'additionalProperties',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.property')}</div>
                </div>
            ),
            sorter: true,
            dataIndex: 'additionalProperties',
            render: (_: any, record: any,) => (
                
                <div>{record?.additionalProperties}</div> // Assuming `additionalFactor` is a property of `record`
            ),
        },
    ];

    const handleTableChange = (
        pagination: any,
        filters: any,
        sorter: any
    ): any => {
        dispatch(
            getTagList({
                sortOrder: sortOrderApi[sorter.order],
                sortColumn: tagSort[sorter.columnKey],
                search: search,
                page: pageType?.page,
                pageSize: pageType?.pageSize,
            })
        );
    };

    return (
        <>
            <div className="tagTableWrapper">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowKeys,
                    }}
                    pagination={false}
                    columns={tableColumns}
                    dataSource={tableData}
                    loading={tagsListLoading}
                    onChange={handleTableChange}
                    showSorterTooltip={false}
                    scroll={{ y: 'calc(100vh - 400px)', x: 1800 }}
                />
            </div>
            <ActivateDeactivateMultipleModal
                open={deactivateModalState}
                text="Tags"
                onCancel={setDeactivateModalState}
                activeIds={selectedActiveIds}
                inActiveIds={selectedInactiveIds}
                handleActivate={handleActivate}
                handleDeactivate={handleDeactivate}
            />
            <ConfirmationModal
                open={confirmModalState}
                icon={
                    confirmModalState === 'activate' ? (
                        <ActivateIcon />
                    ) : (
                        <DeactivateIcon />
                    )
                }
                onOk={() => {
                    if (confirmModalState === 'activate') {
                        dispatch(
                            activateDeactivateTags({
                                id: selectedInactiveIds,
                                active: true,
                                updatedBy: details.username,
                            })
                        );
                        setSelectedRowKeys([]);
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateTags({
                                id: selectedActiveIds,
                                active: false,
                                updatedBy: details.username,
                            })
                        );
                        setSelectedRowKeys([]);
                    }
                    setSuccessModalState(`${confirmModalState}`);
                    setConfirmModalState(null);
                }}
                onCancel={() => {
                    setConfirmModalState(null);
                }}
                text={`Are you sure you want to ${confirmModalState} selected tag(s)?`}
            />
        </>
    );
};

export default TagTable;
