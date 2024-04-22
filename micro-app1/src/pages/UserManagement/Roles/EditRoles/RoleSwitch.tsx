import React from 'react';
import { Typography, Switch } from 'antd';
import './index.scss';
import type { Roleswitchprops } from 'types/interfaces/PropsInterfaces';

const { Text } = Typography;

const RoleSwitch: React.FC<Roleswitchprops> = ({
    text,
    switchBoolean,
    types,
    checked,
    onChangeFunction,
    key,
    switchDisabled,
}) => {
    return (
        <div className="editRolesWrapper__createRolesTableHeader">
            <Text
                className={
                    switchBoolean
                        ? 'editRolesWrapper__createRolesTypographySwitch'
                        : 'editRolesWrapper__createRolesTypography'
                }
                type={types}
                strong
            >
                {text}
            </Text>
            {switchBoolean && (
                <div className="editRolesWrapper__createRolesSwitch">
                    <Switch
                        key={key}
                        size={'small'}
                        checked={checked}
                        onChange={(e) => onChangeFunction(e)}
                        disabled={switchDisabled}
                    />
                </div>
            )}
        </div>
    );
};

export default RoleSwitch;
