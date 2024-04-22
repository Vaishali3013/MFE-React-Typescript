import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as RemoveIcon } from 'assets/icons/removeConfirmIcon.svg';
import './index.scss';
import { AssignAttributeList } from 'redux/actions/ImplementationActions/attributeActions';
import { useDispatch, useSelector } from 'react-redux';
import { parseJwt } from 'utils/jwtTokenFunction';
import { assignAttributeStatus, implementationAssignStatus } from 'types/enums';
import { useTranslation } from 'react-i18next';
const MultipleRemove: React.FC<any> = ({
    onItemClick,
    selectedRowIds,
    paginatedPayload,
    setSelectedRowIds
}) => {
    const { t } = useTranslation('translation');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const details = parseJwt();
    const handleActivateDeactivateClick = (): void => {
        onItemClick();
    };
    const dispatch = useDispatch();
    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );
    const values = [
        {
            title: 'Remove',
            disable: false,
        },
    ];

    const onClickHandler = (data: { title: string }): void => {
        if (data.title === 'Remove') {
            handleActivateDeactivateClick();
            modalShow(isModalOpen, setIsModalOpen);
            onItemClick();
        }
    };

    const onOkHandler = (): any => {
        dispatch(
            AssignAttributeList({
                ...paginatedPayload,
                assetId: selectedAsset?.key,
                attributeIdList: selectedRowIds,
                requestedBy: details?.username,
                doAssign: assignAttributeStatus.UNASSIGN,
                assignStatus: implementationAssignStatus.ASSIGN,
            })
        );
        setSelectedRowIds([])

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
                                    className="moreContent__items"
                                >
                                    <span
                                        className="moreContent__option"
                                        onClick={() => {
                                            onClickHandler(item);
                                        }}
                                    >
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
                    setSelectedRowIds([])
                }}
                text={t('implementation.removeModalText')}
                icon={<RemoveIcon />}
            />
        </>
    );
};
export default MultipleRemove;
