import { Avatar, Popover, Spin, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { type ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import './RoleTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getIntials, randomBackgroundColour } from 'utils/commonFunction';
import type { rolesListObject } from 'types/interfaces/PropsInterfaces';
import { getRolesList } from 'redux/actions/UserManagementActions/rolesAction';
import { ROLESSORT, sortOrder, resourceName, PERMISSIONS } from 'types/enums';
import moment from 'moment';
import MoreContent from './RoleTableMoreContent';
import { DATE_FORMAT } from 'utils/constants';
import RoleMultipleActiveDeactive from './RoleMultipleActiveDeactive';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { useTranslation } from 'react-i18next';

const RoleTable: React.FC<{
    rolesTableDataList: any;
    search: any;
    pageType: any;
    paginationPayload: any;
}> = ({ rolesTableDataList, search, pageType, paginationPayload }) => {
    const [tableData, setTableData] = useState<any>([]);
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
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

    const tableDataMapper = (): [] => {
        const temp: any = [];
        rolesTableDataList?.map((item: any, index: number) => {
            temp.push({ ...item, key: item.roleId, name: item.firstName });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
        setSelectedRowIds([]);
        setSelectedRows([]);
    }, [rolesTableDataList]);

    const rolesListLoading = useSelector(
        (state: any) => state.userManagement?.roles?.rolesListLoading
    );
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const [selectedRowIds, setSelectedRowIds] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<rolesListObject[]>([]);

    const rowSelection: any = {
        onSelect: (
            record: rolesListObject,
            selected: boolean,
            selectedRows: any
        ) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item?.active
                    ? selectedActiveRows.push(item.id)
                    : selectedInactiveRows.push(item.id)
            );

            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record.roleId]);
                setSelectedRows([...selectedRows, record]);
            } else {
                setSelectedRowIds(
                    selectedRowIds.filter(
                        (roleId: number) => roleId !== record.roleId
                    )
                );
                setSelectedRows(
                    selectedRows.filter(
                        (row: rolesListObject) => row.key !== record.key
                    )
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: rolesListObject[]) => {
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
                const newSelectedIds = selectedRows.map(
                    (record) => record.roleId
                );
                setSelectedRowIds(newSelectedIds);
                setSelectedRows(selectedRows);
            } else {
                setSelectedRowIds([]);
                setSelectedRows([]);
            }
        },
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

    const tableColumns: ColumnsType<rolesListObject> = [
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
                                            <RoleMultipleActiveDeactive
                                                multipleRecord={selectedRows}
                                                selectedUserIds={selectedRowIds}
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
                                    resourceName.roles,
                                    loggedInUserPermissionData
                                ),
                                PERMISSIONS.update
                            ) ||
                            !record.active ||
                            hasPermission(
                                getObjectByResourceName(
                                    resourceName.roles,
                                    loggedInUserPermissionData
                                ),
                                PERMISSIONS.write
                            ) ||
                            hasPermission(
                                getObjectByResourceName(
                                    resourceName.roles,
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
                                    } // Use popoverVisible state
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    content={
                                        <MoreContent
                                            record={record}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            selectedUserIds={selectedRowIds}
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
            key: 'roleName',

            title: (
                <>
                    <div className="rolesTableWrapper__columnTitle">
                        <div>{t('roles.roleName')}</div>
                        <div className="sortArrows">
                            <UpArrow
                                cursor="pointer"
                                onClick={() => {
                                    dispatch(
                                        getRolesList({
                                            sortOrder: sortOrder.ascending,
                                            sortColumn: ROLESSORT.roleName,
                                            search: search,
                                            page: pageType?.page,
                                            pageSize: pageType?.pageSize,
                                        })
                                    );
                                }}
                            />

                            <DownArrow
                                cursor="pointer"
                                fill="white"
                                onClick={() => {
                                    dispatch(
                                        getRolesList({
                                            sortOrder: sortOrder.descending,
                                            sortColumn: ROLESSORT.roleName,
                                            search: search,
                                            pageNum: pageType?.page,
                                            pageSize: pageType?.pageSize,
                                        })
                                    );
                                }}
                            />
                        </div>
                    </div>
                </>
            ),

            dataIndex: 'roleName',

            render: (_: any, record: rolesListObject) => {
                return (
                    <>
                        <div className="rolesTableWrapper__nameDataRoles">
                            <div className="">
                                <span className="fs-14 fw-500 name">
                                    {record?.roleName}
                                </span>
                            </div>
                        </div>
                    </>
                );
            },
        },

        {
            key: 'active',

            title: (
                <div className="rolesTableWrapper__columnTitle">
                    <div>{t('commonStr.status')}</div>

                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: ROLESSORT.isActive,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />

                        <DownArrow
                            cursor="pointer"
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: ROLESSORT.isActive,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),

            dataIndex: 'active',

            render: (_: any, { active }: any) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {active === true ? (
                            <ActiveDotIcon />
                        ) : (
                            <InactiveDotIcon />
                        )}

                        <span>{active === true ? 'Active' : 'Inactive'}</span>
                    </div>
                </>
            ),
        },

        {
            title: (
                <div className="rolesTableWrapper__columnTitle">
                    <div>{t('roles.noOfUsers')}</div>
                    <div className="sortArrows">
                        <UpArrow />
                        <DownArrow fill="white" />
                    </div>
                </div>
            ),
            key: 'userMetaDataList',
            dataIndex: 'userMetaDataList',
            render: (_: any, record: rolesListObject) => (
                <>
                    <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        size="large"
                        className="rolesTableWrapper__avatarGroup "
                    >
                        {record?.userMetaDataList?.map(
                            (item: any, index: number) => (
                                <Avatar
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            randomBackgroundColour(),
                                    }}
                                    src={item?.profileImage}
                                >
                                    {item &&
                                        getIntials(
                                            `${item?.firstName} ${item?.lastName}`
                                        )}
                                </Avatar>
                            )
                        )}
                    </Avatar.Group>
                </>
            ),
        },

        {
            title: (
                <div className="rolesTableWrapper__columnTitle">
                    <div>{t('commonStr.lastModified')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: ROLESSORT.updatedAt,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />

                        <DownArrow
                            cursor="pointer"
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: ROLESSORT.updatedAt,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            render: (_: any, record: rolesListObject) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {moment(record.updatedAt).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },

        {
            title: (
                <div className="rolesTableWrapper__columnTitle">
                    <div>{t('commonStr.createdBy')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: ROLESSORT.createdBy,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />

                        <DownArrow
                            cursor="pointer"
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: ROLESSORT.createdBy,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
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
                <div className="rolesTableWrapper__columnTitle">
                    <div>{t('commonStr.createdOn')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.ascending,
                                        sortColumn: ROLESSORT.createdAt,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />

                        <DownArrow
                            cursor="pointer"
                            fill="white"
                            onClick={() => {
                                dispatch(
                                    getRolesList({
                                        sortOrder: sortOrder.descending,
                                        sortColumn: ROLESSORT.createdAt,
                                        search: search,
                                        pageNum: pageType?.page,
                                        pageSize: pageType?.pageSize,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (_: any, record: rolesListObject) => (
                <>
                    <div className="rolesTableWrapper__status">
                        {moment(record.createdAt).format(DATE_FORMAT)}
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {rolesListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <div className="rolesTableWrapper">
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: selectedRowIds,
                            ...rowSelection,
                        }}
                        pagination={false}
                        columns={tableColumns}
                        dataSource={tableData}
                        loading={rolesListLoading}
                        scroll={{ y: 'calc(100vh - 380px)' }}
                    />
                </div>
            )}
        </>
    );
};

export default RoleTable;
