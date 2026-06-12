export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: { official: string; common: string } };
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface Languages {
  [key: string]: string;
}

export interface Maps {
  googleMaps?: string;
  openStreetMaps?: string;
}

export interface Country {
  name: Name;
  flags: Flags;
  population: number;
  area: number;
  region: string;
  subregion?: string;
  capital?: string[];
  languages?: Languages;
  currencies?: Currencies;
  borders?: string[];
  latlng?: number[];
  cca3: string;
  tld?: string[];
  timezones?: string[];
  continents?: string[];
  maps?: Maps;
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  coatOfArms?: { png?: string; svg?: string };
  startOfWeek?: string;
  capitalInfo?: { latlng?: number[] };
  fifa?: string;
  car?: { signs?: string[]; side?: string };
  postalCode?: { format?: string; regex?: string };
  status?: string;
  idd?: { root?: string; suffixes?: string[] };
  altSpellings?: string[];
  translations?: { [key: string]: { official: string; common: string } };
  demonyms?: { [key: string]: { f: string; m: string } };
  gini?: { [key: string]: number };
  cca2?: string;
  ccn3?: string;
  cioc?: string;
  flag?: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc' | 'area-desc' | 'area-asc';

export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';
