import React, { useState } from 'react';
import { Card, Col, Row, Button, Form, Spin, Radio } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { KPITYPE } from 'types/enums';
import KPIFormComponent from '../KPIFormComponent';
import { setKpiState } from 'redux/actions/ConfigureActions/kpiActions';
import { useTranslation } from 'react-i18next';

interface Iprops {
    setIsUomOpen: any;
}

const ViewKpi: React.FC<Iprops> = ({ setIsUomOpen }) => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { t } = useTranslation('translation');

    const kpiDetails = useSelector(
        (state: any) => state?.configure?.kpi?.kpiDetails
    );

    const kpiDetailLoading = useSelector(
        (state: any) => state.configure?.kpi?.kpiDetailLoading
    );

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
                                type: kpiDetails?.kpiType?.name || '',
                                nodeLevel: kpiDetails?.nodeType?.name || '',
                                uom: kpiDetails?.unitOfMeasurement?.name || '',
                                valueType: kpiDetails?.valueType?.id || '',
                                aggregationType:
                                    kpiDetails?.aggregationType?.name || '',
                                displayDigit: kpiDetails?.displayDigit || '',
                                targetType: kpiDetails?.targetType?.name || '',
                                description: kpiDetails?.description || '',
                            }}
                        >
                            <>
                                <div className="viewKpiWrapper">
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <Row className="viewKpiWrapper__headerWrapper">
                                            <Col span={24}>
                                                <Row>
                                                    <Col
                                                        span={0.5}
                                                        className="viewKpiWrapper__backIcon"
                                                    >
                                                        <BackIcon
                                                            onClick={() =>
                                                                dispatch(
                                                                    setKpiState(
                                                                        KPITYPE.display
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        span={22}
                                                        className="viewKpiWrapper__headingName fw-500 fs-20"
                                                    >
                                                        {t(
                                                            'kpiDefinition.viewKpi.viewKpi'
                                                        )}
                                                    </Col>
                                                    <Col span={1}>
                                                        <Button
                                                            type="primary"
                                                            ghost
                                                            className="addNewButton"
                                                            onClick={() => {
                                                                dispatch(
                                                                    setKpiState(
                                                                        KPITYPE.edit
                                                                    )
                                                                );
                                                            }}
                                                            disabled={
                                                                !kpiDetails?.isActive
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Row className="viewKpiWrapper__tabContainer">
                                            <Radio.Group
                                                value={count}
                                                onChange={(e: any) => {
                                                    setCount(e.target.value);
                                                }}
                                            >
                                                <Radio.Button value={1}>
                                                    {t(
                                                        'kpiDefinition.viewKpi.kpiDetails'
                                                    )}
                                                </Radio.Button>
                                                <Radio.Button value={2}>
                                                    {t(
                                                        'kpiDefinition.viewKpi.formulaWindow'
                                                    )}
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Row>

                                        <div className="viewKpiWrapper__scrollContent">
                                            {count === 1 ? (
                                                <KPIFormComponent
                                                    form={form}
                                                    setIsUomOpen={setIsUomOpen}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            </>
                        </Form>
                    </>
                )
            )}
        </>
    );
};

export default ViewKpi;
