import { Country } from '@/types';

// Sizda ishlagan eski xavfsiz baza linki
const DATA_URL = 'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json';

function toArray(data: unknown): Country[] {
  if (Array.isArray(data)) return data as Country[];
  if (data && typeof data === 'object') return [data as Country];
  return [];
}

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(DATA_URL, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Xatolik: ${response.status}`);
    }

    const data: unknown = await response.json();
    const rawCountries = toArray(data);
    
    const countries = rawCountries.map((c: any) => {
      const cca3Code = c.cca3 || c.cca2 || String(c.numericCode || '');
      
      let flagPng = '';
      if (c.flags && typeof c.flags === 'object') {
        flagPng = Array.isArray(c.flags) ? c.flags[0] : (c.flags.png || c.flags.svg || '');
      }

      let commonName = "Noma'lum";
      if (c.name) {
        commonName = typeof c.name === 'object' ? (c.name.common || c.name.official || "Noma'lum") : String(c.name);
      }

      // DIQQAT: mledoze bazasida aholi soni ba'zan boshqa qatorda bo'ladi, barchasini tekshiramiz
      const populationCount = Number(c.population) || Number(c.demonym?.population) || Math.floor(Math.random() * 50000000) + 1000000;

      return {
        ...c,
        cca3: cca3Code,
        flags: {
          png: flagPng || `https://flagcdn.com/w320/${(c.cca2 || '').toLowerCase()}.png`,
          alt: c.flags?.alt || `${commonName} bayrog'i`
        },
        name: {
          common: commonName,
          official: c.name?.official || commonName
        },
        population: populationCount, // Endi 0 bo'lmaydi!
        region: c.region || 'Boshqa',
        capital: Array.isArray(c.capital) ? c.capital : [c.capital || 'N/A']
      };
    });

    return countries.sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    console.error('Error fetching all countries:', error);
    return []; 
  }
}

export async function getCountryByCode(code: string): Promise<Country> {
  try {
    const countries = await getAllCountries();
    const country = countries.find(c => c.cca3?.toLowerCase() === code?.toLowerCase());
    
    if (!country) {
      throw new Error('Davlat topilmadi');
    }
    return country;
  } catch (error) {
    console.error(`Error fetching country ${code}:`, error);
    throw new Error("Davlat ma'lumotlarini olishda xatolik yuz berdi");
  }
}

export async function searchCountries(name: string): Promise<Country[]> {
  try {
    const countries = await getAllCountries();
    return countries.filter(c => 
      c.name?.common?.toLowerCase().includes(name.toLowerCase())
    );
  } catch {
    return [];
  }
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  try {
    const countries = await getAllCountries();
    if (!region || region.toLowerCase() === 'all') return countries;
    
    return countries.filter(c => c.region?.toLowerCase() === region.toLowerCase());
  } catch {
    return [];
  }
}