import ApexCharts, { ApexOptions } from "apexcharts";
import { dataTable, nbDisplay } from "../../main";
import { order, sort, Wise } from "../sheet";

var apexChart:ApexCharts;

export function drawChart() {
    if (order.wise != Wise.None) dataTable.sort(sort);
    const a = dataTable.slice(0,nbDisplay);

    const options:ApexOptions = {
        chart: {
            height: 800,
            type: 'scatter'
        },
        series: a.map(d=>({
            name: d.country,
            data: [[Math.round(d.gdp || 0), d.confirmed]]
        })),
        xaxis: {
            
            type: "numeric",
            title: {
                text: "PIB/hab. en $"
            }
        },
        yaxis: {
            logarithmic: true,
            title: {
                text: "Cas de covid"
            }
        },
        markers: {
            size: 10,
            strokeWidth: 0
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "1.5em",
                colors: ["#000"]
            },
            background: {
                enabled: false,
                dropShadow: {
                    
                }
            },
            formatter: (val, opt) => a[opt.seriesIndex].flag,
        }
    }
    const chart = document.getElementById("chart") as HTMLElement;
    chart.innerHTML = "";
    if (apexChart) apexChart.destroy();
    apexChart = new ApexCharts(chart, options);
    apexChart.render();
}
