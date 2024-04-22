import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { type GaugeChartProps } from 'types/interfaces/PropsInterfaces/charts';
HighchartsMore(Highcharts);

const GaugeChart: React.FC<GaugeChartProps> = ({
    value,
    label,
    plotBands,
    labelDistance,
    yLabel,
    size,
    fontSize,
    tooltipFontSize,
    centerValues,
    dataLabelsFontSize,
}) => {
    if (plotBands?.max < value) {
        const maxObject = plotBands?.transformedData.reduce(
            (max: any, obj: any) => (obj.to > max.to ? obj : max)
        );

        maxObject.to = value;

        const newArray = plotBands?.transformedData.map((obj: any) =>
            obj === maxObject ? maxObject : obj
        );

        plotBands = {
            ...plotBands,
            max: value,
            transformedData: newArray.sort((a: any, b: any) => a.to - b.to),
        };
    }

    const options = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '100%',
            backgroundColor: 'transparent',
        },

        title: {
            text: '',
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            background: null,
            center: centerValues,
            size: size,
        },

        // the value axis
        yAxis: {
            min: plotBands?.min ? plotBands?.min : 0,
            max: plotBands?.max ? plotBands?.max : 5,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: labelDistance,
                y: yLabel,
                style: {
                    fontSize: fontSize,
                },
            },
            lineWidth: 0,

            plotBands:
                plotBands && Array.isArray(plotBands.transformedData)
                    ? plotBands.transformedData
                    : [
                          // Add more plotBands as needed
                      ],
            // plotBands: plotBands?.transformedData,
        },

        tooltip: {
            pointFormat: `${label}: ${parseFloat(value?.toFixed(2))}`,
            style: {
                fontSize: tooltipFontSize,
            },
        },

        series: [
            {
                name: label,
                data: value ? [parseFloat(value?.toFixed(2))] : [0],
                tooltip: {},
                dataLabels: {
                    y: 5,

                    formatter: function () {
                        if (value === null || value === undefined) {
                            return `<span class="custom-data-label">--</span>`;
                        } else {
                            return `<span class="custom-data-label">${this.y.toFixed(
                                2
                            )}</span>`;
                        }
                    },
                    borderWidth: 0,
                    color: '#333333',
                    style: {
                        fontSize: dataLabelsFontSize,
                    },
                },
                dial: {
                    radius: '80%',
                    backgroundColor: 'gray',
                    baseWidth: 5,
                    baseLength: value && '0%',
                    rearLength: '0%',
                },
                pivot: {
                    backgroundColor: 'gray',
                    radius: 2,
                },
            },
        ],
    };

    return (
        <HighchartsReact
            className="charts"
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default GaugeChart;
