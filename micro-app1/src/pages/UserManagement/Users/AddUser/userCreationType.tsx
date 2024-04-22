import React from 'react';
import { Card, Radio, type RadioChangeEvent, Typography } from 'antd';
import { ReactComponent as InviteUserIcon } from 'assets/icons/addUsersIcon.svg';
import { ReactComponent as AddManuallyIcon } from 'assets/icons/addManuallyIcon.svg';
import { type UserCreationTypeProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import CustomButton from 'components/common/CustomButton';
import { userCreationType } from 'types/enums';
import { useTranslation } from "react-i18next";


const UserCreationType: React.FC<UserCreationTypeProps> = ({
    setUserTypeValue,
    userTypeValue,
    handleNextClick,
    handleCancle,
    paginationPayload,
    setadduserTypeValue,
}) => {
    const { Text } = Typography;
    const { t } = useTranslation('translation');
    const onChange = (e: RadioChangeEvent): void => {
        setUserTypeValue(e.target.value);
    };

    return (
        <>
            <div className="userCreationType">
                <Radio.Group
                    onChange={(e) => {
                        onChange(e);
                    }}
                    value={userTypeValue}
                    className="userCreationType__content"
                >
                    {/* Card 1 */}
                    <label htmlFor="inviteUserRadio">
                        <Card className="userCreationType__item disabled">
                            <div className="userCreationType__icon">
                                <InviteUserIcon />
                            </div>
                            <div className="userCreationType__text fs-12 fw-400">
                                <span className="fs-16 fw-500">
                                    {t("users.userCreationType.inviteUser")}
                                </span>
                                <div>
                                    {t("users.userCreationType.descrpitionUser")}
                                </div>
                            </div>
                            <div className="userCreationType__text">
                                <Radio
                                    id="inviteUserRadio"
                                    value={userCreationType.inviteUser}
                                    disabled
                                ></Radio>
                            </div>
                        </Card>
                    </label>

                    <Text>or</Text>

                    {/* Card 2 */}
                    <label htmlFor="addManuallyRadio">
                        <Card className="userCreationType__item">
                            <div className="userCreationType__icon">
                                <AddManuallyIcon />
                            </div>
                            <div className="userCreationType__text fs-12 fw-400">
                                <span className="fs-16 fw-500">
                                   {t("users.userCreationType.addUsermanually")}{' '}
                                </span>
                                <div>
                                 {t("users.userCreationType.addManuallyDesp")}
                                </div>
                            </div>
                            <div className="userCreationType__text">
                                <Radio id="addManuallyRadio" value={userCreationType.addUserManually}></Radio>
                            </div>
                        </Card>
                    </label>
                </Radio.Group>
            </div>
            <div className="userCreationTypeWrapper__footerWrapper">
                <div className="userCreationTypeWrapper__footerContent">
                    <CustomButton
                        type={t("commonStr.cancel")}
                        disabled={false}
                        handleClick={() => {
                            setUserTypeValue(0);
                            handleCancle();
                        }}
                    />
                    <CustomButton
                        type={t("commonStr.next")}
                        disabled={userTypeValue === 0}
                        handleClick={handleNextClick}
                    />
                </div>
            </div>
        </>
    );
};

export default UserCreationType;
