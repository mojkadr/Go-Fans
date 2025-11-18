# Przewodnik Testowania Aplikacji Go-Fans

**Ostatnia aktualizacja:** 18 listopada 2025

---

## 📱 2 Sposoby Testowania Aplikacji

### **SPOSÓB A: Expo Go (Szybki - Polecany na początek)**
✅ Idealny do developmentu
✅ Zmiany widoczne natychmiast
✅ Nie trzeba budować aplikacji
⏱️ Czas: ~2 minuty setup

### **SPOSÓB B: Plik APK (Prawdziwa aplikacja)**
✅ Prawdziwa aplikacja jak z Google Play
✅ Działa bez internetu
✅ Możesz wysłać znajomym
⏱️ Czas: ~15 minut (build + instalacja)

---

# SPOSÓB A: Testowanie przez Expo Go

## Krok 1: Zainstaluj Expo Go na telefonie

### iPhone (iOS):
1. Otwórz **App Store**
2. Wyszukaj: **"Expo Go"**
3. Kliknij **"Pobierz"**
4. Zainstaluj aplikację (darmowa)

### Android:
1. Otwórz **Google Play**
2. Wyszukaj: **"Expo Go"**
3. Kliknij **"Zainstaluj"**
4. Zainstaluj aplikację (darmowa)

---

## Krok 2: Uruchom projekt na komputerze

Otwórz terminal i wpisz:

```bash
cd /home/user/Go-Fans/mobile
npm start
```

**Co zobaczysz:**
```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or Camera app (iOS)

█████████████████████████████
█████████████████████████████
███ ▄▄▄▄▄ █▀█ █▄▀▄ ▄▄▄▄▄ ███
███ █   █ █▀▀▀█▄ █ █   █ ███
...
```

**WAŻNE:** Zostaw terminal otwarty! Metro bundler musi działać.

---

## Krok 3: Zeskanuj QR kod

### iPhone:
1. Otwórz **normalną aplikację Aparat** (Camera)
2. Naceluj na QR kod na ekranie komputera
3. Pojawi się powiadomienie: **"Otwórz w Expo Go"**
4. Kliknij powiadomienie

### Android:
1. Otwórz aplikację **Expo Go**
2. Kliknij **"Scan QR code"**
3. Zeskanuj QR kod z ekranu komputera
4. Poczekaj ~5 sekund

---

## Krok 4: Testuj aplikację! 🎉

Zobaczysz ekran:

```
┌─────────────────────────┐
│      Go-Fans            │
│ Aplikacja Lojalnościowa │
│                         │
│  ┌───────────────────┐  │
│  │  Twoje punkty     │  │
│  │       0           │  │
│  │  1 zł = 10 pkt    │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ 📸 Skanuj paragon │  │
│  └───────────────────┘  │
│                         │
│  💡 Skanuj paragony i   │
│     zdobywaj punkty!    │
│                         │
│    v0.1.0 - MVP         │
└─────────────────────────┘
```

**Testuj:**
1. Kliknij przycisk **"Skanuj paragon"** → Powinien pokazać alert
2. Sprawdź czy wszystko wygląda dobrze

---

## Krok 5: Hot Reload (MAGIA! ✨)

**Zmień coś w kodzie i zobacz natychmiastową zmianę:**

1. Otwórz plik: `/home/user/Go-Fans/mobile/App.js`
2. Zmień linię 5: `const points = 0;` na `const points = 150;`
3. Zapisz plik (Ctrl+S)
4. **Aplikacja na telefonie odświeży się SAMA!**
5. Teraz widzisz 150 punktów zamiast 0! 🎉

**Nie musisz:**
- ❌ Restartować aplikacji
- ❌ Skanować QR kodu ponownie
- ❌ Rebuildować projektu

---

## Rozwiązywanie Problemów

### Problem: QR kod nie działa
**Rozwiązanie:**
- Upewnij się że telefon i komputer są w tej samej sieci WiFi
- Sprawdź czy firewall nie blokuje połączenia
- Spróbuj wpisać adres ręcznie w Expo Go (exp://192.168.1.100:8081)

### Problem: "Unable to resolve module"
**Rozwiązanie:**
```bash
cd /home/user/Go-Fans/mobile
rm -rf node_modules
npm install
npm start
```

### Problem: Aplikacja się nie ładuje
**Rozwiązanie:**
- Sprawdź czy `npm start` wciąż działa
- Kliknij `r` w terminalu aby zrestartować
- Zamknij i otwórz ponownie Expo Go

---

# SPOSÓB B: Budowanie Pliku APK

## Krok 1: Zainstaluj EAS CLI

W terminalu:

```bash
npm install -g eas-cli
```

---

## Krok 2: Zaloguj się do Expo

```bash
eas login
```

**Jeśli nie masz konta:**
```bash
eas register
```

Wypełnij:
- Username: `twojnick`
- Email: `twoj@email.com`
- Password: `***`

---

## Krok 3: Skonfiguruj projekt

```bash
cd /home/user/Go-Fans/mobile
eas build:configure
```

Wybierz:
- Platform: **Android** (Enter)
- Create `eas.json`: **Yes** (Enter)

---

## Krok 4: Zbuduj APK

```bash
eas build --platform android --profile preview
```

**Co się stanie:**
1. Projekt zostanie uploadowany do serwerów Expo
2. Build rozpocznie się (~10-15 minut)
3. Zobaczysz link do śledzenia postępu

**Przykładowy output:**
```
✔ Build completed!

Download URL:
https://expo.dev/artifacts/eas/abc123.apk

Scan QR code to download:
█████████████████
█████████████████
```

---

## Krok 5: Pobierz i zainstaluj APK

### Opcja A: Przez QR kod
1. Otwórz przeglądarkę na telefonie
2. Zeskanuj QR kod z terminala
3. Pobierz plik `.apk`
4. Kliknij na pobrany plik
5. Zainstaluj aplikację

### Opcja B: Przez link
1. Skopiuj URL z terminala
2. Wyślij sobie na email/WhatsApp
3. Otwórz link na telefonie
4. Pobierz i zainstaluj

**WAŻNE (Android):**
- Włącz "Instalacja z nieznanych źródeł" w ustawieniach
- Settings → Security → Unknown sources → ON

---

## Krok 6: Przetestuj aplikację

Aplikacja jest teraz zainstalowana jak normalna aplikacja z Google Play!

✅ Działa offline
✅ Ikona na ekranie głównym
✅ Możesz wysłać APK znajomym

---

## Jak aktualizować APK?

**Gdy zmienisz kod:**

1. Zmień wersję w `package.json` i `app.json`:
   ```json
   "version": "0.2.0"
   ```

2. Commitnij zmiany:
   ```bash
   git add .
   git commit -m "v0.2.0 - Nowe funkcje"
   ```

3. Zbuduj nową wersję:
   ```bash
   eas build --platform android --profile preview
   ```

4. Pobierz nowy APK i zainstaluj (nadpisze starą wersję)

---

## Koszty

**Darmowy plan Expo:**
- ✅ 30 buildów/miesiąc (Android + iOS)
- ✅ Wystarczy na development

**Jeśli potrzebujesz więcej:**
- Plan Production: $29/miesiąc (nieograniczone buildy)

---

## Co dalej?

### Dla testów developerskich (codziennych):
→ Używaj **Expo Go** (Sposób A)

### Dla testów końcowych (przed wypuszczeniem):
→ Używaj **APK** (Sposób B)

### Dla publikacji w Google Play:
→ `eas build --platform android --profile production`

---

## Przydatne Komendy

```bash
# Uruchom aplikację
npm start

# Uruchom na Androidzie (jeśli masz emulator)
npm run android

# Uruchom na iOS (tylko macOS)
npm run ios

# Sprawdź status buildów
eas build:list

# Zobacz logi buildu
eas build:view [build-id]

# Anuluj build
eas build:cancel
```

---

## 🎯 Podsumowanie

| Cecha | Expo Go | APK |
|-------|---------|-----|
| Czas setup | 2 min | 15 min |
| Hot reload | ✅ Tak | ❌ Nie |
| Wymaga internetu | ✅ Tak | ❌ Nie |
| Prawdziwa aplikacja | ❌ Nie | ✅ Tak |
| Wysłanie znajomym | ❌ Trudne | ✅ Łatwe |
| Idealny do | Development | Testy finalne |

---

**Powodzenia! 🚀**

Jeśli masz problemy, sprawdź:
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
