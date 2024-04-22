import React from 'react';
import { Col, Row } from 'antd';
import './index.scss';
import { type ScreenHeadingProps } from 'types/interfaces/PropsInterfaces';

const ScreenNameHeading: React.FC<ScreenHeadingProps> = ({
  heading,
  subHeading
}) => {
  return (
    <>
      <Row className="screenNameHeading">
        <Col span={24} className="screenNameHeading__heading fw-500 fs-20">
          <span>{heading}</span>
        </Col>
        <Col span={24} className="screenNameHeading__subHeading fw-400 fs-14">
          <span>{subHeading}</span>
        </Col>
      </Row>
    </>
  );
};

export default ScreenNameHeading;
