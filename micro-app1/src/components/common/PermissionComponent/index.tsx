import React, { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { type resourceName } from 'types/enums';
import { getObjectByResourceName } from 'utils/rbacFunction';

const PermissionComponent: React.FC<{
    children: ReactNode;
    screenName: resourceName;
}> = ({ children, screenName }) => {
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserBlaPermission = getObjectByResourceName(
        screenName,
        loggedInUserPermissionData
    );

    return (
        <div>
            {loggedInUserBlaPermission?.permission?.length ||
            loggedInUserDetails?.admin ? (
                <div> {children}</div>
            ) : (
                <h1 className="read-permission">
                    You are not permitted to access this!
                </h1>
            )}
        </div>
    );
};

export default PermissionComponent;
