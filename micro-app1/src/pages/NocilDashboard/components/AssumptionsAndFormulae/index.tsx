// AssumptionsAndFormulae.tsx
import React, { useEffect, useState } from 'react';
import './index.scss';
import { type AssumptionsAndFormulaeProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Input, Row } from 'antd';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import { SearchOutlined } from '@ant-design/icons';
import {
    AntTable,
    data,
} from 'pages/CalenderConfigurator/CalendarConfigTable/Common/Table/AntTable';
import { searchFilterAssumptionsAndFormulae } from 'utils/commonFunction';
import CustomHeader from 'components/common/CustomHeader';
import { useNavigate } from 'react-router-dom';

const AssumptionsAndFormulae: React.FC<AssumptionsAndFormulaeProps> = ({
    assumptions,
    formulae,
}) => {
    const [tableData, setTableData] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleCloseAssumptionAndFormula = (): any => {
        navigate('/nocil/nocil-dashboard');
    };
    useEffect(() => {
        searchFilterAssumptionsAndFormulae(data, searchValue, setTableData);
    }, [searchValue, data]);

    return (
        <div>
            <CustomHeader
                heading="30 TPH Boiler 2 - Dashboard"
                currentTimePicker={true}
                customDateTimePicker={true}
                infoTooltip={true}
            />
            <div className="assumptionsAndFormulaeWrapperScrolContent">
                <div className="assumptionsAndFormulaeWrapper">
                    <Card
                        bordered={false}
                        className="assumptionsAndFormulaeWrapper__cardContent"
                    >
                        <div className="assumptionsAndFormulaeWrapper__cardBody">
                            <Row className="nocilWrapper-row" gutter={[16, 16]}>
                                <Col span={22}>
                                    <div className="title">
                                        <div className="heading fs-20 fw-500">
                                            Assumptions
                                        </div>
                                    </div>
                                </Col>
                                <Col span={2}>
                                    <div
                                        onClick={
                                            handleCloseAssumptionAndFormula
                                        }
                                        className="closeIcon"
                                    >
                                        <CloseIcon />
                                    </div>
                                </Col>
                            </Row>
                            <div className="assumptionParent">
                                <div className="desc">
                                    <span className="des">
                                        The Direct Boiler Efficiency calculation
                                        is using a manually entered parameter
                                        named as “Coal GCV” which is entered
                                        through the manual entry page for the
                                        calculation.
                                    </span>
                                </div>
                                <div className="desc">
                                    <span className="des">
                                        The Unburnt Carbon Loss calculation is
                                        using a manually entered parameter named
                                        as “Unburnt Carbon Loss” which is
                                        entered through the manual entry page
                                        for the calculation.
                                    </span>
                                </div>
                            </div>
                            <Row gutter={[16, 16]}>
                                <Col span={18} className="formula">
                                    <div className="heading fs-20 fw-500">
                                        Formulas
                                    </div>
                                </Col>
                                <Col span={6} className="formula">
                                    <div className="filter-navigator">
                                        <Input
                                            className="filter-search"
                                            prefix={<SearchOutlined />}
                                            placeholder="Search KPI Name"
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                            }}
                                            value={searchValue}
                                            suffix={
                                                searchValue && (
                                                    <span
                                                        className="reset-button"
                                                        onClick={() => {
                                                            setSearchValue('');
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </span>
                                                )
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col span={24} className="table">
                                    <div className="headi">
                                        <AntTable tableData={tableData} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssumptionsAndFormulae;
