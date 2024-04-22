import React from 'react';
import './index.scss';
import { Col, Row } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { Link } from 'react-router-dom';
import rightArrow from 'assets/icons/rightarrow.svg';
import { useTranslation } from 'react-i18next';
export const LinkExpired: React.FC = () => {
    const { t } = useTranslation('translation');
    return (
        <>
            <div className="login linkExpired">
                <Row>
                    <Col span={12} className="login__bgHeight">
                        <div className="login__leftSection"></div>
                    </Col>
                    <Col span={12}>
                        <div className="login__rightSection">
                            <div className="logo text-center">
                                <img src={LoginLogo} alt="icon" />
                            </div>
                            <div className="linkExpired">
                                <div className="title">
                                    <div className="right-arrow">
                                        <Link
                                            to="/login"
                                            className="fs-16 fw-500"
                                        >
                                            <img
                                                src={rightArrow}
                                                alt="right-arrow-svg"
                                            />
                                            {t('login.forgotPass.backtoSign')}
                                        </Link>
                                    </div>
                                    <div className="linkExpiredHeading">
                                        <ScreenNameHeading
                                            heading={t(
                                                'login.linkExpired.linkExp'
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
