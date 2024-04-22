import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import BulletGraph from 'highcharts/modules/bullet';
import { type BulletChartProps } from 'types/interfaces/PropsInterfaces/charts';
BulletGraph(Highcharts);
HighchartsMore(Highcharts);

const BulletChart: React.FC<BulletChartProps> = ({
    value,
    category,
    y,
    unit,
    plotBands
}) => {
    const options = {
        chart: {
            inverted: true,
            type: 'bullet',
            marginLeft: 100,
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            categories: [
                `<span class="hc-cat-title">${category}</span><br/>${value}${unit}`,
            ],
        },
        yAxis: {
            min: plotBands?.min ? plotBands?.min : 0,
            max: plotBands?.max ? plotBands?.max : 100,
            gridLineWidth: 0,
            plotBands: plotBands && Array.isArray(plotBands.transformedData)
            ? plotBands.transformedData
            : [
                  // Add more plotBands as needed
              ],
    // plotBands: plotBands?.transformedData,
            title: null,
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000',
                targetOptions: {
                    width: '200%',
                },
            },
        },
        series: [
            {
                data: [
                    {
                        y: y,
                        target: value,
                    },
                ],
            },
        ],
        tooltip: {
            pointFormat: '<b>{point.y}</b> (with target at {point.target})',
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
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

export default BulletChart;
