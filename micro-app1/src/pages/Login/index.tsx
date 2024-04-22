import './index.scss';
import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Input, Checkbox } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    loginUser,
    refreshTokenRequest,
    setEmailAddress,
    setIsEmailValid,
} from 'redux/actions/AuthAction/authAction';
import { useTranslation } from 'react-i18next';

import Cookies from 'universal-cookie';

// const cookies = new Cookies();

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const [loginParameters, setloginParameters] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const { email, password, rememberMe } = loginParameters;
    const loginHandler = (property: string, value: string | boolean): void => {
        setloginParameters({ ...loginParameters, [property]: value });
    };
    useEffect(() => {
        dispatch(setIsEmailValid());
    }, []);
    const handleLogin = (): void => {
        dispatch(setEmailAddress(loginParameters?.email));
        dispatch(loginUser(loginParameters));
    };

    const isLoggedIn = useSelector((state: any) => state?.login.isLoggedIn);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         dispatch(
    //             refreshTokenRequest({
    //                 ...loginParameters,
    //                 token:
    //                     cookies.get('authToken') ??
    //                     localStorage.getItem('authToken'),
    //             })
    //         );
    //     }
    // }, [isLoggedIn]);

    const isEmailValidError = useSelector(
        (state: any) => state.login.isEmailValid
    );
    const isPasswordValidError = useSelector(
        (state: any) => state.login.isPasswordValid
    );

    const mfaOtpSentMessage = useSelector(
        (state: any) => state.login.mfaOtpSentMessage
    );
    useEffect(() => {
        if (mfaOtpSentMessage) {
            navigate('/verify-otp');
        }
    }, [mfaOtpSentMessage]);
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
                                    subHeading={t('login.signInPrompt')}
                                />
                            </div>

                            <Form
                                name="login_form"
                                layout="vertical"
                                onFinish={handleLogin}
                            >
                                <Form.Item
                                    name="Work Email"
                                    label={t('login.workEmail')}
                                    className={isEmailValidError ? '' : 'mb-0'}
                                    rules={[
                                        {
                                            type: 'email',
                                            message:
                                                'Please enter valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: t(
                                                'login.enterEmailPrompt'
                                            ),
                                        },
                                    ]}
                                >
                                    <Input
                                        status={
                                            isEmailValidError ? '' : 'error'
                                        }
                                        placeholder={t('login.typeWorkEmail')}
                                        value={email}
                                        onChange={(e) => {
                                            loginHandler(
                                                'email',
                                                e.target.value
                                            );
                                        }}
                                    />
                                </Form.Item>
                                {/* To be Used Later */}
                                {/* {isEmailValidError ? null : (
                                    <span className="error-message fs-16">
                                        {errorResponse}
                                    </span>
                                )} */}

                                <Form.Item
                                    name="Password"
                                    label={t('login.password')}
                                    className={
                                        isPasswordValidError ? '' : 'mb-0'
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                'login.enterPasswordPrompt'
                                            ),
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        className="password-input"
                                        status={
                                            isPasswordValidError ? '' : 'error'
                                        }
                                        placeholder={t('login.typePassword')}
                                        value={password}
                                        onChange={(e) => {
                                            loginHandler(
                                                'password',
                                                e.target.value
                                            );
                                        }}
                                        iconRender={(visible) =>
                                            visible ? (
                                                <EyeTwoTone />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )
                                        }
                                    />
                                </Form.Item>
                                {/* To be Used Later */}
                                {/* {isPasswordValidError ? null : (
                                    <span className="error-message fs-16">
                                        {errorResponse}
                                    </span>
                                )} */}
                                <div className="remember-check fs-16 ">
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={(e) => {
                                                loginHandler(
                                                    'rememberMe',
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                        {t('login.rememberMe')}
                                    </Form.Item>
                                    <Link
                                        to="/forgot-password"
                                        className="login-form-forgot fw-500 fs-16"
                                    >
                                        {t('login.forgotPassword')}
                                    </Link>
                                </div>
                                <div className=" login-btn mt-60">
                                    <CustomButton
                                        type={t('login.signInButton')}
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
export default Login;
