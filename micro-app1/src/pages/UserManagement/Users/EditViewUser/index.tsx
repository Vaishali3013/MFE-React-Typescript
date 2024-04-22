import React from 'react';
import './viewUser.scss';
import { type ViewUsersProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import CustomButton from 'components/common/CustomButton';
import { Avatar } from 'antd';
import { getIntials } from 'utils/commonFunction';
import { useTranslation } from "react-i18next";

const ViewUser: React.FC<ViewUsersProps> = ({ data, setIsEdit }) => {
    const onEditClickHandle = (): void => {
        setIsEdit(true);
    };
    const { t } = useTranslation('translation');
    return (
        <>
            <div className="viewUser">
                <div className="viewUser__personalInfo">
                    <div className="viewUser__personalInfo__button">
                        <CustomButton
                            type={'Edit'}
                            disabled={false}
                            handleClick={onEditClickHandle}
                        />
                    </div>
                    <div className="viewUser__personalInfo__content text-center">
                        <div className="profileContainer">
                            {data.profileImage ? (
                                <Avatar
                                    className="mr-10"
                                    src={data.profileImage}
                                />
                            ) : (
                                <Avatar
                                    className="mr-10"
                                    style={{
                                        backgroundColor: data.avtarColor,
                                    }}
                                >
                                    <span className="view__initials fs-30">
                                        {getIntials(
                                            `${data?.firstName} ${data?.lastName}`
                                        )}
                                    </span>
                                </Avatar>
                            )}
                        </div>
                        <div className="letterSpacing-20 fs-18 fw-300 ">
                            {`${data?.firstName} ${data?.lastName}`}
                        </div>
                        <div className="fs-14 fw-400 ">
                            {data?.roles[0] ? data?.roles[0]?.roleName : ''}
                        </div>
                        <div className="fs-12 fw-400 emailId">
                            {data?.email}
                        </div>
                        <div className="fs-12 fw-400 mobileNumber">
                            {data?.mobileNo}
                        </div>
                    </div>
                </div>
                <div className="viewUser__details">
                    <div className="viewUser__details__content">
                        <div className="item_firstrow">
                            <div className="item">
                                <div>{t("users.userDetails.role")}</div>
                                <div>
                                    {data?.roles[0]
                                        ? data?.roles[0]?.roleName
                                        : ''}
                                </div>
                            </div>
                            <div className="item">
                                <div className="fs-12 fw-500">{t("users.userDetails.language")}</div>
                                <div className="fs-14 fw-400">
                                    {data?.language?.languageName}
                                </div>
                            </div>
                            <div className="item">
                                <div className="fs-12 fw-500">{t("users.userDetails.reportingTo")}</div>
                                <div className="fs-14 fw-400">
                                    {data?.reportingTo}
                                </div>
                            </div>
                        </div>
                        <div className="item_secondrow">
                            <div className="item">
                                <div className="fs-12 fw-500 mt-20">
                                {t("users.userDetails.timeZone")}
                                </div>
                                <div className="fs-14 fw-400">
                                    {data?.timeZone?.timeZone}
                                </div>
                            </div>
                            <div className="item">
                                <div className="fs-12 fw-500 mt-20">{t("users.userDetails.languageOptions")}</div>
                                <div className="fs-14 fw-400">
                                    {data?.metrics?.metricSystem}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewUser;
