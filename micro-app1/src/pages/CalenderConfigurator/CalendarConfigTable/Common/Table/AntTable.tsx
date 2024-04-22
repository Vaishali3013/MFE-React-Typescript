import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    kpiName: string;
    formula: string;
    kpiAggregationType: string;
    kpiDataType: string;
    variable: string;
    variableAggregation: string;
    unit: string;
    frequency: string;
}

export const columns: ColumnsType<DataType> = [
    {
        title: 'KPI Name',
        dataIndex: 'kpiName',
        key: 'kpiName',
        width: '10%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'Formula',
        dataIndex: 'formula',
        key: 'formula',
        width: '20%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'KPI Agrregation Type',
        dataIndex: 'kpiAggregationType',
        key: 'kpiAggregationType',
        width: '10%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'KPI Data Type',
        dataIndex: 'kpiDataType',
        key: 'kpiDataType',
        width: '10%',
    },
    {
        title: 'Variable',
        dataIndex: 'variable',
        key: 'variable',
        width: '20%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'Variable Aggregation',
        dataIndex: 'variableAggregation',
        key: 'variableAggregation',
        width: '10%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        width: '10%',
        render: (text: string) => (
            <span>
                {text.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                        {item}
                        <br />
                    </React.Fragment>
                ))}
            </span>
        ),
    },
    {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
        width: '10%',
    },
];

export const data: any[] = [
    {
        key: '1',
        kpiName: 'Boiler Operating Time',
        formula: `(@Steamflow)* ${'\n'}TimeDuration /1000`,
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: `@steamflow = Main Steam Flow ${'\n'}• steamflow ${'\n'}Run = if (Main Steam Flow > 3) ${'\n'}then 1 ${'\n'}else 0 ${'\n'}end ${'\n'}return = avg(Run)`,
        variableAggregation: 'Runstate',
        unit: `Seconds ${'\n'}(in[hh]:mm ${'\n'}format)`,
        frequency: '1min',
    },
    {
        key: '2',
        kpiName: 'Boiler Down time',
        formula: `(TimeDuration/1000)${'\n'} - [Boiler Operating Time]`,
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: 'NA',
        variableAggregation: 'NA',
        unit: `Seconds ${'\n'}(in[hh]:mm ${'\n'}format)`,
        frequency: '1min',
    },
    {
        key: '3',
        kpiName: 'Air to Fuel Ratio',
        formula: `(@airflow *1/60*${'\n'} 0.232)/1000 / [Total${'\n'} Coal Consumption]`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@airflow = FD ${'\n'}Outlet Air Flow`,
        variableAggregation: 'AVG',
        unit: 'kg/kg',
        frequency: '1min',
    },
    {
        key: '4',
        kpiName: 'Steam to Fuel Ratio',
        formula: `sum([Total Steam${'\n'} Consumption]/${'\n'}sum([Total Coal ${'\n'}Production]) ${'\n'}*change in formula${'\n'} after customer request ${'\n'}dated 1 oct`,
        kpiAggregationType: `MEDI ${'\n'}ANT ${'\n'}(SUM/SUM)`,
        kpiDataType: 'Double',
        variable: 'NA',
        variableAggregation: 'NA',
        unit: 'T/T',
        frequency: '1min',
    },
    {
        key: '5',
        kpiName: 'Total Steam Production',
        formula: '@TMS',
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: '@TMS = Total Main Steam',
        variableAggregation: `Increment in  ${'\n'}Parameter`,
        unit: 'Ton',
        frequency: '1min',
    },
    {
        key: '6',
        kpiName: 'Total Coal Consumption',
        formula: `1 @coalloadcell=Bun ${'\n'}ker Load Cell ${'\n'}Input*1000`,
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: `@coalloadcell= Bunker Load ${'\n'}Cell Input ${'\n'}1 Belt Conveyor 4 ${'\n'}Run Feedback= 1:`,
        variableAggregation: `decrement in  ${'\n'}Parameter value`,
        unit: 'Kg',
        frequency: '1min',
    },
    {
        key: '7',
        kpiName: 'Total Feed Water',
        formula: `@feedwaterflow * ${'\n'}TimeDuration / (1/160)`,
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: `@feedwaterflow = Total Feed ${'\n'}Water`,
        variableAggregation: 'AVG',
        unit: 'M3',
        frequency: '1min',
    },
    {
        key: '8',
        kpiName: 'Furnace Pressure',
        formula: `if ([Boiler Runtime] > 0)${'\n'} Then ${'\n'}@furnacepressure ${'\n'}else NA ${'\n'}end;1`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@furnacepressure = Furnace ${'\n'}Draft Pressure`,
        variableAggregation: 'AVG',
        unit: 'bar',
        frequency: '1min',
    },
    {
        key: '9',
        kpiName: 'Excess Oxygen',
        formula: `if ([Boiler Runtime] > 0)${'\n'} Then${'\n'} @fluegasO2 ${'\n'}else NA${'\n'} end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@fluegasO2 = O2 Analyser at ${'\n'}Boiler Outlet`,
        variableAggregation: 'AVG',
        unit: '%',
        frequency: '1min',
    },
    {
        key: '10',
        kpiName: 'Direct Boiler Efficiency',
        formula: `H = SteamEnthalpy ${'\n'}(@steampressure , ${'\n'}@steamtemperature) ${'\n'}h = WaterEnthalpy ${'\n'}(@waterTemperature)`,
        kpiAggregationType: `MEDI ANT${'\n'}(SUM/ SUM)`,
        kpiDataType: 'Double',
        variable: `@steampressure = Steam ${'\n'}Pressure Main Line ${'\n'}@steamtemperatur e = Main ${'\n'}Steam Temperature ${'\n'}@waterTemperatur e = ECO ${'\n'}Water Inlet Temperature ${'\n'}@GCV = from Forms`,
        variableAggregation: `AVG ${'\n'}AVG ${'\n'}AVG ${'\n'}Last Recorded ${'\n'}Value`,
        unit: '%',
        frequency: '1min',
    },
    {
        key: '11',
        kpiName: `Reduction in Boiler ${'\n'}Efficiency`,
        formula: `IF (((([Excess Oxygen]- ${'\n'}4)*0.025)+(@UnBurn ${'\n'}t_Carbon_Loss-${'\n'} 3))==0) then 0 ${'\n'}Else (([Excess${'\n'} Oxygen]-${'\n'} 4)*0.025)+(@UnBurn${'\n'} t_Carbon_Loss-3)) ${'\n'}End;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@UnBurnt_Carbon _Loss = from${'\n'} Forms${'\n'} Oxygen: O2 Analyser at Boiler${'\n'} Outlet`,
        variableAggregation: `Last Value ${'\n'}Recorded`,
        unit: '%',
        frequency: '1min',
    },
    {
        key: '12',
        kpiName: `Feed Water vs Steam ${'\n'}Production`,
        formula: '',
        kpiAggregationType: `MEDI ANT${'\n'}(SUM/ SUM)`,
        kpiDataType: 'Double',
        variable: 'NA',
        variableAggregation: 'NA',
        unit: 'm3/ton',
        frequency: '1min',
    },
    {
        key: '13',
        kpiName: `Economizer - Flue Gas ${'\n'}Exit Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then${'\n'} @EFlueGasExitTemper${'\n'}ature ${'\n'}else NA${'\n'} end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@EFlueGasExitTemperature = ${'\n'}ECO Outlet Flue Gas ${'\n'}Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '14',
        kpiName: `Economizer - Flue Gas ${'\n'}Inlet Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then${'\n'} @EFlueGasInletTemper${'\n'}ature${'\n'} else NA${'\n'} end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@EFlueGasInletTemperature= ${'\n'}ECO Inlet Flue Gas Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '15',
        kpiName: `Economizer - Water ${'\n'}Outlet Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then ${'\n'}@WaterOutletTemper${'\n'}ature${'\n'} else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@WaterOutletTemperature = ${'\n'}ECO Water Outlet Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '16',
        kpiName: `Economizer - Water ${'\n'}Inlet Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then ${'\n'}@WaterInletTemper${'\n'}ature${'\n'} else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@WaterOutletTemperature = ${'\n'}ECO Water Inlet Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '17',
        kpiName: `APH - Flue Gas Exit ${'\n'}Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then ${'\n'}@APHFlueGasExitTemper${'\n'}ature ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@APHFlueGasExit Temperature ${'\n'}= APH Outlet Flue Gas ${'\n'}Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '18',
        kpiName: `APH - Flue Gas Inlet ${'\n'}Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then ${'\n'} @APHFlueGasInlet Temper${'\n'}ature${'\n'} else NA ${'\n'}end;`,
        kpiAggregationType: `AVG`,
        kpiDataType: 'Double',
        variable: `@APHFlueGasInletTemperature${'\n'} =APH Inlet Flue Gas${'\n'} Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '19',
        kpiName: `APH - Air Outlet ${'\n'}Temperature`,
        formula: `if ([Boiler Runtime] >0) ${'\n'}Then ${'\n'}@AirOutletTemper${'\n'}ature ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@AirOutletTemperature = APH ${'\n'}Outlet Air Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '20',
        kpiName: `APH - Air Inlet ${'\n'}Temperature`,
        formula: `if ([Boiler Runtime] >0) ${'\n'}Then ${'\n'}@AirinletTemper${'\n'}ature ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@AirinletTemperature = APH ${'\n'}Inlet Air Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '21',
        kpiName: `Average Steam ${'\n'}Temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then${'\n'} @steamtemper${'\n'}ature ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@steamtemperature = Main${'\n'} Steam Temperatute`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '22',
        kpiName: `Average Steam ${'\n'}Pressure`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then${'\n'} @steamPressure ${'\n'}else NA${'\n'} end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@steampressure = Steam${'\n'}Pressure Main Line`,
        variableAggregation: 'AVG',
        unit: 'Bar',
        frequency: '1min',
    },
    {
        key: '23',
        kpiName: `Average Steam ${'\n'}Flow`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then ${'\n'}@steamFlow ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: '@steamflow = Main Steam Flow',
        variableAggregation: 'AVG',
        unit: 'TPH',
        frequency: '1min',
    },
    {
        key: '24',
        kpiName: `ESP - Outlet flue gas ${'\n'}temperature`,
        formula: `if ([Boiler Runtime] >0)${'\n'} Then${'\n'} @OutletFlueGasTempe${'\n'}rature ${'\n'}else NA${'\n'} end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@OutletFlueGasTemperature = ${'\n'}ESP Outet Flue Gas ${'\n'}Temperature`,
        variableAggregation: 'AVG',
        unit: '°C',
        frequency: '1min',
    },
    {
        key: '25',
        kpiName: 'Feed Water Flow',
        formula: `if ([Boiler Runtime] >0) ${'\n'}Then @feedwaterflow ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@feedwaterflow=Feed Water ${'\n'}Flow`,
        variableAggregation: 'AVG',
        unit: 'm3/hr',
        frequency: '1min',
    },
    {
        key: '26',
        kpiName: 'Current ID Fan',
        formula: `if ([Boiler Runtime] >0)${'\n'} Then @IDFan${'\n'} else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: '@ID fan= ID Fan Current',
        variableAggregation: 'AVG',
        unit: 'A',
        frequency: '1min',
    },
    {
        key: '27',
        kpiName: 'Current FD Fan',
        formula: `if ([Boiler Runtime] >0)${'\n'} Then @FDFan ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: '@FD fan= FD Fan Current',
        variableAggregation: 'AVG',
        unit: 'A',
        frequency: '1min',
    },
    {
        key: '28',
        kpiName: 'Current PA Fan',
        formula: `if ([Boiler Runtime] >0) ${'\n'}Then @PAFan ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: '@PA fan= PA Fan Current',
        variableAggregation: 'AVG',
        unit: 'A',
        frequency: '1min',
    },
    {
        key: '29',
        kpiName: `Total Power Consumption* ${'\n'}To be shown on Dashboard now`,
        formula: `if ([Boiler Runtime] > 0)${'\n'} Then @TPC ${'\n'} else NA ${'\n'} end;`,
        kpiAggregationType: 'SUM',
        kpiDataType: 'Double',
        variable: `@tpc= ags to be provided by ${'\n'}customer after integration${'\n'} this variable will be calculated${'\n'} as the the increment in ${'\n'}parameter value. ${'\n'}If reset happens then it start${'\n'} from 0 again.`,
        variableAggregation: 'Increment',
        unit: 'Kwh',
        frequency: '1min',
    },
    {
        key: '30',
        kpiName: `SPC (Specific Power ${'\n'}Consumption) *`,
        formula: `sum([Total Power ${'\n'}Consumption])/${'\n'}sum([ Total Steam${'\n'} Production])`,
        kpiAggregationType: `MEDI ANT${'\n'}(SUM/ SUM)`,
        kpiDataType: 'Double',
        variable: '',
        variableAggregation: 'NA',
        unit: 'Kwh/ T',
        frequency: '1min',
    },
    {
        key: '31',
        kpiName: `Economizer ${'\n'}Performance*`,
        formula: `((t —to)/ (To — T))*100${'\n'} t= outlet${'\n'} temperature of water ${'\n'}to= Inlet temperature ${'\n'}of water ${'\n'}To= inlet temperature ${'\n'}of flue gas${'\n'} T= outlet temperature ${'\n'}of flue gas`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@T= Avg(ECO Outlet Flue Gas${'\n'} Temperature)${'\n'} @T0= Avg(ECO Inlet Flue Gas${'\n'} Temperature) ${'\n'}t= Avg(ECO Water Outlet ${'\n'}Temperature)${'\n'} to= Avg(ECO Water Inlet${'\n'} Temperature)`,
        variableAggregation: 'AVG',
        unit: '%',
        frequency: '1min',
    },
    {
        key: '32',
        kpiName: 'APH Performance',
        formula: `((Qo — Q )/ (q-qo ))*100${'\n'} q= outlet temperature ${'\n'}of air${'\n'} qo= Inlet temperature${'\n'} of air ${'\n'}Qo= inlet temperature ${'\n'}of flue gas${'\n'} Q= outlet temperature ${'\n'}of flue gas`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `Q=avg(APH Outlet Flue Gas ${'\n'}Temperature)${'\n'} Qo= avg(APH Inlet Flue Gas${'\n'} Temperature) ${'\n'}q= avg(APH Outlet Air ${'\n'}Temperature)${'\n'} qo=avg(APH Inlet Air ${'\n'}Temperature)`,
        variableAggregation: 'AVG',
        unit: '%',
        frequency: '1min',
    },
    {
        key: '33',
        kpiName: 'Steam Pressure (9bar)',
        formula: `if ([Boiler Runtime] > 0)${'\n'} Then @steampressure1 ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@steampressure1 = 9 Bar${'\n'} Steam Pressure*1.01972 ${'\n'}*change in formula after${'\n'} customer request dated 1 oct`,
        variableAggregation: 'AVG',
        unit: 'bar',
        frequency: '1min',
    },
    {
        key: '34',
        kpiName: 'Steam Pressure (18bar)',
        formula: `if ([Boiler Runtime] > 0)${'\n'} Then @steampressure2 ${'\n'}else NA ${'\n'}end;`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@steampressure2 = 18 Bar${'\n'} Steam Pressure*1.01972${'\n'} *change in formula after${'\n'} customer request dated 1 oct`,
        variableAggregation: 'AVG',
        unit: 'bar',
        frequency: '1min',
    },
    {
        key: '35',
        kpiName: `Feed Water Motor 1 ${'\n'}Current`,
        formula: `if ([M1A] > 0)${'\n'} Then @FWM1 ${'\n'}else NA ${'\n'}end;${'\n'} M1A= Feed Water${'\n'} Motor 1 Run Feedback`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@fw1kwh= Feed ${'\n'}Pump 1 Current`,
        variableAggregation: 'AVG',
        unit: 'A',
        frequency: '1min',
    },
    {
        key: '36',
        kpiName: `Feed Water Motor 2 ${'\n'}Current`,
        formula: `if ([M1B] > 0) Then${'\n'} @FWM2 ${'\n'} else NA ${'\n'} end;${'\n'} M1B= Feed Water${'\n'} Motor 2 Run Feedback`,
        kpiAggregationType: 'AVG',
        kpiDataType: 'Double',
        variable: `@fw2kwh= Feed Pump ${'\n'}Current`,
        variableAggregation: 'AVG',
        unit: 'A',
        frequency: '1min',
    },
];

export const AntTable: React.FC<{ tableData: any }> = ({ tableData }) => {
    return (
        <Table columns={columns} dataSource={tableData} pagination={false} />
    );
};
