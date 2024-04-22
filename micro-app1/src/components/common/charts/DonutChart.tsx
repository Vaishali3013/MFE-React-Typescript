import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { type DonutChartProps } from 'types/interfaces/PropsInterfaces/charts';
import { convertMillisecondsToTimeSegments } from 'utils/commonFunction';

const DonutChart: React.FC<DonutChartProps> = ({
    chartingInfo,
    legendEnabled,
    fontSizeTitleText,
    colorLegends1,
    colorLegends2,
    colorTitle,
    yTitle,
    fixedTo,
    chartWidth,
    pieCenter,
    size,
}) => {
    const [centreValues, setcentreValues] = useState<any>([]);
    useEffect(() => {
        setcentreValues(pieCenter);
    }, []);

    const seriesData: any = [
        {
            name: 'Run Time',
            y: chartingInfo[0]?.timeStamp ? chartingInfo[0]?.timeStamp : 100,
            color:
                chartingInfo[0]?.timeStamp === null ||
                chartingInfo[0]?.timeStamp === undefined
                    ? '#E5E5E5'
                    : colorLegends1,
        },
        {
            name: 'Down Time',
            y: chartingInfo[1]?.timeStamp ? chartingInfo[1]?.timeStamp : 100,
            color:
                chartingInfo[0]?.timeStamp === null ||
                chartingInfo[0]?.timeStamp === undefined
                    ? '#E5E5E5'
                    : colorLegends2,
        },
    ];

    const getPercentageValue = (): any => {
        const n = 1;

        const arrayOfValues: any = chartingInfo.map(
            (obj: any) => obj.timeStamp
        );

        const sum: any = arrayOfValues
            .slice(0, n)
            .reduce((acc: any, val: any) => Number(acc) + Number(val), 0);

        const total: any = arrayOfValues.reduce(
            (acc: any, val: any) => Number(acc) + Number(val),
            0
        );

        const percentage: any = (sum / total) * 100;
        const formattedNumber: any = percentage?.toFixed(fixedTo);
        return formattedNumber;
    };

    const options: Highcharts.Options = {
        chart: {
            plotBackgroundColor: '',
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: 'transparent',
            width: chartWidth,
        },
        title: {
            text: `<strong>${
                chartingInfo[0].timeStamp !== 0 &&
                chartingInfo[0].timeStamp !== null &&
                chartingInfo[0].timeStamp !== undefined
                    ? getPercentageValue() + '%'
                    : '--'
            }</strong>`,
            align: 'center',
            verticalAlign: 'middle',
            y: yTitle,
            style: {
                color: colorTitle,
                fontSize: fontSizeTitleText,
            },
        },
        tooltip: {
            style: {
                fontSize: '36px', // Increase the font size of the tooltip
            },
            pointFormat:
                ((chartingInfo[0]?.timeStamp ?? null) ||
                    (chartingInfo[1]?.timeStamp ?? null)) &&
                `{series.name}: <b>{point.percentage:.1f}%</b>`,
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: legendEnabled,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemDistance: 20,
            symbolWidth: 16, // Set the width of the legend symbol
            symbolHeight: 16, // Set the height of the legend symbol
            symbolRadius: 0,
            itemStyle: {
                width: 900, // Set the width of the legend item container
                fontSize: '20px',
            },
            x: 0,
            y: 0,
            labelFormatter: function (this: any) {
                // Slice is used to get first 3 values from array(Date object) i.e. hrs, mins, secs
                const timeSegmentsHtml = convertMillisecondsToTimeSegments(
                    Number(this.y)
                )
                    .slice(0, 3)
                    .map((item, index) => {
                        return `
                        <div key=${index}>
                            <strong >${item.value}</strong>
                            <span style="font-size: 20px; color: gray;">${item.label}</span>
                        </div>
                    `;
                    })
                    .join('');

                return `
                    <div >
                    <div style="font-size: 20px; color: gray;">
                      <strong>${this.name}</strong>
                    </div>
                   
                    <div style="font-size: 20px; color: black;">
                      ${timeSegmentsHtml || 0}
                    </div>
                    <div>
                  `;
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                    },
                },
                startAngle: -90,
                endAngle: -180,
                center: centreValues,
                size: `${size}%`,
                showInLegend: true,
            },
        },
        series: [
            {
                name: '',
                data: seriesData,
                type: 'pie',
                innerSize: '70%',
            },
        ],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DonutChart;
