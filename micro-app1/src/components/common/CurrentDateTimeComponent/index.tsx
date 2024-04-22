import { useCurrentDateTime } from 'hooks/useCurrentDateTime';
import './index.scss';
import React from 'react';

const CurrentDateTimeComponent: React.FC = () => {
    const { formattedDate, formattedTime } = useCurrentDateTime();

    return (
        <div className="currentDateTimeComponent">
            <span className="currentDateTimeComponent__date">
                {formattedDate}
            </span>
            <span className="currentDateTimeComponent__time">
                {formattedTime}
            </span>
        </div>
    );
};

export default CurrentDateTimeComponent;
