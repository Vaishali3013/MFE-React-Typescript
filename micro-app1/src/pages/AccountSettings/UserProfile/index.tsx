import React, { useEffect, useState } from 'react';
import './index.scss';
import TabsComponent from 'components/common/TabsComponent';
import MyProfileComponent from './MyProfileComponent';
import AccountSettingsHeader from './AccountSettingsHeader';
import MySecurityAndPassword from './MySecurityAndPassword';
import { useDispatch, useSelector } from 'react-redux';
import {
    getLoggedInUserDetails,
    getUserPreferences,
} from 'redux/actions/UserManagementActions/usersAction';
import MyPreferencesComponent from './MyPreferencesComponent';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useNavigate, useParams } from 'react-router-dom';

const AccountSettings: React.FC<{ activate: any }> = ({ activate }) => {
    const dispatch = useDispatch();
    const { currentTab = 'user-profile' } = useParams();
    const navigate = useNavigate();
    const loggedInUserDetails: any = useSelector(
        (state: any) => state.userManagement.users.loggedInUserDetails
    );

    const [activeTabKey, setActiveTabKey] = useState(currentTab);

    useEffect(() => {
        navigate(`/account-settings/${activeTabKey}`, { replace: true });
    }, [activeTabKey]);

    useEffect(() => {
        setActiveTabKey(currentTab);
    }, [currentTab]);

    const [userDetailValues, setUserDetailValues] =
        useState(loggedInUserDetails);
    const tabItems = [
        {
            key: 'user-profile',
            label: `My Profile`,
            children: <MyProfileComponent userDetails={userDetailValues} />,
        },
        {
            key: 'user-preferences',
            label: `Preferences`,
            children: <MyPreferencesComponent />,
        },
        {
            key: 'change-password',
            label: `Security & Password`,
            children: <MySecurityAndPassword />,
        },
    ];
    const user = parseJwt();
    useEffect(() => {
        dispatch(getLoggedInUserDetails(user.UserId));
        dispatch(getUserPreferences());
    }, []);
    useEffect(() => {
        setUserDetailValues(loggedInUserDetails);
    }, [loggedInUserDetails]);

    return (
        <div className="userProfile">
            <AccountSettingsHeader />
            <div className="userProfile__tabsComponent">
                <TabsComponent
                    tabItem={tabItems}
                    setTabKey={activeTabKey}
                    setActiveTabKey={setActiveTabKey}
                    activeTabKey={activeTabKey}
                />
            </div>
        </div>
    );
};

export default AccountSettings;
