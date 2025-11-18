import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// UWAGA: To są przykładowe wartości
// Będziesz musiał je zmienić na prawdziwe po stworzeniu projektu Supabase
const SUPABASE_URL = 'https://twoj-projekt.supabase.co';
const SUPABASE_ANON_KEY = 'twoj-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: null, // Używamy AsyncStorage później
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
