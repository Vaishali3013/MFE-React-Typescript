// import { ReactComponent as ResetPasswordIcon } from 'assets/icons/resetPasswordIcon.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/deactivateIconBlack.svg';
import { ReactComponent as ResetPasswordIcon } from 'assets/icons/resetPasswordIcon.svg';
import { type UsersMoreContentProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { useState, type ReactNode, useEffect } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/activateIcon.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/deactivateIcon.svg';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    activateDeactivateUser,
    getUserDetails,
} from 'redux/actions/UserManagementActions/usersAction';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { PERMISSIONS, resetPasswordOption, resourceName } from 'types/enums';
import ResetPasswordOptions from './ResetPasswordOptions';
import { ChangeUserPasswordByAdmin } from './ChangeUserPasswordByAdmin';
import CustomModal from 'components/common/Modals/CustomModal';
import { sendPasswordResetLink } from 'redux/actions/AuthAction/authAction';
import { useTranslation } from 'react-i18next';
import { CLOSE_SET_NEW_PASSWORD_MODAL } from 'redux/types/loginTypes';

const UserMoreContent: React.FC<UsersMoreContentProps> = ({
    record,
    setIsUserEditModalOpen,
    isUserEditModalOpen,
    setIsEdit,
    setSelectedRowData,
    setPopoverVisible,
    paginationPayload,
    selectedUserIds,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
        useState(false);

    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const [passwordChangedSuccessModal, setPasswordChangedSuccessModal] =
        useState(false);
    const [selectedOption, setSelectedOption] = useState(
        resetPasswordOption?.default
    );
    const userDetailsById = useSelector(
        (state: any) => state?.userManagement?.users?.userDetails
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const passwordUpdated = useSelector(
        (state: any) => state.login.passwordUpdated
    );
    useEffect(() => {
        if (passwordUpdated) {
            setPasswordChangedSuccessModal(true);
        }
    }, [passwordUpdated]);
    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const handleEditClick = (): void => {
        setPopoverVisible(false); // Close the popover
    };

    const handleActivateDeactivateClick = (): void => {
        setPopoverVisible(false); // Close the popover
    };
    const { t } = useTranslation('translation');
    const values = [
        {
            title: t('commonStr.edit'),
            icon: <EditIcon />,
            disable: hasPermission(
                getObjectByResourceName(
                    resourceName.users,
                    loggedInUserPermissionData
                ),
                PERMISSIONS.update
            )
                ? false
                : !loggedInUserDetails.admin,
        },
        {
            title: record.active
                ? t('commonStr.deactivate')
                : t('commonStr.activate'),
            icon: <DeactivateGroupIcon />,
            disable: hasPermission(
                getObjectByResourceName(
                    resourceName.users,
                    loggedInUserPermissionData
                ),
                PERMISSIONS.delete
            )
                ? false
                : record.admin,
        },
        {
            title: t('commonStr.resetPassword'),
            icon: <ResetPasswordIcon />,
            disable:
                loggedInUserPermissionData.permission?.length > 3
                    ? false
                    : !loggedInUserDetails.admin,
        },
    ];
    // Check if the user is inactive and remove the "Edit" action if necessary
    // If the user is inactive, remove the first action (Edit) from the array
    if (!record?.active) {
        values.splice(0, 1);
    }

    const dispatch = useDispatch();
    const onClickHandler = (data: { title: string; icon: ReactNode }): any => {
        if (data.title === t('commonStr.edit')) {
            handleEditClick();
            setIsEdit(true);
            dispatch(getUserDetails(record.userId));
            setSelectedRowData(record.userId);
            userDetailsById &&
                modalShow(isUserEditModalOpen, setIsUserEditModalOpen);
        }
        if (
            data.title ===
            `${
                record.active
                    ? t('commonStr.deactivate')
                    : t('commonStr.activate')
            }`
        ) {
            handleActivateDeactivateClick();
            modalShow(isModalOpen, setIsModalOpen);
        }
        if (data.title === t('commonStr.resetPassword')) {
            handleActivateDeactivateClick();
            modalShow(isResetPasswordModalOpen, setIsResetPasswordModalOpen);
        }
    };
    const onOkHandler = (): any => {
        dispatch(
            activateDeactivateUser({
                paginationPayload: paginationPayload,
                id: [record?.userId],
                status: !record?.active,
                tabKey: t('users.users'),
            })
        );

        okHandle(isModalOpen, setIsModalOpen);
        modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
    };

    // NOTE- COMMENTING , CAN BE USED LATER
    // const otpContent = (
    //     <div
    //         onClick={(e: any) => {
    //             e.stopPropagation();
    //         }}
    //         className="otp-popover"
    //     >
    //         <div>
    //             <div className="otp-copy text-center fs-30 fw-500">
    //                 {otpData}
    //             </div>
    //             <div
    //                 onClick={() => {
    //                     copy(otpData);
    //                     message.info(`Otp copied to clipboard : ${otpData}`);
    //                 }}
    //                 className="otp-copyicon text-right"
    //             >
    //                 <CopyIcon />
    //             </div>
    //         </div>
    //         <div>
    //             <span className="fs-14 fw-400 mb-10">Mobile Number</span>
    //             <div className="otpinput-send">
    //                 <div className="otp-message">
    //                     <Input />
    //                 </div>
    //             </div>
    //             <span className="text-width">
    //                 Share as a text message to the linked mobile number
    //             </span>
    //         </div>
    //     </div>
    // );
    //
    return (
        <>
            <div className="more-container">
                <div className={`more-content`}>
                    <ul>
                        {values &&
                            values.length > 0 &&
                            values.map((item) => (
                                <li
                                    key={item.title}
                                    className={`moreContent__items  ${
                                        item.disable ? '' : null
                                    }`}
                                >
                                    <span
                                        className={`moreContent__option  ${
                                            item.disable ? 'disable' : null
                                        }`}
                                        onClick={() => {
                                            if (!item.disable)
                                                onClickHandler(item);
                                        }}
                                    >
                                        <span className={`moreContentIcon `}>
                                            {item.icon}
                                        </span>
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <ConfirmationModal
                open={isModalOpen}
                onOk={() => {
                    onOkHandler();
                }}
                onCancel={() => {
                    cancelHandle(isModalOpen, setIsModalOpen);
                }}
                text={`Are you sure you want to ${
                    record.active ? 'deactivate' : 'activate'
                } this user?`}
                icon={record.active ? <DeactiveIcon /> : <ActivateIcon />}
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
                text={
                    record.active
                        ? 'User Deactivated Successfully'
                        : 'User Activated Successfully'
                }
            />
            {isResetPasswordModalOpen && (
                <CustomModal
                    open={isResetPasswordModalOpen}
                    footer={null}
                    onOk={() => {
                        setChangePasswordSelected(false);
                        okHandle(isModalOpen, setIsModalOpen);
                    }}
                    onCancel={() => {
                        setChangePasswordSelected(false);
                        cancelHandle(
                            isResetPasswordModalOpen,
                            setIsResetPasswordModalOpen
                        );
                    }}
                    title={t('commonStr.resetPassword')}
                >
                    <ResetPasswordOptions
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        handleNextClick={() => {
                            if (
                                selectedOption ===
                                resetPasswordOption?.changePassword
                            ) {
                                setChangePasswordSelected(true);
                            } else if (
                                selectedOption ===
                                resetPasswordOption?.sendPasswordLink
                            ) {
                                dispatch(sendPasswordResetLink(record.email));
                                setIsResetPasswordModalOpen(false);
                            }
                        }}
                        handleCancle={() => {
                            setChangePasswordSelected(false);
                            cancelHandle(
                                isResetPasswordModalOpen,
                                setIsResetPasswordModalOpen
                            );
                        }}
                    />
                </CustomModal>
            )}

            {/* 
             NOTE- CAN be used later
             <ConfirmationModal
                open={isOtpGeneratedModalOpen}
                onOk={() => {
                    okHandle(
                        isOtpGeneratedModalOpen,
                        setIsOtpGeneratedModalOpen
                    );
                }}
                onCancel={() => {
                    cancelHandle(
                        isOtpGeneratedModalOpen,
                        setIsOtpGeneratedModalOpen
                    );
                }}
                customClassName="resetOtpModal"
                text="An OTP has been generated with a validity of 24 hours. Please share the OTP with the respective user only"
                otpComponent={loaderState ? <Spin /> : otpContent}
                otpComponent={otpContent}
                icon={<LockPasswordIcon />}
            />  */}

            {changePasswordSelected && (
                <CustomModal
                    backIcon={true}
                    footer={null}
                    open={changePasswordSelected}
                    onCancel={() => {
                        setChangePasswordSelected(false);
                        setIsResetPasswordModalOpen(false);
                        cancelHandle(
                            changePasswordSelected,
                            setChangePasswordSelected
                        );
                    }}
                    setChangePasswordSelected={setChangePasswordSelected}
                    title="Set New Password"
                >
                    <ChangeUserPasswordByAdmin
                        emailvalue={record?.email}
                        setChangePasswordSelected={setChangePasswordSelected}
                        setIsResetPasswordModalOpen={
                            setIsResetPasswordModalOpen
                        }
                        setPasswordChangedSuccessModal={
                            setPasswordChangedSuccessModal
                        }
                    />
                </CustomModal>
            )}
            {passwordChangedSuccessModal && (
                <SuccessfulModal
                    open={passwordChangedSuccessModal}
                    onCancel={() => {
                        dispatch({ type: CLOSE_SET_NEW_PASSWORD_MODAL });
                        cancelHandle(
                            passwordChangedSuccessModal,
                            setPasswordChangedSuccessModal
                        );
                    }}
                    onOk={() => {
                        dispatch({ type: CLOSE_SET_NEW_PASSWORD_MODAL });
                        setPasswordChangedSuccessModal(false);
                    }}
                    text={t('users.passwordChangedSuccess')}
                />
            )}
        </>
    );
};
export default UserMoreContent;
