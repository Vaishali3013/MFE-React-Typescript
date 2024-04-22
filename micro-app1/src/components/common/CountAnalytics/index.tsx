import React from 'react';
import { Col, Row } from 'antd';
import './index.scss';
import { type CountAnalyticsProps } from 'types/interfaces/PropsInterfaces';

const CountAnalytics: React.FC<CountAnalyticsProps> = ({
    countDetails,
    customClassName,
}) => {
    return (
        <>
            <div className="countAnalyticsWrapper">
                {countDetails?.map((item: any, index: number) => {
                    return (
                        <>
                            <Row className="countAnalytics text-center">
                                <Col
                                    span={24}
                                    className={customClassName ? 'countAnalytics__activeCustomUsers fw-400' : 'countAnalytics__activeUsers fw-400'}
                                >
                                    <span
                                        className={
                                            customClassName
                                                ? `${customClassName} countAnalytics__countInfo fs-14`
                                                : 'fs-14'
                                        }
                                    >
                                        {item.title}
                                    </span>
                                    <div
                                        className={
                                            customClassName
                                                ? `${customClassName} countAnalytics__countInfo`
                                                : 'countAnalytics__countInfo'
                                        }
                                    >
                                        {item.icon}
                                        <span className="fs-24">
                                            {item.count}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default CountAnalytics;
