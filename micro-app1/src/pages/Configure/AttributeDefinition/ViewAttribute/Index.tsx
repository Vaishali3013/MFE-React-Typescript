import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, Spin } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTETYPE } from 'types/enums';
import { setAttributeState } from 'redux/actions/ConfigureActions/attributeActions';
import AttributeFormComponent from '../AttributeFormComponent';

interface Iprops {
    setIsUomOpen: any;
}

const ViewAttribute: React.FC<Iprops> = ({ setIsUomOpen }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const createRoleResponse = useSelector(
        (state: any) => state.userManagement.roles.createRoleState
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const attributeDetails = useSelector(
        (state: any) => state?.configure?.attributes?.attributeDetails
    );

    const attributeDetailLoading = useSelector(
        (state: any) => state.configure?.attributes?.attributeDetailLoading
    );

    const onOkHandler = (): any => {};

    useEffect(() => {
        createRoleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createRoleResponse]);

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
                                    attributeDetails?.properties?.name || '',
                                category:
                                    attributeDetails?.category?.name || '',
                                uom:
                                    attributeDetails?.unitOfMeasurement?.name ||
                                    '',
                                valueType:
                                    attributeDetails?.dataType?.id || '',
                                dataReference:
                                    attributeDetails?.dataReference?.name || '',
                                displayDigit:
                                    attributeDetails?.displayDigit || '',
                                industry:
                                    attributeDetails?.industryList?.map(
                                        (item: any) => [item?.name]
                                    ) || '',
                                description:
                                    attributeDetails?.description || '',
                            }}
                        >
                            <>
                                <div className="viewAttributeWrapper">
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        <Row className="viewAttributeWrapper__headerWrapper">
                                            <Col span={24}>
                                                <Row>
                                                    <Col
                                                        span={0.5}
                                                        className="viewAttributeWrapper__backIcon"
                                                    >
                                                        <BackIcon
                                                            onClick={() =>
                                                                dispatch(
                                                                    setAttributeState(
                                                                        ATTRIBUTETYPE.display
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        span={22}
                                                        className="viewAttributeWrapper__headingName fw-500 fs-20"
                                                    >
                                                        View Attribute Template
                                                    </Col>
                                                    <Col span={1}>
                                                        <Button
                                                            type="primary"
                                                            ghost
                                                            className="addNewButton"
                                                            onClick={() => {
                                                                dispatch(
                                                                    setAttributeState(
                                                                        ATTRIBUTETYPE.edit
                                                                    )
                                                                );
                                                            }}
                                                            disabled={
                                                                !attributeDetails?.isActive
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <div className="viewAttributeWrapper__scrollContent">
                                            <AttributeFormComponent
                                                form={form}
                                                setIsUomOpen={setIsUomOpen}
                                            />
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
                                    text={'Are you sure you want to save this?'}
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

export default ViewAttribute;
