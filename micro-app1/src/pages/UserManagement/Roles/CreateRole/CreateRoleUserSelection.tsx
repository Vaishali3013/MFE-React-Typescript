import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './index.scss';
import { rolesUsersOptionsData } from 'json/UserManagement/roles';
import CustomDropDown from 'components/common/CustomDropDown';
import CreateRoleTable from './CreateRoleTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/actions/UserManagementActions/usersAction';
import { useTranslation } from 'react-i18next';

const CreateRoleStep2: React.FC<any> = ({ setSelectedRowData: any }) => {
    const dispatch = useDispatch();
    const [filteredUsersList, setFilteredUsersList] = useState<any>([]);
    const [searchAll, setSearchAll] = useState('');
    const { t } = useTranslation('translation');
    const usersList = useSelector(
        (state: any) => state.userManagement.users.allUsersList
    );

    function searchUserData(data: any, searchTerm: any): any {
        const search = searchTerm.toLowerCase();

        return data.filter((item: any) => {
            const firstNameMatch = item.firstName
                .toLowerCase()
                .includes(search);
            const lastNameMatch = item.lastName.toLowerCase().includes(search);
            const emailMatch = item.email.toLowerCase().includes(search);
            // Check if the firstName or email matches the search term
            return firstNameMatch || lastNameMatch || emailMatch;
        });
    }

    useEffect(() => {
        if (searchAll) {
            const items = searchUserData(usersList, searchAll);
            setFilteredUsersList(items);
        } else {
            setFilteredUsersList([...usersList]);
        }
    }, [searchAll, usersList]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <>
            <div className="createRolesWrapper__createRoleContent2">
                <Row>
                    <Col span={24} className="createRolesWrapper__header">
                        <Input
                            className="createRolesWrapper__search"
                            placeholder={t('commonStr.searchUsers')}
                            prefix={<SearchOutlined />}
                            onChange={(e) => {
                                setSearchAll(e.target.value);
                            }}
                        />

                        <CustomDropDown
                            optionsData={rolesUsersOptionsData}
                            placeholder={t('commonStr.bulkUpload')}
                        />

                        <Button
                            icon={
                                <PlusOutlined className="createRolesWrapper__buttonGroupIcon" />
                            }
                            className="createRolesWrapper__buttonGroup"
                        >
                            <span className="fw-400 fs-14">{'Add Users'}</span>
                        </Button>
                    </Col>
                </Row>
                <Row className="createRolesWrapper__createRolesList">
                    <Col span={24}>
                        <CreateRoleTable userData={filteredUsersList} />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CreateRoleStep2;
