# 🌍 WorldExplorer — Dunyo Davlatlari Platformasi

Butun dunyo bo'yicha **250+ davlat** haqida to'liq ma'lumot ko'rsatuvchi zamonaviy Next.js platformasi.

## 🚀 Texnologiyalar

- **Next.js 15** (App Router) — Server va Client Komponentlar
- **TypeScript** — To'liq type xavfsizligi
- **Tailwind CSS** — Zamonaviy responsive dizayn
- **REST Countries API** — Bepul ma'lumot manbasi
- **Vercel** — Deploy platformasi

## ✨ Imkoniyatlar

- 🔍 **Qidiruv** — Davlat nomi bo'yicha real-time qidiruv (debounce bilan)
- 🌍 **Region filtri** — 6 ta region bo'yicha filtrlash
- 📊 **Saralash** — Nom, aholi, maydon bo'yicha saralash
- 📄 **Detail sahifa** — Har bir davlatning to'liq ma'lumotlari
- ❤️ **Sevimlilar** — localStorage yordamida saqlash
- 🌙 **Dark Mode** — Tungi rejim toggle
- 📱 **Responsive** — Mobil, tablet, desktop uchun optimallashtirilgan

## 🛠️ Ishga tushirish

```bash
# 1. Dependencies o'rnatish
npm install

# 2. Dev server ishga tushirish
npm run dev

# 3. Build qilish
npm run build
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## 📁 Papka Tuzilmasi

```
world-explorer/
├── app/                    # Next.js App Router sahifalari
│   ├── layout.tsx          # Asosiy layout
│   ├── page.tsx            # Bosh sahifa
│   ├── country/[cca3]/     # Davlat detail sahifasi
│   └── favorites/          # Sevimlilar sahifasi
├── components/             # React komponentlar
├── lib/api.ts              # API funksiyalari
├── types/index.ts          # TypeScript types
├── hooks/                  # Custom hooks
└── utils/formatters.ts     # Yordamchi funksiyalar
```

## 🔗 API

[REST Countries API](https://restcountries.com/v3.1) — Bepul, auth kerak emas.

---

Made with ❤️ using Next.js 15 & TypeScript
