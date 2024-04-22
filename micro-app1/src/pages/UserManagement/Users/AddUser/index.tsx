import React, { type ReactNode, useState } from 'react';
import './index.scss';
import UserCreationType from './userCreationType';
import InviteUser from './inviteUser';
import { type UserCreationProps } from 'types/interfaces/PropsInterfaces/UserManagement/usersPropsInterfaces';
import AddUserManually from './addUserManually';

const UserCreation: React.FC<UserCreationProps> = ({
    onCancelhandler,
    setUserTypeValue,
    userTypeValue,
    onOk,
    paginationPayload,
    setadduserTypeValue,
}) => {
    const [nextClick, setNextClicked] = useState<number>(0);
    const [inviteValue, setInviteValue] = useState<string[]>([]);

    const handleNextClick = (): void => {
        setNextClicked(nextClick + 1);
        setadduserTypeValue(true);
    };

    const handleBackClick = (): void => {
        setNextClicked(nextClick - 1);
    };

    let component: ReactNode = (
        <UserCreationType
            setUserTypeValue={setUserTypeValue}
            userTypeValue={userTypeValue}
            handleNextClick={handleNextClick}
            handleCancle={() => onCancelhandler()}
        />
    );
    if (userTypeValue === 1) {
        switch (nextClick) {
            case 1:
                component = (
                    <InviteUser
                        setInviteValue={setInviteValue}
                        inviteValue={inviteValue}
                        handleBackClick={handleBackClick}
                    />
                );
                break;
            default:
                component = (
                    <UserCreationType
                        setUserTypeValue={setUserTypeValue}
                        userTypeValue={userTypeValue}
                        handleNextClick={handleNextClick}
                        handleCancle={() => onCancelhandler()}
                    />
                );
                break;
        }
    } else if (userTypeValue === 2) {
        switch (nextClick) {
            case 1:
                component = (
                    <AddUserManually
                    setadduserTypeValue={setadduserTypeValue}
                        handleCancle={() => {
                            setadduserTypeValue(false);
                            onCancelhandler();
                        }}
                        onOk={() => onOk()}
                        paginationPayload={paginationPayload}
                    />
                );
                break;
            default:
                component = (
                    <UserCreationType
                        setUserTypeValue={setUserTypeValue}
                        userTypeValue={userTypeValue}
                        handleNextClick={handleNextClick}
                        handleCancle={() => onCancelhandler()}
                    />
                );
                break;
        }
    }

    return <div className="userCreationTypeWrapper">{component}</div>;
};

export default UserCreation;
