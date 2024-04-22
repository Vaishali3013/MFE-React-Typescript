import { Select } from 'antd';
import React from 'react';
import './index.scss';
import {
  type CustomDropDownOptions,
  type CustomDropDownProps
} from 'types/interfaces/PropsInterfaces';

const CustomDropDown: React.FC<CustomDropDownProps> = ({ optionsData, placeholder ,selcetHandler, disabled, value }) => {
  const { Option } = Select;
  const handleChange = (value: string): any => {
    if(selcetHandler)selcetHandler(value)
  };
  return (
    <div className="customDropDown">
      <Select placeholder={placeholder} onChange={handleChange} disabled={disabled} value={value === '' ? null : value}>
        {optionsData?.map((item: CustomDropDownOptions, index: number) => {
          return (
            <>
              <Option
                value={item.value}
                clasName="customDropDown__options"
                key={item.value}
              >
                {item.icon}
                <span key={item.value}>{item.label}</span>
              </Option>
            </>
          );
        })}
      </Select>
    </div>
  );
};

export default CustomDropDown;
