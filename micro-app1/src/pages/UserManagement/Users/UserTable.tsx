import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Popover,
    type RadioChangeEvent,
    Table,
    Radio,
    Cascader,
    Spin,
} from 'antd';
import './userTable.scss';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { type ColumnsType } from 'antd/es/table';
import { getIntials } from 'utils/commonFunction';
import { MoreOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import UserMoreContent from './UserMoreContent';
import CustomModal from 'components/common/Modals/CustomModal';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ViewUser from './EditViewUser';
import type { UserTableRowType } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import {
    sortOrder,
    USERSSORT,
    avtarColor,
    resourceName,
    PERMISSIONS,
} from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserDetails,
    getUsersList,
} from 'redux/actions/UserManagementActions/usersAction';
import AddUserManually from './AddUser/addUserManually';
import moment from 'moment';
import UserMultipleActiveDeactive from './UserMultipleActiveDeactive';
import { DATE_FORMAT } from 'utils/constants';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { useTranslation } from 'react-i18next';


const UserTable: React.FC<{
    userTableDataList: any;
    statusValue: any;
    setStatusValue: any;
    paginationPayload: any;
    setRolesFilterSelection?: any;
    setadduserTypeValue?: any;
}> = ({
    userTableDataList,
    statusValue,
    setStatusValue,
    paginationPayload,
    setRolesFilterSelection,
    setadduserTypeValue,
}) => {
    const { SHOW_CHILD } = Cascader;
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [isUserViewModalOpen, setIsUserViewModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>();
    const [isEdit, setIsEdit] = useState(false);
    const [tableData, setTableData] = useState<any>([]);

    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const userListLoading = useSelector(
        (state: any) => state?.userManagement?.users?.userListLoading
    );
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state?.userManagement?.users?.loggedInUserScreenPermissionList
    );
    const loggedInUserDetails = useSelector(
        (state: any) => state?.userManagement?.users?.loggedInUserDetails
    );

    const allRolesList = useSelector(
        (state: any) => state?.userManagement?.roles?.allRolesList
    );

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const [selectedRowIds, setSelectedRowIds] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<UserTableRowType[]>([]);
    const rowSelection: any = {
        onSelect: (
            record: UserTableRowType,
            selected: boolean,
            selectedRows: any
        ) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.active
                    ? selectedActiveRows.push(item.userId)
                    : selectedInactiveRows.push(item.userId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record.userId]);
                setSelectedRows([...selectedRows, record]);
            } else {
                setSelectedRowIds(
                    selectedRowIds.filter((id: string) => id !== record.userId)
                );
                setSelectedRows(
                    selectedRows.filter(
                        (row: UserTableRowType) => row.key !== record.key
                    )
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: UserTableRowType[]) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.active
                    ? selectedActiveRows.push(item.userId)
                    : selectedInactiveRows.push(item.userId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                const newSelectedIds = selectedRows.map(
                    (record) => record.userId
                );
                setSelectedRowIds(newSelectedIds);
                setSelectedRows(selectedRows);
            } else {
                setSelectedRowIds([]);
                setSelectedRows([]);
            }
        },
    };

    const onNameClickHandler = (record: UserTableRowType): any => {
        setSelectedRowData(record.userId);
        dispatch(getUserDetails(record.userId));
        modalShow(isUserViewModalOpen, setIsUserViewModalOpen);
    };
    const onOkHandler = (): any => {
        okHandle(isUserViewModalOpen, setIsUserViewModalOpen);
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        userTableDataList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.userId,
                name: item.firstName,
                avtarColor: avtarColor[index],
                roles: item?.roles[0]?.roleName,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowIds([]);
        setSelectedRows([]);
    }, [userTableDataList]);

    const userDetailsById = useSelector(
        (state: any) => state.userManagement.users.userDetails
    );
    const onStatusChangeHandler = (e: RadioChangeEvent): any => {
        setStatusValue(e.target.value);
    };

    const onRoleChange = (selectedOptions: any): any => {
        setRolesFilterSelection(selectedOptions?.flat());
    };

    const rolesFilterData = (): [] => {
        const temp: any = [];
        allRolesList?.map((item: any): any => {
            temp?.push({
                value: item?.roleId,
                label: ` ${item?.roleName}`,
            });
        });
        return temp;
    };

    const maxLength: any = 5;
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

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

    const TableColumns: ColumnsType<UserTableRowType> = [
        {
            title: (
                <>
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
                                            <UserMultipleActiveDeactive
                                                multipleRecord={selectedRows}
                                                selectedUserIds={selectedRowIds}
                                                setIsUserEditModalOpen={
                                                    setIsUserViewModalOpen
                                                }
                                                isUserEditModalOpen={
                                                    isUserViewModalOpen
                                                }
                                                setIsEdit={setIsEdit}
                                                setSelectedRowData={
                                                    setSelectedRowData
                                                }
                                                paginationPayload={
                                                    paginationPayload
                                                }
                                                onItemClick={
                                                    handlePopoverItemClick
                                                }
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
                </>
            ),
            key: 'more',
            width: 56,
            render: (_: any, record: any) => {
                return (
                    <>
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
                                <Popover
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    content={
                                        <UserMoreContent
                                            record={record}
                                            selectedUserIds={selectedRowIds}
                                            setIsUserEditModalOpen={
                                                setIsUserViewModalOpen
                                            }
                                            isUserEditModalOpen={
                                                isUserViewModalOpen
                                            }
                                            setIsEdit={setIsEdit}
                                            setSelectedRowData={
                                                setSelectedRowData
                                            }
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            paginationPayload={
                                                paginationPayload
                                            }
                                        />
                                    }
                                    placement="bottomLeft"
                                    overlayStyle={{ width: '162px' }}
                                    trigger={showPopover ? 'click' : []}
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
            key: 'name',
            title: (
                <>
                    <div className="userTableWrapper__columnTitle">
                        <div>{t('commonStr.name')}</div>
                        <div className="sortArrows">
                            <UpArrow
                                onClick={() => {
                                    dispatch(
                                        getUsersList({
                                            ...paginationPayload,
                                            sortOrder: sortOrder.ascending,
                                            sortColumn: USERSSORT.name,
                                        })
                                    );
                                }}
                            />
                            <DownArrow
                                fill="white"
                                onClick={() => {
                                    dispatch(
                                        getUsersList({
                                            ...paginationPayload,
                                            sortOrder: sortOrder.descending,
                                            sortColumn: USERSSORT.name,
                                        })
                                    );
                                }}
                            />
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'name',
            className: 'column__name',
            render: (_: any, record: UserTableRowType) => {
                const fullName = `${record?.firstName} ${record?.lastName}`;
                return (
                    <>
                        <div className="userTableWrapper__nameData">
                            <div
                                className="viewName"
                                onClick={() => {
                                    onNameClickHandler(record);
                                }}
                            >
                                {record.profileImage ? (
                                    <Avatar
                                        className="mr-8"
                                        src={record.profileImage}
                                    />
                                ) : (
                                    <Avatar
                                        className="mr-8"
                                        style={{
                                            backgroundColor: record?.avtarColor,
                                        }}
                                    >
                                        {getIntials(
                                            `${record?.firstName} ${record?.lastName}`
                                        )}
                                    </Avatar>
                                )}

                                <span className="fs-14 fw-500 name">
                                    <Popover
                                        content={`${record?.firstName} ${record?.lastName}`}
                                        visible={isPopoverVisibles[record?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                    >
                                        {fullName?.length > maxLength
                                            ? `${fullName?.slice(
                                                  0,
                                                  maxLength
                                              )}...`
                                            : fullName}
                                    </Popover>
                                </span>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'roles',
            className: 'column__roles',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <Cascader
                        multiple
                        options={rolesFilterData()}
                        showCheckedStrategy={SHOW_CHILD}
                        onChange={onRoleChange}
                    >
                        <div>{t('commonStr.roles')}</div>
                    </Cascader>
                </div>
            ),
            dataIndex: 'roles',
            render: (_: any, record: UserTableRowType) => (
                <>
                    <div className="userTableWrapper__roles">
                        {record.roles}
                    </div>
                </>
            ),
        },
        {
            key: 'email',
            className: 'column__email',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>{t('commonStr.emailId')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: USERSSORT.email,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: USERSSORT.email,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'email',
            render: (_: any, record: UserTableRowType) => (
                <>
                    <div className="userTableWrapper__email">
                        {record.email}
                    </div>
                </>
            ),
        },
        {
            key: 'status',
            className: 'column__status',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <Popover
                        content={
                            <Radio.Group
                                onChange={onStatusChangeHandler}
                                value={statusValue}
                                className="user__statusFilter"
                            >
                                <Radio value={3}>All</Radio>
                                <Radio value={1}>Active</Radio>
                                <Radio value={2}>Inactive</Radio>
                            </Radio.Group>
                        }
                        placement="bottomLeft"
                        overlayStyle={{ width: '142px' }}
                    >
                        <div>{t('commonStr.status')}</div>
                    </Popover>

                    <div className="sortArrows">
                        {/* this is for filter will use  */}
                        {/*  */}
                        <UpArrow
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: USERSSORT.status,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: USERSSORT.status,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'status',
            render: (_: any, record: UserTableRowType) => (
                <>
                    <div className="userTableWrapper__status">
                        {record.active ? (
                            <>
                                <ActiveDotIcon />
                            </>
                        ) : (
                            <InactiveDotIcon />
                        )}
                        <span>
                            {record.active
                                ? t('commonStr.active')
                                : t('commonStr.inactive')}
                        </span>
                    </div>
                </>
            ),
        },
        {
            key: 'addedOn',
            className: 'column__addedOn',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>{t('users.addedOn')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: USERSSORT.createdAt,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: USERSSORT.createdAt,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'createdAt',
            render: (_: any, record: UserTableRowType) => (
                <>
                    <div className="userTableWrapper__addedOn">
                        {moment(record.addedOn).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
        {
            key: 'addedBy',
            className: 'column__addedBy',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>{t('users.addedBy')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: USERSSORT.createdBy,
                                    })
                                );
                            }}
                        />
                        <DownArrow
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getUsersList({
                                        ...paginationPayload,
                                        sortOrder: sortOrder.descending,
                                        sortColumn: USERSSORT.createdBy,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'createdBy',
            render: (_: any, record: UserTableRowType) => (
                <div className="userTableWrapper__createdBy">
                    {record.createdBy}
                </div>
            ),
        },
    ];

    return (
        <>
            {userListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <div className="userTableWrapper">
                    {!userListLoading ? (
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                                selectedRowKeys: selectedRowIds,
                            }}
                            pagination={false}
                            columns={TableColumns}
                            dataSource={tableData}
                            loading={userListLoading}
                            scroll={{ y: 'calc(100vh - 350px)' }}
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}

            {isEdit ? (
                <CustomModal
                    footer={null}
                    customClassName="edit-usermodal"
                    open={isUserViewModalOpen}
                    onCancel={() => {
                        setIsEdit(false);
                        cancelHandle(
                            isUserViewModalOpen,
                            setIsUserViewModalOpen
                        );
                    }}
                    title={t('users.editUser')}
                >
                    {userDetailsById.userId === selectedRowData && (
                        <AddUserManually
                            setadduserTypeValue={setadduserTypeValue}
                            handleCancle={() => {
                                setadduserTypeValue(false);
                                setIsEdit(false);
                                cancelHandle(
                                    isUserViewModalOpen,
                                    setIsUserViewModalOpen
                                );
                            }}
                            data={userDetailsById}
                            isEdit={isEdit}
                            onOk={() => {
                                onOkHandler();
                                setIsEdit(false);
                            }}
                            paginationPayload={paginationPayload}
                        />
                    )}
                </CustomModal>
            ) : (
                <div className="view-usermodal">
                    <CustomModal
                        footer={null}
                        open={isUserViewModalOpen}
                        customClassName="viewUserCustom"
                        onCancel={() => {
                            setIsEdit(false);
                            cancelHandle(
                                isUserViewModalOpen,
                                setIsUserViewModalOpen
                            );
                        }}
                        title={t('users.viewUser')}
                    >
                        <ViewUser
                            data={userDetailsById}
                            setIsEdit={setIsEdit}
                        />
                    </CustomModal>
                </div>
            )}
        </>
    );
};

export default UserTable;
