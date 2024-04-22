import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/BlaIcon/ActiveDeactivate.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { useEffect, useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/BlaIcon/Deactivate.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/BlaIcon/Activate.svg';
import { ReactComponent as DeviceStreaming } from 'assets/icons/DeviceStreaming.svg';
import { popOverItems } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { activateDeactivateDevices } from 'redux/actions/DeviceManagementActions/deviceAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import ParentChildActivationModal from 'components/common/Modals/ParentChildActivationModal';
import { activateDeactivateTags } from 'redux/actions/DeviceManagementActions/tagAction';
import { useTranslation } from 'react-i18next';

const MoreContent: React.FC<{
    record: any;
    setPopoverVisible: Function;
    setDeviceState: Function;
    setRecord: any;
    search: any;
    pageType: any;
    setSuccessModalState: Function;
}> = ({
    record,
    setPopoverVisible,
    setDeviceState,
    setRecord,
    search,
    pageType,
    setSuccessModalState,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deactivetModalOpen, setDeactivateModalOpen] = useState(false);
    const [tagActivationModalOpen, setTagActivationModalOpen] = useState(false);
    const [tagsIds, setTagsIds] = useState([]);
    const [tagsListLength, setTagsListLength] = useState(0);
    const popOverContent = [
        {
            title: popOverItems?.Edit,
            icon: <EditIcon />,
        },
        {
            title: record?.isActive
                ? popOverItems?.Deactivate
                : popOverItems?.Activate,
            icon: <DeactivateGroupIcon />,
        },
    ];

    if (!record?.isActive) {
        popOverContent.splice(0, 1);
    }

    const details = parseJwt();
    const handleEditClick = (): void => {
        setRecord(record);
        setPopoverVisible(false);
        setRecord(record);
    };
    const deviceActivateHandler = (): void => {
        if (record?.inactiveTagsCount > 0) {
            setTagActivationModalOpen(true);
        } else {
            dispatch(
                activateDeactivateDevices({
                    id: [record?.deviceId],
                    isActive: !record?.isActive,
                    requestedBy: details?.username,
                })
            );
            setSuccessModalState('activate');
            okHandle(activeModalOpen, setActiveModalOpen);
            cancelHandle(activeModalOpen, setActiveModalOpen);
        }
    };
    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };
    const handleDeactivateClick = (): void => {
        setPopoverVisible(false);
    };
    const deviceStatusResponse = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusResponse
    );

    const onOkActiveHandler = (): void => {
        dispatch(
            activateDeactivateDevices({
                id: [record?.deviceId],
                isActive: !record?.isActive,
                requestedBy: details?.username,
            })
        );
        setSuccessModalState('activate');
        okHandle(activeModalOpen, setActiveModalOpen);
        cancelHandle(tagActivationModalOpen, setTagActivationModalOpen);
        cancelHandle(activeModalOpen, setActiveModalOpen);
    };
    useEffect(() => {
        tagsIds?.length > 0 &&
            dispatch(
                activateDeactivateTags({
                    id: tagsIds,
                    active: true,
                    updatedBy: details.username,
                })
            );
        setTagsIds([]);
    }, [deviceStatusResponse]);

    const onOkEditHandler = (): void => {
        setDeviceState(true);
        okHandle(editModalOpen, setEditModalOpen);
    };

    const onOkDeactivateHandler = (): void => {
        dispatch(
            activateDeactivateDevices({
                id: [record?.deviceId],
                isActive: !record?.isActive,
                requestedBy: details?.username,
            })
        );
        setSuccessModalState('deactivate');
        okHandle(deactivetModalOpen, setDeactivateModalOpen);
    };

    return (
        <>
            <div className="more-container">
                <div className="moreContent">
                    <ul>
                        {popOverContent &&
                            popOverContent.length > 0 &&
                            popOverContent.map((item) => (
                                <li
                                    key={item.title}
                                    className="moreContent__items"
                                >
                                    <span
                                        className="moreContent__option"
                                        onClick={() => {
                                            if (
                                                item.title === popOverItems.Edit
                                            ) {
                                                handleEditClick();
                                                record.isReadingStarted
                                                    ? modalShow(
                                                          editModalOpen,
                                                          setEditModalOpen
                                                      )
                                                    : setDeviceState(true);
                                            } else if (
                                                item.title ===
                                                popOverItems.Activate
                                            ) {
                                                handleActivateClick();
                                                modalShow(
                                                    activeModalOpen,
                                                    setActiveModalOpen
                                                );
                                            } else if (
                                                item.title ===
                                                popOverItems.Deactivate
                                            ) {
                                                handleDeactivateClick();
                                                modalShow(
                                                    deactivetModalOpen,
                                                    setDeactivateModalOpen
                                                );
                                            }
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

            {/* Activate Modal */}
            <ConfirmationModal
                customClassName={
                    record?.isReadingStarted
                        ? 'confirmationModal moreContent'
                        : 'confirmationModal'
                }
                open={activeModalOpen}
                onOk={() => {
                    deviceActivateHandler();
                }}
                onCancel={() =>
                    cancelHandle(activeModalOpen, setActiveModalOpen)
                }
                icon={<ActivateIcon />}
                text={
                    record?.isReadingStarted
                        ? t('deviceMang.devices.activatingDevice')
                        : t('deviceMang.devices.areYouWantActivatedevice')
                }
            />

            {/* Deactivate Modal */}
            <ConfirmationModal
                customClassName={
                    record?.isReadingStarted
                        ? 'confirmationModal moreContent'
                        : 'confirmationModal'
                }
                open={deactivetModalOpen}
                onOk={() => {
                    onOkDeactivateHandler();
                }}
                onCancel={() =>
                    cancelHandle(deactivetModalOpen, setDeactivateModalOpen)
                }
                text={
                    record?.isReadingStarted
                        ? t('deviceMang.devices.deactivatingDevice')
                        : t('deviceMang.devices.areYouWantDeactivateDevice')
                }
                icon={<DeactivateIcon />}
            />

            {/* Edit Modal */}
            <ConfirmationModal
                customClassName={
                    record?.isReadingStarted
                        ? 'confirmationModal moreContent'
                        : 'confirmationModal'
                }
                open={editModalOpen}
                onOk={() => {
                    onOkEditHandler();
                }}
                onCancel={() => cancelHandle(editModalOpen, setEditModalOpen)}
                text={t('deviceMang.devices.editingDevice')}
                icon={<DeviceStreaming />}
            />

            {tagActivationModalOpen && (
                <ParentChildActivationModal
                    customClassName={
                        'parentChildActivationModal tagsActivation'
                    }
                    open={tagActivationModalOpen}
                    onOk={() => {
                        setTagActivationModalOpen(true);
                        onOkActiveHandler();
                    }}
                    onCancel={() => {
                        cancelHandle(
                            tagActivationModalOpen,
                            setTagActivationModalOpen
                        );
                        cancelHandle(activeModalOpen, setActiveModalOpen);
                        setTagsIds([]);
                    }}
                    icon={<ActivateIcon />}
                    text={`There are ${tagsListLength} tags associated with this device. You can select its related tags to be activated from the list below`}
                    counterText={
                        <>
                            Selected{' '}
                            <span className="boldText">{tagsIds?.length}</span>{' '}
                            of{' '}
                            <span className="boldText">{tagsListLength}</span>{' '}
                            Tags
                        </>
                    }
                    selectUnselectText={
                        tagsIds?.length === tagsListLength ? (
                            <span className="unselectText">
                                {t('deviceMang.devices.unselectAll')}
                            </span>
                        ) : (
                            <span className="selectText">
                                {t('deviceMang.devices.selectAll')}
                            </span>
                        )
                    }
                    record={record}
                    setTagIds={setTagsIds}
                    tagsIds={tagsIds}
                    setTagsListLength={setTagsListLength}
                />
            )}
        </>
    );
};

export default MoreContent;
