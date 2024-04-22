import './index.scss';
import React from 'react';
import { Col, Row, Form, Input, Spin } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { Link } from 'react-router-dom';
import rightArrow from 'assets/icons/rightarrow.svg';
import CustomButton from 'components/common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetLink } from 'redux/actions/AuthAction/authAction';
import { BUTTONTYPE } from 'types/enums';
import { useTranslation } from 'react-i18next';

export const ForgetPassword: React.FC<{ setForgotEmail: any }> = ({
    setForgotEmail,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const emailIsValid = useSelector((state: any) => state.login.isEmailValid);
    const forgotPasswordHandler = (value: any): void => {
        setForgotEmail(value);
        dispatch(sendPasswordResetLink(value.workEmail));
    };
    const recoveryLinkSentLoading = useSelector(
        (state: any) => state?.login?.recoveryLinkSentLoading
    );

    return (
        <>
            {recoveryLinkSentLoading ? (
                <div className="setNewPassword__loader">
                    <Spin />
                </div>
            ) : (
                <div className="login forgotPassword">
                    <Row>
                        <Col span={12} className="login__bgHeight">
                            <div className="login__leftSection"></div>
                        </Col>
                        <Col span={12}>
                            <div className="login__rightSection">
                                <div className="logo text-center">
                                    <img src={LoginLogo} alt="icon" />
                                </div>
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
                                    <ScreenNameHeading
                                        heading={t('login.forgotPass.forgot')}
                                        subHeading={t(
                                            'login.forgotPass.resetPasswordDescp'
                                        )}
                                    />
                                </div>

                                <Form
                                    name="login_form"
                                    layout="vertical"
                                    onFinish={forgotPasswordHandler}
                                >
                                    <Form.Item
                                        name="workEmail"
                                        label={t('login.forgotPass.workEmail')}
                                        className="forgot-pass"
                                    >
                                        <Input
                                            placeholder={t(
                                                'login.forgotPass.typeWorkMail'
                                            )}
                                            status={
                                                emailIsValid === false
                                                    ? 'error'
                                                    : ''
                                            }
                                        />
                                    </Form.Item>
                                    {emailIsValid === false ? (
                                        <span className="error-message fs-16">
                                            {t(
                                                'login.forgotPass.linkedAccount'
                                            )}
                                        </span>
                                    ) : null}

                                    <div className=" login-btn ">
                                        <CustomButton
                                            type={BUTTONTYPE?.sendRecoveryMail}
                                            disabled={false}
                                            typeOfButton={'submit'}
                                        />
                                    </div>
                                    <span className="fs-16 fw-400 copyright-text">
                                        {t('commonStr.poweredBy')}
                                    </span>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};
