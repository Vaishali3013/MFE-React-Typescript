import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as RemoveIcon } from 'assets/icons/removeConfirmIcon.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { parseJwt } from 'utils/jwtTokenFunction';
import {
    ATTRIBUTETYPEIMPL,
    assignAttributeStatus,
    implementationAssignStatus,
    EMPTY,
    implementationPopoverItems,
} from 'types/enums';
import {
    AssignAttributeList,
    setAttributeImplState,
    editAttributeValue,
} from 'redux/actions/ImplementationActions/attributeActions';
import { useTranslation } from 'react-i18next';

const AttributeMoreContent: React.FC<{
    record: any;
    setPopoverVisible: Function;
    searchPayload: any;
    paginatedPayload: any;
    setStaticValueModal: Function;
    textAreaValue: any;
    setAttributeRecord: Function;
    setTextAreaValue: Function;
    isEditTag?: boolean;
    setSearchState: any;

}> = ({
    record,
    setPopoverVisible,
    searchPayload,
    paginatedPayload,
    textAreaValue,
    setStaticValueModal,
    setAttributeRecord,
    setTextAreaValue,
    isEditTag,
    setSearchState,
   
}) => {

    const { t } = useTranslation('translation');
    const [activeModalOpen, setActiveModalOpen] = useState(false);
    const details = parseJwt();
    const handleEditClick = (): void => {
        setStaticValueModal(true);
        setAttributeRecord(record);
        setPopoverVisible(false);
        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.edit));
        setTextAreaValue(record?.attributeValueResponse?.value);
    };

    const handleEditTagClick = (): void => {
        setStaticValueModal(true);
        setAttributeRecord(record);
        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.edit));
        setPopoverVisible(false);
        setTextAreaValue(record?.attributeValueResponse?.value);
   
      
    };
    // will use later
    // const handleDeactivateClick = (): void => {
    //     setPopoverVisible(false);
    // };
    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );
    const attributeStateImpl = useSelector(
        (state: any) => state.implementation?.attribute?.attributeStateImpl
    );
    const handleActivateClick = (): void => {
        setPopoverVisible(false);
    };
    const values = [
        {
            title: implementationPopoverItems?.EDIT,
            disable: !record?.isValidated,
        },

        {
            title: implementationPopoverItems?.REMOVE,
            disable: false,
        },
    ];

    const dispatch = useDispatch();

    const onOkActiveHandler = (): any => {
        attributeStateImpl === ATTRIBUTETYPEIMPL.edit
            ? dispatch(
                  editAttributeValue({
                      ...paginatedPayload,
                      assetId: selectedAsset?.key,
                      attributeId: record?.id,
                      value: textAreaValue,
                  })
              )
            : dispatch(
                  AssignAttributeList({
                      ...paginatedPayload,
                      assetId: selectedAsset?.key,
                      attributeIdList: [record?.id],
                      requestedBy: details?.username,
                      doAssign: assignAttributeStatus?.UNASSIGN,
                      assignStatus: implementationAssignStatus?.ASSIGN,

                  })
              );
        setSearchState(null);

        // setActivateStateLocal('Active');
        okHandle(activeModalOpen, setActiveModalOpen);
    };
// To hide edit functionality from non validated Attribute
    if (!record?.isValidated) {
        values.splice(0, 1);
    }
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
                                        item.disable ? 'disable' : EMPTY.string
                                    }`}
                                    onClick={() => {
                                        if (
                                            item.title ===
                                                implementationPopoverItems?.EDIT &&
                                            !item.disable
                                        ) {
                                            isEditTag
                                                ? handleEditTagClick()
                                                : handleEditClick();
                                        } else if (
                                            item.title ===
                                            implementationPopoverItems?.REMOVE
                                        ) {
                                            handleActivateClick();
                                            modalShow(
                                                activeModalOpen,
                                                setActiveModalOpen
                                            );
                                        }
                                    }}
                                >
                                    <span
                                        className={`moreContent__option  ${
                                            item.disable
                                                ? 'disable'
                                                : EMPTY.string
                                        }`}
                                    >
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
                text={t('implementation.removeModalText')}
                icon={<RemoveIcon />}
            />
        </>
    );
};

export default AttributeMoreContent;
