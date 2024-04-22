import React, { useEffect, useState } from 'react';
import { Card, Cascader, Col, Row, Spin } from 'antd';
import CustomButton from 'components/common/CustomButton';
import CustomPagination from 'components/common/CustomPagination';
import './index.scss';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import RoleTable from './RoleTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllRoles,
    getRolesList,
    setEditRoleState,
} from 'redux/actions/UserManagementActions/rolesAction';
import { PERMISSIONS, resourceName, ROLETYPE } from 'types/enums';
import { useParams } from 'react-router-dom';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';
const Roles: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });
    const { SHOW_CHILD } = Cascader;
    const roleTableDataList = useSelector(
        (state: any) => state.userManagement.roles.rolesList
    );

    const allRolesData = useSelector(
        (state: any) => state.userManagement.roles.allRolesList
    );

    const rolesListLoading = useSelector(
        (state: any) => state.userManagement?.roles?.rolesListLoading
    );

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        dispatch(getRolesList({ ...payload, search: selectedValues }));
    }, [payload, selectedValues]);

    useEffect(() => {
        dispatch(getAllRoles());
    }, []);

    const { currentTab } = useParams();
    useEffect(() => {
        setSelectedValues([]);
    }, [currentTab]);

    const selectValues = (value: any, selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        allRolesData?.map((item: any, index: number) => {
            temp.push({
                value: item.roleId,
                label: `${item.roleName}`,
            });
        });
        return temp;
    };

    const filter = (inputValue: any, path: any): any =>
        path?.some((option: any): any =>
            (option?.label as string)
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase())
        );

    const [userPermissionDetails, setUserPermissionDetails] = useState({});
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    useEffect(() => {
        setUserPermissionDetails(
            getObjectByResourceName(
                resourceName.roles,
                loggedInUserPermissionData
            )
        );
    }, [loggedInUserPermissionData]);

    return (
        <>
            <div className="rolesWrapper">
                <Card bordered={false}>
                    <PermissionComponent screenName={resourceName.roles}>
                        {roleTableDataList?.totalRecords > 0 ? (
                            <>
                                <div className="rolesWrapper__rowHeader">
                                    <Cascader
                                        key={currentTab}
                                        multiple
                                        maxTagCount="responsive"
                                        options={tableDataMapper()}
                                        onChange={selectValues}
                                        className="rolesWrapper__search"
                                        placeholder={t('roles.searchRoleUsers')}
                                        showSearch={{ filter }}
                                        showCheckedStrategy={SHOW_CHILD}
                                        onSearch={(value) => {}}
                                    />
                                    <div className="rolesWrapper__button">
                                        <CustomButton
                                            type={'Create Role'}
                                            disabled={
                                                hasPermission(
                                                    userPermissionDetails,
                                                    PERMISSIONS.write
                                                )
                                                    ? false
                                                    : !loggedInUserDetails.admin
                                            }
                                            handleClick={() =>
                                                dispatch(
                                                    setEditRoleState(
                                                        ROLETYPE.create
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                {rolesListLoading ? (
                                    <div className="view__loader">
                                        <Spin />
                                    </div>
                                ) : (
                                    <Row
                                        className={
                                            roleTableDataList?.totalRecords > 50
                                                ? 'rolesWrapper__rolesListPagination'
                                                : 'rolesWrapper__rolesList'
                                        }
                                    >
                                        <Col span={24}>
                                            <RoleTable
                                                rolesTableDataList={
                                                    roleTableDataList?.records
                                                }
                                                search={selectedValues}
                                                pageType={payload}
                                                paginationPayload={payload}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </>
                        ) : (
                            <div className="rolesWrapper__noData">
                                <EmptyDataComponent
                                    textValue={t('roles.noRoles')}
                                    buttonType={{
                                        name: 'Create Role',
                                        disable: false,
                                    }}
                                    loading={rolesListLoading}
                                    buttonClickHandler={() => {
                                        dispatch(
                                            setEditRoleState(ROLETYPE.create)
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </PermissionComponent>
                </Card>
            </div>
            {roleTableDataList?.totalRecords > 50 && (
                <CustomPagination
                    totalRecords={roleTableDataList?.totalRecords}
                    page={page}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />
            )}
        </>
    );
};
export default Roles;
