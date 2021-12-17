import { Code3Letter } from "../../utils/2to3";

export const apiRequest = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=gdp-1960-2017%40euler-hermes&q=&rows=200&facet=country_name&facet=year&refine.year=2018";

export type GdpData = {
    gdp?: number
}

export type GdpDataEntry = GdpData & {
    code3: Code3Letter
}

export interface GdpApiResponse {
    records: {
       fields: {
            country_code: Code3Letter,
            country_name: string,
            gdp_per_capita_current_us: number
       }
    }[];
}

export async function retrieveAllGdpData():Promise<GdpDataEntry[]> {
    const result:GdpApiResponse = await fetch(apiRequest).then(r=>r.json())
    return result.records.map(r=>({
        code3: r.fields.country_code,
        gdp: r.fields.gdp_per_capita_current_us }));
}
