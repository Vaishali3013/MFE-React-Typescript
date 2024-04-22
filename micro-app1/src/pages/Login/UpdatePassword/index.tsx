import './index.scss';
import React from 'react';
import { Col, Row } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import CustomButton from 'components/common/CustomButton';
import CheckCircle from 'assets/images/checkCircle.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isPasswordUpdated } from 'redux/actions/AuthAction/authAction';
import { useTranslation } from 'react-i18next';

export const UpdatePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    dispatch(isPasswordUpdated());

    return (
        <>
            <div className="login updatePassword">
                <Row>
                    <Col span={12} className="login__bgHeight">
                        <div className="login__leftSection"></div>
                    </Col>
                    <Col span={12}>
                        <div className="login__rightSection">
                            <div className="logo text-center">
                                <img src={LoginLogo} alt="icon" />
                            </div>
                            <div className="circle-img">
                                <img src={CheckCircle} alt="check-img" />
                            </div>
                            <div className="title text-center">
                                <ScreenNameHeading
                                    heading={t(
                                        'login.updatedPassword.passwordUpdated'
                                    )}
                                    subHeading={t(
                                       ' login.updatedPassword.updatedPassdesp'
                                    )}
                                />
                            </div>

                            <div className=" login-btn mt-60">
                                <CustomButton
                                    type={'SIGN IN'}
                                    disabled={false}
                                    handleClick={() => {
                                        navigate('/login');
                                    }}
                                />
                            </div>
                            <span className="fs-16 fw-400 copyright-text">
                                {t('commonStr.poweredBy')}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
