import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const points = 0; // Na razie na sztywno, później z bazy danych

  const handleScanReceipt = () => {
    Alert.alert(
      '📸 Skanowanie paragonu',
      'Funkcja skanowania będzie dostępna wkrótce!',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Go-Fans</Text>
        <Text style={styles.headerSubtitle}>Aplikacja Lojalnościowa</Text>
      </View>

      {/* Points Card */}
      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Twoje punkty</Text>
        <Text style={styles.pointsValue}>{points}</Text>
        <Text style={styles.pointsInfo}>1 zł = 10 punktów</Text>
      </View>

      {/* Scan Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={handleScanReceipt}
        activeOpacity={0.8}
      >
        <Text style={styles.scanButtonIcon}>📸</Text>
        <Text style={styles.scanButtonText}>Skanuj paragon</Text>
      </TouchableOpacity>

      {/* Quick Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>💡 Skanuj paragony i zdobywaj punkty!</Text>
      </View>

      {/* Version */}
      <Text style={styles.version}>v0.1.0 - MVP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  pointsInfo: {
    fontSize: 14,
    color: '#8E8E93',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scanButtonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 'auto',
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
  },
  version: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 20,
  },
});
