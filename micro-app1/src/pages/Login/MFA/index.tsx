import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Input } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BUTTONTYPE } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_MFA_OTP_SENT_MESSAGE } from 'redux/types/loginTypes';
import {
    resendMfaOtp,
    setEmailAddress,
    verifyMfaOtp,
} from 'redux/actions/AuthAction/authAction';
import { resendOtpTimer } from 'utils/constants';
export const VerifyOtp: React.FC = (): any => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation');
    const [timer, setTimer] = useState<number>(resendOtpTimer);
    const [enteredOtp, setEnteredOtp] = useState('');
    useEffect(() => {
        let countdown: any;

        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdown);
        };
    }, [timer]);
    const userEmail = useSelector((state: any) => state.login.userEmail);
    const verifyOtp = (): any => {
        const otp = parseInt(enteredOtp, 10);
        dispatch(verifyMfaOtp({ email: userEmail, otp: otp }));
    };
    return (
        <>
            <div className="login">
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
                                <ScreenNameHeading
                                    heading={t('login.welcome')}
                                    subHeading="One Time Password has been sent to your registered mail ID"
                                />
                            </div>

                            <Form
                                name="login_form"
                                layout="vertical"
                                onFinish={verifyOtp}
                            >
                                <Form.Item>
                                    <Input
                                        disabled
                                        defaultValue={userEmail}
                                        suffix={
                                            <div
                                                onClick={() => {
                                                    dispatch(
                                                        setEmailAddress('')
                                                    );
                                                    dispatch({
                                                        type: CLEAR_MFA_OTP_SENT_MESSAGE,
                                                    });
                                                    navigate('/login');
                                                }}
                                                className="changeText"
                                            >
                                                Change
                                            </div>
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="Otp"
                                    label="OTP"
                                    rules={[
                                        {
                                            message: t(
                                                'login.enterPasswordPrompt'
                                            ),
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        maxLength={8}
                                        className="password-input otpField"
                                        placeholder="........"
                                        onChange={(e) => {
                                            setEnteredOtp(e.target.value);
                                        }}
                                    />
                                </Form.Item>
                                <div className="resendOtp">
                                    {timer > 0 ? (
                                        <div className="timer fw-500 fs-16">
                                            Resend in {timer}s
                                        </div>
                                    ) : (
                                        <div
                                            className="resendOtpLink fw-500 fs-16"
                                            onClick={() => {
                                                dispatch(
                                                    resendMfaOtp({
                                                        email: userEmail,
                                                    })
                                                );
                                            }}
                                        >
                                            Resend OTP
                                        </div>
                                    )}
                                </div>
                                <div className="verify-btn">
                                    <CustomButton
                                        type={BUTTONTYPE?.verify}
                                        disabled={false}
                                        typeOfButton={'submit'}
                                    />
                                </div>
                                <span className="fs-16 fw-400 copyright-text">
                                    {t('login.poweredBy')}
                                </span>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
