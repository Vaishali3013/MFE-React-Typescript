import { Button } from 'antd';
import './index.scss';
import { ReactComponent as AddIcon } from 'assets/icons/addIcon.svg';
import { ReactComponent as EditIcon } from 'assets/icons/editIcon.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dotsIcon.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/download_black.svg';

import { type customButtonProps } from 'types/interfaces/PropsInterfaces';
import { BUTTONTYPE, EMPTY } from 'types/enums';
import { type ReactNode } from 'react';

const CustomButton: React.FC<customButtonProps> = ({
    type,
    disabled,
    handleClick,
    typeOfButton,
}) => {
    let icon: ReactNode = <AddIcon />;
    switch (type) {
        case BUTTONTYPE.submit:
            icon = null;
            break;
        case BUTTONTYPE.finish:
            icon = null;
            break;
        case BUTTONTYPE.back:
            icon = null;
            break;
        case BUTTONTYPE.cancel:
            icon = null;
            break;
        case BUTTONTYPE.delete:
            icon = null;
            break;
        case BUTTONTYPE.save:
            icon = null;
            break;
        case BUTTONTYPE.edit:
            icon = <EditIcon />;
            break;
        case BUTTONTYPE.close:
            icon = null;
            break;
        case BUTTONTYPE.next:
            icon = null;
            break;
        case BUTTONTYPE.yes:
            icon = null;
            break;
        case BUTTONTYPE.signIn:
            icon = null;
            break;
        case BUTTONTYPE.createGroup:
            icon = <AddIcon />;
            break;
        case BUTTONTYPE.send:
            icon = <DotsIcon />;
            break;
        case BUTTONTYPE.addUsers:
            icon = <AddIcon />;
            break;
        case BUTTONTYPE.addUser:
            icon = null;
            break;
        case BUTTONTYPE.resetPassword:
            icon = null;
            break;
        case BUTTONTYPE.sendRecoveryMail:
            icon = null;
            break;
        case BUTTONTYPE.activateAll:
            icon = null;
            break;
        case BUTTONTYPE.deactivateAll:
            icon = null;
            break;
        case BUTTONTYPE.createNewPassword:
            icon = null;
            break;
        case BUTTONTYPE.sendInvitation:
            icon = null;
            break;
        case BUTTONTYPE.otp:
            icon = null;
            break;
        case BUTTONTYPE.apply:
            icon = null;
            break;
        case BUTTONTYPE.downloadAsCSV:
            icon = <DownloadIcon />;
            break;
        case BUTTONTYPE.addNew:
            icon = null;
            break;
        case BUTTONTYPE.sendLink:
            icon = null;
            break;
        case BUTTONTYPE.validate:
            icon = null;
            break;
        case BUTTONTYPE.verify:
            icon = null;
            break;
        case BUTTONTYPE.assignMore:
            icon = null;
            break;
        case BUTTONTYPE.assign:
            icon = null;
            break;
        case BUTTONTYPE.assignAttributes:
            icon = null;
            break;
        case BUTTONTYPE.assignTimeCapsules:
            icon = null;
            break;
        case BUTTONTYPE.reasonCode:
            icon = null;
            break;
        case BUTTONTYPE.marathiReasonCode:
            icon = null;
            break;
        case BUTTONTYPE.marathiSubmit:
            icon = null;
            break;
        case BUTTONTYPE.marathiBack:
            icon = null;
            break;
        default:
            break;
    }

    const customButtonClick = (): boolean => {
        if (handleClick) {
            handleClick();
        }
        return true;
    };

    return (
        <>
            <Button
                htmlType={typeOfButton}
                type="primary"
                disabled={disabled}
                icon={icon}
                className={`customButton ${`custom-${type.toLocaleLowerCase()}`} ${
                    disabled ? 'button-disabled' : EMPTY.string
                }`}
                onClick={() => customButtonClick()}
            >
                <span className="fw-400 fs-14">{type}</span>
            </Button>
        </>
    );
};

export default CustomButton;
