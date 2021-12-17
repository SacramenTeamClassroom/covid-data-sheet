import { h } from 'tsx-dom';
import { DataEntry, dataTable, nbDisplay } from '../../main';
import { drawChart } from '../chart';

export enum OrderableColumnType {
  Country,
  Confirmed,
  Deaths,
  GDP
}

export enum Wise {
  Desc = -1,
  None,
  Asc
}

export const order = {
  column: OrderableColumnType.Deaths,
  wise: Wise.Desc
}

function setNextWise(nextType:OrderableColumnType) {
    return  order.column != nextType || order.wise == Wise.None ? 
                Wise.Desc :
                order.wise == Wise.Desc ?
                    Wise.Asc :
                    order.wise == Wise.Asc ?
                        Wise.None : 
                        Wise.Desc;
}

function setNextOrder(nextType:OrderableColumnType) {
    order.wise = setNextWise(nextType);
    order.column = nextType;
    drawSheet();
    drawChart();
}

function getWiseClass(type:OrderableColumnType) {
    if (order.column != type || order.wise == Wise.None) return "";
    return  order.wise == Wise.Asc ? "asc" : "dsc";
}

export function sort(a:DataEntry,b:DataEntry) {
    var fa:string|number;
    var fb:string|number;
    switch (order.column) {
        case OrderableColumnType.Country:
            fa = a.country;
            fb = b.country;
            break;
        case OrderableColumnType.Confirmed:
            fa = a.confirmed;
            fb = b.confirmed;
            break;
        case OrderableColumnType.Deaths:
            fa = a.deaths;
            fb = b.deaths;
            break;
        case OrderableColumnType.GDP:
            fa = a.gdp || -1000000;
            fb = b.gdp || -1000000;
            break;
    }
    return (fa < fb ? -1 : fa > fb ? 1 : 0)*order.wise;
}

export function drawSheet() {
    const table = document.getElementById("sheet");
    if (!table) return;
    table.innerHTML = "";
    const country =     <th class={getWiseClass(OrderableColumnType.Country)}>Pays</th>;
    const confirmed =   <th class={getWiseClass(OrderableColumnType.Confirmed)}>nombre de cas</th>;
    const deaths =      <th class={getWiseClass(OrderableColumnType.Deaths)}>Décès</th>;
    const gdp =         <th class={getWiseClass(OrderableColumnType.GDP)}>PIB/hab. en $</th>
    country.onclick = () => setNextOrder(OrderableColumnType.Country);
    confirmed.onclick = () => setNextOrder(OrderableColumnType.Confirmed);
    deaths.onclick = () => setNextOrder(OrderableColumnType.Deaths);
    gdp.onclick = () => setNextOrder(OrderableColumnType.GDP);
    table.appendChild(
    <tr>
        <th>Drapeau</th>
        { country }
        { confirmed }
        { deaths }
        { gdp }
    </tr>);
    //NOTE: Can be optimised i think as we sort the whole array
    if (order.wise != Wise.None) dataTable.sort(sort);
    const a = dataTable.slice(0, nbDisplay);
    for (const e of a) {
        table.appendChild(
            <tr>
                <td class="flag">{ e.flag }</td>
                <td>{ e.country }</td>
                <td>{ e.confirmed.toLocaleString() }</td>
                <td>{ e.deaths.toLocaleString() }</td>
                <td>{ e.gdp != null ? Math.round(e.gdp).toLocaleString() + "$" : "Pas de donnés" }</td>
            </tr>);
    }
}