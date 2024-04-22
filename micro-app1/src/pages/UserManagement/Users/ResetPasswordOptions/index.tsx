import { Card, Radio, type RadioChangeEvent, Typography } from 'antd';
import { ReactComponent as PasswordResetLinkIcon } from 'assets/icons/sendPasswordResetLinkIcon.svg';
import { ReactComponent as ChangePasswordIcon } from 'assets/icons/changePasswordIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { resetPasswordOption } from 'types/enums';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { useEffect } from 'react';
const ResetPasswordOptions = ({
    handleCancle,
    handleNextClick,
    selectedOption,
    setSelectedOption,
}: any): any => {
    const { Text } = Typography;
    const onChange = (e: RadioChangeEvent): void => {
        setSelectedOption(e?.target?.value);
    };
    const { t } = useTranslation('translation');
    useEffect(() => {
        setSelectedOption(0);
    }, []);
    return (
        <>
            <div className="resetPasswordWrapper">
                <div className="resetPassword">
                    <Radio.Group
                        onChange={(e) => {
                            onChange(e);
                        }}
                        value={selectedOption}
                        className="resetPassword__content"
                    >
                        {/* Card 1 */}
                        <label htmlFor="inviteUserRadio">
                            <Card className="resetPassword__item">
                                <div className="resetPassword__icon">
                                    <ChangePasswordIcon />
                                </div>
                                <div className="resetPassword__text fs-12 fw-400">
                                    <span className="fs-16 fw-500">
                                        {t("login.changePassword.changePass")}
                                    </span>
                                    <div>
                                        {t(
                                            "login.changePassword.descpForPassword"
                                        )}
                                    </div>
                                </div>
                                <div className="resetPassword__text">
                                    <Radio
                                        id="changePasswordRadio"
                                        value={
                                            resetPasswordOption.changePassword
                                        }
                                    ></Radio>
                                </div>
                            </Card>
                        </label>

                        <Text>or</Text>

                        {/* Card 2 */}
                        <label htmlFor="addManuallyRadio">
                            <Card className="resetPassword__item">
                                <div className="resetPassword__icon">
                                    <PasswordResetLinkIcon />
                                </div>
                                <div className="resetPassword__text fs-12 fw-400">
                                    <span className="fs-16 fw-500">
                                        {t("login.changePassword.resetLink")}{' '}
                                    </span>
                                    <div>
                                        {t("login.changePassword.resetLinkDescp")}
                                    </div>
                                </div>
                                <div className="resetPassword__text">
                                    <Radio
                                        id="sendPasswordLinkRadio"
                                        value={
                                            resetPasswordOption.sendPasswordLink
                                        }
                                    ></Radio>
                                </div>
                            </Card>
                        </label>
                    </Radio.Group>
                </div>
                <div className="resetPasswordWrapper__footerWrapper">
                    <div className="resetPasswordWrapper__footerContent">
                        <CustomButton
                            type={t("commonStr.cancel")}
                            disabled={false}
                            handleClick={() => {
                                setSelectedOption(0);
                                handleCancle();
                            }}
                        />
                        <CustomButton
                            type={
                                selectedOption ===
                                resetPasswordOption?.sendPasswordLink
                                    ? 'Send Link'
                                    : 'Next'
                            }
                            disabled={selectedOption === resetPasswordOption?.default}
                            handleClick={handleNextClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordOptions;
