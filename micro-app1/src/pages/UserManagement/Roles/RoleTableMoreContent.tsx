import React, { useState, type ReactNode } from 'react';
import './RoleTable.scss';
import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/deactivateIconBlack.svg';
import { useDispatch, useSelector } from 'react-redux';
import type { rolesListObjectProps } from 'types/interfaces/PropsInterfaces';
import {
    activateDeactivateRole,
    setEditRoleState,
    setRoleData,
} from 'redux/actions/UserManagementActions/rolesAction';
import { PERMISSIONS, resourceName, ROLETYPE } from 'types/enums';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { useTranslation } from 'react-i18next';

const MoreContent: React.FC<rolesListObjectProps> = ({
    record,
    setPopoverVisible,
    selectedUserIds,
    paginationPayload,
}) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );
    const { t } = useTranslation('translation');

    const values = [
        {
            title: t('commonStr.edit'),
            icon: <EditIcon />,
            disable: hasPermission(
                getObjectByResourceName(
                    resourceName.roles,
                    loggedInUserPermissionData
                ),
                PERMISSIONS.update
            )
                ? false
                : !loggedInUserDetails.admin,
        },
        {
            title: record?.active
                ? t('commonStr.deactivate')
                : t('commonStr.activate'),
            icon: <DeactivateGroupIcon />,
            disable: hasPermission(
                getObjectByResourceName(
                    resourceName.roles,
                    loggedInUserPermissionData
                ),
                PERMISSIONS.delete
            )
                ? false
                : !loggedInUserDetails.admin,
        },
    ];

    const onClickHandler = (data: { title: string; icon: ReactNode }): any => {
        if (data.title === t('commonStr.edit')) {
            setPopoverVisible(false);
            dispatch(setEditRoleState(ROLETYPE.edit));
            dispatch(setRoleData(record));
        }
        if (
            data.title ===
            `${
                record?.active
                    ? t('commonStr.deactivate')
                    : t('commonStr.activate')
            }`
        ) {
            setPopoverVisible(false);
            modalShow(isModalOpen, setIsModalOpen);
        }
    };
    // Check if the user is inactive and remove the "Edit" action if necessary
    // If the user is inactive, remove the first action (Edit) from the array
    if (!record?.active) {
        values.splice(0, 1);
    }
    const onOkHandler = (): any => {
        dispatch(
            activateDeactivateRole({
                id: [record?.roleId],
                status: !record?.active,
                paginationPayload: paginationPayload,
            })
        );

        okHandle(isModalOpen, setIsModalOpen);
        modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
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
                                    className={`moreContent__items  ${
                                        item.disable ? 'display-none' : null
                                    }`}
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
            <ConfirmationModal
                open={isModalOpen}
                onOk={() => {
                    onOkHandler();
                }}
                onCancel={() => {
                    cancelHandle(isModalOpen, setIsModalOpen);
                }}
                text={`Are you sure you want to ${
                    record.active ? 'Deactivate' : 'Activate'
                } this?`}
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
                text={t('roles.savetext')}
            />
        </>
    );
};

export default MoreContent;
