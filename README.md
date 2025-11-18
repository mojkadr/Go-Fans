# Go-Fans - Aplikacja Lojalnościowa

![Status](https://img.shields.io/badge/status-w%20rozwoju-yellow)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)

## 📱 O Projekcie

**Aplikacja do skanowania paragonów i zbierania punktów**

Aplikacja mobilna pozwalająca na:

- Skanowanie paragonów z lokalnych sklepów
- Automatyczne przyznawanie punktów lojalnościowych (1 zł = 10 punktów)
- System marży dla sklepów partnerskich (5%)

**Status:** 🚧 W rozwoju - MVP do 15 grudnia 2025

## 🚀 Tech Stack

**Mobile App:**

- React Native + Expo
- React Navigation
- Supabase (backend)

**OCR:**

- Tesseract.js / Google Vision API

**Database:**

- Supabase (PostgreSQL)

## 📦 Instalacja

### Wymagania

- Node.js >= 18
- npm lub yarn
- Expo CLI
- Konto Expo

### Setup

```bash
# Sklonuj repo
git clone https://github.com/mojkadr/Go-Fans.git
cd Go-Fans

# Zainstaluj zależności mobile
cd mobile
npm install

# Uruchom w trybie deweloperskim
npm start
```

## 🗂️ Struktura Projektu

```
Go-Fans/
├── README.md           # Główny opis projektu
├── .gitignore          # Pliki ignorowane przez git
├── docs/               # Dokumentacja
│   ├── PROJECT_SPEC.md # Pełna specyfikacja projektu
│   └── DEVELOPMENT.md  # Notatki z rozwoju
├── mobile/             # Aplikacja React Native + Expo
└── scripts/            # Pomocnicze skrypty
```

## 📋 Roadmap

- [x] Setup projektu
- [ ] Ekran logowania/rejestracji
- [ ] Funkcja skanowania paragonów
- [ ] Integracja OCR
- [ ] System punktów
- [ ] Panel dla sklepów
- [ ] Build produkcyjny

## 👥 Autorzy

- [@mojkadr](https://github.com/mojkadr)

## 📄 Licencja

MIT

## 🔗 Linki

- 📋 [Pełna specyfikacja projektu](./docs/PROJECT_SPEC.md) - przeczytaj to najpierw!
- 📝 [Notatki z rozwoju](./docs/DEVELOPMENT.md)
- 💻 [Repozytorium GitHub](https://github.com/mojkadr/Go-Fans)
