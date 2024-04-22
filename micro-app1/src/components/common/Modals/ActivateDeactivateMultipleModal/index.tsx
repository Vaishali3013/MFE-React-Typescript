import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import './index.scss';
import { type ActivateDeactivateModalProps } from 'types/interfaces/PropsInterfaces';
import { ReactComponent as ActivateDeactivateIcon } from 'assets/icons/activateDeactivateIcon.svg';

const ActivateDeactivateMultipleModal: React.FC<
    ActivateDeactivateModalProps
> = ({
    open,
    activeIds,
    inActiveIds,
    onCancel,
    text,
    handleActivate,
    handleDeactivate,
}) => {
    return (
        <>
            <Modal
                centered
                open={open}
                footer={null}
                destroyOnClose={true}
                onOk={() => {}}
                onCancel={() => onCancel(false)}
                className={`activedeactiveModal`}
            >
                <ActivateDeactivateIcon />
                <span className="text-center fw-400 fs-20 text-width">
                    {`There are Active and Inactive ${text} found in the selection`}
                </span>
                <div className="countAnalyticsWrapper count-confirmation-modal">
                    <Row className="countAnalytics text-center">
                        <Col
                            span={24}
                            className="countAnalytics__activeUsers fw-400"
                        >
                            <div className="countAnalytics__countInfo">
                                <span className="fs-24 countActive">
                                    {activeIds?.length}
                                </span>
                            </div>
                            <span className="fs-14 count-title align-text">{`Active ${text}`}</span>
                        </Col>
                    </Row>
                    <Row className="countAnalytics text-center">
                        <Col
                            span={24}
                            className="countAnalytics__activeUsers fw-400"
                        >
                            <div className="countAnalytics__countInfo">
                                <span className="fs-24 countInactive">
                                    {inActiveIds?.length}
                                </span>
                            </div>
                            <span className="fs-14 count-title align-text">{`Inactive ${text}`}</span>
                        </Col>
                    </Row>
                </div>
                <div className="ant-modal-footer">
                    <div className="active-btn">
                        <Button
                            className="cancel"
                            onClick={() => onCancel(false)}
                        >
                            Cancel
                        </Button>
                        <span className="ant-modal-footer-span"></span>
                        <Button
                            type="primary"
                            className="activate-all"
                            onClick={() => handleActivate(inActiveIds)}
                        >
                            Activate All
                        </Button>
                        <Button
                            className="deactivate-all"
                            onClick={() => handleDeactivate(activeIds)}
                        >
                            Deactivate All
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ActivateDeactivateMultipleModal;
