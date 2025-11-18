import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// UWAGA: To są przykładowe wartości
// Będziesz musiał je zmienić na prawdziwe po stworzeniu projektu Supabase
const SUPABASE_URL = 'https://qzrjqyfyjmlifkdclgoi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cmpxeWZ5am1saWZrZGNsZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NzcyODYsImV4cCI6MjA3OTA1MzI4Nn0.GvkCRqmQXRENO354lRzCKhKffJDRnQsV-rvBkLD85BE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: null, // Używamy AsyncStorage później
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
