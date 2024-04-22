import { Input, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import type { InputRef } from 'antd';

import {
  type CustomDropDownValueOptions,
  type CustomDropDownValueProps
} from 'types/interfaces/PropsInterfaces';
import { EMPTY } from 'types/enums';

const CustomDropDownValues: React.FC<CustomDropDownValueProps> = ({
  optionsData,
  searchbar,
  name,

  onChange,
  selectedValue
}) => {
  const { Search } = Input;

  const [searchVal, setSearchVal] = useState<string>(EMPTY.string);

  const [filteredData, setFilteredData] = useState(optionsData);
  const [dropdownValue, setDropdownValue] = useState(selectedValue);

  const inputRef = useRef<InputRef>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setSearchVal(val);
    const filteredArray = optionsData.filter((ele) =>
      ele.name.toLowerCase().includes(val)
    );
    setFilteredData(filteredArray);
  };
  useEffect(() => {
    setFilteredData(optionsData);
  }, []);
  const handleChange = (value: any, name: any): any => {
    onChange(name, value);
    setDropdownValue(value);
  };

  return (
    <div className="customDropDownValues">
      <Select
        placeholder=""
        value={dropdownValue}
        defaultValue={dropdownValue}
        onChange={handleChange}
        dropdownRender={(menu) => (
          <>
            {searchbar && (
              <>
                <Search
                  className="customDropDownValues__searchbar"
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={searchVal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSearch(e);
                  }}
                />
                <div className="customDropDownValues__empty"></div>
              </>
            )}

            {menu}
          </>
        )}
        options={filteredData?.map((item: CustomDropDownValueOptions) => ({
          label: item.name,
          value: item.id,

          name: name
        }))}
      />
    </div>
  );
};

export default CustomDropDownValues;
