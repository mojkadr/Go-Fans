import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qzrjqyfyjmlifkdclgoi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cmpxeWZ5am1saWZrZGNsZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NzcyODYsImV4cCI6MjA3OTA1MzI4Nn0.GvkCRqmQXRENO354lRzCKhKffJDRnQsV-rvBkLD85BE';

// TYMCZASOWO: Wyłączamy persistence żeby aplikacja działała
// Będzie trzeba się logować przy każdym restarcie, ale przynajmniej zadziała
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
