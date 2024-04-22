import React from 'react';
import { Input, Typography } from 'antd';
import './index.scss';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const CreateTimeCapsuleStep1: React.FC<any> = ({
    setNameState,
    setDescriptionState,
}) => {
    const { t } = useTranslation('translation');
    const { timeCapsuleUpdatedName, timeCapsuleUpdatedDescription } =
        useSelector((state: any) => state?.configure?.timeCapsule);
    return (
        <div className="createCapsuleWrapper__createRoleContent3">
            <div className="createCapsuleWrapper__createRoleInnerContent">
                <Text
                    type="secondary"
                    strong
                    className="createCapsuleWrapper__createRoleInnerContentText"
                >
                    <span className="mandatoryClass">*</span>{t('timeCapsuleDefinition.createTimeCapsule.name')}
                </Text>
                <Input
                    className="createCapsuleWrapper__createRoleInnerContentInput"
                    defaultValue={timeCapsuleUpdatedName || ''}
                    placeholder={t('timeCapsuleDefinition.createTimeCapsule.namePlaceHolder')}
                    onChange={(e) => {
                        setNameState(e.target.value);
                    }}
                    maxLength={100}
                />
            </div>
            <div className="createCapsuleWrapper__createRoleInnerContent">
                <Text
                    type="secondary"
                    strong
                    className="createCapsuleWrapper__createRoleInnerContentText"
                >
                   {t('timeCapsuleDefinition.createTimeCapsule.description')}
                </Text>
                <TextArea
                    className="createCapsuleWrapper__createRoleInnerContentInput"
                    defaultValue={timeCapsuleUpdatedDescription || ''}
                    rows={4}
                    placeholder= {t('timeCapsuleDefinition.createTimeCapsule.descriptionPlaceHolder')}
                    onChange={(e) => {
                        setDescriptionState(e.target.value);
                    }}
                    maxLength={200}
                />
            </div>
        </div>
    );
};

export default CreateTimeCapsuleStep1;
