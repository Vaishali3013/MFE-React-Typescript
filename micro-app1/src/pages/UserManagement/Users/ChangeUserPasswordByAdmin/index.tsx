import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import { passwordValidation } from 'utils/toolTipPasswordValidate';
import CustomTooltip from 'components/common/CustomToolTip';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPassword } from 'redux/actions/AuthAction/authAction';
import './index.scss';
import { BUTTONTYPE, EMPTY } from 'types/enums';
import { useTranslation } from 'react-i18next';
import { passwordMaxLength } from 'utils/constants';

export const ChangeUserPasswordByAdmin = ({
    emailvalue,
    setIsResetPasswordModalOpen,
    setChangePasswordSelected,
}: any): any => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [tooltip, setToolTip] = useState(false);
    const [password, setPassword] = useState({
        newPassword: EMPTY.string,
        confirmPassword: EMPTY.string,
    });
    const { newPassword, confirmPassword } = password;
    const [validations, setValidations] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const onPasswordChangeHanlder = (property: string, value: {}): void => {
        setPassword({ ...password, [property]: value });

        if (property === 'newPassword') {
            if (value === EMPTY.string) {
                setToolTip(false);
            } else {
                passwordValidation(value, setValidations);
            }
        }
    };

    const getToken = useSelector((state: any) => state?.login?.otpVerify);
    useEffect(() => {
        if (Object?.values(validations)?.includes(false)) {
            setToolTip(true);
        } else {
            setToolTip(false);
        }
    }, [validations]);

    useEffect(() => {
        setToolTip(false);
    }, []);

    const confirmPasswordSubmit = (value: any): void => {
        dispatch(
            setNewPassword({
                ...value,
                email: emailvalue,
                getToken,
            })
        );
        setChangePasswordSelected(false);
        setIsResetPasswordModalOpen(false);
    };
    return (
        <>
            <div className="setNewPasswordByAdmin">
                <div className="login setNewPassword">
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
                                            getFieldValue('newPassword')
                                                .length >= passwordMaxLength
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
                                        {t('login.setNewPassword.newPass')}
                                    </span>

                                    <CustomTooltip
                                        open={tooltip}
                                        validations={validations}
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
                            label={t('login.setNewPassword.confirmPass')}
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
                                    : EMPTY.string
                            }
                            help={
                                confirmPassword &&
                                confirmPassword !== newPassword
                                    ? 'Password does not match'
                                    : EMPTY.string
                            }
                        >
                            <Input.Password
                                className="pt-10"
                                placeholder={t(
                                    'login.setNewPassword.typeNewpass'
                                )}
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
                                    password?.newPassword?.length >=
                                        passwordMaxLength ||
                                    password?.confirmPassword?.length < 1 ||
                                    password?.confirmPassword !==
                                        password?.newPassword
                                }
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
