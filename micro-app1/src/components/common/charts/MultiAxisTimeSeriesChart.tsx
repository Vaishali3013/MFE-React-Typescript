import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import clockImage from 'assets/icons/time.svg';
import {
    MULTI_AXIS_CHART_COLORS,
    tooltipDateTimeFormat,
} from 'utils/constants';
import {
    convertToBrowserTimezone,
    xAxisLabelFormatHandler,
} from 'utils/commonFunction';

const MultiAxisLineChart = ({
    chartSeriesData,
    yAxisSeriesData,
    chartRef = null,
    dateRange,
}: any): any => {
    const options = {
        chart: {
            zoomType: 'x',
        },
        colors: MULTI_AXIS_CHART_COLORS,
        navigation: {
            buttonOptions: {
                enabled: true,
            },
        },
        title: {
            text: '',
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
        yAxis: yAxisSeriesData,

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

        series: chartSeriesData,
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'multiAxis' }}
            ref={chartRef}
        />
    );
};
export default MultiAxisLineChart;
