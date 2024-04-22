import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import './index.scss';
import { ReactComponent as Correct } from 'assets/icons/correct.svg';
import { ReactComponent as Remove } from 'assets/icons/remove.svg';
import { ReactComponent as InfoCircle } from 'assets/icons/infoCircle.svg';
import { type CustomToolTipProps } from 'types/interfaces/PropsInterfaces';

export const CustomTooltip: React.FC<CustomToolTipProps> = ({
  open,
  validations
}) => {
  const ruleSet = [
    {
      icon: <Correct />,
      text: ' At least 6 characters',
      key: 'length'
    },
    {
      icon: <Remove />,
      text: ' Lower case (a-z)',
      key: 'lowercase'
    },
    {
      icon: <Correct />,
      text: ' Upper case (A-Z)',
      key: 'uppercase'
    },
    {
      icon: <Remove />,
      text: ' Number (0-9)',
      key: 'number'
    },
    {
      icon: <Correct />,
      text: ' Special character (i.e. @,#)',
      key: 'specialChar'
    }
  ];
  const [rules, setrules] = useState([]);

  useEffect(() => {
    const rulesevaluate = [] as any;
    ruleSet.map((items, key) => {
      rulesevaluate.push(
        <li key={key}>
          {validations[items.key] ? <Correct /> : <Remove />}
          {items.text}
        </li>
      );
    });
    setrules(rulesevaluate);
  }, [validations]);

  const text = (
    <>
      <p className="mb-10">Password must have</p>
      <ul className="tooltip">{rules}</ul>
    </>
  );

  return (
    <Tooltip title={text} placement="top" open={open}>
      <span className="tooltip-circleinfo">
        <InfoCircle />
      </span>
    </Tooltip>
  );
};
export default CustomTooltip;
