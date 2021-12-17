import './style.scss';
import { FlagEmoji, getFlag } from './utils/flagEmoji/index';
import { CovidDataEntry, retrieveAllCovidData } from './api/covid';
import { GdpData, retrieveAllGdpData } from './api/GDP';
import { drawSheet } from './dom/sheet';
import { drawChart } from './dom/chart';

export var nbDisplay = 10;

const nInput = document.querySelector("#actionBar input") as HTMLInputElement;
nInput.onchange = e => {
  nbDisplay = (e.target as any).value as number;
  drawSheet();
  drawChart();
}

export type DataEntry = CovidDataEntry & GdpData & FlagEmoji;

export var dataTable:DataEntry[] = [];

export async function loadData() {
  const covidData = await retrieveAllCovidData()
  const gdpData = await retrieveAllGdpData();
  dataTable = covidData.map(d=>({
    ...d,
    flag: getFlag(d.code2),
    gdp: gdpData.find(i=>i.code3==d.code3)?.gdp
  }));
  nInput.max = dataTable.length+"";
}

await loadData();
console.log(dataTable);
drawSheet();
drawChart();