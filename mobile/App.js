import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// MINIMALNY TEST - BEZ SUPABASE, BEZ NAWIGACJI
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Go-Fans</Text>
      <Text style={styles.subtitle}>Test aplikacji</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => Alert.alert('Działa!', 'Aplikacja się uruchomiła!')}
      >
        <Text style={styles.buttonText}>Kliknij mnie</Text>
      </TouchableOpacity>
      
      <Text style={styles.info}>Jeśli widzisz ten ekran - React Native działa!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
