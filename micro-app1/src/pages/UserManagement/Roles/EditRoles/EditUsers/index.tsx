import React, { useEffect, useState } from 'react';
import './index.scss';
import { Divider, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/actions/UserManagementActions/usersAction';
import EditRoleUsersTable from '../EditRoleUsersTable';
import CustomButton from 'components/common/CustomButton';
import { setUserRolePayload } from 'redux/actions/UserManagementActions/rolesAction';
import {
    filterArrayRemoveHandler,
    mergeAndRemoveDuplicatesAddHandler,
} from 'utils/userRoles';
import { useTranslation } from 'react-i18next';

const EditUsers: React.FC<any> = ({ onClose }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [unassignedRows, setUnassignedRows] = useState<any>([]);
    const [unassignedFilteredRows, setUnassignedFilteredRows] = useState<any>(
        []
    );
    const [usersListFiltered, setUsersListFiltered] = useState<any>([]);
    const [selectedRowDataListFiltered, setSelectedRowDataListFiltered] =
        useState<any>([]);
    const [searchAll, setSearchAll] = useState('');
    const [searchIndependent, setSearchIndependent] = useState('');
    const usersList: any = useSelector(
        (state: any) => state.userManagement.users.allUsersList
    );
    const roleDetails: any = useSelector(
        (state: any) => state.userManagement.roles.roleDetails
    );
    const selectedRowDataList = useSelector(
        (state: any) => state.userManagement.roles.usersRoleListPayload
    );
    useEffect(() => {
        dispatch(getAllUsers());
        selectedRowDataList?.length <= 0 &&
            dispatch(setUserRolePayload(roleDetails?.userMetaDataList));
        setSelectedRows([...selectedRowDataList]);
    }, []);

    useEffect(() => {
        const items = usersList.filter(
            (item: any) =>
                !selectedRowDataList.some(
                    (obj: any) => obj.userId === item.userId
                )
        );
        setUnassignedRows(items);
    }, [selectedRowDataList, usersList]);

    useEffect(() => {
        setSelectedRows([...selectedRowDataList]);
    }, [selectedRowDataList]);

    function searchUserData(data: any, searchTerm: any): any {
        const search = searchTerm.toLowerCase();
        const filteredData = data.filter((item: any) => {
            const firstNameMatch = item.firstName
                .toLowerCase()
                .includes(search);
            const lastNameMatch = item.lastName.toLowerCase().includes(search);
            const emailMatch = item.email.toLowerCase().includes(search);
            // Check if the firstName or email matches the search term
            return firstNameMatch || lastNameMatch || emailMatch;
        });

        return filteredData;
    }

    useEffect(() => {
        if (searchAll) {
            const items = searchUserData(usersList, searchAll);
            setUsersListFiltered(items);
        } else {
            setUsersListFiltered([...usersList]);
        }
    }, [searchAll, usersList]);

    useEffect(() => {
        if (searchIndependent) {
            const items = searchUserData(unassignedRows, searchIndependent);
            setUnassignedFilteredRows(items);
            const assignedItems = searchUserData(
                selectedRowDataList,
                searchIndependent
            );
            setSelectedRowDataListFiltered(assignedItems);
        } else {
            setUnassignedFilteredRows([...unassignedRows]);
            setSelectedRowDataListFiltered([...selectedRowDataList]);
        }
    }, [searchIndependent, selectedRowDataList, unassignedRows]);

    return (
        <div className="EditUserWrapper">
            {selectedRowDataList?.length === 0 ||
            selectedRowDataList?.length === usersList?.length ? (
                <>
                    <div className="EditUserWrapper__topLayer">
                        <Input
                            className="EditUserWrapper__search"
                            placeholder="Search or Add New Users"
                            prefix={<SearchOutlined />}
                            onChange={(e) => {
                                setSearchAll(e.target.value);
                            }}
                        />
                        <a
                            onClick={() =>
                                dispatch(setUserRolePayload(selectedRows))
                            }
                        >
                            {t('roles.remove')}
                        </a>
                    </div>
                    <div className="EditUserWrapper__table">
                        <EditRoleUsersTable
                            usersTableDataList={usersListFiltered}
                            setSelectedRows={setSelectedRows}
                            selectedRowsList={selectedRows}
                        />
                    </div>
                    <div className="createRolesWrapper__createRoleFooter">
                        <div className="createRolesWrapper__footerButtonWrapper">
                            <CustomButton
                                type={t('commonStr.cancel')}
                                disabled={false}
                                handleClick={() => {
                                    onClose();
                                }}
                            />
                        </div>
                        <div className="createRolesWrapper__footerButtonWrapper">
                            <CustomButton
                                type={t('commonStr.save')}
                                disabled={false}
                                handleClick={() => {
                                    selectedRowDataList?.length > 0
                                        ? onClose()
                                        : dispatch(
                                              setUserRolePayload(selectedRows)
                                          );
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="EditUserWrapper__topLayer">
                        <Input
                            className="EditUserWrapper__search"
                            placeholder={t('roles.searchAddNewUsers')}
                            prefix={<SearchOutlined />}
                            onChange={(e) => {
                                setSearchIndependent(e.target.value);
                            }}
                        />
                    </div>
                    <div className="EditUserWrapper__middleContent">
                        <div className="EditUserWrapper__topLayerAssigned">
                            <Divider plain>{t('roles.userAssigned')}</Divider>
                        </div>
                        <div className="EditUserWrapper__topLayerAssigned">
                            <a
                                onClick={() => {
                                    dispatch(
                                        setUserRolePayload(
                                            filterArrayRemoveHandler(
                                                selectedRowDataListFiltered,
                                                selectedRows
                                            )
                                        )
                                    );
                                }}
                            >
                                {t('roles.remove')}
                            </a>
                        </div>
                        <div className="EditUserWrapper__assignedTable">
                            <EditRoleUsersTable
                                usersTableDataList={selectedRowDataListFiltered}
                                setSelectedRows={setSelectedRows}
                                selectedRowsList={selectedRows}
                            />
                        </div>
                    </div>
                    <div className="EditUserWrapper__middleContent">
                        <div className="EditUserWrapper__topLayerUnassigned">
                            <Divider plain>{t('roles.addNewUser')}</Divider>
                        </div>
                        <div className="EditUserWrapper__topLayerUnassigned">
                            <a
                                onClick={() => {
                                    dispatch(
                                        setUserRolePayload(
                                            mergeAndRemoveDuplicatesAddHandler(
                                                selectedRows,
                                                selectedRowDataListFiltered
                                            )
                                        )
                                    );
                                }}
                            >
                                {t('roles.add')}
                            </a>
                        </div>
                        <div className="EditUserWrapper__assignedTable">
                            <EditRoleUsersTable
                                usersTableDataList={unassignedFilteredRows}
                                setSelectedRows={setSelectedRows}
                                selectedRowsList={selectedRows}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default EditUsers;
