import React from 'react';
import { Col, Row } from 'antd';
import './index.scss';
import {
    type ProgressProps,
    type CreateRoleCountProps,
} from 'types/interfaces/PropsInterfaces';
import { screenName } from 'types/enums';

const RoleProgress: React.FC<CreateRoleCountProps> = ({ count, screen }) => {
    const ItemProgress: React.FC<ProgressProps> = ({ state }) => {
        return (
            <>
                {state === 'active' ? (
                    <div className="itemProgress--active"></div>
                ) : state === 'completed' ? (
                    <div className="itemProgress--completed"></div>
                ) : (
                    <div className="itemProgress"></div>
                )}
            </>
        );
    };
    const getStepperText = (): string => {
        if (screen === screenName.deviceManagementDevices) {
            if (count === 1) {
                return 'Select BLA';
            } else if (count === 2) {
                return 'Select New Device';
            } else if (count === 3) {
                return 'Add Tags';
            }
        }
        if (screen === screenName.userManagementRoles) {
            if (count === 1) {
                return 'Define Permissions';
            } else if (count === 2) {
                return 'Add Users';
            } else if (count === 3) {
                return 'Add Role Name';
            }
        }
        return '';
        
    };
    return (
        <>
            <Row className="progressBar text-center">
                <Col span={6} className="progressBar__stepCount">
                    <span className="fs-14">{'Step'}</span>
                    <div className="progressBar__stepCountValue">
                        <span className="fs-14">
                            {count} {'of 3'}
                        </span>
                    </div>
                </Col>
                <Col span={12} className="progressBar__stepper">
                    <span className="fs-12">{getStepperText()}</span>
                    <div className="progressBar__stepCountValue">
                        <div className="progressBar__progressWrapper">
                            <ItemProgress
                                state={count === 1 ? 'active' : 'completed'}
                            />
                            <ItemProgress
                                state={
                                    count === 2
                                        ? 'active'
                                        : count === 3
                                        ? 'completed'
                                        : ''
                                }
                            />
                            <ItemProgress state={count === 3 ? 'active' : ''} />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default RoleProgress;
