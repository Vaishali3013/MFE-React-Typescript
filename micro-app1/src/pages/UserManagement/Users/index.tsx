/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Dropdown,
    type MenuProps,
    Row,
    message,
    Cascader,
    Spin,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import CustomPagination from 'components/common/CustomPagination';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import CustomModal from 'components/common/Modals/CustomModal';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import UserCreation from './AddUser';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from './UserTable';
import './index.scss';
import {
    getAllUsers,
    getUsersList,
} from 'redux/actions/UserManagementActions/usersAction';
import { getTemplate } from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import Api from 'redux/services';
import { getAllRoles } from 'redux/actions/UserManagementActions/rolesAction';
import { useParams } from 'react-router-dom';
import { baseUrlSetter } from 'utils/commonFunction';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { PERMISSIONS, resourceName } from 'types/enums';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';

const Users: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const { SHOW_CHILD } = Cascader;
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [statusValue, setStatusValue] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userTypeValue, setUserTypeValue] = useState<number>(0);
    const [searchSelectedValues, setSearchSelectedValues] = useState<any>([]);
    const [rolesFilterSelection, setRolesFilterSelection] = useState<any>([]);
    const [typeOfDownload, setTypeOfDownload] = useState<any>();
    const [userPermissionDetails, setUserPermissionDetails] = useState({});
    const [adduserTypeValue, setadduserTypeValue] = useState(false);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });
    // const loaderState = useSelector((state: any) => state.root.showLoader);
    const { currentTab } = useParams();
    useEffect(() => {
        setSearchSelectedValues([]);
    }, [currentTab]);

    const userTableDataList = useSelector(
        (state: any) => state.userManagement.users.usersList
    );

    const allUsersList = useSelector(
        (state: any) => state.userManagement.users.allUsersList
    );
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const loggedInUserRolePermission = getObjectByResourceName(
        resourceName.roles,
        loggedInUserPermissionData
    );
    const loggedInUserPermission = getObjectByResourceName(
        resourceName.users,
        loggedInUserPermissionData
    );
    const userListLoading = useSelector(
        (state: any) => state.userManagement?.users?.userListLoading
    );

    const onAddUsersHandler = (): any => {
        modalShow(isModalOpen, setIsModalOpen);
        if (
            loggedInUserRolePermission?.permission?.length ||
            loggedInUserDetails?.admin
        ) {
            dispatch(getAllRoles());
        }
    };

    // Note: To be moved to sage
    function handleChange(event: any, type: string): void {
        baseUrlSetter('userManagement');
        event.preventDefault();
        let url = '';
        if (type === 'excel') {
            url = '/users/importUsersFromExcel';
        } else if (type === 'csv') {
            url = 'users/importUsersFromCsv';
        }
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        event.target.value = '';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        Api.post(url, formData, config)
            .then((response) => {
                message.success('File Uploaded Successfully');
            })
            .catch(() => {
                message.error(
                    'Could not upload, please check the contents of file.'
                );
            });
    }

    const items: MenuProps['items'] = [
        {
            label: (
                <>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e: any) => {
                            handleChange(e, 'csv');
                        }}
                        id="file-upload-users-csv"
                    />
                    <label
                        onClick={() => {
                            document
                                .getElementById('file-upload-users-csv')
                                ?.click();
                        }}
                    >
                        {t('commonStr.uploadCsv')}
                    </label>
                </>
            ),
            key: 'uploadCSV',
            icon: <CSVIcon />,
        },
        {
            label: (
                <>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e: any) => {
                            handleChange(e, 'excel');
                        }}
                        id="file-upload-users-excel"
                    />
                    <label
                        onClick={() => {
                            document
                                .getElementById('file-upload-users-excel')
                                ?.click();
                        }}
                    >
                        {t('commonStr.uploadExcel')}
                    </label>
                </>
            ),
            key: 'uploadExcel',
            icon: <ExcelIcon />,
        },
        {
            label: t('commonStr.downlaodTemp'),
            key: 'downloadTemplate',
            icon: <ExcelIcon />,
            children: [
                {
                    key: 'csv',
                    label: (
                        <div
                            onClick={() => {
                                setTypeOfDownload('downloadTemplateCSV');
                            }}
                        >
                            {t('commonStr.asCsv')}
                        </div>
                    ),
                },
                {
                    key: 'excel',
                    label: (
                        <div
                            onClick={() => {
                                setTypeOfDownload('downloadTemplateExcel');
                            }}
                        >
                            {t('commonStr.asExcel')}
                        </div>
                    ),
                },
            ],
        },
    ];

    useEffect(() => {
        dispatch(getAllUsers());
        // dispatch(getAllRoles());
    }, []);

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        if (
            loggedInUserPermission?.permission?.length ||
            loggedInUserDetails?.admin
        ) {
            dispatch(
                getUsersList({
                    ...payload,
                    statusValue: statusValue,
                    search: searchSelectedValues,
                    rolesFilter: rolesFilterSelection,
                })
            );
        }
    }, [
        payload,
        statusValue,
        searchSelectedValues,
        rolesFilterSelection,
        loggedInUserDetails,
        loggedInUserPermission,
    ]);

    useEffect(() => {
        if (typeOfDownload)
            dispatch(
                getTemplate({ screenType: 'userManagement', typeOfDownload })
            );
        setTypeOfDownload('');
    }, [typeOfDownload]);

    const onChanges = (value: any, selectedOptions: any): any => {
        setSearchSelectedValues(value.flat());
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        allUsersList?.map((item: any, index: number) => {
            temp.push({
                value: item.userId,
                label: ` ${item.firstName} ${item.lastName}`,
                name: ` ${item.firstName} ${item.lastName}`,
                email: ` ${item.email}`,
            });
        });
        return temp;
    };

    const filter = (inputValue: any, path: any): any =>
        path?.some(
            (option: any): any =>
                (option?.name as string)
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase()) ||
                (option?.email as string)
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase())
        );

    useEffect(() => {
        setUserPermissionDetails(
            getObjectByResourceName(
                resourceName.users,
                loggedInUserPermissionData
            )
        );
    }, [loggedInUserPermissionData]);

    return (
        <>
            <div className="usersWrapper">
                <Card bordered={false}>
                    <PermissionComponent screenName={resourceName.users}>
                        {userTableDataList?.totalRecords > 0 ? (
                            <>
                                <Row>
                                    <Col
                                        span={24}
                                        className="usersWrapper__header"
                                    >
                                        <Cascader
                                            key={currentTab}
                                            multiple
                                            maxTagCount="responsive"
                                            options={tableDataMapper()}
                                            onChange={onChanges}
                                            className="usersWrapper__search"
                                            placeholder={t(
                                                'users.searchNameEmailID'
                                            )}
                                            showSearch={{ filter }}
                                            showCheckedStrategy={SHOW_CHILD}
                                            onSearch={(value) => {}}
                                        />

                                        <div className="usersWrapper__header-button">
                                            <Dropdown
                                                menu={{ items }}
                                                overlayClassName="bluk__upload"
                                            >
                                                <Button>
                                                    {t('commonStr.bulkUpload')}
                                                    <DownOutlined />
                                                </Button>
                                            </Dropdown>
                                            <CustomButton
                                                type={t('users.addUsers')}
                                                disabled={
                                                    hasPermission(
                                                        userPermissionDetails,
                                                        PERMISSIONS.write
                                                    )
                                                        ? false
                                                        : !loggedInUserDetails.admin
                                                }
                                                handleClick={() =>
                                                    onAddUsersHandler()
                                                }
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {userListLoading ? (
                                    <div className="view__loader">
                                        <Spin />
                                    </div>
                                ) : (
                                    <Row
                                        className={
                                            userTableDataList?.totalRecords > 50
                                                ? 'usersWrapper__usersListPagination'
                                                : 'usersWrapper__usersList'
                                        }
                                    >
                                        <Col span={24}>
                                            <UserTable
                                                userTableDataList={
                                                    userTableDataList?.records
                                                }
                                                statusValue={statusValue}
                                                setStatusValue={setStatusValue}
                                                paginationPayload={payload}
                                                setRolesFilterSelection={
                                                    setRolesFilterSelection
                                                }
                                                setadduserTypeValue={
                                                    setadduserTypeValue
                                                }
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </>
                        ) : (
                            <div className="usersWrapper__tableEmpty">
                                <EmptyDataComponent
                                    textValue={''}
                                    buttonType={{
                                        name: 'Add Users',
                                        disable: false,
                                    }}
                                    bulkImport={true}
                                    loading={userListLoading}
                                    buttonClickHandler={() => {
                                        if (userTableDataList?.length <= 0) {
                                            onAddUsersHandler();
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </PermissionComponent>
                </Card>
            </div>

            {userTableDataList?.totalRecords > 50 ? (
                <CustomPagination
                    totalRecords={userTableDataList?.totalRecords}
                    setPage={setPage}
                    page={page}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />
            ) : (
                ''
            )}

            <CustomModal
                customClassName={
                    adduserTypeValue ? 'add-user' : 'user-creation'
                }
                open={isModalOpen}
                footer={null}
                onOk={() => {
                    okHandle(isModalOpen, setIsModalOpen);
                    setadduserTypeValue(false);
                }}
                onCancel={() => {
                    setUserTypeValue(0);
                    cancelHandle(isModalOpen, setIsModalOpen);
                    setadduserTypeValue(false);
                }}
                title={t('users.addUsers')}
                userTypeValue={userTypeValue}
            >
                <UserCreation
                    setUserTypeValue={setUserTypeValue}
                    userTypeValue={userTypeValue}
                    onCancelhandler={() =>
                        cancelHandle(isModalOpen, setIsModalOpen)
                    }
                    onOk={() => okHandle(isModalOpen, setIsModalOpen)}
                    paginationPayload={payload}
                    setadduserTypeValue={setadduserTypeValue}
                />
            </CustomModal>
        </>
    );
};

export default Users;
