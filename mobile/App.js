import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import {
  AuthNavigator,
  ClientNavigator,
  AdminNavigator,
  StoreWorkerNavigator,
} from './src/navigation/AppNavigator';

function AppContent() {
  const { user, role, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Ładowanie...</Text>
      </View>
    );
  }

  // Jeśli użytkownik nie zalogowany - pokaż ekran logowania
  if (!user) {
    return <AuthNavigator />;
  }

  // Jeśli zalogowany - pokaż odpowiedni panel w zależności od roli
  switch (role) {
    case 'admin':
      return <AdminNavigator />;
    case 'store_worker':
      return <StoreWorkerNavigator />;
    case 'client':
    default:
      return <ClientNavigator />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
});
