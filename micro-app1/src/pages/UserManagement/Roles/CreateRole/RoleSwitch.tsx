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
  key
}) => {
  return (
    <div className="rolesWrapper__createRolesTableHeader">
      <Text
        className={
          switchBoolean
            ? 'rolesWrapper__createRolesTypographySwitch'
            : 'rolesWrapper__createRolesTypography'
        }
        type={types}
        strong
      >
        {text}
      </Text>
      {switchBoolean && (
        <div className="rolesWrapper__createRolesSwitch">
          <Switch
            key={key}
            size={'small'}
            checked={checked}
            onChange={(e) => onChangeFunction(e)}
          />
        </div>
      )}
    </div>
  );
};

export default RoleSwitch;
