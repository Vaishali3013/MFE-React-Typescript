import React, { useState, useEffect } from 'react';
import { Popover, Table } from 'antd';
import './index.scss';
import { type ColumnsType } from 'antd/es/table';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';

import { useDispatch, useSelector } from 'react-redux';
import { getTagListByDeviceId } from 'redux/actions/DeviceManagementActions/tagAction';
import { dateFormat, deviceManagement } from 'types/enums';
import moment from 'moment';
import PopOverComponent from 'components/common/PopOverComponent';
import { useTranslation } from 'react-i18next';

const TagsUnderDeviceTable: React.FC<any> = ({
    tagData,
    deviceId,
    tagsIds,
    setTagsListLength,
    setTagIds,
    tagsDetail,
    searchQuery,
    selectedTagsIds,
    setSelectedTagsIds,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [tableData, setTableData] = useState<any>([]);
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };
    const tagsDetails = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagListByDeviceId
    );
    useEffect(() => {
        dispatch(getTagListByDeviceId({ deviceId: deviceId }));
    }, [deviceId]);

    const rowSelection: any = {
        selectedRowKeys: selectedTagsIds,
        onSelect: (record: any, selected: any, selectedRows: any) => {
            const selectedInactiveRows: number[] = [];
            selectedRows.map(
                (item: any) =>
                    !item.isActive &&
                    selectedInactiveRows.push(item.timeSeriesId)
            );
            setSelectedTagsIds([...selectedInactiveRows]);
        },
        onSelectAll: (
            selected: any,
            selectedRows: any,
            selectedTagIds: number[]
        ) => {
            const selectedInactiveRows: number[] = [];
            if (selected) {
                selectedRows.map(
                    (item: any) =>
                        !item.isActive &&
                        selectedInactiveRows.push(item.timeSeriesId)
                );
                setSelectedTagsIds([...selectedInactiveRows]);
            } else {
                setSelectedTagsIds([]);
            }
        },
    };
    useEffect(() => {
        setTagIds(selectedTagsIds);
    }, [selectedTagsIds]);
    const tableDataMapper = (): [] => {
        const temp: any = [];
        tagsDetails?.forEach((item: any, index: number) => {
            if (
                item.tagName.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                temp.push({
                    ...item,
                    key: item.timeSeriesId,
                    name: item.tagName,
                });
            }
        });
        return temp;
    };

    useEffect(() => {
        setTableData(tableDataMapper());
    }, [tagsDetails, searchQuery]);

    const tagsListLoading = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagsListLoading
    );
    tagsDetail(tagsDetails);
    setTagsListLength(tagsDetails?.length);

    const tableColumns: ColumnsType<any> = [
        {
            key: 'tagName',
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.tagname')}</div>
                </div>
            ),
            dataIndex: 'tagName',
            render: (_: any, record: any) => {
                return (
                    <div className="tagTableWrapper__nameData__info">
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
            title: (
                <div className="tagTableWrapper__columnTitle">
                    <div>{t('commonStr.dataType')}</div>
                </div>
            ),
            dataIndex: 'dataType',
        },
        {
            key: 'address',
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
            render: (_: any, record: any) => (
                <div className="rolesTableWrapper__status">
                    {moment(record.updatedOn).format(dateFormat.format)}
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="tagTableModalWrapper">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={false}
                    columns={tableColumns}
                    dataSource={tableData}
                    loading={tagsListLoading}
                    showSorterTooltip={false}
                    scroll={{ y: '370px' }}
                />
            </div>
        </>
    );
};

export default TagsUnderDeviceTable;
