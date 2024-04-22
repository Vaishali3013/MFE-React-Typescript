import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { KPITYPE, screenName } from 'types/enums';
import TimeCapsuleProgress from 'components/common/TimeCapsuleProgress';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
import {
    createKpi,
    kpiFieldsValues,
    setKpiState,
} from 'redux/actions/ConfigureActions/kpiActions';
import KPIFormComponent from '../KPIFormComponent';

const CreateKpi: React.FC<any> = ({ setIsUomOpen }): any => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const { t } = useTranslation('translation');
    const [form] = Form.useForm();
    const name = Form.useWatch('name', form);
    const type = Form.useWatch('type', form);
    const nodeLevel = Form.useWatch('nodeLevel', form);
    const uom = Form.useWatch('uom', form);
    const valueType = Form.useWatch('valueType', form);
    const description = Form.useWatch('description', form);
    const displayDigit = Form.useWatch('displayDigit', form);
    const aggregationType = Form.useWatch('aggregationType', form);
    const targetType = Form.useWatch('targetType', form);
    const createKpiResponse = useSelector(
        (state: any) => state?.configure?.kpi?.createKpi
    );

    const kpiFieldsValue = useSelector(
        (state: any) => state.configure?.kpi?.kpiFieldsValues
    );
    const [isSaveDisable, setIsSaveDisable] = useState(true);
    const previousValuesOfFormFields = {
        name: '',
        type: null,
        nodeLevel: null,
        uom: null,
        valueType: null,
        aggregationType: null,
        displayDigit: '2',
        targetType: null,
        description: '',
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const details = parseJwt();

    const onOkHandler = (): any => {
        dispatch(
            createKpi({
                name: name,
                description: description || null,
                kpiTypeId: Number(type),
                nodeTypeId: Number(nodeLevel),
                uomId: uom,
                valueTypeId: Number(valueType),
                aggregationTypeId: Number(aggregationType),
                targetTypeId: Number(targetType),
                displayDigit: Number(displayDigit) || null,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        createKpiResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createKpiResponse]);

    useEffect(() => {
        if (
            name &&
            type &&
            nodeLevel &&
            uom &&
            valueType &&
            aggregationType &&
            targetType &&
            name.trim() !== ''
        ) {
            if (isSaveDisable) {
                setIsSaveDisable(false);
            }
        } else {
            if (!isSaveDisable) {
                setIsSaveDisable(true);
            }
        }
    }, [name, type, nodeLevel, uom, valueType, aggregationType, targetType]);

    useEffect(() => {
        if (displayDigit != null && displayDigit === '0') {
            form.setFieldsValue({
                displayDigit: null,
            });
        }
    }, [displayDigit]);

    const backToKpiTable = (): any => {
        dispatch(setKpiState(KPITYPE.display));
        dispatch(kpiFieldsValues(previousValuesOfFormFields));
    };

    return (
        <Form
            className="kpiFormWrapper__form"
            form={form}
            layout="vertical"
            initialValues={{
                name: kpiFieldsValue?.name,
                type: kpiFieldsValue?.type,
                nodeLevel: kpiFieldsValue?.nodeLevel,
                uom: kpiFieldsValue?.uom,
                valueType: kpiFieldsValue?.valueType,
                aggregationType: kpiFieldsValue?.aggregationType,
                displayDigit: kpiFieldsValue?.displayDigit,
                targetType: kpiFieldsValue?.targetType,
                description: kpiFieldsValue?.description,
            }}
        >
            <>
                <div className="createKpiWrapper">
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <Row className="createKpiWrapper__headerWrapper">
                            <Col span={18}>
                                <div className="createKpiWrapper__heading">
                                    <div className="createKpiWrapper__backIcon">
                                        <BackIcon
                                            onClick={() => {
                                                count === 1
                                                    ? backToKpiTable()
                                                    : setCount(count - 1);
                                            }}
                                        />
                                    </div>
                                    <div className="createKpiWrapper__headingName fw-500 fs-20">
                                        {t('kpiDefinition.createKpi.createKpi')}
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <TimeCapsuleProgress
                                    count={count}
                                    screen={screenName.kpi}
                                />
                            </Col>
                        </Row>
                        {count === 1 ? (
                            <div className="createKpiWrapper__scrollContent">
                                <KPIFormComponent
                                    form={form}
                                    setIsUomOpen={setIsUomOpen}
                                />
                            </div>
                        ) : count === 2 ? (
                            <div className="createKpiWrapper__scrollContentTable">
                                {/* Will use later on */}
                                {/* <CreateTimeCapsuleStep2
                                setAttributesSelectedIds={
                                    setAttributesSelectedIds
                                }
                            /> */}
                            </div>
                        ) : (
                            ''
                        )}
                    </Card>
                    <div className="createKpiWrapper__createRoleFooter">
                        <div className="createKpiWrapper__footerButtonWrapper">
                            <CustomButton
                                type={
                                    count === 1
                                        ? t('commonStr.cancel')
                                        : t('commonStr.back')
                                }
                                disabled={false}
                                handleClick={() => {
                                    count === 1
                                        ? backToKpiTable()
                                        : setCount(count - 1);
                                }}
                            />
                        </div>
                        <div className="createKpiWrapper__footerButtonWrapper">
                            {/* {count === 2 ? (
                                <CustomButton
                                    type={t('commonStr.save')}
                                    disabled={false}
                                    handleClick={() => {
                                        modalShow(isModalOpen, setIsModalOpen);
                                    }}
                                />
                            ) : (
                                <CustomButton
                                    type={t('commonStr.next')}
                                    disabled={false}
                                    handleClick={() => {
                                        setCount(count + 1);
                                    }}
                                />
                            )} */}
                            <CustomButton
                                type={t('commonStr.save')}
                                disabled={isSaveDisable}
                                handleClick={() => {
                                    modalShow(isModalOpen, setIsModalOpen);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <ConfirmationModal
                    open={isModalOpen}
                    icon={<ConfirmationIcon />}
                    onOk={() => onOkHandler()}
                    onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                    text={t('kpiDefinition.modal.conformationMessage')}
                />
                <SuccessfulModal
                    open={activeSuccessModalOpen}
                    onOk={() => onOkHandler()}
                    onCancel={() => {
                        dispatch(setKpiState(KPITYPE.display));
                        dispatch(kpiFieldsValues(previousValuesOfFormFields));
                        cancelHandle(
                            activeSuccessModalOpen,
                            setActiveSuccessModalOpen
                        );
                    }}
                    text={t('kpiDefinition.modal.successMessage')}
                />
            </>
        </Form>
    );
};

export default CreateKpi;
