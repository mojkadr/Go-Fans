# Specyfikacja Projektu Go-Fans

**Wersja:** 1.0  
**Status:** MVP w rozwoju  
**Deadline:** 15 grudnia 2025

---

## 🎯 Cel Projektu

Aplikacja mobilna (iOS + Android) do skanowania paragonów i przyznawania punktów lojalnościowych.

## 👥 Użytkownicy

1. **Klienci** - skanują paragony, zbierają punkty
2. **Sklepy** - widzą statystyki, należną marżę

## ⚙️ Funkcjonalności MVP

### Dla Klientów:

#### 1. Rejestracja/Logowanie

- Email + hasło (Supabase Auth)
- Numer telefonu jako identyfikator
- Weryfikacja email

#### 2. Skanowanie Paragonów

```
User flow:
1. Kliknij "Skanuj paragon"
2. Zrób zdjęcie aparatem
3. Potwierdź zdjęcie
4. OCR rozpoznaje dane (loader 5-10s)
5. Pokazuje: sklep, kwotę, punkty
6. Przyznaje punkty
```

**Wymagane dane z paragonu:**

- NIP sklepu (10 cyfr)
- Kwota (SUMA/RAZEM/TOTAL)
- Data zakupu
- Numer paragonu (opcjonalnie)

#### 3. Ekran Główny (Home)

- **Saldo punktów** (duże, widoczne)
- Przycisk "Skanuj paragon"
- Historia ostatnich 5 transakcji
- Mini wykres punktów (opcjonalnie)

#### 4. Historia Transakcji

- Lista wszystkich paragonów
- Filtrowanie: data, sklep, kwota
- Szczegóły po kliknięciu
- Status (zaakceptowane/oczekujące/odrzucone)

#### 5. Profil

- Dane użytkownika
- Statystyki:
  - Łącznie zeskanowano paragonów
  - Oszczędzone złotówki
  - Ulubiony sklep
- Ustawienia
- Wyloguj

### Dla Sklepów (Web Dashboard):

#### Panel Administracyjny

- Należna marża (do zapłaty)
- Liczba transakcji
- Lista klientów
- Eksport danych (CSV)

---

## 💰 Model Biznesowy

### Punkty dla Klientów

```
1 zł = 10 punktów
Minimalny zakup: 10 zł
Maksymalne punkty z jednego paragonu: 5000 (500 zł)
```

### Marża dla Sklepów

```
Sklep płaci: 5% od kwoty zakupu
Przykład: zakup 100 zł → sklep płaci 5 zł
```

### Zabezpieczenia

- Jeden paragon można zeskanować tylko RAZ
- Weryfikacja po numerze paragonu + NIP + data
- Timeout 24h od daty zakupu (tylko świeże paragony)

---

## 🗄️ Struktura Bazy Danych (Supabase)

### Tabela: `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  points_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: `stores`

```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  nip TEXT UNIQUE NOT NULL,
  margin_rate DECIMAL DEFAULT 0.05,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: `receipts`

```sql
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  store_id UUID REFERENCES stores(id),
  amount DECIMAL NOT NULL,
  points_awarded INTEGER NOT NULL,
  receipt_number TEXT,
  receipt_date DATE NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'pending', -- pending/approved/rejected
  ocr_data JSONB, -- pełne dane z OCR
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(receipt_number, store_id, receipt_date)
);
```

### Tabela: `transactions`

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  receipt_id UUID REFERENCES receipts(id),
  type TEXT NOT NULL, -- 'earn' lub 'redeem'
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints

### Authentication

```
POST /auth/register
POST /auth/login
POST /auth/logout
```

### Receipts

```
POST /receipts/scan
  Body: { image: base64, userId: uuid }
  Response: { receiptId, points, status }

GET /receipts/:userId
  Response: [ { id, store, amount, points, date } ]

GET /receipts/:id/details
  Response: { full receipt details }
```

### Points

```
GET /points/:userId
  Response: { balance, totalEarned }

GET /points/:userId/history
  Response: [ transactions ]
```

### Stores (Admin)

```
GET /stores/:storeId/dashboard
  Response: { totalMargin, transactionCount, clients }

GET /stores/:storeId/transactions
  Response: [ transactions ]
```

---

## 🎨 Design Guidelines

### Kolory

```
Primary: #007AFF (niebieski iOS)
Secondary: #34C759 (zielony sukces)
Error: #FF3B30 (czerwony)
Background: #F2F2F7 (jasny szary)
Text: #000000 / #8E8E93 (ciemny/szary)
```

### Fonty

- iOS: SF Pro
- Android: Roboto

### Komponenty

- Używaj React Native Paper lub Native Base
- Konsystentne spacing: 8, 16, 24, 32px
- Border radius: 12px

---

## 🧪 Testowanie

### Przypadki testowe:

1. ✅ Skanowanie poprawnego paragonu
2. ✅ Skanowanie tego samego paragonu 2x (powinien odrzucić)
3. ✅ Paragon poniżej 10 zł (za mało)
4. ✅ Paragon starszy niż 24h
5. ✅ Nieczytelny paragon (OCR fail)
6. ✅ Brak internetu podczas skanowania
7. ✅ Historia transakcji (paginacja)

---

## 📊 Metryki Sukcesu MVP

- [ ] Aplikacja buduje się na iOS i Android
- [ ] OCR rozpoznaje 80%+ paragonów poprawnie
- [ ] Czas skanowania < 10 sekund
- [ ] Zero duplikatów paragonów w bazie
- [ ] 5 sklepów partnerskich dodanych
- [ ] 10 użytkowników testowych zeskanowało 50 paragonów

---

## 🚀 Roadmap Post-MVP

**Faza 2 (styczeń 2025):**

- Wymiana punktów na nagrody
- Push notifications
- Program poleceń

**Faza 3 (luty 2025):**

- Integracja z kasami fiskalnymi
- Kody QR na paragonach
- Panel analytics dla sklepów

---

## ⚠️ Znane Ograniczenia MVP

1. Tylko ręczne skanowanie (bez auto-sync)
2. OCR może mieć 10-20% błędów
3. Brak offline mode
4. Tylko sklepy z listy partnerskiej
5. Brak płatności online (na razie)

---

## 📞 Kontakt & Pytania

Wszystkie pytania techniczne kieruj do:

- GitHub Issues: https://github.com/mojkadr/Go-Fans/issues
- Email: [twój email]

---

**Ostatnia aktualizacja:** 18 listopada 2025
