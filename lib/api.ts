import { Country } from '@/types';

// Dunyo miqyosidagi rasmiy va jonli Rest Countries API manzili
const API_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API_URL}/all`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Xatolik: ${response.status}`);
    }

    const data = await response.json();
    
    // Loyihangiz kutayotgan Country modeliga ma'lumotlarni moslashtiramiz (Mapping)
    const countries = data.map((c: any) => {
      const cca3Code = c.cca3 || c.cca2 || '';
      
      return {
        ...c,
        cca3: cca3Code,
        flags: {
          png: c.flags?.png || c.flags?.svg || `https://flagcdn.com/w320/${cca3Code.toLowerCase().substring(0, 2)}.png`,
          alt: c.flags?.alt || `${c.name?.common || 'Davlat'} bayrog'i`
        },
        name: {
          common: c.name?.common || c.name?.official || "Noma'lum"
        },
        population: Number(c.population) || 0, // Endi API'dan haqiqiy aholi soni keladi
        region: c.region || 'Boshqa',
        capital: Array.isArray(c.capital) ? c.capital : [c.capital || 'N/A']
      };
    });

    // Nom bo'yicha tartiblash (A -> Z)
    return countries.sort((a: Country, b: Country) => {
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
    const response = await fetch(`${API_URL}/alpha/${code}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Davlat topilmadi');
    }

    const data = await response.json();
    const c = data[0]; // Rest Countries bitta davlatni massiv ichida qaytaradi

    return {
      ...c,
      cca3: c.cca3 || code,
      flags: {
        png: c.flags?.png || c.flags?.svg || '',
        alt: c.flags?.alt || `${c.name?.common} bayrog'i`
      },
      name: {
        common: c.name?.common || "Noma'lum"
      },
      population: Number(c.population) || 0,
      region: c.region || 'Boshqa',
      capital: Array.isArray(c.capital) ? c.capital : [c.capital || 'N/A']
    };
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