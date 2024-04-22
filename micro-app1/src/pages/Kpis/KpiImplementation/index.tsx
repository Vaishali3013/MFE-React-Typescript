import { Row, Col } from 'antd';
import Heading from './Heading';
import './index.scss';
import KpiViewPage from './KpiViewPage';
import KpiListing from './KpiListingPage';
import { useDispatch, useSelector } from 'react-redux';
import { KPIIMPLEMENTATION } from 'types/enums';
import { useEffect } from 'react';
import { setKpiImplState } from 'redux/actions/KpisActions/kpiImplementationActions';

const KpiImplementation: React.FC<any> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setKpiImplState(KPIIMPLEMENTATION.display));
        };
    }, []);
    const KpiImplementationState = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.KpiImplementationState
    );

    return (
        <div className="kpiImplementationWrapper">
            <div>
                <Heading
                    viewDetailState={
                        KpiImplementationState === KPIIMPLEMENTATION.view
                    }
                />
            </div>
            <div className="implementation">
                <Row>
                    <Col span={24}>
                        {KpiImplementationState === KPIIMPLEMENTATION.view ? (
                            <KpiViewPage />
                        ) : (
                            <KpiListing />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default KpiImplementation;
