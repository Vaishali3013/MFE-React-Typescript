import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import type { UserMultipleActiveDeactiveProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { useState, type ReactNode, useEffect } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/activateuser.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/deactiveMultiple.svg';
import { ReactComponent as ActivateUserModal } from 'assets/icons/activateModalUser.svg';
import { ReactComponent as DeactiveUserModal } from 'assets/icons/deactiveUserModal.svg';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch } from 'react-redux';
import { activateDeactivateUser } from 'redux/actions/UserManagementActions/usersAction';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import { userActivateDeactivate } from 'types/enums';
import { useTranslation } from 'react-i18next';

const UserMultipleActiveDeactive: React.FC<UserMultipleActiveDeactiveProps> = ({
    multipleRecord,
    selectedUserIds,
    paginationPayload,
    selectedActiveIds,
    selectedInactiveIds,
    onItemClick,
}) => {
    const { t } = useTranslation('translation');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [
        isConfirmationAfterActiveDeactiveModalOpen,
        setIsConfirmationAfterActiveDeactiveModalOpen,
    ] = useState(false);
    const [, setIsConfirmationSuccessModalOpen] = useState(false);
    const [activeDeactiveModalOpen, setactiveDeactiveModalOpen] =
        useState(false);
    const [status, setStatus] = useState('');
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const handleActivateDeactivateClick = (): void => {
        onItemClick();
    };

    const handleAction = (newStatus: string): void => {
        if (status === userActivateDeactivate.activateDeactivate) {
            if (newStatus === userActivateDeactivate.activate) {
                setIsModalOpen(true);
            }
            onItemClick();
            setIsConfirmationAfterActiveDeactiveModalOpen(true);
            setactiveDeactiveModalOpen(false);
            setStatus(newStatus);
        }
    };

    const handleActivateAll = (): void => {
        handleAction(userActivateDeactivate.activate);
    };

    const handleDeactivateAll = (): void => {
        handleAction(userActivateDeactivate.deactivate);
    };
    const checkStatus = (multipleRecord: any): string => {
        let hasActive = false;
        let hasInactive = false;

        for (const user of multipleRecord) {
            if (user.active) {
                hasActive = true;
            } else {
                hasInactive = true;
            }
        }
        if (hasActive && hasInactive) {
            return 'Activate/Deactivate';
        } else if (hasActive) {
            return 'Deactivate';
        } else if (hasInactive) {
            return 'Activate';
        }

        return '';
    };
    useEffect(() => {
        setStatus(checkStatus(multipleRecord));
    }, [multipleRecord]);

    const values = [
        {
            title: status,
            icon:
                status === userActivateDeactivate.activate ? (
                    <ActivateIcon />
                ) : (
                    <DeactiveIcon />
                ),
        },
    ];
    const dispatch = useDispatch();
    const onClickHandler = (data: { title: string; icon: ReactNode }): void => {
        if (data.title === `${status}`) {
            handleActivateDeactivateClick();
            modalShow(isModalOpen, setIsModalOpen);
            onItemClick();
        }

        if (status === userActivateDeactivate.activateDeactivate) {
            handleActivateDeactivateClick();
            setactiveDeactiveModalOpen(true);
            onItemClick(); // Call onItemClick to close the popover
        }
    };

    const onOkHandler = (): any => {
        if (status === userActivateDeactivate.deactivate) {
            dispatch(
                activateDeactivateUser({
                    paginationPayload: paginationPayload,
                    id: selectedUserIds,
                    status: false,
                    tabkey: 'user',
                })
            );
            setStatus(userActivateDeactivate.activate);
        } else if (status === userActivateDeactivate.activate) {
            dispatch(
                activateDeactivateUser({
                    paginationPayload: paginationPayload,
                    id: selectedUserIds,
                    status: true,
                    tabkey: 'user',
                })
            );
            setStatus(userActivateDeactivate.deactivate);
        }

        okHandle(isModalOpen, setIsModalOpen);
        modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        setIsConfirmationAfterActiveDeactiveModalOpen(false);
    };

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
                                    className="moreContent__items"
                                >
                                    <span
                                        className="moreContent__option"
                                        onClick={() => {
                                            onClickHandler(item);
                                        }}
                                    >
                                        <span className="moreContentIcon">
                                            {item.icon}
                                        </span>
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {status === userActivateDeactivate.activateDeactivate ? (
                <ActivateDeactivateMultipleModal
                    open={activeDeactiveModalOpen}
                    text={t('commonStr.users')}
                    onCancel={setactiveDeactiveModalOpen}
                    activeIds={selectedActiveIds}
                    inActiveIds={selectedInactiveIds}
                    handleActivate={handleActivateAll}
                    handleDeactivate={handleDeactivateAll}
                />
            ) : (
                <ConfirmationModal // Show ConfirmationModal for other status
                    open={isModalOpen}
                    onOk={() => {
                        onOkHandler();
                    }}
                    onCancel={() => {
                        cancelHandle(isModalOpen, setIsModalOpen);
                    }}
                    text={`${t('commonStr.areyouSureWant')}  ${status} ${t(
                        'commonStr.theseUser'
                    )}`}
                    icon={
                        status === userActivateDeactivate.activate ? (
                            <ActivateUserModal />
                        ) : status === userActivateDeactivate.deactivate ? (
                            <DeactiveUserModal />
                        ) : (
                            <DeactiveUserModal />
                        )
                    }
                />
            )}

            {isConfirmationAfterActiveDeactiveModalOpen && (
                <ConfirmationModal
                    open={isModalOpen}
                    onOk={() => {
                        onOkHandler();
                        setIsConfirmationSuccessModalOpen(true);
                    }}
                    onCancel={() => {
                        setIsConfirmationAfterActiveDeactiveModalOpen(false);
                    }}
                    text={`${t('commonStr.areyouSureWant')} ${
                        status === userActivateDeactivate.activate
                            ? t('commonStr.activateLowerCase')
                            : t('commonStr.deactivateLowerCase')
                    } ${t('commonStr.theSelectedUser')} `}
                    icon={
                        status === userActivateDeactivate.activate ? (
                            <ActivateUserModal />
                        ) : (
                            <DeactiveUserModal />
                        )
                    }
                />
            )}

            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => {
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                }}
                text={
                    status === userActivateDeactivate.activateDeactivate
                        ? t('users.userActivateDeactivateSuccess')
                        : status === userActivateDeactivate.activate
                        ? t('commonStr.deactivateSuccess')
                        : status === userActivateDeactivate.deactivate
                        ? t('commonStr.activateSuccess')
                        : ''
                }
            />
        </>
    );
};
export default UserMultipleActiveDeactive;
