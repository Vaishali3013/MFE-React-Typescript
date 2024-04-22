import { Col, Row, Select } from 'antd';
import '../index.scss';
import { SelectProps } from 'types/interfaces/PropsInterfaces/calendarConfig';

const SelectInput: any = ({ defaultValue, options, label }: SelectProps): any => {
    return (
    <Col span={8}>
        <Row>
            <Col span={24}>
                <label>{label}</label>
            </Col>
            <Col span={24}>
                <Select
                className='selecteDays'
                    defaultValue={defaultValue}
                    onChange={() => {}}
                    options={
                        options
                    }
                />
            </Col>
        </Row>
        </Col>
    );
};

export default SelectInput;
