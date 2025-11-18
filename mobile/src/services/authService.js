import { supabase } from '../config/supabase';

export const authService = {
  // Rejestracja nowego użytkownika
  async signUp(email, password, role = 'client') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role, // 'admin', 'store_worker', 'client'
          },
        },
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logowanie
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Wylogowanie
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Pobierz aktualnego użytkownika
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Pobierz rolę użytkownika
  getUserRole(user) {
    return user?.user_metadata?.role || 'client';
  },
};
