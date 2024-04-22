import { Popover } from 'antd';
import { useState } from 'react';
import { deviceManagement } from 'types/enums';

const PopOverComponent: React.FC<any> = ({ text, record }) => {
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };
    return (
        <>
            <div>
                {text?.length < deviceManagement.blaNameLength ? (
                    text
                ) : (
                    <Popover
                        overlayClassName="customOverlay"
                        content={<div className="blaName">{text}</div>}
                        visible={isPopoverVisibles[record?.key]}
                        onVisibleChange={handlePopoverVisibleChanges}
                        placement="topLeft"
                    >
                        {text?.length > deviceManagement.blaNameLength
                            ? `${text?.slice(
                                  0,
                                  deviceManagement.blaNameLength
                              )}...`
                            : text}
                    </Popover>
                )}
            </div>
        </>
    );
};
export default PopOverComponent;
