import React, { useEffect } from 'react';
import './index.scss';
import { Row, Col, Drawer, Button, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InActiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getTagDetails } from 'redux/actions/DeviceManagementActions/tagAction';

const ViewTagDrawer: React.FC<any> = ({
    open,
    setViewDrawerState,
    setEditState,
    details,
    setRecord,
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        details?.timeSeriesId && dispatch(getTagDetails(details?.timeSeriesId));
    }, [details]);
    const tagData = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagDetails
    );
    return (
        <>
            <Drawer
                className="viewTagDrawer"
                placement="right"
                getContainer={false}
                size="default"
                closable={false}
                open={open}
            >
                <>
                    <div>
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col
                                        span={24}
                                        className="viewTagDrawer__heading fw-500 fs-16"
                                    >
                                        {tagData?.tagName ? (
                                            <span>{`${tagData?.tagName}`}</span>
                                        ) : (
                                            ''
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={9}>
                                <Button
                                    disabled={!tagData?.isActive}
                                    className="viewTagDrawer__icon"
                                    onClick={() => {
                                        setViewDrawerState(false);
                                        setEditState('edit');
                                    }}
                                    type="primary"
                                    ghost
                                >
                                    Edit
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button
                                    className="viewTagDrawer__icon"
                                    type="text"
                                    onClick={() => {
                                        setViewDrawerState(false);
                                        setRecord('');
                                    }}
                                    icon={<CloseOutlined />}
                                ></Button>
                            </Col>
                        </Row>
                        <Divider className="viewTagDrawer__divider" />
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-18">
                                            {tagData?.name}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            Tag ID : {tagData?.tagId}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                {tagData?.isActive ? (
                                    <div className="viewTagDrawer__status fw-400 fs-14">
                                        <ActiveDotIcon />
                                        <span>{'Active'}</span>
                                    </div>
                                ) : (
                                    <div className="viewTagDrawer__status fw-400 fs-14">
                                        <InActiveDotIcon />
                                        <span>{'Inactive'}</span>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Divider className="viewTagDrawer__divider" />
                        <Row className="viewTagDrawer__form">
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionLeft"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Device'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.deviceName}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionRight"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Data Type'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.dataType}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="viewTagDrawer__form">
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionLeft"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Address'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.address}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionRight"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Property'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.additionalProperties}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="viewTagDrawer__form">
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionLeft"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'UOM'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.unit}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionRight"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Multiplication Factor'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.multiplicationFactor}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="viewTagDrawer__form">
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionLeft"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Addition Factor'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.additionalFactor}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionRight"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Polling Interval (ms)'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.pollingInterval}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="viewTagDrawer__form">
                            <Col
                                span={12}
                                className="viewTagDrawer__formSectionLeft"
                            >
                                <Row>
                                    <Col span={24} className="d-flex">
                                        <div className="viewTagDrawer__name fw-400 fs-14">
                                            {'Aggregation Method'}
                                        </div>
                                        <div className="viewTagDrawer__subName fw-400 fs-14">
                                            {tagData?.aggregateMethod}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </>
            </Drawer>
        </>
    );
};

export default ViewTagDrawer;
