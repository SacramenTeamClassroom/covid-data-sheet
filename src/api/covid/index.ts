import { Code2Letter, code2to3, Code3Letter } from "../../utils/2to3";

export const apiRequest = "https://api.covid19api.com/summary";

export type CovidDataEntry = {
    country: string,
    code2: Code2Letter,
    code3: Code3Letter,
    confirmed: number,
    deaths: number
}

export type Covid19ApiSummaryEntry = {
    TotalConfirmed: number,
    TotalDeaths: number
}

export type CountrySummaryEntry = Covid19ApiSummaryEntry & {
    Country: string,
    CountryCode: Code2Letter
}

export type Covid19ApiSummary = {
    Global: Covid19ApiSummaryEntry,
    Countries: CountrySummaryEntry[]
}

export async function retrieveAllCovidData():Promise<CovidDataEntry[]> {
    const result:Covid19ApiSummary = await fetch(apiRequest).then(r=>r.json());
    return result.Countries.map(c=>({
        country: c.Country, 
        code2: c.CountryCode,
        code3: code2to3(c.CountryCode), 
        confirmed: c.TotalConfirmed, 
        deaths: c.TotalDeaths }));
}
