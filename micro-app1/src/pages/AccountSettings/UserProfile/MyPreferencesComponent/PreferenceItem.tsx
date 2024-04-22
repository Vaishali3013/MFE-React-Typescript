import { Form } from 'antd';
import CustomDropDownValues from 'components/common/customDropDownValues';
import React from 'react';
import { type PreferenceItemProps } from 'types/interfaces/PropsInterfaces';

const PreferenceItem: React.FC<PreferenceItemProps> = ({
  labelValue,
  editInfo,
  nameValue,
  onChange,
  optionsDataVal,
  showSearchbar,
  value
}) => {
  return (
    <Form.Item name="" label={<span>{labelValue}</span>}>
      {!editInfo ? (
        <span>{value}</span>
      ) : (
        <CustomDropDownValues
          name={nameValue}
          selectedValue={value}
          onChange={onChange}
          optionsData={optionsDataVal}
          searchbar={showSearchbar}
        />
      )}
    </Form.Item>
  );
};

export default PreferenceItem;
