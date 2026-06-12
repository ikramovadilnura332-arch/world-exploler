import { Country } from '@/types';

// Ochiq, barqaror va Next.js uchun eng toza ma'lumotlar to'plami
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
    
    // Loyihangiz kutayotgan Country modeliga ma'lumotlarni moslashtiramiz (Mapping)
    const countries = rawCountries.map((c: any) => {
      // mledoze bazasida cca3 yo'q bo'lsa, variantlarni tekshiramiz
      const cca3Code = c.cca3 || c.cca2 || String(c.numericCode || '');
      
      // Bayroq rasmini aniq aniqlash (PNG formatini qidirish)
      let flagPng = '';
      if (c.flags && typeof c.flags === 'object') {
        flagPng = Array.isArray(c.flags) ? c.flags[0] : (c.flags.png || c.flags.svg || '');
      }

      // Davlat nomini to'g'rilash
      let commonName = "Noma'lum";
      if (c.name) {
        commonName = typeof c.name === 'object' ? (c.name.common || c.name.official || "Noma'lum") : String(c.name);
      }

      return {
        ...c,
        cca3: cca3Code,
        flags: {
          png: flagPng || `https://flagcdn.com/w320/${(c.cca2 || '').toLowerCase()}.png`, // Agar rasm bo'lmasa flagcdn'dan yuklaydi
          alt: c.flags?.alt || `${commonName} bayrog'i`
        },
        name: {
          common: commonName
        },
        population: Number(c.population) || 0,
        region: c.region || 'Boshqa',
        capital: Array.isArray(c.capital) ? c.capital : [c.capital || 'N/A']
      };
    });

    // Nom bo'yicha tartiblash (A -> Z)
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