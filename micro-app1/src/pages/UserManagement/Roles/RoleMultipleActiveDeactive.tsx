import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import type { RoleMultipleActiveDeactiveProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import { useState, type ReactNode, useEffect } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/activateuser.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/deactiveMultiple.svg';
import { ReactComponent as ActivateUserModal } from 'assets/icons/activateModalUser.svg';
import { ReactComponent as DeactiveUserModal } from 'assets/icons/deactiveUserModal.svg';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch } from 'react-redux';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import { userActivateDeactivate } from 'types/enums';
import { activateDeactivateRole } from 'redux/actions/UserManagementActions/rolesAction';
import { useTranslation } from 'react-i18next';

const RoleMultipleActiveDeactive: React.FC<RoleMultipleActiveDeactiveProps> = ({
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

    const handleItemActivationDeactivation = (newStatus: string): void => {
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
        handleItemActivationDeactivation(userActivateDeactivate.activate);
    };

    const handleDeactivateAll = (): void => {
        handleItemActivationDeactivation(userActivateDeactivate.deactivate);
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
                activateDeactivateRole({
                    paginationPayload: paginationPayload,
                    id: selectedUserIds,
                    status: false,
                    tabKey: '2',
                })
            );
            setStatus(userActivateDeactivate.activate);
        } else if (status === userActivateDeactivate.activate) {
            dispatch(
                activateDeactivateRole({
                    paginationPayload: paginationPayload,
                    id: selectedUserIds,
                    status: true,
                    tabKey: '2',
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
                    text="Roles"
                    onCancel={setactiveDeactiveModalOpen}
                    activeIds={selectedActiveIds}
                    inActiveIds={selectedInactiveIds}
                    handleActivate={handleActivateAll}
                    handleDeactivate={handleDeactivateAll}
                />
            ) : (
                <ConfirmationModal
                    open={isModalOpen}
                    onOk={() => {
                        onOkHandler();
                    }}
                    onCancel={() => {
                        cancelHandle(isModalOpen, setIsModalOpen);
                    }}
                    text={`Are you sure you want to ${status} these roles?`}
                    icon={
                        status === userActivateDeactivate.activate ? (
                            <ActivateUserModal />
                        ) : status === userActivateDeactivate.deactivate ? (
                            <DeactiveUserModal />
                        ) : null
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
                        setIsModalOpen(false);
                    }}
                    text={`Are you sure you want to ${
                        status === userActivateDeactivate.activate
                            ? 'activate'
                            : 'deactivate'
                    } the selected Roles?`}
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
                        ? t('roles.rolesActivatedDeactivatedSuccess')
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
export default RoleMultipleActiveDeactive;
