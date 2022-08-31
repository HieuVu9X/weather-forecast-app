import React, { useEffect } from 'react'
import CanvasJSReact from '../../assets/Chart/canvasjs.react';

function MultiTypeChart({ filteredHourly, unitIcon }) {

    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const temp = [];
    const pop = [];

    const options = {   
        exportEnabled: false,
        animationEnabled: true,
        title:{
            text: "Temperature in 24 hours",
            fontSize: 16,
        },
        toolTip: {
            shared: true,
        },
        legend: {
            verticalAlign: "top"
        },  
        axisX:{
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
            },            
            valueFormatString: "h tt", 
            lineThickness: 2, 
            gridThickness: 1,
            gridDashType: "dot",
        },
        axisY: {
            title: "Temperature",
            suffix: unitIcon,
            valueFormatString: "#0.##",
            lineThickness: 2,
            gridThickness: 1,
            gridDashType: "dot",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            tickColor: "#C0504E",
            labelFontColor: "#C0504E",
            includeZero: true
        },
        axisY2: {
            title: "Pop",
            suffix: "%",            
            valueFormatString: "#0.##",
            lineThickness: 2,
            gridThickness: 0,
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            tickColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            includeZero: true
        },
        data: [
            {
                type: "spline",
                name: 'Temp',
                color: "#C0504E",
                axisYType: "primary",
                showInLegend: true,
                xValueFormatString: "h tt",
                yValueFormatString: "#0.##",
                dataPoints: temp
            },
            {
                type: "spline",
                name: 'Pop',
                color: "#4F81BC",
                axisYType: "secondary",
                showInLegend: true,
                yValueFormatString: "#0.##",
                dataPoints: pop
            }
        ]
    };

    if (filteredHourly !== null) {
        for (var i = 0; i < (filteredHourly.length); i++) {
            temp.push({
                x: new Date(filteredHourly[i].dt*1000),
                y: filteredHourly[i].temp
            });
            pop.push({
                x: new Date(filteredHourly[i].dt*1000),
                y: filteredHourly[i].pop*100
            });
        }
    }
    
    return (
        <div>
            <CanvasJSChart options = {options} />
        </div>
  )
}

export default MultiTypeChart;
