import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deactivateGroup,
    getGroupByGroupId,
} from 'redux/actions/UserManagementActions/groupsAction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/activateIcon.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/deactivateIcon.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/deactivateIconBlack.svg';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import { PERMISSIONS, resourceName } from 'types/enums';
import { useTranslation } from 'react-i18next';

const MoreContent: React.FC<{
    record: any;
    setEditDrawer: Function;
    setSelectedId: Function;
    setSelectedRowId: Function;
    paginationPayload: any;
    setPopoverVisible: Function;
    selectedUserIds: any;
}> = ({
    record,
    setEditDrawer,
    setSelectedId,
    paginationPayload,
    setPopoverVisible,
    selectedUserIds,
    setSelectedRowId,
}) => {
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [deactivetModalOpen, setDeactivateModalOpen] = useState(false);
    const [deactivateSuccessModalOpen, setDeactivateSuccessModalOpen] =
        useState(false);

    const handleEditClick = (): void => {
        setPopoverVisible(false);
        setEditDrawer(true);
        setSelectedId(record.id);
    };

    const handleDeactivateClick = (): void => {
        setPopoverVisible(false);
    };

    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };

    const [payload, setPayload] = useState<any>({
        id: [],
        active: false,
    });
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
                    resourceName.groups,
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
                    resourceName.groups,
                    loggedInUserPermissionData
                ),
                PERMISSIONS.delete
            )
                ? false
                : !loggedInUserDetails.admin,
        },
    ];
    if (!record?.active) {
        values.splice(0, 1);
    }
    const dispatch = useDispatch();

    const getDataById = (rowId: any): void => {
        dispatch(getGroupByGroupId(rowId));
    };

    const onOkActiveHandler = (): any => {
        const updatedPayload = {
            ...payload,
            id: [record?.id],
            status: true,
            paginationPayload: paginationPayload,
            tabKey: '2',
        };

        setPayload(updatedPayload);
        dispatch(deactivateGroup(updatedPayload));
        modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(activeModalOpen, setActiveModalOpen);
    };

    const onOkDeactivateHandler = (): any => {
        const updatedPayload = {
            ...payload,
            id: [record?.id],
            status: false,
            paginationPayload: paginationPayload,
            tabKey: '2',
        };

        setPayload(updatedPayload);
        dispatch(deactivateGroup(updatedPayload));
        modalShow(deactivateSuccessModalOpen, setDeactivateSuccessModalOpen);
        okHandle(deactivetModalOpen, setDeactivateModalOpen);
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
                                    onClick={() => {
                                        if (
                                            item.title === t('commonStr.edit')
                                        ) {
                                            handleEditClick();
                                            setEditDrawer(true);
                                            setSelectedId(record.id);
                                            getDataById(record.id);
                                        } else if (
                                            item.title ===
                                            t('commonStr.activate')
                                        ) {
                                            handleActivateClick();
                                            modalShow(
                                                activeModalOpen,
                                                setActiveModalOpen
                                            );
                                        } else if (
                                            item.title ===
                                            t('commonStr.deactivate')
                                        ) {
                                            handleDeactivateClick();
                                            modalShow(
                                                deactivetModalOpen,
                                                setDeactivateModalOpen
                                            );
                                        }
                                    }}
                                >
                                    <span className="moreContent__icon">
                                        {item.icon}
                                    </span>
                                    <span className="moreContent__option">
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            <ConfirmationModal
                open={activeModalOpen}
                onOk={() => {
                    onOkActiveHandler();
                }}
                onCancel={() =>
                    cancelHandle(activeModalOpen, setActiveModalOpen)
                }
                text={t('groups.activateGroupModalMessage.areYouWantActivate')}
                icon={<ActivateIcon />}
            />

            <ConfirmationModal
                open={deactivetModalOpen}
                onOk={() => {
                    onOkDeactivateHandler();
                }}
                onCancel={() =>
                    cancelHandle(deactivetModalOpen, setDeactivateModalOpen)
                }
                text={t(
                    'groups.activateGroupModalMessage.areYouWantDeactivate'
                )}
                icon={<DeactiveIcon />}
            />

            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkActiveHandler()}
                onCancel={() =>
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    )
                }
                text={t('groups.activateGroupModalMessage.groupActive')}
            />

            <SuccessfulModal
                open={deactivateSuccessModalOpen}
                onOk={() => onOkDeactivateHandler()}
                onCancel={() =>
                    cancelHandle(
                        deactivateSuccessModalOpen,
                        setDeactivateSuccessModalOpen
                    )
                }
                text={t('groups.activateGroupModalMessage.groupDeactive')}
            />
        </>
    );
};

export default MoreContent;
