# Notatki z Rozwoju - Go-Fans

**Data rozpoczęcia:** 18 listopada 2025
**Cel:** MVP do 15 grudnia 2025

---

## 📝 Dziennik Rozwoju

### 18 listopada 2025 - Setup Projektu

**Co zrobiono:**
- ✅ Stworzono strukturę folderów projektu
- ✅ Utworzono README.md z opisem projektu
- ✅ Przygotowano pełną specyfikację w PROJECT_SPEC.md
- ✅ Skonfigurowano .gitignore dla React Native/Expo

**Następne kroki:**
- [ ] Inicjalizacja projektu React Native z Expo
- [ ] Setup Supabase (baza danych + auth)
- [ ] Stworzenie pierwszego ekranu (splash screen)

**Notatki:**
- Projekt używa React Native + Expo dla łatwiejszego developmentu
- Supabase będzie używany jako backend (PostgreSQL + Auth + Storage)
- OCR będzie implementowany w późniejszym etapie

---

## 🔧 Problemy i Rozwiązania

### Problem: Wybór technologii OCR

**Opcje:**
1. **Tesseract.js** - darmowy, offline, ale słabsza jakość
2. **Google Vision API** - płatny ($1.50 za 1000 requestów), lepsza jakość
3. **AWS Textract** - płatny, bardzo dobry dla paragonów

**Decyzja:** Najpierw prototyp z Tesseract.js, potem ewentualnie Google Vision API

---

### Problem: Jak zapobiec duplikatom paragonów?

**Rozwiązanie:** Unique constraint w bazie danych:
```sql
UNIQUE(receipt_number, store_id, receipt_date)
```

Dodatkowo sprawdzenie po stronie klienta przed wysłaniem.

---

## 💡 Pomysły na Przyszłość

**Post-MVP (Faza 2):**
- Gamifikacja (achievementy, rankingi)
- Wymiana punktów na kupony/zniżki
- Push notifications o nowych promocjach
- Dark mode

**Post-MVP (Faza 3):**
- Integracja z kasami fiskalnymi (automatyczne paragony)
- QR kody na paragonach dla szybszego skanowania
- Panel analytics dla sklepów (wykresy, statystyki)
- Aplikacja webowa dla sklepów

---

## 📚 Przydatne Linki

### Dokumentacja
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Supabase Docs](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)

### Tutoriale
- [Expo Camera Tutorial](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Supabase Auth w React Native](https://supabase.com/docs/guides/auth/auth-helpers/react-native)
- [OCR w React Native](https://github.com/tesseract-ocr/tesseract)

---

## ✅ Checklist przed Wdrożeniem MVP

### Aplikacja Mobilna
- [ ] Ekran logowania/rejestracji działa
- [ ] Kamera skanuje paragony
- [ ] OCR rozpoznaje dane (NIP, kwota, data)
- [ ] Punkty są przyznawane poprawnie
- [ ] Historia transakcji wyświetla się
- [ ] Profil użytkownika działa
- [ ] Aplikacja buduje się na iOS
- [ ] Aplikacja buduje się na Android
- [ ] Testy manualne przeszły

### Backend (Supabase)
- [ ] Tabele utworzone poprawnie
- [ ] RLS (Row Level Security) skonfigurowany
- [ ] Auth działa (email + hasło)
- [ ] Storage dla zdjęć paragonów
- [ ] API endpoints przetestowane

### Testy
- [ ] 10 użytkowników testowych
- [ ] 50+ paragonów zeskanowanych
- [ ] 0 duplikatów w bazie
- [ ] OCR accuracy > 80%

---

## 🐛 Known Bugs

_Pusta - będzie uzupełniana w trakcie rozwoju_

---

## 🎯 Sprint Planning

### Sprint 1 (18-24 listopada)
- [ ] Setup projektu Expo
- [ ] Podstawowa nawigacja (Home, Profile, History)
- [ ] Ekran logowania/rejestracji UI

### Sprint 2 (25 listopada - 1 grudnia)
- [ ] Integracja Supabase Auth
- [ ] Implementacja kamery
- [ ] Prototyp OCR

### Sprint 3 (2-8 grudnia)
- [ ] System punktów
- [ ] Historia transakcji
- [ ] Finalne testy

### Sprint 4 (9-15 grudnia)
- [ ] Bugfixy
- [ ] Build produkcyjny
- [ ] Wdrożenie MVP

---

**Ostatnia aktualizacja:** 18 listopada 2025
