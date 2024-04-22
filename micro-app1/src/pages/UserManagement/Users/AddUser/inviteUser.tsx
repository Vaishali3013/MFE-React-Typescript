import React from 'react';
import { Select } from 'antd';
import { type InviteUserProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import CustomButton from 'components/common/CustomButton';
import { useTranslation } from "react-i18next";


const InviteUser: React.FC<InviteUserProps> = ({
  setInviteValue,
  inviteValue,
  handleBackClick
}) => {
  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' }
  ];

  const handleChange = (value: string | string[]): void => {
    setInviteValue(value);
  };
  const { t } = useTranslation('translations');

  return (
    <>
      <div className="inviteUser fw-400 fs-12">
        <span className="fs-14">
          {t("users.inviteUser.inviteUserDesp")}
        </span>
        <Select
          mode="tags"
          placeholder="Please select"
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className="userCreationTypeWrapper__footerWrapper">
        <div className="userCreationTypeWrapper__footerContent">
          <CustomButton
            type={t("commonStr.back")}
            disabled={false}
            handleClick={handleBackClick}
          />
          <CustomButton
            type="Send Invitation"
            disabled={inviteValue.length === 0}
          />
        </div>
      </div>
    </>
  );
};

export default InviteUser;
