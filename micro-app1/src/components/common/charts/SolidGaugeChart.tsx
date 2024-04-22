import React from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official';
import { type SolidGuageProps } from 'types/interfaces/PropsInterfaces/charts';
import { styleRules } from './styleRules';
import './SolidGaugeChart.scss';
HighchartsMore(Highcharts);
solidGauge(Highcharts);

const SolidGaugeChart: React.FC<SolidGuageProps> = ({
    height,
    data,
    name,
    unit,
}) => {
    const gaugeOptions = {
        chart: {
            type: 'solidgauge',
            height: height,
            backgroundColor: 'transparent',
        },

        title: null,

        pane: {
            center: ['50%', '75%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc',
            },
        },

        exporting: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },

        yAxis: {
            min: 0,
            max: 100,
            title: {
                y: -38,
            },
            stops: [
                [0.1, styleRules.yellowLow], // green
                [0.5, styleRules.greenMiddle], // yellow
                [0.9, styleRules.redHigh], // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 0,

            labels: {
                y: 16,
                distance: -13,
                allowOverlap: false,
                style: {
                    fontSize: '12px', // Set the font size here
                },
            },
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true,
                    style: {
                        textAlign: 'center', // Center align the data labels
                    },
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: name,
                data: data ? [data] : [0],
                dataLabels: {
                    style: {
                        textAlign: 'center', // Center align the data labels,
                        display: 'none',
                    },

                    formatter: function (this: any): any {
                        if (data === null || data === undefined) {
                            return `<span class="custom-data-label">--%</span>`;
                        } else {
                            return `<span style="font-size:12px;">${this.y.toFixed(
                                2
                            )}%</span>`;
                        }
                    },
                },
                tooltip: {
                    valueSuffix: ` ${unit}`,
                },
            },
        ],
    };
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={gaugeOptions}
            containerProps={{ className: 'solidGauge' }}
        />
    );
};

export default SolidGaugeChart;
