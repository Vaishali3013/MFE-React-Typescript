import React, { useRef, useEffect } from 'react';

import Highcharts from 'highcharts/highcharts';

import HighchartsReact from 'highcharts-react-official';

const CircularProgressBar: React.FC<{ percentage: number; unit: string }> = ({
    percentage,
    unit,
}) => {
    const chartRef = useRef<Highcharts.Chart | any | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart;

            // Update the gauge value

            if (
                chart?.series &&
                chart?.series[0] &&
                chart?.series[0]?.points &&
                chart?.series[0]?.points[0]
            ) {
                chart.series[0].points[0].update(percentage);
            }
        }
    }, [percentage]);

    const gaugeOptions: any = {
        chart: {
            type: 'solidgauge',

            height: '130px',

            backgroundColor: 'transparent',
        },

        title: null,

        pane: {
            center: ['50%', '15%'],

            size: '90%',

            startAngle: -180,

            endAngle: 180,

            background: {
                backgroundColor: '#dee0df',

                innerRadius: '80%',

                outerRadius: '100%',

                shape: 'arc',
            },

            innerRadius: '80%', // Adjust the inner radius of the color

            outerRadius: '100%',

            shape: 'arc',
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

            lineWidth: 0,

            tickWidth: 0,

            minorTickInterval: null,

            labels: {
                enabled: false,
            },
        },

        plotOptions: {
            pie: {
                size: '100%', // Adjust the size of the circular progress bar

                innerSize: '100%', // Adjust the inner radius for the circular progress bar

                dataLabels: {
                    enabled: false,
                },
            },

            solidgauge: {
                dataLabels: {
                    format:
                        `<div style="text-align:center;">` +
                        `<span style="font-size:20px;color:` +
                        `black` +
                        `">{y:.1f}</span><span style="color:gray;font-size:1.5em;">${unit}</span</div>`,

                    borderWidth: 0,

                    pointWidth: 10,

                    verticalAlign: 'middle', // Center align vertically

                    y: 8, // Adjust the vertical position to center the label
                },
            },
        },

        credits: {
            enabled: false,
        },

        series: [
            {
                name: 'Progress',

                data: [percentage],

                color: `rgb(255, ${Math.round(255 - 2.55 * percentage)}, 0)`,
                innerRadius: '80%',

                outerRadius: '100%',
            },
        ],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={gaugeOptions}
            constructorType="chart"
            ref={chartRef}
        />
    );
};

export default CircularProgressBar;
