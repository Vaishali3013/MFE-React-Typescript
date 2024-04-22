import React from 'react';
import { Input, Typography } from 'antd';
import './index.scss';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

const CreateRoleStep3: React.FC<any> = ({
    setNameState,
    setDescriptionState,
}) => {
    const { t } = useTranslation('translation');
    return (
        <div className="createRolesWrapper__createRoleContent3">
            <div className="createRolesWrapper__createRoleInnerContent">
                <Text
                    type="secondary"
                    strong
                    className="createRolesWrapper__createRoleInnerContentText"
                >
                    <span className="mandatoryClass">*</span>
                    {t('roles.enterRoleName')}
                </Text>
                <Input
                    placeholder={t('commonStr.name')}
                    onChange={(e) => {
                        setNameState(e.target.value);
                    }}
                />
            </div>
            <div className="createRolesWrapper__createRoleInnerContent">
                <Text
                    type="secondary"
                    strong
                    className="createRolesWrapper__createRoleInnerContentText"
                >
                    {t('roles.descpRole')}
                </Text>
                <TextArea
                    rows={4}
                    placeholder={t('roles.description')}
                    onChange={(e) => {
                        setDescriptionState(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default CreateRoleStep3;
