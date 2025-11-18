# Instrukcja Setup Supabase dla Go-Fans

## 🎯 Co to jest Supabase?

Supabase to **backend as a service** - darmowa alternatywa dla Firebase. Daje Ci:
- 📊 Bazę danych PostgreSQL
- 🔐 Autoryzację (logowanie/rejestracja)
- 💾 Storage (przechowywanie plików)
- ⚡ Realtime (aktualizacje na żywo)

---

## 📋 KROK 1: Stwórz konto Supabase

1. Wejdź na: **https://supabase.com**
2. Kliknij **"Start your project"**
3. Zaloguj się przez GitHub (najłatwiejsze)
4. Zweryfikuj email

---

## 🚀 KROK 2: Stwórz nowy projekt

1. Kliknij **"New Project"**
2. Wypełnij formularz:
   - **Name:** `go-fans` lub `go-fans-mvp`
   - **Database Password:** Wymyśl mocne hasło (zapisz je!)
   - **Region:** Wybierz najbliższy (np. `Europe Central`)
   - **Pricing Plan:** **Free** (wystarczy na początek)
3. Kliknij **"Create new project"**
4. Poczekaj ~2 minuty (projekt się tworzy)

---

## 🔑 KROK 3: Skopiuj klucze API

1. W bocznym menu kliknij **⚙️ Settings**
2. Kliknij **API**
3. Znajdź:
   - **Project URL** - np. `https://xxxabcxxx.supabase.co`
   - **anon public** key - długi ciąg znaków (kliknij "Copy")

4. **Otwórz plik:** `mobile/src/config/supabase.js`

5. **Zamień wartości:**
```javascript
// Było:
const SUPABASE_URL = 'https://twoj-projekt.supabase.co';
const SUPABASE_ANON_KEY = 'twoj-anon-key';

// Ma być (TWOJE prawdziwe wartości):
const SUPABASE_URL = 'https://xxxabcxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

6. **Zapisz plik!**

---

## 🗄️ KROK 4: Stwórz tabele w bazie danych

1. W bocznym menu kliknij **🗄️ Database**
2. Kliknij **SQL Editor**
3. Kliknij **"New query"**
4. **Wklej poniższy kod SQL:**

```sql
-- Tabela: users (rozszerzona)
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  points_balance INTEGER DEFAULT 0,
  role TEXT DEFAULT 'client', -- 'client', 'store_worker', 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: stores (sklepy partnerskie)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  nip TEXT UNIQUE NOT NULL,
  margin_rate DECIMAL DEFAULT 0.05, -- 5%
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: receipts (paragony)
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  store_id UUID REFERENCES stores(id),
  amount DECIMAL NOT NULL,
  points_awarded INTEGER NOT NULL,
  receipt_number TEXT,
  receipt_date DATE NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  ocr_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(receipt_number, store_id, receipt_date)
);

-- Tabela: transactions (historia punktów)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  receipt_id UUID REFERENCES receipts(id),
  type TEXT NOT NULL, -- 'earn' lub 'redeem'
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Funkcja: Automatyczne tworzenie rekordu w users po rejestracji
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Uruchom funkcję po każdej rejestracji
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS (Row Level Security) - zabezpieczenia
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Polityki RLS dla users
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Polityki RLS dla receipts
CREATE POLICY "Users can read own receipts"
  ON receipts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own receipts"
  ON receipts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Polityki RLS dla transactions
CREATE POLICY "Users can read own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);
```

5. Kliknij **"Run"** (lub Ctrl+Enter)
6. Powinieneś zobaczyć: ✅ **"Success. No rows returned"**

---

## ✅ KROK 5: Sprawdź czy działa

1. W bocznym menu kliknij **🗄️ Database**
2. Kliknij **Tables**
3. Powinieneś zobaczyć 4 tabele:
   - `users`
   - `stores`
   - `receipts`
   - `transactions`

---

## 🔐 KROK 6: Konfiguracja Auth (Email)

1. W bocznym menu kliknij **🔐 Authentication**
2. Kliknij **Settings**
3. Znajdź **"Email Auth"**
4. Włącz:
   - ✅ **Enable email signup**
   - ✅ **Enable email confirmations** (opcjonalnie - wyłącz dla testów)

---

## 🧪 KROK 7: Testowanie

### Test 1: Rejestracja
1. Uruchom aplikację: `npm start`
2. Kliknij **"Zarejestruj się"**
3. Wybierz rolę: **Klient**
4. Wypełnij formularz i zatwierdź
5. **Sprawdź w Supabase:**
   - Wejdź: **Authentication → Users**
   - Powinieneś zobaczyć nowego użytkownika!

### Test 2: Logowanie
1. Zaloguj się używając utworzonego konta
2. Powinieneś zobaczyć ekran główny klienta (z punktami)

### Test 3: Role użytkowników
Stwórz 3 konta z różnymi rolami:
- **Klient** → Zobaczysz ekran z punktami i przycisk "Skanuj paragon"
- **Admin** → Zobaczysz panel zarządzania klientami
- **Pracownik sklepu** → Zobaczysz statystyki sklepu

---

## 📊 KROK 8: Dodaj przykładowe dane (opcjonalnie)

Wejdź do **SQL Editor** i uruchom:

```sql
-- Dodaj przykładowy sklep
INSERT INTO stores (name, nip, margin_rate)
VALUES
  ('Sklep Spożywczy ABC', '1234567890', 0.05),
  ('Market XYZ', '0987654321', 0.05);

-- Sprawdź czy dodało się
SELECT * FROM stores;
```

---

## 🚨 Rozwiązywanie Problemów

### Problem: "Invalid API key"
**Rozwiązanie:**
- Sprawdź czy skopiowałeś **anon public** key (nie service_role!)
- Sprawdź czy URL się zgadza
- Usuń spacje z początku/końca klucza

### Problem: "Failed to fetch"
**Rozwiązanie:**
- Sprawdź połączenie internetowe
- Sprawdź czy projekt Supabase jest aktywny (Settings → General)

### Problem: Nie mogę się zarejestrować
**Rozwiązanie:**
- Sprawdź czy Email Auth jest włączony
- Sprawdź czy RLS policies są utworzone
- Sprawdź czy trigger `on_auth_user_created` działa

---

## 📱 Co dalej?

Po skonfigurowaniu Supabase możesz:

1. **Rozszerzyć autoryzację:**
   - Dodać reset hasła
   - Dodać logowanie przez Google/Facebook

2. **Dodać Storage dla zdjęć paragonów:**
   - Storage → Create bucket: `receipts`
   - Przechowuj zdjęcia paragonów

3. **Dodać Realtime:**
   - Aktualizacje punktów na żywo
   - Powiadomienia o nowych paragonach

---

## 💰 Limity darmowego planu

**Free Tier:**
- ✅ 500 MB bazy danych
- ✅ 1 GB storage
- ✅ 2 GB bandwidth/miesiąc
- ✅ 50,000 Monthly Active Users

**To wystarczy na:**
- ~10,000 użytkowników
- ~100,000 paragonów
- Testy MVP

**Kiedy upgrade?**
- Pro plan: $25/miesiąc (więcej mocy, więcej storage)

---

## 🔗 Przydatne Linki

- [Supabase Documentation](https://supabase.com/docs)
- [Auth Helpers for React Native](https://supabase.com/docs/guides/auth/auth-helpers/react-native)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Gotowe! Twoja aplikacja jest połączona z Supabase!** 🎉

Teraz możesz testować logowanie, rejestrację i zarządzanie użytkownikami.
