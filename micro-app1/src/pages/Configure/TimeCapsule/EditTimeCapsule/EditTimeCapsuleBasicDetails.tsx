import React from 'react';
import { Input, Spin, Typography } from 'antd';
import './index.scss';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const EditTimeCapsuleStep1: React.FC<any> = ({
    setNameState,
    setDescriptionState,
    setEditEnabled,
    nameState,
}) => {
    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );
    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
    );
    const { t } = useTranslation('translation');

    return (
        <>
            {timeCapsuleListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <div className="createCapsuleWrapper__createRoleContent3">
                    <div className="createCapsuleWrapper__createRoleInnerContent">
                        <Text
                            type="secondary"
                            strong
                            className="createCapsuleWrapper__createRoleInnerContentText"
                        >
                            <span className="mandatoryClass">*</span> {t('timeCapsuleDefinition.editTimeCapsule.name')}
                        </Text>
                        <Input
                            placeholder={t('timeCapsuleDefinition.editTimeCapsule.namePlaceHolder')}
                            onChange={(e) => {
                                e.target.value?.trim() === ''
                                    ? setEditEnabled(false)
                                    : setEditEnabled(true);
                                setNameState(e.target.value);
                            }}
                            defaultValue={timeCapsuleDetails?.name || ''}
                            maxLength={100}
                        />
                    </div>
                    <div className="createCapsuleWrapper__createRoleInnerContent">
                        <Text
                            type="secondary"
                            strong
                            className="createCapsuleWrapper__createRoleInnerContentText"
                        >
                            {t('timeCapsuleDefinition.editTimeCapsule.description')}
                        </Text>
                        <TextArea
                            rows={4}
                            placeholder= {t('timeCapsuleDefinition.editTimeCapsule.descriptionPlaceHolder')}
                            onChange={(e) => {
                                nameState?.trim() === ''
                                    ? setEditEnabled(false)
                                    : setEditEnabled(true);
                                setDescriptionState(e.target.value);
                            }}
                            defaultValue={timeCapsuleDetails?.description || ''}
                            maxLength={200}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTimeCapsuleStep1;
