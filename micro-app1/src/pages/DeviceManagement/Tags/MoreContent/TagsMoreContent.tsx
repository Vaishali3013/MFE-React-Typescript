import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/BlaIcon/ActiveDeactivate.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/BlaIcon/Deactivate.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/BlaIcon/Activate.svg';
import { ROLETYPE, popOverItems } from 'types/enums';
import { useDispatch } from 'react-redux';
import { activateDeactivateTags } from 'redux/actions/DeviceManagementActions/tagAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const MoreContent: React.FC<{
    record: any;
    setPopoverVisible: Function;
    setViewDrawerState: Function;
    setRecord: Function;
    setSuccessModalState: Function;
    setOpenAddTag: Function;
}> = ({
    record,
    setPopoverVisible,
    setViewDrawerState,
    setRecord,
    setSuccessModalState,
    setOpenAddTag
}) => {
    const details = parseJwt();
    const { t } = useTranslation('translation');
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
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

    const handleEditClick = (): void => {
        setPopoverVisible(false);
        setOpenAddTag(ROLETYPE.edit);
        setRecord(record);
    };
    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };
    const handleDeactivateClick = (): void => {
        setPopoverVisible(false);
    };

    const dispatch = useDispatch();

    const onOkActiveHandler = (): void => {
        const updatedPayload = {
            id: [parseInt(record?.timeSeriesId)],
            active: true,
            updatedBy: details.username,
        };
        setSuccessModalState('activate');
        okHandle(activeModalOpen, setActiveModalOpen);
        dispatch(activateDeactivateTags(updatedPayload));
    };

    const onOkDeactivateHandler = (): void => {
        const updatedPayload = {
            id: [record?.timeSeriesId],
            active: false,
            updatedBy: details.username,
        };
        setSuccessModalState('deactivate');
        okHandle(deactivateModalOpen, setDeactivateModalOpen);
        dispatch(activateDeactivateTags(updatedPayload));
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
                                                setOpenAddTag(ROLETYPE.edit);
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
                                                    deactivateModalOpen,
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
            <ConfirmationModal
                open={activeModalOpen}
                onOk={() => {
                    onOkActiveHandler();
                }}
                onCancel={() =>
                    cancelHandle(activeModalOpen, setActiveModalOpen)
                }
                text={t('deviceMang.tags.activateConfirmation')}
                icon={<ActivateIcon />}
            />

            <ConfirmationModal
                open={deactivateModalOpen}
                onOk={() => {
                    onOkDeactivateHandler();
                }}
                onCancel={() =>
                    cancelHandle(deactivateModalOpen, setDeactivateModalOpen)
                }
                text={t('deviceMang.tags.deactivateConfirmation')}
                icon={<DeactivateIcon />}
            />
        </>
    );
};

export default MoreContent;
