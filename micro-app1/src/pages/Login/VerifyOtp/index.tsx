import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Input } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { Link, useNavigate } from 'react-router-dom';
import rightArrow from 'assets/icons/rightarrow.svg';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type VerifyOtpProps } from 'types/interfaces/PropsInterfaces/Login/loginPropsInterfaces';
import { verifyOtp } from 'redux/actions/AuthAction/authAction';
import { useTranslation } from 'react-i18next';
export const VerifyOtp: React.FC<VerifyOtpProps> = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation');
    const [form] = Form.useForm();

    const [, forceUpdate] = useState({});

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const verifyOtpHandler = (value: any): void => {
        dispatch(verifyOtp({ ...value, email: props.emailvalue.workEmail }));
    };
    const isOtpValid = useSelector((state: any) => state.login.otpVerify);
    // will user later for validation
    // const otpValue = useSelector((state: any) => state.login.otpData);
    useEffect(() => {
        if (isOtpValid) {
            navigate('/setnew-password');
        }
    }, [isOtpValid]);

    // const [fieldValue, setFieldValue] = useState('');

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // will user later for validation
        // const { value } = e.target;
        // setFieldValue(value);
    };
    return (
        <>
            <div className="login verifyotp">
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
                                    <Link to="/login" className="fs-16 fw-500">
                                        <img
                                            src={rightArrow}
                                            alt="right-arrow-svg"
                                        />
                                        {t('login.forgotPass.backtoSign')}
                                    </Link>
                                </div>
                                <ScreenNameHeading
                                    heading={t('login.verifyOtp.verifyAccount')}
                                    subHeading={t(
                                        'login.verifyOtp.contactadmin'
                                    )}
                                />
                            </div>

                            <Form
                                name="login_form"
                                layout="vertical"
                                onFinish={verifyOtpHandler}
                                form={form}
                            >
                                <Form.Item
                                    name="verifyOtp"
                                    label="Enter OTP"
                                    className="otp-mb"
                                    // will user later for validation
                                    // validateStatus={
                                    //     fieldValue === otpValue
                                    //         ? 'success'
                                    //         : fieldValue !== otpValue &&
                                    //           fieldValue !== ''
                                    //         ? 'error'
                                    //         : ''
                                    // }
                                    // hasFeedback
                                    // help={
                                    //     fieldValue === otpValue
                                    //         ? 'OTP is approved'
                                    //         : fieldValue !== otpValue &&
                                    //           fieldValue !== ''
                                    //         ? 'Enter a valid OTP'
                                    //         : ''
                                    // }
                                >
                                    <Input
                                        placeholder="Enter OTP"
                                        onChange={handleOtpChange}
                                    />
                                </Form.Item>
                                <span className="otp-message">
                                    {t('login.verifyOtp.OtpValid')}
                                </span>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <div className=" login-btn ">
                                            <CustomButton
                                                type={'Create New Password'}
                                                disabled={
                                                    !form.isFieldsTouched(true)
                                                }
                                                typeOfButton={'submit'}
                                            />
                                        </div>
                                    )}
                                </Form.Item>
                                <span className="fs-16 fw-400 copyright-text">
                                    {t('commonStr.poweredBy')}
                                </span>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
