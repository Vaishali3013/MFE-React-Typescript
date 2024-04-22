import { Table, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { type ColumnsType } from 'antd/es/table';
import type { rolesListObject } from 'types/interfaces/PropsInterfaces';
import type { UserTableRowType } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { ascendingSort, decendingSort } from 'utils/commonFunction';
import { useTranslation } from 'react-i18next';

const EditRoleUsersTable: React.FC<{
    usersTableDataList: any;
    setSelectedRows: Function;
    selectedRowsList: any;
}> = ({ usersTableDataList, setSelectedRows, selectedRowsList }) => {
    const [tableData, setTableData] = useState<any>([]);
    const { t } = useTranslation('translation');
    const rowSelection: any = {
        onSelect: (
            record: UserTableRowType,
            selected: any,
            selectedRows: any
        ) => {
            setSelectedRows(selectedRows);
        },
        onSelectAll: (selected: boolean, selectedRows: any) => {
            selectedRows.map((record: any) => {
                const existingElement = selectedRowsList.findIndex(
                    (item: any) => item.userId === record.userId
                );
                if (existingElement !== -1) {
                    selectedRowsList.splice(existingElement, 1);
                } else {
                    selectedRowsList.push(record);
                }
            });

            const items: any = [...selectedRowsList];
            setSelectedRows(items);
        },
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        usersTableDataList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.userId,
                name: item.firstName,
                roles: item?.roles,
            });
        });
        return temp;
    };

    useEffect(() => {
        setTableData(tableDataMapper());
    }, [usersTableDataList]);

    const TableColumns: ColumnsType<rolesListObject> = [
        {
            key: 'name',
            title: (
                <>
                    <div className="rolesTableWrapper__columnTitle__name userTable">
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
            dataIndex: 'roleName',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="createRolerTableWrapper__nameData">
                            <div className="">
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
            title: (
                <div className="groupTableWrapper__columnTitle">
                    <div>{t('commonStr.roles')}</div>
                    <div className="sortArrows">
                        <UpArrow cursor="pointer" />
                        <DownArrow cursor="pointer" fill="white" />
                    </div>
                </div>
            ),
            dataIndex: 'roles',
            key: 'roles',
            width: '232px',
            render: (_: any, data: any) => {
                const array: string[] = [];
                data?.roles?.map((item: any) => {
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
            key: 'emailId',
            title: (
                <div className="rolesTableWrapper__columnTitle">
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
    ];
    return (
        <div className="rolesTableWrapper">
            <Table
                key={tableData}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                pagination={false}
                columns={TableColumns}
                dataSource={tableData}
            />
        </div>
    );
};
export default EditRoleUsersTable;
