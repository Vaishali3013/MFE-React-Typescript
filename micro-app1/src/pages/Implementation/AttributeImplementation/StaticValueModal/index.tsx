import React, { useEffect, useState } from 'react';
import { Modal, Input, Divider, Button } from 'antd';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { ATTRIBUTETYPEIMPL, EMPTY, attributeModalTextarea } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { setAttributeImplState } from 'redux/actions/ImplementationActions/attributeActions';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input;
interface StaticValueModalProps {
    open: boolean; // Define the 'open' prop as a boolean
    onCancel: Function;
    attributeRecord: any;
    customClassName: string;
    setvalidateAttributeModal: Function;
    setStaticValueModal: Function;
    setTextAreaValue: Function;
    textAreaValue: any;
    setAttributeId: Function;
}
const StaticValueModal: React.FC<StaticValueModalProps> = ({
    open,
    onCancel,
    attributeRecord,
    customClassName,
    setvalidateAttributeModal,
    setStaticValueModal,
    setTextAreaValue,
    textAreaValue,
    setAttributeId,
}) => {
    const { t } = useTranslation('translation');
    const [isValidateButtonDisabled, setIsValidateButtonDisabled] =
        useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Disable validate button initially when the modal opens
        setIsValidateButtonDisabled(true);
    }, [open]);
    const handleTextAreaChange = (e: any): any => {
        setIsEditing(true);
        let value = e.target.value;

        // Check if the content is empty
        const isEmpty = value === '';

        // Check if the content is a number
        const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

        // Check if the content is a date
        const isDate =
            !isNaN(Date.parse(value)) && value?.match(/^\d{4}-\d{2}-\d{2}$/); // Check if the format is yyyy-mm-dd

        // Check if the content is a timestamp (assuming it's a number representing milliseconds)
        const isTimestamp = value?.match(
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
        ); // Check if the format is yyyy-mm-dd-hh-mm-ss

        // Check if the content is a number with a decimal point
        const isFloat =
            /^[+-]?\d+(\.\d+)?$/.test(value) && value?.indexOf('.') !== -1;

        // Check if the content is a double
        const isDouble = isFloat && value?.indexOf('.') !== -1; // Check if it's a float with a decimal point

        // Determine if the content matches the staticDataType
        let isValidType = false;
        let errorMessage = ''; // Initialize error message variable
        switch (attributeRecord?.dataType?.name) {
            case 'INT':
                isValidType = isNumber && Number.isInteger(parseFloat(value));
                break;
            case 'FLOAT':
                isValidType = isFloat;
                break;
            case 'DOUBLE':
                isValidType = isDouble;
                break;
            case 'DATE':
                isValidType = isDate;
                if (!isValidType) {
                    errorMessage = 'Please enter the date in yyyy-mm-dd format';
                }
                break;
            case 'TIMESTAMP':
                isValidType = isTimestamp;
                if (!isValidType) {
                    errorMessage =
                        'Please enter the timestamp in YYYY-MM-DD hh:mm:ss format';
                }
                break;
            case 'STRING':
                isValidType =
                    typeof value === 'string' && isNaN(parseFloat(value));
                // Check if the trimmed value is empty
                if (value.trim() === '') {
                    isValidType = false; // Invalid if only spaces are entered
                }
                break;
            default:
                isValidType = false; // Assume it's valid if staticDataType is not specified
        }

        // Trim whitespace from the input only if the user entered something after a space
        if (value?.trim().length > textAreaValue?.trim().length) {
            value = value?.trim();
        }
       
        // Set error message only if it's not already set
        if (!errorMessage && !isValidType) {
            errorMessage = `Invalid data type, please enter value in ${attributeRecord?.dataType?.name} format`;
        }
        if (isValidType) {
            setError(EMPTY.string);
        }
        // Set error message
        setError(errorMessage);
        setTextAreaValue(value);
        setIsValidateButtonDisabled(isEmpty || !isValidType);
    };

    const attributeStateImpl = useSelector(
        (state: any) => state.implementation?.attribute?.attributeStateImpl
    );
    const handleEditClick = (): any => {
        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.edit));
        setStaticValueModal(true);
        setIsEditing(false);
    };

    return (
        <>
            <Modal
                className={customClassName ?? `confirmationModal`}
                open={open}
                title={
                    attributeStateImpl === ATTRIBUTETYPEIMPL.view
                        ? `${t('implementation.attribute.view')} - ${
                              attributeRecord?.name
                          }`
                        : attributeStateImpl === ATTRIBUTETYPEIMPL.edit
                        ? `Edit - ${attributeRecord?.name}`
                        : `${t('implementation.validate')} - ${
                              attributeRecord?.name
                          }`
                }
                onCancel={() => {
                    setTextAreaValue(null);
                    onCancel();
                    setError(EMPTY.string);
                }}
                footer={
                    attributeStateImpl === ATTRIBUTETYPEIMPL.view
                        ? [null]
                        : [
                              <>
                                  <CustomButton
                                      type={'Cancel'}
                                      disabled={false}
                                      handleClick={() => {
                                          setTextAreaValue(null);
                                          onCancel();
                                          setError(EMPTY.string);
                                      }}
                                  />
                                  <CustomButton
                                      type={'Validate'}
                                      disabled={
                                          !isEditing || isValidateButtonDisabled
                                      } // Disable if not editing or no input
                                      handleClick={() => {
                                          setvalidateAttributeModal(true);
                                          setStaticValueModal(false);
                                          setAttributeId(attributeRecord?.id);
                                          setError(EMPTY.string);
                                      }}
                                  />
                              </>,
                          ]
                }
            >
                <div>
                    <div className="staticValue__title">
                        {attributeStateImpl === ATTRIBUTETYPEIMPL.view ? (
                            <Button onClick={handleEditClick}>Edit</Button>
                        ) : null}
                    </div>
                    <Divider />
                    <div className="textarea-value">
                        <p>
                            {t('implementation.attribute.writeStaticValue')}{' '}
                            {attributeRecord.name}
                        </p>
                        <TextArea
                            className={error ? 'error' : EMPTY.string}
                            value={
                                attributeStateImpl === ATTRIBUTETYPEIMPL?.add
                                    ? textAreaValue // For add mode, make the textarea blank
                                    : attributeStateImpl ===
                                      ATTRIBUTETYPEIMPL?.edit
                                    ? textAreaValue // For edit mode, show the current value being edited
                                    : attributeRecord?.attributeValueResponse
                                          ?.value // For view mode, show the validated value
                            }
                            onChange={handleTextAreaChange}
                            rows={attributeModalTextarea.ROW}
                            placeholder={t(
                                'implementation.attribute.typeHerePlaceholder'
                            )}
                            disabled={
                                attributeStateImpl === ATTRIBUTETYPEIMPL?.view
                            }
                        />
                        {error ? (
                            <p className="error">{error}</p>
                        ) : (
                            EMPTY.string
                        )}
                    </div>
                    <Divider />
                </div>
            </Modal>
        </>
    );
};

export default StaticValueModal;
