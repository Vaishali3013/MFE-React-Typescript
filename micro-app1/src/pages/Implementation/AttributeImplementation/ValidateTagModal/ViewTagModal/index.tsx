import React from 'react';
import { Modal, Divider, Button } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';
interface viewTagModalProps {
    open: boolean; // Define the 'open' prop as a boolean
    onCancel: Function;
    customClassName: string;
    attributeRecord: any;
    onEdit: Function;
}
const ViewTagModal: React.FC<viewTagModalProps> = ({
    open,
    onCancel,
    customClassName,
    attributeRecord,
    onEdit,
}) => {
    const { t } = useTranslation('translation');
    const listItemsData = [
        {
            key: t('implementation.attribute.asset'),
            value: attributeRecord?.attributeValueResponse?.assetName,
        },
        {
            key: t('commonStr.tagId'),
            value: attributeRecord?.attributeValueResponse?.value,
        },
        {
            key: t('commonStr.tagname'),
            value: attributeRecord?.attributeValueResponse?.tagName,
        },
        {
            key: t('implementation.attribute.unit'),
            value: attributeRecord?.attributeValueResponse?.unit,
        },
    ];

    const listitems = listItemsData.map((item, index): any => {
        return (
            <li
                className={
                    index === listItemsData.length - 1
                        ? 'withoutBorderLi'
                        : 'withBorderLi'
                }
                key={item?.key}
            >
                <span className="key">{item?.key} </span>
                <span className="semicolon">:</span>

                <span className="value">{item?.value}</span>
            </li>
        );
    });

    return (
        <>
            <Modal
                className="tagModal"
                open={open}
                onCancel={() => onCancel()}
                footer={null}
            >
                <div>
                    <div className="tagValue__title">
                        <div>
                            <span className="fs-16 fs-500">
                                {t('implementation.attribute.viewTag')} -{' '}
                            </span>
                            <span className="fs-16 fs-400">
                                {attributeRecord?.name}
                            </span>
                        </div>
                        <Button className="editButton" onClick={() => onEdit()}>
                            Edit
                        </Button>
                    </div>

                    <Divider />
                    <div className="content">
                        <ul>{listitems}</ul>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ViewTagModal;