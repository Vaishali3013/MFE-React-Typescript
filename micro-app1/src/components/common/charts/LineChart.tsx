import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { convertToBrowserTimezone } from 'utils/commonFunction';
import { tooltipDateTimeFormat } from 'utils/constants';

const LineChart: React.FC<{ height?: any; name: any; chartData: any }> = ({
    height,
    name,
    chartData,
}) => {
    const options = {
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
            height: 620,
            zooming: {
                mouseWheel: {
                    enabled: false,
                    type: 'x',
                },
                pinchType: false,
                singleTouch: false,
                type: 'none',
                zoomType: 'none',
            },
        },
        navigation: {
            buttonOptions: {
                enabled: true,
            },
        },
        navigator: {
            series: {
                lineWidth: 0,
                fillOpacity: 0,
            },
            enabled: false,
        },
        scrollbar: {
            enabled: false,
        },
        title: {
            text: null,
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function (axis: any): any {
                    return Highcharts.dateFormat(
                        axis.dateTimeLabelFormat,
                        convertToBrowserTimezone(axis.value)
                    );
                },
            },
        },
        tooltip: {
            formatter: function (this: any): any {
                const browserTimestamp = convertToBrowserTimezone(this.x);
                return (
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    Highcharts.dateFormat(tooltipDateTimeFormat, browserTimestamp) +
                    '<br>' +
                    '<b>' +
                    this.y +
                    '</b>'
                );
            },
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        series: [
            {
                name: name,
                data: chartData,
                marker: {
                    enabled: true, 
                    symbol: 'circle', 
                    radius: 3 
                  }
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
