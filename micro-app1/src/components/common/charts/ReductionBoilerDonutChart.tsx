import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertMillisecondsToTimeSegments } from "utils/commonFunction";

const ReductionBoilerDonutChart: React.FC<any> = ({
  chartingInfo,
  legendEnabled,
  fontSizeTitleText,
  colorLegends1,
  colorLegends2,
  colorTitle,
  yTitle,
  xTitle,
  fixedTo,
  chartWidth,
  pieCenter,
  size,
  data,
}) => {
  const [centreValues, setcentreValues] = useState<any>([]);
  useEffect(() => {
    setcentreValues(pieCenter);
  }, []);

  const seriesData: any = [
    {
      name: "",
      y: data,
      color: "#FFA39E",
    },
    {
      name: "",
      y: data < 100 ? 100 - data : 0,
      color: "#F2F2F2",
    },
  ];
  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: "",
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      width: chartWidth,
    },
    title: {
      text: `<strong>${
        data !== undefined && data !== null
          ? isNaN(data)
            ? "--"
            : data.toFixed(1)
          : "--"
      }%</strong>`,
      align: "center",
      verticalAlign: "middle",
      y: -200,
      x: xTitle,
      style: {
        fontSize: "16px",
      },
    },
    tooltip: {
      enabled: false,
      style: {
        fontSize: "36px", // Increase the font size of the tooltip
      },
      pointFormat: `{series.name}: <b>{point.percentage:.1f}%</b>`,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: legendEnabled,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemDistance: 20,
      symbolWidth: 16, // Set the width of the legend symbol
      symbolHeight: 16, // Set the height of the legend symbol
      symbolRadius: 0,
      itemStyle: {
        width: 900, // Set the width of the legend item container
        fontSize: "20px",
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
          .join("");

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
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: 0,
        endAngle: 360,
        center: centreValues,
        size: `${size}%`,
        showInLegend: true,
        // gapSize: 0,
      },
    },
    series: [
      {
        name: "",
        data: seriesData,
        type: "pie",
        innerSize: "70%",
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ReductionBoilerDonutChart;
