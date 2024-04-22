import { Checkbox } from 'antd';
import React from 'react';

const CustomListItem: React.FC<any> = ({
    checked,
    checkboxChange,
    label,
    value,
    name,
    indeterminate,
    parent,
}) => {
    return (
        <div
            onClick={!parent ? checkboxChange : null}
            className="custom-listItem"
        >
            <div className="custom-listItem_label">
                <Checkbox
                    checked={checked}
                    onChange={checkboxChange}
                    name={name}
                    indeterminate={indeterminate}
                    onClick={(event:any)=>{event.stopPropagation();}}
                />

                <div className="custom-listItem__label">{label}</div>
            </div>
            {value ? (
                <div
                    className="custom-listItem__value2"
                    style={{
                        color: `${checked ? value.colorVal : '#000000'}`,
                        fontWeight: 700,
                    }}
                >
                    {value.textVal}
                </div>
            ) : null}
        </div>
    );
};

export default CustomListItem;
