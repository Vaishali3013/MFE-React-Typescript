import React from 'react';
import { Col, Row } from 'antd';
import './index.scss';
import {
    type ProgressProps,
    type CreateRoleCountProps,
} from 'types/interfaces/PropsInterfaces';
import { screenName } from 'types/enums';
import { ReactComponent as TimeCapsuleStepper } from 'assets/icons/TimeCapsuleStepperIcon.svg';
import { useTranslation } from 'react-i18next';

const TimeCapsuleProgress: React.FC<CreateRoleCountProps> = ({
    count,
    screen,
}) => {
    const ItemProgress: React.FC<ProgressProps> = ({ state }) => {
        return (
            <>
                {state === 'active' ? (
                    <div className="stepperProgress--active">
                        <div className="stepperProgress--activeDot"></div>
                    </div>
                ) : state === 'completed' ? (
                    <div className="stepperProgress--completed">
                        <TimeCapsuleStepper />
                    </div>
                ) : (
                    <div className="stepperProgress"></div>
                )}
            </>
        );
    };

    const getStepperText = (): any => {
        const { t } = useTranslation('translation');
        if (screen === screenName.timeCapsule) {
            if (count === 1) {
                return t(
                    'timeCapsuleDefinition.createTimeCapsule.addBasicDetails'
                );
            } else if (count === 2) {
                return t(
                    'timeCapsuleDefinition.createTimeCapsule.assignAttribute'
                );
            }
        }
        if (screen === screenName.kpi) {
            if (count === 1) {
                return t('kpiDefinition.createKpi.addBasicDetails');
            } else if (count === 2) {
                return t('kpiDefinition.createKpi.validateFormula');
            }
        }
        return '';
    };

    return (
        <>
            <Row className="stepperBar text-center">
                <Col span={6} className="stepperBar__stepCount">
                    <span className="fs-14">{'Step'}</span>
                    <div className="stepperBar__stepCountValue">
                        <span className="fs-14">
                            {count} {'of 2'}
                        </span>
                    </div>
                </Col>
                <Col span={12} className="stepperBar__stepper">
                    <span className="fs-12">{getStepperText()}</span>
                    <div className="stepperBar__stepCountValue">
                        <div className="stepperBar__progressWrapper">
                            <ItemProgress
                                state={count === 1 ? 'active' : 'completed'}
                            />
                            <div className="stepperBar__line"></div>
                            <ItemProgress state={count === 2 ? 'active' : ''} />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TimeCapsuleProgress;
