import { Col, Form, Input, Row, Select, message } from 'antd';
import CustomButton from 'components/common/CustomButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addUser,
    editUser,
    getAllReprtingDashboardList,
    getAllReprtingRoleList,
    getUserPreferences,
} from 'redux/actions/UserManagementActions/usersAction';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EMPTY, PERMISSIONS, resourceName } from 'types/enums';
import { type AddUsermanuallyProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { cancelHandle } from 'utils/modalFunction';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { getAllRoles } from 'redux/actions/UserManagementActions/rolesAction';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const AddUserManually: React.FC<AddUsermanuallyProps> = ({
    handleCancle,
    data,
    isEdit,
    onOk,
    paginationPayload,
    setadduserTypeValue,
}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const loggedInUserId = parseJwt();
    const [showFields, setShowFields] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [uploadedProfileImage, setUploadedProfileImage] = useState<any>();
    const [reportingRole, setReportingRole] = useState<any>();

    const allRolesList = useSelector(
        (state: any) => state.userManagement?.roles?.allRolesList
    );

    const userPreference = useSelector(
        (state: any) => state.userManagement.users.userPreferences
    );

    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    const allReportingRoleList = useSelector(
        (state: any) => state.userManagement.users?.reportingRolesList
    );

    const allReportingDashboardList = useSelector(
        (state: any) => state.userManagement.users?.reportingDashbaordList
    );

    useEffect(() => {
        setUploadedProfileImage(data?.profileImage);
    }, [data]);

    const loggedInUserPermission = getObjectByResourceName(
        resourceName.roles,
        loggedInUserPermissionData
    );
    useEffect(() => {
        if (
            loggedInUserPermission?.permission?.length ||
            loggedInUserDetails?.admin
        ) {
            dispatch(getAllRoles());
        }
        dispatch(getUserPreferences());
    }, [loggedInUserDetails, loggedInUserPermission]);

    const onFinish = (values: {}): void => {
        setadduserTypeValue(false);
        if (isEdit) {
            dispatch(
                editUser({
                    ...values,
                    userId: data.userId,
                    upload: uploadedProfileImage,
                    paginationPayload: paginationPayload,
                    updatedBy: loggedInUserId.username,
                })
            );
            // will use
            // setPayload({ ...values, userId: data.userId });
            // modalShow(isModalOpen, setIsModalOpen);
            onOk();
        } else {
            dispatch(
                addUser({
                    ...values,
                    upload: uploadedProfileImage,
                    paginationPayload: paginationPayload,
                    createdBy: loggedInUserId.username,
                    updatedBy: loggedInUserId.username,
                })
            );
            onOk();
        }
    };
    // will use later
    // const isEdited = useSelector(
    //   (state: any) => state.userManagement.users.isUserEdited
    // );
    // will use later
    // const isEdited = useSelector(
    //   (state: any) => state.userManagement.users.isUserEdited
    // );

    const onFinishFailed = (errorInfo: any): void => {};
    useEffect(() => {
        if (
            loggedInUserPermission?.permission?.length ||
            loggedInUserDetails?.admin
        ) {
            dispatch(getAllRoles());
        }
    }, [dispatch]);

    // will use later
    const onOkHandler = (): any => {
        // dispatch(editUser({ ...payload }));
        // if (isEdited) {
        //   okHandle(isModalOpen, setIsModalOpen);
        //   modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        //   onOk();
        // }
    };

    const onShowMoreFieldshandler = (): void => {
        setShowFields(true);
    };

    const handleImageUpload = (event: any): any => {
        const file = event.target.files[0];
        if (file.size > 500 * 1024) {
            message.error('Image must be smaller than 500KB!');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = (): any => {
            setUploadedProfileImage(reader?.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        dispatch(getAllReprtingRoleList());
        dispatch(getAllReprtingDashboardList());
    }, []);

    const onValueChange = (changedValues: any, allValues: any): any => {
        setReportingRole(allValues.dashboardBuilderRole);
    };

    return (
        <>
            <div className="addUserManually">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        firstName: data?.firstName || '',
                        lastName: data?.lastName || '',
                        workEmailID: data?.email || '',
                        mobileNumber: data?.mobileNo || '',
                        role: data?.roles[0]?.roleId || '',
                        designation: data?.designation || '',
                        reportingTo: data?.reportingTo || '',
                        group: data?.userGroup || '',
                        timeZone: data?.timeZone?.timeZoneId || '',
                        language: data?.language?.languageId || '',
                        metrics: data?.metrics?.metricId || '',
                        dashboardBuilderRole:
                            parseInt(data?.dashboardBuilderRole) || '',
                        assignmentValues:
                            data?.dashboardEntries?.map(
                                (item: any) => item?.id
                            ) || [],
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={onValueChange}
                >
                    {showFields || isEdit ? (
                        <Row>
                            <Col
                                span={24}
                                className="addUserManually__imageUpload fs-14 fw-400"
                            >
                                <Form.Item
                                    className="imageUpload__container"
                                    label="Upload Profile Picture"
                                    valuePropName="fileList"
                                    name={'upload'}
                                >
                                    <label
                                        className={
                                            uploadedProfileImage
                                                ? 'display-none'
                                                : 'custom-file-upload'
                                        }
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <div className="upload-inner">
                                            <PlusOutlined />
                                            <span>Upload</span>
                                        </div>
                                    </label>
                                    {uploadedProfileImage && (
                                        <>
                                            <img
                                                src={uploadedProfileImage}
                                                alt="avatar"
                                                className="image__container"
                                            />
                                            <div
                                                className="remove__container"
                                                onClick={() => {
                                                    setUploadedProfileImage('');
                                                }}
                                            >
                                                <div className="remove">
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : (
                        EMPTY.string
                    )}
                    <div className="addUserManually__content__wrapper">
                        <div className="addUserManually__wrapper">
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('users.userDetails.firstName')}
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'users.userDetails.firstNameValidation'
                                                ),
                                                pattern: /^[a-zA-Z-]+$/i,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={t(
                                                'users.userDetails.firstNamePlaceholder'
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('users.userDetails.lastName')}
                                        name="lastName"
                                        rules={[
                                            {
                                                message: t(
                                                    'users.userDetails.lastNameValidation'
                                                ),
                                                pattern: /^[a-zA-Z-]+$/i,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={t(
                                                'users.userDetails.lastNamePlaceholder'
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('users.userDetails.workEmail')}
                                        name="workEmailID"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'users.userDetails.workEmailValidation'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="email"
                                            placeholder={t(
                                                'users.userDetails.workEmailPlaceholder'
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={t(
                                            'users.userDetails.mobileNumber'
                                        )}
                                        name="mobileNumber"
                                        rules={[
                                            {
                                                required: true,
                                                max: 13,
                                                message: t(
                                                    'users.userDetails.mobileNumberValidation'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="number"
                                            className="hide-sorting"
                                            placeholder={t(
                                                'users.userDetails.mobileNumberPlaceholder'
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        label={t(
                                            'users.userDetails.dashboardReportingRole'
                                        )}
                                        name="dashboardBuilderRole"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'users.userDetails.dashboardReportingRoleValidation'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            popupClassName={'CustomOverlay'}
                                            placeholder={t(
                                                'users.userDetails.dashboardReportingRolePlaceholder'
                                            )}
                                            disabled={
                                                isEdit
                                                    ? true
                                                    : hasPermission(
                                                          getObjectByResourceName(
                                                              resourceName.roles,
                                                              loggedInUserPermissionData
                                                          ),
                                                          PERMISSIONS.read
                                                      )
                                                    ? false
                                                    : !loggedInUserDetails.admin
                                            }
                                        >
                                            {allReportingRoleList?.map(
                                                (item: any) => {
                                                    return (
                                                        <Option
                                                            value={item?.id}
                                                            key={item?.id}
                                                        >
                                                            {item?.role}
                                                        </Option>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={t(
                                            'users.userDetails.reportingDashboard'
                                        )}
                                        name="assignmentValues"
                                        rules={[
                                            {
                                                required: reportingRole !== 4,
                                                message: t(
                                                    'users.userDetails.reportingDashboardValidation'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            maxTagCount="responsive"
                                            allowClear={true}
                                            popupClassName={'CustomOverlay'}
                                            placeholder={t(
                                                'users.userDetails.reportingDashboardPlaceholder'
                                            )}
                                            disabled={
                                                isEdit
                                                    ? false
                                                    : !reportingRole ||
                                                      reportingRole === 11 ||
                                                      (hasPermission(
                                                          getObjectByResourceName(
                                                              resourceName.roles,
                                                              loggedInUserPermissionData
                                                          ),
                                                          PERMISSIONS.read
                                                      )
                                                          ? false
                                                          : !loggedInUserDetails.admin)
                                            }
                                        >
                                            {allReportingDashboardList?.map(
                                                (item: any) => {
                                                    return (
                                                        <Option
                                                            value={item?.id}
                                                            key={item?.id}
                                                        >
                                                            {
                                                                item?.dashboard_title
                                                            }
                                                        </Option>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {showFields || isEdit ? (
                                <>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.role'
                                                )}
                                                name="role"

                                                // rules={[{ required: true, message: 'Select Role' }]}
                                            >
                                                <Select
                                                    popupClassName={
                                                        'CustomOverlay'
                                                    }
                                                    placeholder={t(
                                                        'users.userDetails.userRolePlaceholder'
                                                    )}
                                                    disabled={
                                                        hasPermission(
                                                            getObjectByResourceName(
                                                                resourceName.roles,
                                                                loggedInUserPermissionData
                                                            ),
                                                            PERMISSIONS.read
                                                        )
                                                            ? false
                                                            : !loggedInUserDetails.admin
                                                    }
                                                >
                                                    {allRolesList?.map(
                                                        (item: any) => {
                                                            return (
                                                                <Option
                                                                    value={
                                                                        item?.roleId
                                                                    }
                                                                    key={
                                                                        item?.roleId
                                                                    }
                                                                >
                                                                    {
                                                                        item?.roleName
                                                                    }
                                                                </Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.designation'
                                                )}
                                                name="designation"
                                            >
                                                <Input
                                                    name="designation"
                                                    placeholder={t(
                                                        'users.userDetails.designationPlaceholder'
                                                    )}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.reportingTo'
                                                )}
                                                name="reportingTo"
                                            >
                                                <Select
                                                    popupClassName={
                                                        'CustomOverlay'
                                                    }
                                                    placeholder={t(
                                                        'users.userDetails.select'
                                                    )}
                                                >
                                                    {/* will implement later */}
                                                    {/* <Option value="1">China</Option>
                          <Option value="2">U.S.A</Option> */}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.timeZone'
                                                )}
                                                name="timeZone"
                                            >
                                                <Select
                                                    popupClassName={
                                                        'CustomOverlay'
                                                    }
                                                    placeholder={t(
                                                        'users.userDetails.select'
                                                    )}
                                                    defaultValue={'select'}
                                                >
                                                    {userPreference?.timeZoneList?.map(
                                                        (item: any) => {
                                                            return (
                                                                <Option
                                                                    value={
                                                                        item.timeZoneId
                                                                    }
                                                                    key={
                                                                        item.timeZoneId
                                                                    }
                                                                >
                                                                    {
                                                                        item.timeZone
                                                                    }
                                                                </Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.language'
                                                )}
                                                name="language"
                                            >
                                                <Select
                                                    popupClassName={
                                                        'CustomOverlay'
                                                    }
                                                    placeholder={t(
                                                        'users.userDetails.select'
                                                    )}
                                                >
                                                    {userPreference?.languageList?.map(
                                                        (item: any) => {
                                                            return (
                                                                <Option
                                                                    value={
                                                                        item.languageId
                                                                    }
                                                                    key={
                                                                        item.languageId
                                                                    }
                                                                >
                                                                    {
                                                                        item.languageName
                                                                    }
                                                                </Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t(
                                                    'users.userDetails.languageOptions'
                                                )}
                                                name="metrics"
                                            >
                                                <Select
                                                    popupClassName={
                                                        'CustomOverlay'
                                                    }
                                                    placeholder={t(
                                                        'users.userDetails.select'
                                                    )}
                                                >
                                                    {userPreference?.metricsList?.map(
                                                        (item: any) => {
                                                            return (
                                                                <Option
                                                                    value={
                                                                        item.metricId
                                                                    }
                                                                    key={
                                                                        item.metricId
                                                                    }
                                                                >
                                                                    {
                                                                        item.metricSystem
                                                                    }
                                                                </Option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                EMPTY.string
                            )}
                        </div>
                    </div>
                    <div className="userCreationTypeWrapper__footerWrapper">
                        <div className="userCreationTypeWrapper__footerContent">
                            <CustomButton
                                type={t('commonStr.cancel')}
                                disabled={false}
                                handleClick={handleCancle}
                            />
                            <CustomButton
                                type={
                                    isEdit
                                        ? t('commonStr.save')
                                        : t('users.userDetails.adduser')
                                }
                                typeOfButton="submit"
                                disabled={false}
                            />
                            {showFields || isEdit ? (
                                EMPTY.string
                            ) : (
                                <>
                                    <div
                                        className="white-space-nwrap show-field"
                                        onClick={onShowMoreFieldshandler}
                                    >
                                        {t('users.userDetails.showMoreFields')}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Form>
            </div>
            <ConfirmationModal
                open={isModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('users.userDetails.saveConfirmation.message')}
                icon={<ConfirmationIcon />}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() =>
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    )
                }
                text={t('users.userDetails.saveConfirmation.successMessage')}
            />
        </>
    );
};

export default AddUserManually;
