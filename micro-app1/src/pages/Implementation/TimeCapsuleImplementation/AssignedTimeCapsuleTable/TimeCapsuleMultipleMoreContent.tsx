import { cancelHandle, modalShow } from 'utils/modalFunction';
import { useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import './index.scss';
import { ReactComponent as DeleteIcon } from 'assets/icons/deleteNew.svg';
import {
    implementationAssignStatus,
    implementationPopoverItems,
} from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { removeTimeCapsuleFromAsset } from 'redux/actions/ImplementationActions/timeCapsuleActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
const TimeCapsuleMultipleMoreContent: React.FC<any> = ({
    setSelectedRowIds,
    onItemClick,
    selectedRowIds,
}) => {
    const { t } = useTranslation('translation');
    const details = parseJwt();
    const dispatch = useDispatch();
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const values = [
        {
            title: implementationPopoverItems?.REMOVE,
        },
    ];

    return (
        <>
            <div className="more-container">
                <div className={`more-content`}>
                    <ul>
                        {values &&
                            values.length > 0 &&
                            values.map((item: any) => (
                                <li
                                    key={item.title}
                                    className="moreContent__items"
                                >
                                    <span
                                        className="moreContent__option"
                                        onClick={() => {
                                            onItemClick();
                                            modalShow(
                                                isModalOpen,
                                                setIsModalOpen
                                            );
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {isModalOpen && (
                <ConfirmationModal
                    open={isModalOpen}
                    icon={<DeleteIcon />}
                    onOk={() => {
                        dispatch(
                            removeTimeCapsuleFromAsset({
                                assetId: selectedAsset?.key,
                                timeCapsuleId: selectedRowIds,
                                childConfigurationFlag: false,
                                doAssign: implementationAssignStatus?.UNASSIGN,
                                requestedBy: details?.username,
                            })
                        );
                        setSelectedRowIds([]);
                    }}
                    onCancel={() => {
                        cancelHandle(isModalOpen, setIsModalOpen);
                        setSelectedRowIds([]);
                    }}
                    text={t('implementation.removeModalText')}
                />
            )}
        </>
    );
};
export default TimeCapsuleMultipleMoreContent;
