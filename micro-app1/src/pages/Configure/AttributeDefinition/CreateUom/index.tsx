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
import { createUom } from 'redux/actions/ConfigureActions/attributeActions';
import UomFormComponent from '../UomFormComponent';
import { parseJwt } from 'utils/jwtTokenFunction';
import { BUTTONTYPE, attributeFormEnum } from 'types/enums';

interface Iprops {
    setIsUomOpen: any;
}

const CreateAttribute: React.FC<Iprops> = ({ setIsUomOpen }: any) => {
    const [isSaveDisable, setIsSaveDisable] = useState(true);

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const nameOfUnit = Form.useWatch(attributeFormEnum?.nameOfUnit, form);
    const abbreviation = Form.useWatch(attributeFormEnum?.abbreviation, form);
    const uomClasses = Form.useWatch(attributeFormEnum?.uomClasses, form);
    const metricSystem = Form.useWatch(attributeFormEnum?.metricSystem, form);
    const description = Form.useWatch(attributeFormEnum?.description, form);
    const details = parseJwt();
    const createUomResponse = useSelector(
        (state: any) => state?.configure?.attributes?.createUom
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const onOkHandler = (): any => {
        dispatch(
            createUom({
                name: nameOfUnit,
                abbreviation: abbreviation,
                desc: description,
                uomClassId: uomClasses,
                metricSystemId: metricSystem,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        createUomResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createUomResponse]);

    useEffect(() => {
        if (
            nameOfUnit &&
            abbreviation &&
            uomClasses &&
            metricSystem &&
            nameOfUnit.trim() !== '' &&
            abbreviation.trim() !== ''
        ) {
            if (isSaveDisable) {
                setIsSaveDisable(false);
            }
        } else {
            if (!isSaveDisable) {
                setIsSaveDisable(true);
            }
        }
    }, [nameOfUnit, abbreviation, uomClasses, metricSystem]);

    return (
        <Form
            className="attributeFormWrapper__form"
            form={form}
            layout="vertical"
            initialValues={{}}
        >
            <>
                <div className="createAttributeWrapper">
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <Row className="createAttributeWrapper__headerWrapper">
                            <div className="createAttributeWrapper__heading">
                                <div className="createAttributeWrapper__backIcon">
                                    <BackIcon
                                        onClick={() => setIsUomOpen(false)}
                                    />
                                </div>
                                <div className="createAttributeWrapper__headingName fw-500 fs-20">
                                    Unit of Measurement
                                </div>
                            </div>
                        </Row>
                        <div className="createAttributeWrapper__scrollContent">
                            <UomFormComponent form={form} />
                        </div>

                        <div className="createAttributeWrapper__createRoleFooter">
                            <div className="createAttributeWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={BUTTONTYPE.cancel}
                                    disabled={false}
                                    handleClick={() => {
                                        setIsUomOpen(false);
                                    }}
                                />
                            </div>
                            <div className="createAttributeWrapper__footerButtonWrapper">
                                {
                                    <CustomButton
                                        type={BUTTONTYPE.save}
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
                    text={'Are you sure you want to save this UOM?'}
                />
                <SuccessfulModal
                    open={activeSuccessModalOpen}
                    onOk={() => onOkHandler()}
                    onCancel={() => {
                        setIsUomOpen(false);
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

export default CreateAttribute;
