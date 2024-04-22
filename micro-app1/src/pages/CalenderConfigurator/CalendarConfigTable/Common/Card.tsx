import { Col, Row } from 'antd';
import '../index.scss';
import { type CardProps } from 'types/interfaces/PropsInterfaces/calendarConfig';

const Card = ({ icon, label, clickHandler, configType }: CardProps): any => {
    const cardClassName = configType.split(' ').join('');
    return (
        <div
            onClick={clickHandler}
            className={
                label === configType ? cardClassName : 'cardDefaultClass'
            }
        >
            <Row className="mainCard">
                <Col span={24}>{icon}</Col>
                <Col span={24}>{label}</Col>
            </Row>
        </div>
    );
};

export default Card;
