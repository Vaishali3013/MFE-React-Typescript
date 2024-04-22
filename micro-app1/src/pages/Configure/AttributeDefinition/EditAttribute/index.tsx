import React, { useEffect, useState } from 'react';
import { Card, Row, Form, Spin } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/AttributeEditConfirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTETYPE, attributeFormEnum, dataTypeWithId } from 'types/enums';
import {
    setAttributeState,
    updateAttribute,
} from 'redux/actions/ConfigureActions/attributeActions';
import AttributeFormComponent from '../AttributeFormComponent';
import { parseJwt } from 'utils/jwtTokenFunction';

interface Iprops {
    setIsUomOpen: any;
}

const EditAttribute: React.FC<Iprops> = ({ setIsUomOpen }: any): any => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const updateAttributeResponse = useSelector(
        (state: any) => state?.configure?.attributes?.updateAttribute
    );
    const [isSaveDisable, setIsSaveDisable] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const attributeDetails = useSelector(
        (state: any) => state?.configure?.attributes?.attributeDetails
    );

    const attributeDetailLoading = useSelector(
        (state: any) => state.configure?.attributes?.attributeDetailLoading
    );

    const details = parseJwt();
    const name = Form.useWatch(attributeFormEnum?.name, form);
    const properties = Form.useWatch(attributeFormEnum?.properties, form);
    const category = Form.useWatch(attributeFormEnum?.category, form);
    const uom = Form.useWatch(attributeFormEnum?.uom, form);
    const valueType = Form.useWatch(attributeFormEnum?.valueType, form);
    const description = Form.useWatch(attributeFormEnum?.description, form);
    const displayDigit = Form.useWatch(attributeFormEnum?.displayDigit, form);
    const industry = Form.useWatch(attributeFormEnum?.industry, form);
    const dataReference = Form.useWatch(attributeFormEnum?.dataReference, form);
    const onOkHandler = (): any => {
        const industoryNew = industry?.map((item: any) => Number(item));
        // using the id of float and double for displaying the display digits
        const displayDigitValue =
            valueType === dataTypeWithId?.float ||
            valueType === dataTypeWithId?.double
                ? Number(displayDigit)
                : null;
        dispatch(
            updateAttribute({
                name: name,
                desc: description || null,
                propertiesId: Number(properties),
                categoryId: Number(category),
                uomId: uom,
                valueTypeId: Number(valueType),
                dataReferenceId: Number(dataReference),
                industryId: industoryNew,
                displayDigit: displayDigitValue,
                requestedBy: details?.username,
                attributeId: attributeDetails?.id,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        updateAttributeResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [updateAttributeResponse]);

    useEffect(() => {
        if (displayDigit != null && displayDigit === '0') {
            form.setFieldsValue({
                displayDigit: null,
            });
        }
    }, [displayDigit]);

    // without changing any fields save will be disable for edit, also it will check all the required fields.
    const valuesChange = (): any => {
        const getValues = form.getFieldsValue();
        if (
            getValues?.name &&
            getValues?.properties &&
            getValues?.category &&
            getValues?.uom &&
            getValues?.valueType &&
            getValues?.dataReference &&
            getValues?.industry?.length
        ) {
            if (isSaveDisable) {
                setIsSaveDisable(false);
            }
        } else {
            if (!isSaveDisable) {
                setIsSaveDisable(true);
            }
        }
    };

    return (
        <>
            {attributeDetailLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                attributeDetails?.name && (
                    <>
                        <Form
                            className="attributeFormWrapper__form"
                            form={form}
                            layout="vertical"
                            initialValues={{
                                name: attributeDetails?.name || '',
                                properties:
                                    attributeDetails?.properties?.id || '',
                                category: attributeDetails?.category?.id || '',
                                uom:
                                    attributeDetails?.unitOfMeasurement?.id ||
                                    '',
                                valueType: attributeDetails?.dataType?.id || '',
                                dataReference:
                                    attributeDetails?.dataReference?.id || '',
                                displayDigit:
                                    attributeDetails?.displayDigit || 2,
                                industry:
                                    attributeDetails?.industryList.map(
                                        (item: any) => [item?.id]
                                    ) || '',
                                description:
                                    attributeDetails?.description || '',
                            }}
                            onValuesChange={valuesChange}
                        >
                            <>
                                <div className="editAttributeWrapper">
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <Row className="editAttributeWrapper__headerWrapper">
                                            <div className="editAttributeWrapper__heading">
                                                <div className="editAttributeWrapper__backIcon">
                                                    <BackIcon
                                                        onClick={() =>
                                                            dispatch(
                                                                setAttributeState(
                                                                    ATTRIBUTETYPE.display
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="editAttributeWrapper__headingName fw-500 fs-20">
                                                    Edit Attribute Definition
                                                </div>
                                            </div>
                                        </Row>

                                        <div className="editAttributeWrapper__scrollContent">
                                            <AttributeFormComponent
                                                form={form}
                                                setIsUomOpen={setIsUomOpen}
                                            />
                                        </div>

                                        <div className="editAttributeWrapper__createRoleFooter">
                                            <div className="editAttributeWrapper__footerButtonWrapper">
                                                <CustomButton
                                                    type={'Cancel'}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        dispatch(
                                                            setAttributeState(
                                                                ATTRIBUTETYPE.display
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="editAttributeWrapper__footerButtonWrapper">
                                                {
                                                    <CustomButton
                                                        type={'Save'}
                                                        disabled={isSaveDisable}
                                                        handleClick={() => {
                                                            modalShow(
                                                                isModalOpen,
                                                                setIsModalOpen
                                                            );
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <ConfirmationModal
                                    open={isModalOpen}
                                    icon={<ConfirmationIcon />}
                                    onOk={() => onOkHandler()}
                                    onCancel={() =>
                                        cancelHandle(
                                            isModalOpen,
                                            setIsModalOpen
                                        )
                                    }
                                    text={'Do you want save Attribute changes?'}
                                />
                                <SuccessfulModal
                                    open={activeSuccessModalOpen}
                                    onOk={() => onOkHandler()}
                                    onCancel={() => {
                                        dispatch(
                                            setAttributeState(
                                                ATTRIBUTETYPE.display
                                            )
                                        );
                                        cancelHandle(
                                            activeSuccessModalOpen,
                                            setActiveSuccessModalOpen
                                        );
                                    }}
                                    text={'Saved Successfully'}
                                />
                            </>
                        </Form>
                    </>
                )
            )}
        </>
    );
};

export default EditAttribute;
