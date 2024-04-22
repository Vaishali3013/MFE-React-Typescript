import React from 'react';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
const DashboardNavHeader: React.FC = () => {
    return (
        <div className="accountSettingsHeader">
            <div className="accountSettingsHeader__child">
                <ScreenNameHeading
                    heading="Account Settings"
                    subHeading="Manage and update personal and contact information such as name, email, phone number, and profile picture."
                />
            </div>
        </div>
    );
};

export default DashboardNavHeader;
