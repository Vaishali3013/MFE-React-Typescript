import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { type LineCoulumnChartProps } from 'types/interfaces/PropsInterfaces/charts';
import {
    convertToBrowserTimezone,
    xAxisLabelFormatHandler,
} from 'utils/commonFunction';
import { chartDateFormat, tooltipDateTimeFormat } from 'utils/constants';

HighchartsMore(Highcharts);

const LineCoulumnChart: React.FC<LineCoulumnChartProps> = ({
    dataIntake,
    dataProd,
    dateRange,
    barClickEventHandler,
    lineClickEventHandler,
}) => {
    const arrayOfArraysDataIntake = dataIntake?.map((item: any) => [
        Highcharts.dateFormat(chartDateFormat, item.timestamp),
        item.value,
    ]);

    const arrayOfArraysDataProd = dataProd?.map((item: any) => [
        Highcharts.dateFormat(chartDateFormat, item.timestamp),
        item.value,
    ]);
    const options = {
        chart: {
            type: 'column',
        },

        colors: ['#7A93A4', '#00FF00', '#4ED964'],

        title: {
            text: '',
        },

        xAxis: {
            labels: {
                formatter: function (axis: any): any {
                    return Highcharts.dateFormat(
                        xAxisLabelFormatHandler(dateRange),
                        convertToBrowserTimezone(axis.value)
                    );
                },
            },
            categories: arrayOfArraysDataIntake.map((dataPoint: any) =>
                convertToBrowserTimezone(dataPoint[0])
            ),
        },

        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function (this: any): any {
                const browserTimestamp = convertToBrowserTimezone(this.x);
                let tooltip =
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

                    Highcharts.dateFormat(
                        tooltipDateTimeFormat,
                        browserTimestamp
                    ) + '<br>';

                this.points.forEach(function (point: any) {
                    tooltip +=
                        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                        '<span style="color:' +
                        point.color +
                        '">\u25CF</span> ' +
                        point.series.name +
                        ': ' +
                        point?.y?.toFixed(2) +
                        '<br>';
                });
                return tooltip;
            },
        },

        yAxis: [
            {
                title: {
                    text: '',
                },
            },

            {
                title: {
                    text: '',
                },
                opposite: true,
            },
        ],

        series: [
            {
                name: 'Coal Intake',
                data: arrayOfArraysDataIntake ?? [],
                point: {
                    events: {
                        click: barClickEventHandler,
                    },
                },
            },

            {
                name: 'Production',
                type: 'line',
                data: arrayOfArraysDataProd ?? [],
                point: {
                    events: {
                        click: lineClickEventHandler,
                    },
                },
            },
        ],

        legend: {
            symbolWidth: 8,
            symbolHeight: 8,
            itemStyle: {
                fontSize: '10px',
            },
        },
    };

    return (
        <HighchartsReact
            className="charts"
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default LineCoulumnChart;
