import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import './index.scss';
import { type ParentChildActivationModalProps } from 'types/interfaces/PropsInterfaces';
import TagsUnderDeviceTable from 'pages/DeviceManagement/Tags/TagsUnderADeviceTable';
import { ReactComponent as SearchIcon } from 'assets/icons/searchIcon.svg';

const ParentChildActivationModal: React.FC<ParentChildActivationModalProps> = ({
    open,
    onCancel,
    onOk,
    text,
    icon,
    customClassName,
    buttonText,
    counterText,
    okButtonProp,
    selectUnselectText,
    record,
    tagsIds,
    setTagIds,
    setTagsListLength,
}) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const selectClickHandler = (): any => {
        if (tagsIds?.length === tagsList?.length) {
            setSelectedIds([]);
        } else if (tagsIds?.length !== tagsList?.length) {
            const selectedTagIds = tagsList.map(
                (item: any) => item?.timeSeriesId
            );
            setSelectedIds(selectedTagIds);
        }
    };

    return (
        <>
            <Modal
                centered
                open={open}
                destroyOnClose={true}
                onOk={() => onOk()}
                onCancel={() => onCancel()}
                okText={'Activate'}
                className={customClassName ?? `parentChildActivationModal`}
                okButtonProps={okButtonProp}
            >
                <div className="modalheader">
                    {icon}
                    <span className="modalText">{text}</span>
                    <Input
                        className="modalSearch"
                        placeholder="Search Tags"
                        prefix={<SearchIcon />}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                </div>
                {tagsIds?.length > 0 && (
                    <div className="modalDivider">
                        <div className="modalDividerText">
                            <span className="modalCounterText">
                                {counterText}
                            </span>
                            <span onClick={() => selectClickHandler()}>
                                {selectUnselectText}
                            </span>
                        </div>
                    </div>
                )}

                <div className="modalTable">
                    <TagsUnderDeviceTable
                        deviceId={record?.deviceId}
                        tagsIds={tagsIds}
                        setTagIds={setTagIds}
                        setTagsListLength={setTagsListLength}
                        tagsDetail={setTagsList}
                        searchQuery={searchQuery}
                        selectedTagsIds={selectedIds}
                        setSelectedTagsIds={setSelectedIds}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ParentChildActivationModal;
