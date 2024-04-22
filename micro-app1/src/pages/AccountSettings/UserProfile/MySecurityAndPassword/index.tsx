import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import './index.scss';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import CustomTooltip from 'components/common/CustomToolTip';
import { passwordValidation } from 'utils/toolTipPasswordValidate';
import CustomButton from 'components/common/CustomButton';
import { EMPTY } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
    changePassword,
    newPasswordAction,
} from 'redux/actions/AuthAction/authAction';

import { parseJwt } from 'utils/jwtTokenFunction';
import { useParams } from 'react-router-dom';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import { useTranslation } from 'react-i18next';
const MySecurityAndPassword: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [tooltip, setTooltip] = useState(false);
    const [validations, setValidations] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const [passwordChange, setPasswordChange] = useState({
        oldPassword: EMPTY.string,
        newPassword: EMPTY.string,
        confirmPassword: EMPTY.string,
    });
    const ChangedPassword = useSelector(
        (state: any) => state.login.changePassword
    );

    const { oldPassword, newPassword, confirmPassword } = passwordChange;
    const formRef = React.useRef<FormInstance>(null);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (name: any, value: any): void => {
        setPasswordChange({
            ...passwordChange,
            [name]: value,
        });

        if (name === 'newPassword') {
            if (value.length === 0) {
                setTooltip(false);
            } else {
                passwordValidation(value, setValidations);
            }
        }
    };
    const userId = parseJwt();

    const onFinish = (value: any): void => {
        dispatch(changePassword({ ...passwordChange, userId: userId?.UserId }));
        onReset();
    };
    const onOkHandler = (): any => {
        modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    };
    const { currentTab } = useParams();
    useEffect(() => {
        setTooltip(false);
    }, [currentTab]);

    const onReset = (): void => {
        formRef.current?.resetFields();
        setTooltip(false);
    };
    useEffect(() => {
        if (Object.values(validations).includes(false)) {
            setTooltip(true);
        } else {
            if (newPassword.length === 0) {
                setTooltip(true);
            } else {
                setTooltip(false);
            }
        }
    }, [validations]);
    useEffect(() => {
        if (ChangedPassword) {
            setActiveSuccessModalOpen(true);
        }
    }, [ChangedPassword]);

    useEffect(() => {
        setTooltip(false);
    }, []);
    useEffect(() => {
        if (!activeSuccessModalOpen) {
            dispatch(newPasswordAction());
        }
    }, [activeSuccessModalOpen]);

    return (
        <div className="passwordComponent">
            <Card>
                <Row className="passwordContainer">
                    <Col span={24} className="passwordContainer__heading">
                        <ScreenNameHeading
                            heading={t(
                                ' accountSettings.myProfile.changePassword'
                            )}
                            subHeading={t(
                                ' accountSettings.myProfile.newPassCharacters'
                            )}
                        />
                    </Col>
                    <Col className="passwordContainer__content" span={24}>
                        <Row className="passwordContainer__content__child">
                            <Col span={24}>
                                <Form
                                    className="passwordContainer__form"
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    ref={formRef}
                                    onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <div className="passwordContainer_form__container">
                                        <Form.Item
                                            label={t(
                                                'accountSettings.myProfile.typeYourCurrent'
                                            )}
                                            name="oldPassword"
                                            className="passwordContainer__form__input"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t(
                                                        ' accountSettings.myProfile.pleaseInputYourPassword'
                                                    ),
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                name="oldPassword"
                                                value={oldPassword}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e.target.name,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={
                                                <>
                                                    <span>
                                                        {t(
                                                            'accountSettings .myProfile.typeYourNewPassword'
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
                                            name="newPassword"
                                            className="passwordContainer__form__input"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t(
                                                        ' accountSettings.myProfile.pleaseInputYourPassword'
                                                    ),
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e.target.name,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={t(
                                                'accountSettings.myProfile.confirmPassword'
                                            )}
                                            name="confirmPassword"
                                            className="passwordContainer__form__input"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t(
                                                        '   accountSettings.myProfile.pleaseInputYourPassword'
                                                    ),
                                                },
                                                () => ({
                                                    async validator(_, value) {
                                                        if (
                                                            !value ||
                                                            newPassword ===
                                                                value
                                                        ) {
                                                            await Promise.resolve();
                                                            return;
                                                        }
                                                        return await Promise.reject(
                                                            new Error(
                                                                'Password does not match'
                                                            )
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e.target.name,
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
                                    </div>
                                    <div className="passwordContainer__form__divider"></div>
                                    <Form.Item className="passwordContainer__form__buttons">
                                        <CustomButton
                                            type={t('commonStr.cancel')}
                                            disabled={false}
                                            handleClick={onReset}
                                        />
                                        <CustomButton
                                            typeOfButton="submit"
                                            type={t('commonStr.save')}
                                            disabled={false}
                                        />
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() =>
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    )
                }
                text={t('users.passwordChangedSuccess')}
            />
        </div>
    );
};
export default MySecurityAndPassword;
