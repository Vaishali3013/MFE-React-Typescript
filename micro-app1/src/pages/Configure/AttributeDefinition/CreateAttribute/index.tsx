import React, { useEffect, useState } from 'react';
import { Card, Row, Form } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTETYPE, BUTTONTYPE } from 'types/enums';
import {
    attributeFieldsValues,
    createAttribute,
    setAttributeState,
} from 'redux/actions/ConfigureActions/attributeActions';
import AttributeFormComponent from '../AttributeFormComponent';
import { parseJwt } from 'utils/jwtTokenFunction';

interface Iprops {
    setIsUomOpen: any;
}

const CreateUom: React.FC<Iprops> = ({ setIsUomOpen }): any => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const name = Form.useWatch('name', form);
    const properties = Form.useWatch('properties', form);
    const category = Form.useWatch('category', form);
    const uom = Form.useWatch('uom', form);
    const valueType = Form.useWatch('valueType', form);
    const description = Form.useWatch('description', form);
    const displayDigit = Form.useWatch('displayDigit', form);
    const dataReference = Form.useWatch('dataReference', form);
    const industry = Form.useWatch('industry', form);

    const createAttributeResponse = useSelector(
        (state: any) => state?.configure?.attributes?.createAttribute
    );

    const attributesFieldsValues = useSelector(
        (state: any) => state.configure?.attributesFieldsValues
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [isSaveDisable, setIsSaveDisable] = useState(true);
    const previousValuesOfFormFields = {
        name: '',
        properties: null,
        category: null,
        uom: null,
        valueType: null,
        dataReference: null,
        displayDigit: '2',
        industry: [],
        description: '',
    }
    const details = parseJwt();
    const onOkHandler = (): any => {
        const industoryNew = industry.map((item: any) => Number(item));
        dispatch(
            createAttribute({
                name: name,
                desc: description || null,
                propertiesId: Number(properties),
                categoryId: Number(category),
                uomId: uom,
                valueTypeId: Number(valueType),
                dataReferenceId: Number(dataReference),
                industryId: industoryNew,
                displayDigit: Number(displayDigit) || null,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        createAttributeResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createAttributeResponse]);

    useEffect(() => {
        if (
            name &&
            properties &&
            category &&
            uom &&
            valueType &&
            dataReference &&
            industry?.length
        ) {
            if (isSaveDisable) {
                setIsSaveDisable(false);
            }
        } else {
            if (!isSaveDisable) {
                setIsSaveDisable(true);
            }
        }
    }, [name, properties, category, uom, valueType, dataReference, industry]);

    useEffect(() => {
        if (displayDigit != null && displayDigit === '0') {
            form.setFieldsValue({
                displayDigit: null,
            });
        }
    }, [displayDigit]);

    const backToAttributeTable = (): any => {
        dispatch(setAttributeState(ATTRIBUTETYPE.display));
        dispatch(
            attributeFieldsValues(previousValuesOfFormFields)
        );
    };

    return (
        <Form
            className="attributeFormWrapper__form"
            form={form}
            layout="vertical"
            initialValues={{
                name: attributesFieldsValues?.name,
                properties: attributesFieldsValues?.properties,
                category: attributesFieldsValues?.category,
                uom: attributesFieldsValues?.uom,
                valueType: attributesFieldsValues?.valueType,
                dataReference: attributesFieldsValues?.dataReference,
                displayDigit: attributesFieldsValues?.displayDigit,
                industry: attributesFieldsValues?.industry,
                description: attributesFieldsValues?.description,
            }}
        >
            <>
                <div className="createAttributeWrapper">
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <Row className="createAttributeWrapper__headerWrapper">
                            <div className="createAttributeWrapper__heading">
                                <div className="createAttributeWrapper__backIcon">
                                    <BackIcon
                                        onClick={() => backToAttributeTable()}
                                    />
                                </div>
                                <div className="createAttributeWrapper__headingName fw-500 fs-20">
                                    Create Attribute Definition
                                </div>
                            </div>
                        </Row>

                        <div className="createAttributeWrapper__scrollContent">
                            <AttributeFormComponent
                                form={form}
                                setIsUomOpen={setIsUomOpen}
                            />
                        </div>

                        <div className="createAttributeWrapper__createRoleFooter">
                            <div className="createAttributeWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={BUTTONTYPE.cancel}
                                    disabled={false}
                                    handleClick={() => {
                                        dispatch(
                                            setAttributeState(
                                                ATTRIBUTETYPE.display
                                            )
                                        )
                                        dispatch(
                                            attributeFieldsValues(previousValuesOfFormFields)
                                        );
                                    }}
                                />
                            </div>
                            <div className="createAttributeWrapper__footerButtonWrapper">
                                {
                                    <CustomButton
                                        type={BUTTONTYPE.save}
                                        typeOfButton={'submit'}
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
                    onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                    text={'Do you want save this Attribute?'}
                />
                <SuccessfulModal
                    open={activeSuccessModalOpen}
                    onOk={() => onOkHandler()}
                    onCancel={() => {
                        dispatch(setAttributeState(ATTRIBUTETYPE.display));
                        dispatch(
                            attributeFieldsValues(previousValuesOfFormFields)
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
    );
};

export default CreateUom;
