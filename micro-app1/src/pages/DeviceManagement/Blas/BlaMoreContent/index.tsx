import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/BlaIcon/ActiveDeactivate.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { useState } from 'react';
import { activateDeactivateBlas } from 'redux/actions/DeviceManagementActions/blasAction';
import { useDispatch } from 'react-redux';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/BlaIcon/Activate.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/BlaIcon/Deactivate.svg';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
const MoreContent: React.FC<{
    record: any;
    setPopoverVisible: Function;
    setBlaState: Function;
    setRecord: any;
    setSuccessModalState: Function;
}> = ({
    record,
    setPopoverVisible,
    setBlaState,
    setRecord,
    setSuccessModalState,
}) => {
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [deactivetModalOpen, setDeactivateModalOpen] = useState(false);
    const details = parseJwt();
    const { t } = useTranslation('translation');
    const values = [
        {
            title: 'Edit',
            icon: <EditIcon />,
        },
        {
            title: record?.isActive ? 'Deactivate' : 'Activate',
            icon: <DeactivateGroupIcon />,
        },
    ];

    if (!record?.isActive) {
        values.splice(0, 1);
    }

    const dispatch = useDispatch();

    const handleEditClick = (): void => {
        setPopoverVisible(false);
        setBlaState(true);
        setRecord(record);
    };
    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };
    const handleDeactivateClick = (): void => {
        setPopoverVisible(false);
    };
    const [payload, setPayload] = useState<any>({
        id: [],
        active: false,
        updatedBy: details.username,
    });

    const onOkActiveHandler = (): any => {
        const updatedPayload = {
            id: [record?.blaId],
            active: true,
            updatedBy: details.username,
        };
        setPayload(updatedPayload);
        dispatch(activateDeactivateBlas(updatedPayload));
        setSuccessModalState('activate');
        okHandle(activeModalOpen, setActiveModalOpen);
    };

    const onOkDeactivateHandler = (): any => {
        const updatedPayload = {
            ...payload,
            id: [record?.blaId],
            active: false,
            updatedBy: details.username,
        };
        setPayload(updatedPayload);
        dispatch(activateDeactivateBlas(updatedPayload));
        setSuccessModalState('deactivate');
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
                                    className="moreContent__items"
                                >
                                    <span
                                        className="moreContent__option"
                                        onClick={() => {
                                            if (item.title === 'Edit') {
                                                handleEditClick();
                                                setBlaState(true);
                                                setRecord(record);
                                            } else if (
                                                item.title === 'Activate'
                                            ) {
                                                handleActivateClick();
                                                modalShow(
                                                    activeModalOpen,
                                                    setActiveModalOpen
                                                );
                                            } else if (
                                                item.title === 'Deactivate'
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
            <ConfirmationModal
                open={activeModalOpen}
                onOk={() => {
                    onOkActiveHandler();
                }}
                onCancel={() =>
                    cancelHandle(activeModalOpen, setActiveModalOpen)
                }
                text={t('deviceMang.bla.activateBla')}
                icon={<ActivateIcon />}
            />

            <ConfirmationModal
                customClassName="confirmationModal blaDeactivation"
                open={deactivetModalOpen}
                onOk={() => {
                    onOkDeactivateHandler();
                }}
                onCancel={() =>
                    cancelHandle(deactivetModalOpen, setDeactivateModalOpen)
                }
                text={
                    record?.activeDevicesCount > 0 ? (
                        <span className="noActiveDevice">
                            {t('deviceMang.bla.deactivatingBla')}
                        </span>
                    ) : (
                        t('deviceMang.bla.deactivateBla')
                    )
                }
                icon={<DeactiveIcon />}
            />
        </>
    );
};

export default MoreContent;
