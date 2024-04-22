import React, { useState } from 'react';
import './index.scss';
import { type MoreContentProps } from 'types/interfaces/PropsInterfaces';

import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';

import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';

const MoreContent: React.FC<MoreContentProps> = ({
  options,
  setEditDrawer
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

  const onOkHandler = (): any => {
    modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
    okHandle(isModalOpen, setIsModalOpen);
  };
  const onClickHandler = (): any => {
    setEditDrawer(true);
  };

  return (
    <>
      <ul>
        {options &&
          options.length > 0 &&
          options.map((item: any) => (
            <li key={item.title} className="moreContent_items">
              <a
                className="link"
                onClick={() => {
                  item.title === 'Edit' && onClickHandler();
                }}
              >
                <span className="moreContentIcon">{item.icon}</span>
                {item.title}
              </a>
            </li>
          ))}
      </ul>

      <ConfirmationModal
        open={isModalOpen}
        onOk={() => onOkHandler()}
        onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
        text="Are you sure you want to deactive the Group?"
      />
      <SuccessfulModal
        open={activeSuccessModalOpen}
        onOk={() => onOkHandler()}
        onCancel={() =>
          cancelHandle(activeSuccessModalOpen, setActiveSuccessModalOpen)
        }
        text="Group Deactivated Successfully!"
      />
    </>
  );
};

export default MoreContent;
