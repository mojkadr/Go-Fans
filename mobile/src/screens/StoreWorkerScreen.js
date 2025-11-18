import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { authService } from '../services/authService';

export default function StoreWorkerScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    commission: 0,
    clients: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    // SYMULACJA - w prawdziwej aplikacji pobierzesz z Supabase
    setStats({
      totalTransactions: 45,
      totalAmount: 5250.50,
      commission: 262.53, // 5% z totalAmount
      clients: 23,
    });
  };

  const handleLogout = async () => {
    Alert.alert(
      'Wylogowanie',
      'Czy na pewno chcesz się wylogować?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Wyloguj',
          style: 'destructive',
          onPress: async () => {
            await authService.signOut();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Panel Sklepu</Text>
          <Text style={styles.headerSubtitle}>Statystyki i transakcje</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>{stats.totalTransactions}</Text>
            <Text style={styles.statLabel}>Transakcje</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>
              {stats.totalAmount.toFixed(2)} zł
            </Text>
            <Text style={styles.statLabel}>Obrót</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💳</Text>
            <Text style={styles.statValue}>
              {stats.commission.toFixed(2)} zł
            </Text>
            <Text style={styles.statLabel}>Marża (5%)</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statValue}>{stats.clients}</Text>
            <Text style={styles.statLabel}>Klienci</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Informacje</Text>
          <Text style={styles.infoText}>
            • Model marży: Sklep płaci 5% od każdej transakcji{'\n'}
            • Klient otrzymuje: 10 punktów za każdą wydaną złotówkę{'\n'}
            • Statystyki są aktualizowane w czasie rzeczywistym
          </Text>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ostatnie transakcje</Text>

          {[
            { id: 1, client: 'jan@example.com', amount: '125.50', points: 1255, date: '2024-11-18' },
            { id: 2, client: 'anna@example.com', amount: '89.20', points: 892, date: '2024-11-18' },
            { id: 3, client: 'piotr@example.com', amount: '45.00', points: 450, date: '2024-11-17' },
          ].map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionClient}>{transaction.client}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{transaction.amount} zł</Text>
                <Text style={styles.transactionPoints}>+{transaction.points} pkt</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  infoSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  transactionCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionClient: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  transactionPoints: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
});
