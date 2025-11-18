import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go-Fans 🎉</Text>
      <Text style={styles.subtitle}>Aplikacja Lojalnościowa</Text>
      <Text style={styles.info}>Wersja 0.1.0 - MVP</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 20,
  },
});
