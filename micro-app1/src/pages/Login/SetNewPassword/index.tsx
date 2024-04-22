import './index.scss';
import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Input, Spin } from 'antd';
import LoginLogo from 'assets/icons/braboFooterLogo.svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import rightArrow from 'assets/icons/rightarrow.svg';
import CustomButton from 'components/common/CustomButton';
import { passwordValidation } from 'utils/toolTipPasswordValidate';
import CustomTooltip from 'components/common/CustomToolTip';
import { useDispatch, useSelector } from 'react-redux';
import { type VerifyOtpProps } from 'types/interfaces/PropsInterfaces/Login/loginPropsInterfaces';
import {
    setNewPassword,
    validateRecoveryToken,
} from 'redux/actions/AuthAction/authAction';
import { BUTTONTYPE } from 'types/enums';
import { LinkExpired } from '../LinkExpired';
import { useTranslation } from 'react-i18next';
import { passwordMaxLength } from 'utils/constants';

export const SetNewPassword: React.FC<VerifyOtpProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [tooltip, setToolTip] = useState(false);
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const { newPassword, confirmPassword } = password;
    const [validations, setValidations] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const userEmail = useSelector((state: any) => state.login.userEmail);
    const recoveryToken = useSelector(
        (state: any) => state?.login?.recoveryToken
    );
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            dispatch(validateRecoveryToken(token));
        }
    }, []);

    const onPasswordChangeHanlder = (property: string, value: {}): void => {
        setPassword({ ...password, [property]: value });

        if (property === 'newPassword') {
            if (value === '') {
                setToolTip(false);
            } else {
                passwordValidation(value, setValidations);
            }
        }
    };

    const getToken = useSelector((state: any) => state.login.otpVerify);
    const setNewpasswordLoading = useSelector(
        (state: any) => state?.login?.setNewpasswordLoading
    );

    // need to work on it
    // const resetButtonDisabledFunction=()=>{
    //  const isValidPassword=Object.values(validations).includes(false);
    //  return (!(newPassword===confirmPassword) ? true : isValidPassword)
    //  if(!isValidPassword&&newPassword===confirmPassword)
    // return true
    // else return false
    // passwordValidation(newPassword,setValidations)
    // }
    // useEffect(()=>{
    //   setButtonDisabled(resetButtonDisabledFunction())
    // },[newPassword,confirmPassword])

    useEffect(() => {
        if (Object.values(validations).includes(false)) {
            setToolTip(true);
        } else {
            setToolTip(false);
        }
    }, [validations]);

    useEffect(() => {
        setToolTip(false);
    }, []);

    const isUpdatedPassword = useSelector(
        (state: any) => state.login.passwordUpdated
    );

    const passwordResetLinkValidated = useSelector(
        (state: any) => state?.login?.passwordResetLinkValidated
    );
    const confirmPasswordSubmit = (value: any): void => {
        dispatch(
            setNewPassword({
                ...value,
                email: userEmail,
                getToken,
                recoveryToken: recoveryToken,
            })
        );
    };

    useEffect(() => {
        if (isUpdatedPassword) {
            navigate('/update-password'); // Navigate to the update password page
        }
    }, [isUpdatedPassword]);
    return (
        <>
            {setNewpasswordLoading ? (
                <div className="setNewPassword__loader">
                    <Spin />
                </div>
            ) : passwordResetLinkValidated ? (
                <div className="login setNewPassword">
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

                                    <h1 className="fw-600  fs-30">
                                        {t('login.setNewPassword.setNew')}
                                    </h1>

                                    <Form
                                        name="login_form"
                                        layout="vertical"
                                        onFinish={confirmPasswordSubmit}
                                    >
                                        <Form.Item
                                            name="newPassword"
                                            rules={[
                                                {
                                                    message: t(
                                                        'login.setNewPassword.inputNewPass'
                                                    ),
                                                },
                                                ({ getFieldValue }) => ({
                                                    async validator() {
                                                        if (
                                                            getFieldValue(
                                                                'newPassword'
                                                            ).length >=
                                                            passwordMaxLength
                                                        ) {
                                                            throw new Error(
                                                                'Password should not exceed 128 characters'
                                                            );
                                                        }
                                                    },
                                                }),
                                            ]}
                                            label={
                                                <>
                                                    <span>
                                                        {t(
                                                            'login.setNewPassword.newPass'
                                                        )}
                                                    </span>

                                                    <CustomTooltip
                                                        open={tooltip}
                                                        validations={
                                                            validations
                                                        }
                                                    />
                                                </>
                                            }
                                            className="tooltip-main"
                                        >
                                            <Input.Password
                                                value={newPassword}
                                                onChange={(e) => {
                                                    onPasswordChangeHanlder(
                                                        'newPassword',
                                                        e.target.value
                                                    );
                                                }}
                                                className="pt-10"
                                                placeholder={t(
                                                    'login.setNewPassword.typeNewpass'
                                                )}
                                                iconRender={(visible) =>
                                                    visible ? (
                                                        <EyeTwoTone />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )
                                                }
                                                maxLength={passwordMaxLength}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirmPassword"
                                            label={t(
                                                'login.setNewPassword.confirmPass'
                                            )}
                                            rules={[
                                                {
                                                    message: t(
                                                        'login.setNewPassword.inputConfirmPass'
                                                    ),
                                                },
                                            ]}
                                            validateStatus={
                                                confirmPassword &&
                                                confirmPassword !== newPassword
                                                    ? 'error'
                                                    : ''
                                            }
                                            help={
                                                confirmPassword &&
                                                confirmPassword !== newPassword
                                                    ? 'Password does not match'
                                                    : ''
                                            }
                                        >
                                            <Input.Password
                                                className="pt-10"
                                                placeholder="Type your Password"
                                                onChange={(e) => {
                                                    onPasswordChangeHanlder(
                                                        'confirmPassword',
                                                        e.target.value
                                                    );
                                                }}
                                                value={confirmPassword}
                                                iconRender={(visible) =>
                                                    visible ? (
                                                        <EyeTwoTone />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )
                                                }
                                                maxLength={passwordMaxLength}
                                            />
                                        </Form.Item>

                                        <div className="login-btn">
                                            <CustomButton
                                                typeOfButton="submit"
                                                type={BUTTONTYPE?.resetPassword}
                                                disabled={
                                                    tooltip ||
                                                    password?.newPassword
                                                        ?.length >=
                                                        passwordMaxLength ||
                                                    password?.confirmPassword
                                                        ?.length < 1 ||
                                                    password?.confirmPassword !==
                                                        password?.newPassword
                                                }
                                            />
                                        </div>

                                        <span className="fs-16 fw-400 copyright-text">
                                            {t('commonStr.poweredBy')}
                                        </span>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (
                <LinkExpired />
            )}
        </>
    );
};
