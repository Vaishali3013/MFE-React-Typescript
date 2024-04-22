import { cancelHandle, modalShow } from 'utils/modalFunction';
import { useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeleteIcon } from 'assets/icons/attributeRemoveIcon.svg';
import {
    implementationPopoverItems,
    implementationTableAssignStatus,
    implementationTableState,
} from 'types/enums';
import { unassignTableToAsset } from 'redux/actions/ImplementationActions/tableActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const TableMoreContent: React.FC<any> = ({
    setSelectedRowIds,
    selectedRowIds,
    onItemClick,
    setShowTableDetails,
    setSelectedTable,
    selectedRow,
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
            title: implementationPopoverItems?.EDIT,
        },
        {
            title: implementationPopoverItems?.REMOVE,
        },
    ];

    if (!selectedRow?.isValidated) {
        values.splice(0, 1);
    }
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
                                            item.title ===
                                                implementationPopoverItems?.REMOVE &&
                                                modalShow(
                                                    isModalOpen,
                                                    setIsModalOpen
                                                );
                                            item.title ===
                                                implementationPopoverItems?.EDIT &&
                                                setShowTableDetails(
                                                    implementationTableState.VIEW
                                                );
                                            setSelectedTable(selectedRow);
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
                            unassignTableToAsset({
                                tableList: selectedRowIds,
                                assetId: selectedAsset?.key,
                                doAssign:
                                    implementationTableAssignStatus?.unassign,
                                childNode: false,
                                updatedBy: details?.username,
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
export default TableMoreContent;
