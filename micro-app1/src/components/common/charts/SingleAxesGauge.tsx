import React from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { type singleAxisGaugeProps } from 'types/interfaces/PropsInterfaces/charts';
import './SingleAxesGauge.scss';
HighchartsMore(Highcharts);

const SingleAxesGauge: React.FC<singleAxisGaugeProps> = ({
    value,
    unit,
    label,
}) => {
    const steamValue = value === null || value === undefined ? '' : '20%';
    const gaugeOptions = {
        chart: {
            type: 'gauge',
            maxHeight: 350,
            minWidth: 400,
            alignTicks: false,
            backgroundColor: 'transparent',
            plotBackgroundColor: {
                stops: [
                    [0, '#FFF4C6'],
                    [0.3, '#FFFFFF'],
                    [1, '#FFF4C6'],
                ],
            },
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
        },
        plotOptions: {
            gauge: {
                dial: {
                    radius: '50%',
                    backgroundColor: 'gray',
                    baseWidth: 4,
                    topWidth: 1,
                    baseLength: steamValue, // Set the length of the needle
                    rearLength: '0%',
                },
                pivot: {
                    backgroundColor: 'gray',
                    radius: 5,
                },
            },
        },

        credits: {
            enabled: false,
        },

        title: {
            text: '',
        },
        pane: [
            {
                center: ['50%', '45%'],
                startAngle: -150,
                endAngle: 150,
                size: '100%',
                background: {
                    innerRadius: '0%',
                    outerRadius: '0%',
                    backgroundColor: ' #b3ecff',
                    borderWidth: 0,
                },
            },
        ],
        yAxis: [
            {
                min: 0,
                max: value > 40 ? value : 40,
                lineColor: ' #b3ecff',
                tickColor: ' gray',
                minorTickColor: 'gray',
                offset: -25,
                lineWidth: 10,
                labels: {
                    distance: -20,
                    rotation: 'auto',
                },
                tickLength: 10,
                minorTickLength: 5,
                endOnTick: false,
                
            },
        ],

        series: [
            {
                name: label,
                data: value ? [parseFloat(value?.toFixed(2))] : [0],
                dataLabels: {
                    useHTML: true,
                    y: 90,
                    borderWidth: 0,
                    formatter: function () {
                        if (value === null || value === undefined) {
                            return `<span class="custom-data-label">--</span>`;
                        } else {
                            return `<span class="custom-data-label">${this.y.toFixed(
                                2
                            )}</span><span class="custom-unit-label"> ${unit}</span>`;
                        }
                    },
                    tooltip: {
                        valueSuffix: unit,
                        pointFormat:
                            '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>',
                    },
                },
            },
        ],
    };
    return <HighchartsReact highcharts={Highcharts} options={gaugeOptions} />;
};

export default SingleAxesGauge;
