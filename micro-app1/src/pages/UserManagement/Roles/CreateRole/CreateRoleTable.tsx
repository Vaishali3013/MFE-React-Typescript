import React, { useEffect, useState } from 'react';
import { Avatar, Table, Tooltip } from 'antd';
import './CreateRoleTable.scss';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { type ColumnsType } from 'antd/es/table';
import {
    ascendingSort,
    decendingSort,
    getIntials,
    randomBackgroundColour,
} from 'utils/commonFunction';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { type UserTableRowType } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { avtarColor } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRolePayload } from 'redux/actions/UserManagementActions/rolesAction';
import { useTranslation } from 'react-i18next';

const CreateRoleTable: React.FC<{ userData: any }> = ({ userData }) => {
    const [tableData, setTableData] = useState<any>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const selectedRowDataList = useSelector(
        (state: any) => state.userManagement.roles.usersRoleListPayload
    );

    useEffect(() => {
        const userIds: any = selectedRowDataList.map(
            (item: any) => item.userId
        );
        const uniqueUserIds: any = Array.from(
            new Set([...selectedRowKeys, ...userIds])
        );
        setSelectedRowKeys(uniqueUserIds);
    }, [selectedRowDataList]);

    const rowSelection: any = {
        onSelect: (record: UserTableRowType) => {
            const existingElement = selectedRowDataList.findIndex(
                (item: any) => item.userId === record.userId
            );

            if (existingElement !== -1) {
                selectedRowDataList.splice(existingElement, 1);
            } else {
                selectedRowDataList.push(record);
            }

            const items: any = [...selectedRowDataList];
            dispatch(setUserRolePayload(items));
        },
    };

    function handleRowSelectionChange(selectedRowKeys: any): void {
        setSelectedRowKeys(selectedRowKeys);
    }

    const tableDataMapper = (): [] => {
        const temp: any = [];
        userData?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.userId,
                name: item.firstName,
                avtarColor: avtarColor[index],
                roles: item?.roles,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
    }, [userData]);

    const TableColumns: ColumnsType<UserTableRowType> = [
        {
            key: 'name',
            title: (
                <>
                    <div className="createRolerTableWrapper__columnTitle">
                        <div>{t('commonStr.name')}</div>

                        <div className="sortArrows">
                            <UpArrow
                                cursor="pointer"
                                onClick={() => {
                                    setTableData(
                                        ascendingSort('name', [...tableData])
                                    );
                                }}
                            />
                            <DownArrow
                                cursor="pointer"
                                fill="white"
                                onClick={() => {
                                    setTableData(
                                        decendingSort('name', [...tableData])
                                    );
                                }}
                            />
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'name',
            render: (_: any, record: UserTableRowType) => {
                return (
                    <>
                        <div className="createRolerTableWrapper__nameData">
                            <div className="">
                                {record.profileImage ? (
                                    <Avatar
                                        className="mr-10"
                                        src={record.profileImage}
                                    />
                                ) : (
                                    <Avatar
                                        className="mr-10"
                                        style={{
                                            backgroundColor:
                                                randomBackgroundColour(),
                                        }}
                                    >
                                        {getIntials(
                                            `${record?.firstName} ${record?.lastName}`
                                        )}
                                    </Avatar>
                                )}

                                <span className="fs-14 fw-500 name">
                                    {record?.firstName} {record.lastName}
                                </span>
                            </div>
                        </div>
                    </>
                );
            },
        },

        {
            key: 'roles',
            title: (
                <div className="createRolerTableWrapper__columnTitle">
                    <div>{t('commonStr.roles')}</div>
                    <div className="sortArrows">
                        <UpArrow />
                        <DownArrow fill="white" />
                    </div>
                </div>
            ),
            dataIndex: 'roles',
            render: (_: any, data: UserTableRowType) => {
                const array: string[] = [];
                data.roles.map((item: any) => {
                    array.push(item.roleName);
                });
                const joinedArray = array.join(', ');
                const ellipse = '...';
                const maxLength = 25;
                let truncatedData = joinedArray;
                let remainingData: string[] = [];
                let charactersBetween: any = 0;
                if (joinedArray.length > maxLength) {
                    const remainingLength = maxLength - ellipse.length;
                    truncatedData =
                        joinedArray.substring(0, maxLength) + ellipse;
                    const truncatedSubstring = joinedArray.substring(
                        0,
                        remainingLength
                    );
                    const lastCommaIndex = truncatedSubstring.lastIndexOf(',');
                    if (lastCommaIndex !== -1) {
                        charactersBetween =
                            remainingLength - lastCommaIndex + 1;
                    }
                    remainingData = joinedArray
                        .substring(maxLength - charactersBetween)
                        .split(',')
                        .map((item) => item.trim());
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
            key: 'email',
            title: (
                <div className="createRolerTableWrapper__columnTitle">
                    <div>{t('commonStr.emailId')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setTableData(
                                    ascendingSort('email', [...tableData])
                                );
                            }}
                        />
                        <DownArrow
                            cursor="pointer"
                            fill="white"
                            onClick={() => {
                                setTableData(
                                    decendingSort('email', [...tableData])
                                );
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'email',
        },

        {
            key: 'status',

            title: (
                <div className="createRolerTableWrapper__columnTitle">
                    <div>{t('commonStr.status')}</div>
                    <div className="sortArrows">
                        <UpArrow />
                        <DownArrow fill="white" />
                    </div>
                </div>
            ),

            dataIndex: 'active',
            render: (_: any, record: UserTableRowType) => (
                <>
                    <div className="createRolerTableWrapper__status">
                        {record?.active ? (
                            <>
                                <ActiveDotIcon />
                            </>
                        ) : (
                            <InactiveDotIcon />
                        )}
                        <span>{record?.active ? 'Active' : 'Inactive'}</span>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className="createRolerTableWrapper">
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                    selectedRowKeys,
                    onChange: handleRowSelectionChange,
                }}
                // rowSelection={rowSelection}
                pagination={false}
                columns={TableColumns}
                dataSource={tableData}
            />
        </div>
    );
};

export default CreateRoleTable;
