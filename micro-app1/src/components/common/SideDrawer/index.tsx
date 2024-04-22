import { Drawer } from 'antd';
import React from 'react';
import { type SideDrawerProps } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import './index.scss';

const SideDrawer: React.FC<SideDrawerProps> = ({
  title,
  Open,
  children,
  onClose
}) => {
  return (
    <>
      <Drawer
        className="Drawer__wrapper"
        title={title}
        placement="right"
        open={Open}
        onClose={onClose}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SideDrawer;
