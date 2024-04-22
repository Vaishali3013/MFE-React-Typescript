import React from 'react';
import { List, Radio, type RadioChangeEvent } from 'antd';
import './index.scss';
import { reasonCodeLanguage } from 'types/enums';
import { reasonCodeMarathiLanguage } from 'types/enums/reasonCodeMarathiLanguage';

const ReasonCodeModal: React.FC<any> = ({
    setReasonCodeId,
    reasonCodeData,
    reasonCodeId,
    modalLanguageState,
    setModalLanguageState,
}) => {
    const onChange = (e: RadioChangeEvent): void => {
        setReasonCodeId(e.target.value);
    };

    const modalHeader = (
        <div className="reasonCodeModal__body__header fs-20 fw-500">
            <div>
                {modalLanguageState === reasonCodeLanguage.MARATHI
                    ? reasonCodeMarathiLanguage?.assignReasonCode?.marathiName
                    : reasonCodeMarathiLanguage?.assignReasonCode?.name}
            </div>
            <div>
                <Radio.Group
                    value={modalLanguageState}
                    onChange={(e: any) => {
                        setModalLanguageState(e.target.value);
                    }}
                >
                    <Radio.Button value={reasonCodeLanguage.MARATHI}>
                        {reasonCodeLanguage.MARATHI}
                    </Radio.Button>
                    <Radio.Button value={reasonCodeLanguage.ENGLISH}>
                        {reasonCodeLanguage.ENGLISH}
                    </Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );

    return (
        <>
            <div className="customModal__body">
                {modalHeader}
                <div className="resonCodeModalContent">
                    <Radio.Group
                        onChange={(e) => {
                            onChange(e);
                        }}
                        value={reasonCodeId}
                        className="resonCodeModalContent__content"
                    >
                        {reasonCodeData && reasonCodeData.length > 0 && (
                            <div className="resonCodeModalUnplannedContent">
                                <List
                                    dataSource={reasonCodeData}
                                    renderItem={(item: any) => (
                                        <List.Item key={item.reasonCodeId}>
                                            <Radio
                                                className="resonCodeModalPlannedContentList"
                                                id={item.reasonCodeId}
                                                value={item.reasonCodeId}
                                            >
                                                <div className="resonCodeModalPlannedContentList__text">
                                                    {modalLanguageState ===
                                                    reasonCodeLanguage.MARATHI
                                                        ? item?.marathiName
                                                        : item?.name}
                                                </div>
                                            </Radio>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        )}
                    </Radio.Group>
                </div>
            </div>
        </>
    );
};

export default ReasonCodeModal;
