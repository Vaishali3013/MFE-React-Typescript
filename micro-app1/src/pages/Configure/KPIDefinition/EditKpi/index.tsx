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
import { KPITYPE, kpiFormEnum, dataTypeWithId } from 'types/enums';
import { parseJwt } from 'utils/jwtTokenFunction';
import KPIFormComponent from '../KPIFormComponent';
import {
    setKpiState,
    updateKpi,
} from 'redux/actions/ConfigureActions/kpiActions';
import { useTranslation } from 'react-i18next';

interface Iprops {
    setIsUomOpen: any;
}

const EditKpi: React.FC<Iprops> = ({ setIsUomOpen }: any): any => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const updateKpiResponse = useSelector(
        (state: any) => state?.configure?.kpi?.updateKpi
    );
    const [isSaveDisable, setIsSaveDisable] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const kpiDetails = useSelector(
        (state: any) => state?.configure?.kpi?.kpiDetails
    );

    const kpiDetailLoading = useSelector(
        (state: any) => state.configure?.kpi?.kpiDetailLoading
    );
    const { t } = useTranslation('translation');
    const details = parseJwt();
    const name = Form.useWatch(kpiFormEnum?.name, form);
    const type = Form.useWatch(kpiFormEnum?.type, form);
    const nodeLevel = Form.useWatch(kpiFormEnum?.nodeLevel, form);
    const uom = Form.useWatch(kpiFormEnum?.uom, form);
    const valueType = Form.useWatch(kpiFormEnum?.valueType, form);
    const description = Form.useWatch(kpiFormEnum?.description, form);
    const displayDigit = Form.useWatch(kpiFormEnum?.displayDigit, form);
    const targetType = Form.useWatch(kpiFormEnum?.targetType, form);
    const aggregationType = Form.useWatch(kpiFormEnum?.aggregationType, form);
    const onOkHandler = (): any => {
        // const industoryNew = industry?.map((item: any) => Number(item));
        // using the id of float and double for displaying the display digits
        const displayDigitValue =
            valueType === dataTypeWithId?.float ||
            valueType === dataTypeWithId?.double
                ? Number(displayDigit)
                : null;
        dispatch(
            updateKpi({
                name: name,
                description: description || null,
                kpiTypeId: Number(type),
                nodeTypeId: Number(nodeLevel),
                uomId: uom,
                valueTypeId: Number(valueType),
                aggregationTypeId: Number(aggregationType),
                targetTypeId: Number(targetType),
                displayDigit: displayDigitValue,
                requestedBy: details?.username,
                kpiId: kpiDetails?.id,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        updateKpiResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [updateKpiResponse]);

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
            getValues?.type &&
            getValues?.nodeLevel &&
            getValues?.uom &&
            getValues?.valueType &&
            getValues?.aggregationType &&
            getValues?.targetType &&
            getValues?.name.trim() !== ''
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
            {kpiDetailLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                kpiDetails?.name && (
                    <>
                        <Form
                            className="kpiFormWrapper__form"
                            form={form}
                            layout="vertical"
                            initialValues={{
                                name: kpiDetails?.name || '',
                                type: kpiDetails?.kpiType?.id || '',
                                nodeLevel: kpiDetails?.nodeType?.id || '',
                                uom: kpiDetails?.unitOfMeasurement?.id || '',
                                valueType: kpiDetails?.valueType?.id || '',
                                aggregationType:
                                    kpiDetails?.aggregationType?.id || '',
                                displayDigit: kpiDetails?.displayDigit || 2,
                                targetType: kpiDetails?.targetType?.name || '',
                                description: kpiDetails?.description || '',
                            }}
                            onValuesChange={valuesChange}
                        >
                            <>
                                <div className="editKpiWrapper">
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <Row className="editKpiWrapper__headerWrapper">
                                            <div className="editKpiWrapper__heading">
                                                <div className="editKpiWrapper__backIcon">
                                                    <BackIcon
                                                        onClick={() =>
                                                            dispatch(
                                                                setKpiState(
                                                                    KPITYPE.display
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="editKpiWrapper__headingName fw-500 fs-20">
                                                    {t(
                                                        'kpiDefinition.editKpi.editKpi'
                                                    )}
                                                </div>
                                            </div>
                                        </Row>

                                        <div className="editKpiWrapper__scrollContent">
                                            <KPIFormComponent
                                                form={form}
                                                setIsUomOpen={setIsUomOpen}
                                            />
                                        </div>

                                        <div className="editKpiWrapper__createRoleFooter">
                                            <div className="editKpiWrapper__footerButtonWrapper">
                                                <CustomButton
                                                    type={t('commonStr.cancel')}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        dispatch(
                                                            setKpiState(
                                                                KPITYPE.display
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="editKpiWrapper__footerButtonWrapper">
                                                {
                                                    <CustomButton
                                                        type={t(
                                                            'commonStr.save'
                                                        )}
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
                                    text={t(
                                        'kpiDefinition.modal.editConformationMessage'
                                    )}
                                />
                                <SuccessfulModal
                                    open={activeSuccessModalOpen}
                                    onOk={() => onOkHandler()}
                                    onCancel={() => {
                                        dispatch(setKpiState(KPITYPE.display));
                                        cancelHandle(
                                            activeSuccessModalOpen,
                                            setActiveSuccessModalOpen
                                        );
                                    }}
                                    text={t(
                                        'kpiDefinition.modal.successMessage'
                                    )}
                                />
                            </>
                        </Form>
                    </>
                )
            )}
        </>
    );
};

export default EditKpi;
