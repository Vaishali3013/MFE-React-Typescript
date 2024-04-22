import React, { useContext, useEffect } from 'react';
import { type RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { ThemeContext } from 'components/Context/ThemeContext';
import { ReactComponent as LightTheme } from 'assets/icons/White.svg';
import { ReactComponent as DarkTheme } from 'assets/icons/Dark.svg';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from 'redux/actions/UserManagementActions/usersAction';

const AccountPreference = (): any => {
  const { theme, setTheme } = useContext(ThemeContext);
  const loggedInUserDetails: any = useSelector(
    (state: any) => state.userManagement.users.loggedInUserDetails
  );
  const dispatch = useDispatch();
  const onChange = (e: RadioChangeEvent): any => {
    setTheme(e.target.value);
  };
  useEffect(() => {
    const themePayload = {
      ...loggedInUserDetails,
      theme: { themeId: theme === 'light' ? 1 : 2 }
    };
    dispatch(updateUserDetails(themePayload));
    localStorage.setItem('default-theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedValue = localStorage.getItem('default-theme');
    if (storedValue) {
      setTheme(storedValue);
    }
  }, []);

  return (
    <div className="accountPreference">
      <Radio.Group onChange={onChange} value={theme}>
        <Radio value={'light'}>
          <div className="accountPreference__light">
            <LightTheme />
            {theme === 'light' && <div className="blue-overlay"></div>}
            <span>Light</span>
          </div>
        </Radio>
        <Radio value={'dark'} disabled>
          <div className="accountPreference__dark">
            <DarkTheme />
            {theme === 'dark' && <div className="blue-overlay"></div>}
            <span>Dark</span>
          </div>
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default AccountPreference;
