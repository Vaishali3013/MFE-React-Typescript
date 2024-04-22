import React, { useRef } from 'react';
import clockImage from 'assets/icons/time.svg';

import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official';

import { useSelector } from 'react-redux';
import {
    convertToBrowserTimezone,
    xAxisLabelFormatHandler,
} from 'utils/commonFunction';
import { tooltipDateTimeFormat } from 'utils/constants';

interface ChartProps {
    chartData: number[];

    heading: any;

    chartColor: any;
}

const SynchronizedChart: React.FC<ChartProps> = ({
    heading,

    chartColor,

    chartData,
}) => {
    const chartRef: any = useRef(null);

    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );

    const chartOptions: any = {
        chart: {
            type: 'area',

            minWidth: 420, // Specify the desired width

            height: 123, // Specify the desired height
        },

        title: {
            text: '',
        },

        credits: {
            enabled: false,
        },

        tooltip: {
            shared: true,
            useHTML: true, // Allow HTML content in the tooltip
            xDateFormat: `<div style="display:flex;justify-content:center;"> <div style="color:white; font-sixe:12px; font-weight:500"><div style="display:flex; align-items:center;gap:2px"> <img src="${clockImage}" alt="Clock" style="margin-right: 5px; height: 15px; width: 15px;" /><span> %Y-%m-%d %H:%M:%S</span></div></div></div>`,
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

        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: chartColor.gradientColor,

                    stops: chartColor.gradientStops,
                },
            },
        },

        series: [
            {
                name: 'Value',

                data: chartData?.map((item: any) => item),

                dataGrouping: {
                    enabled: false, // Disable data grouping for hourly data
                },
            },
        ],

        legend: {
            enabled: false, // Disable the legend
        },

        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function (axis: any): any {
                    return Highcharts.dateFormat(
                        xAxisLabelFormatHandler(dateRange),
                        convertToBrowserTimezone(axis.value)
                    );
                },
            },
        },

        yAxis: {
            title: {
                text: '',
            },
        },
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={chartRef}
            />
        </div>
    );
};

export default SynchronizedChart;
