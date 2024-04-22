import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ReactComponent as ActivateIcon } from 'assets/icons/AttributeActivateIcon.svg';
import { ReactComponent as DeactiveIcon } from 'assets/icons/AttributeDeactivateIcon.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { ReactComponent as EditIcon } from 'assets/icons/icon.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/deactivateIconBlack.svg';
import { parseJwt } from 'utils/jwtTokenFunction';
import { TABLETYPE, attributeActivateDeactivate } from 'types/enums';
import {
    getTableDetails,
    setTableState,
    statusUpdateTable,
} from 'redux/actions/ConfigureActions/tableAction';

const TableMoreContent: React.FC<{
    record: any;
    setPopoverVisible: Function;
    searchPayload: any;
    paginatedPayload: any;
}> = ({ record, setPopoverVisible, searchPayload, paginatedPayload }) => {
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const [activateStateLocal, setActivateStateLocal] = useState<string>('');
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [deactivetModalOpen, setDeactivateModalOpen] = useState(false);
    const [deactivateSuccessModalOpen, setDeactivateSuccessModalOpen] =
        useState(false);
    const details = parseJwt();

    const handleEditClick = (): void => {
        dispatch(getTableDetails(record?.id));
        dispatch(setTableState(TABLETYPE.edit));
        setPopoverVisible(false);
    };

    const handleDeactivateClick = (): void => {
        setPopoverVisible(false);
    };

    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };

    const [payload, setPayload] = useState<any>({
        tableIdList: [],
        isActive: false,
        requestedBy: details.username,
    });

    const values = [
        {
            title: 'Edit',
            icon: <EditIcon />,
            disable: false,
        },
        {
            title: record?.isActive
                ? attributeActivateDeactivate.deactivate
                : attributeActivateDeactivate.activate,
            icon: <DeactivateGroupIcon />,
            disable: false,
        },
    ];

    // To hide edit functionality from inactive attribute
    if (!record?.isActive) {
        values.splice(0, 1);
    }
    const dispatch = useDispatch();

    const statusUpdateTableResponse = useSelector(
        (state: any) => state?.configure?.table?.statusUpdateTable
    );

    const onOkActiveHandler = (): any => {
        const updatedPayload = {
            ...payload,
            tableIdList: [record?.id],
            isActive: true,
            requestedBy: details.username,
        };
        setPayload(updatedPayload);
        dispatch(
            statusUpdateTable({
                updatedPayload: updatedPayload,
                paginatedPayload: paginatedPayload,
                searchPayload: searchPayload,
            })
        );
        setActivateStateLocal('Active');
        okHandle(activeModalOpen, setActiveModalOpen);
    };

    useEffect(() => {
        if (statusUpdateTableResponse) {
            if (activateStateLocal === 'Active') {
                modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
                okHandle(activeModalOpen, setActiveModalOpen);
                setActivateStateLocal('');
            } else if (activateStateLocal === 'Deactive') {
                modalShow(
                    deactivateSuccessModalOpen,
                    setDeactivateSuccessModalOpen
                );
                okHandle(deactivetModalOpen, setDeactivateModalOpen);
                setActivateStateLocal('');
            }
        }
    }, [statusUpdateTableResponse]);

    const onOkDeactivateHandler = (): any => {
        const updatedPayload = {
            ...payload,
            tableIdList: [record?.id],
            isActive: false,
            requestedBy: details.username,
        };
        setPayload(updatedPayload);
        dispatch(
            statusUpdateTable({
                updatedPayload: updatedPayload,
                paginatedPayload: paginatedPayload,
                searchPayload: searchPayload,
            })
        );
        setActivateStateLocal('Deactive');
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
                                        if (item.title === 'Edit') {
                                            handleEditClick();
                                        } else if (item.title === 'Activate') {
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
                text="Are you sure you want to activate the selected Table?"
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
                text="Are you sure you want to deactivate the selected Table?"
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
                text="Activated Successfully"
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
                text="Deactivated Successfully"
            />
        </>
    );
};

export default TableMoreContent;
