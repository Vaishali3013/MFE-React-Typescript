import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin, Tooltip } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './index.scss';
import {
    type DataType,
    type GroupTableProps,
} from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import SideDrawer from 'components/common/SideDrawer';
import GroupDrawer from 'components/common/SideDrawer/GroupDrawer';
import { useSelector, useDispatch } from 'react-redux';
import {
    getGroupByGroupId,
    getGroupsList,
    removeGroupState,
} from 'redux/actions/UserManagementActions/groupsAction';
import MoreContent from '../GroupsMoreContent';
import moment from 'moment';
import { GROUPSSORT, sortOrder, resourceName, PERMISSIONS } from 'types/enums';
import { DATE_FORMAT } from 'utils/constants';
import GroupMultipleActiveDeactive from '../GroupMultipleActiveDeactive';
import CustomModal from 'components/common/Modals/CustomModal';
import { cancelHandle, okHandle } from 'utils/modalFunction';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { useTranslation } from 'react-i18next';

const GroupTable: React.FC<GroupTableProps> = ({
    data,
    payload,
    paginationPayload,
}) => {
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [tableData, setTableData] = useState<any>([]);
    const [editDrawer, setEditDrawer] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [formDisabled, setFormDisabled] = useState(false);
    const [rolePermissionListModal, setRolePermissionListModal] =
        useState(false);
    const [selectedGroup, setSelectedGroup] = useState(false);
    const [groupId, setGroupId] = useState<number>();
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

    const { t } = useTranslation('translation');
    const rowData = useSelector(
        (state: any) => state.userManagement.groups.dataByGroupId
    );
    const RolePermissionError = useSelector(
        (state: any) => state.userManagement.groups.resourceSubItemsResponse
    );
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    useEffect(() => {
        RolePermissionError && setRolePermissionListModal(true);
    }, [RolePermissionError]);
    useEffect(() => {
        setFormDisabled(true);
    }, []);
    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowIds([]);
        setSelectedRows([]);
    }, [data]);

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

    const rowSelection: any = {
        onSelect: (record: DataType, selected: boolean, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.active
                    ? selectedActiveRows.push(item.id)
                    : selectedInactiveRows.push(item.id)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record.id]);
                setSelectedRows([...selectedRows, record]);
            } else {
                setSelectedRowIds(
                    selectedRowIds?.filter((id: number) => id !== record.id)
                );
                setSelectedRows(
                    selectedRows.filter(
                        (row: DataType) => row.key !== record.key
                    )
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: DataType[]) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.active
                    ? selectedActiveRows.push(item.id)
                    : selectedInactiveRows.push(item.id)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                const newSelectedIds = selectedRows.map((record) => record.id);
                setSelectedRowIds(newSelectedIds);
                setSelectedRows(selectedRows);
            } else {
                setSelectedRowIds([]);
                setSelectedRows([]);
            }
        },
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({ ...item, key: item.id });
        });
        return temp;
    };

    const closePreviousDrawer = (): any => {
        setSelectedGroup(false);
        setEditDrawer(true);
    };
    useEffect(() => {
        setSelectedId(rowData.id);
    }, [closePreviousDrawer]);

    const [popoverheaderVisible, setPopoverheaderVisible] = useState({
        actions: false,
    });

    const handlePopoverItemClick = (): void => {
        setPopoverheaderVisible({ actions: false });
    };

    const [showPopover, setShowPopover] = useState(false);
    const [showHeaderPopover, setShowHeaderPopover] = useState(false);
    useEffect(() => {
        // Check if selectedRowIds has any entries
        setShowPopover(selectedRowIds.length <= 1);
        setShowHeaderPopover(selectedRowIds.length > 1);
    }, [selectedRowIds]);

    const inputString = RolePermissionError;
    const roleArray = inputString?.split(',');
    const ListItems: React.FC<{ roleArray: string[] }> = ({ roleArray }) => {
        return (
            <div>
                <ul className="role-permissionlist">
                    {roleArray.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const columns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {hasPermission(
                        getObjectByResourceName(
                            resourceName.users,
                            loggedInUserPermissionData
                        ),
                        PERMISSIONS.update
                    ) ||
                    hasPermission(
                        getObjectByResourceName(
                            resourceName.users,
                            loggedInUserPermissionData
                        ),
                        PERMISSIONS.write
                    ) ||
                    hasPermission(
                        getObjectByResourceName(
                            resourceName.users,
                            loggedInUserPermissionData
                        ),
                        PERMISSIONS.delete
                    ) ||
                    loggedInUserDetails.admin ? (
                        showHeaderPopover && (
                            <Popover
                                visible={popoverheaderVisible.actions}
                                onVisibleChange={(visible) => {
                                    setPopoverheaderVisible(
                                        (prevState: any) => ({
                                            ...prevState,
                                            actions: visible,
                                        })
                                    );
                                }}
                                content={
                                    <div className="custom-popover-content">
                                        <GroupMultipleActiveDeactive
                                            multipleRecord={selectedRows}
                                            selectedUserIds={selectedRowIds}
                                            paginationPayload={payload}
                                            onItemClick={handlePopoverItemClick}
                                            selectedActiveIds={
                                                selectedActiveIds
                                            }
                                            selectedInactiveIds={
                                                selectedInactiveIds
                                            }
                                        />
                                    </div>
                                }
                                placement="bottomLeft"
                                trigger="click"
                            >
                                <MoreOutlined />
                            </Popover>
                        )
                    ) : (
                        <MoreOutlined />
                    )}
                </div>
            ),
            key: 'more',
            width: 56,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {hasPermission(
                                getObjectByResourceName(
                                    resourceName.groups,
                                    loggedInUserPermissionData
                                ),
                                PERMISSIONS.update
                            ) ||
                            hasPermission(
                                getObjectByResourceName(
                                    resourceName.groups,
                                    loggedInUserPermissionData
                                ),
                                PERMISSIONS.write
                            ) ||
                            hasPermission(
                                getObjectByResourceName(
                                    resourceName.groups,
                                    loggedInUserPermissionData
                                ),
                                PERMISSIONS.delete
                            ) ||
                            loggedInUserDetails.admin ? (
                                <Popover
                                    visible={
                                        loggedInUserDetails.admin
                                            ? popoverVisible[record.key]
                                            : record?.active &&
                                              popoverVisible[record.key]
                                    }
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    placement="bottomLeft"
                                    trigger={showPopover ? 'click' : []}
                                    content={
                                        <MoreContent
                                            record={record}
                                            setEditDrawer={setEditDrawer}
                                            setSelectedId={setSelectedId}
                                            setSelectedRowId={setSelectedRowIds}
                                            paginationPayload={payload}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            selectedUserIds={selectedRowIds}
                                        />
                                    }
                                    overlayStyle={{ width: '162px' }}
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
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('groups.groupName')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: GROUPSSORT.groupName,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: GROUPSSORT.groupName,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'groupName',
            key: 'groupName',
            render: (_: any, data: DataType) => (
                <>
                    <div
                        className="groupTableWrapper__nameData"
                        onClick={() => {
                            dispatch(getGroupByGroupId(data.id));
                            setGroupId(data.id);
                            setSelectedGroup(true);
                        }}
                    >
                        {data.groupName}
                    </div>
                </>
            ),
        },

        {
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('groups.subItems')}</div>
                </div>
            ),
            dataIndex: 'subItems',
            key: 'subItems',
            render: (_: any, data: DataType) => {
                const array: string[] = [];
                data?.resourceList?.map((item) => {
                    array?.push(item.resourceName);
                });
                const maxLength = 25;
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
                    <div className="subItems">
                        <span>{truncatedData}</span>
                        {remainingData.length > 0 && (
                            <Tooltip
                                title={remainingData.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            >
                                <span className="groupTable__subItems">
                                    +{remainingData.length}
                                </span>
                            </Tooltip>
                        )}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('commonStr.status')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: GROUPSSORT.isActive,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: GROUPSSORT.isActive,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'status',
            key: 'status',
            render: (_: any, data: DataType) => (
                <>
                    <div className="groupTableWrapper__status">
                        {data.active ? <ActiveDotIcon /> : <InactiveDotIcon />}
                        <span>{data.active ? 'Active' : 'Inactive'}</span>
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('commonStr.createdBy')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: GROUPSSORT.createdBy,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: GROUPSSORT.createdBy,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'createdBy',
            dataIndex: 'createdBy',
        },
        {
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('commonStr.createdOn')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: GROUPSSORT.createdAt,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: GROUPSSORT.createdAt,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (_: any, data: DataType) => (
                <>
                    <div className="groupTableWrapper__status">
                        {moment(data.createdAt).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('commonStr.lastModified')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: GROUPSSORT.updatedAt,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getGroupsList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: GROUPSSORT.updatedAt,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'lastModified',
            key: 'lastModified',
            render: (_: any, data: DataType) => (
                <>
                    <div className="groupTableWrapper__status">
                        {moment(data.updatedAt).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
    ];
    const groupListLoading = useSelector(
        (state: any) => state.userManagement?.groups?.groupListLoading
    );
    return (
        <>
            {groupListLoading ? (
                <div className="view__loader">
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
                    scroll={{ y: 'calc(100vh - 350px)' }}
                />
            )}
            {editDrawer ? (
                <SideDrawer
                    title={t('groups.editGroup')}
                    Open={editDrawer}
                    onClose={() => {
                        setEditDrawer(false);
                    }}
                >
                    {selectedId === rowData.id && (
                        <GroupDrawer
                            onClose={() => {
                                setEditDrawer(false);
                            }}
                            editData={rowData}
                            paginationPayload={payload}
                        />
                    )}
                </SideDrawer>
            ) : (
                <SideDrawer
                    title={t('groups.viewGroup')}
                    Open={selectedGroup}
                    onClose={() => {
                        setSelectedGroup(false);
                    }}
                >
                    {groupId === rowData.id && (
                        <GroupDrawer
                            onClose={() => {
                                setSelectedGroup(false);
                            }}
                            editData={rowData}
                            formDisable={formDisabled}
                            openEditDrawer={setEditDrawer}
                            onEditClick={closePreviousDrawer}
                        />
                    )}
                </SideDrawer>
            )}
            <CustomModal
                customClassName="groupEditModal"
                open={rolePermissionListModal}
                onCancel={() => {
                    setRolePermissionListModal(false);
                    cancelHandle(
                        rolePermissionListModal,
                        setRolePermissionListModal
                    );
                    dispatch(removeGroupState());
                }}
                onOk={() => {
                    okHandle(
                        rolePermissionListModal,
                        setRolePermissionListModal
                    );
                    dispatch(removeGroupState());
                }}
                title={t('groups.groupNotEdited')}
            >
                <ListItems roleArray={roleArray} />
            </CustomModal>
        </>
    );
};

export default GroupTable;
