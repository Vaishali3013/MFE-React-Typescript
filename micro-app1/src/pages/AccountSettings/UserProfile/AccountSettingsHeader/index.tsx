import React from 'react';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { useTranslation } from 'react-i18next';
const AccountSettingsHeader: React.FC = () => {
    const { t } = useTranslation('translation');
    return (
        <div className="accountSettingsHeader">
            <div className="accountSettingsHeader__child">
                <ScreenNameHeading
                    heading={t('accountSettings.accountSettings')}
                    subHeading={t('accountSettings.personalInfoManage')}
                />
            </div>
        </div>
    );
};

export default AccountSettingsHeader;
