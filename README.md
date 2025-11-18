# Go-Fans - Aplikacja Lojalnościowa

![Status](https://img.shields.io/badge/status-w%20rozwoju-yellow)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)

## 📱 O Projekcie

Aplikacja mobilna pozwalająca na:

- Skanowanie paragonów z lokalnych sklepów
- Automatyczne przyznawanie punktów lojalnościowych
- System marży dla sklepów partnerskich

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
mobile/          # Aplikacja React Native
backend/         # API (opcjonalne, używamy Supabase)
web-dashboard/   # Panel dla sklepów
docs/            # Dokumentacja
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

- [Dokumentacja projektu](./docs/PROJECT_SPEC.md)
- [Notatki z rozwoju](./docs/DEVELOPMENT.md)
