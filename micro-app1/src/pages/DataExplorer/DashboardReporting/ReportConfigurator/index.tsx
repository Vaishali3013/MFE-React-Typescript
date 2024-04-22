import { Card } from 'antd';
import './index.scss';
import CustomHeader from 'components/common/CustomHeader';
import ReportConfiguratorForm from './ReportConfiguratorForm';

const ReportConfigurator: React.FC = () => {
    return (
        <div className="reportConfigurator">
            <CustomHeader
                heading="Report Configurator"
                customDateTimePicker={false}
                currentTimePicker={false}
                infoTooltip={false}
            />
            <div className="reportConfiguratorWrapperScrolContent">
                <div className="reportConfiguratorWrapper">
                    <Card
                        bordered={false}
                        className="reportConfiguratorWrapper__cardContent"
                    >
                        <ReportConfiguratorForm />
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default ReportConfigurator;
