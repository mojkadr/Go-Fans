import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { authService } from '../services/authService';

export default function AdminScreen({ navigation }) {
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const [newClientPoints, setNewClientPoints] = useState('0');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    // SYMULACJA - w prawdziwej aplikacji pobierzesz z Supabase
    const mockClients = [
      { id: 1, email: 'jan@example.com', points: 250, createdAt: '2024-11-15' },
      { id: 2, email: 'anna@example.com', points: 480, createdAt: '2024-11-14' },
      { id: 3, email: 'piotr@example.com', points: 120, createdAt: '2024-11-10' },
      { id: 4, email: 'maria@example.com', points: 750, createdAt: '2024-11-08' },
    ];
    setClients(mockClients);
  };

  const handleAddClient = () => {
    if (!newClientEmail || !newClientPassword) {
      Alert.alert('Błąd', 'Wypełnij wszystkie pola');
      return;
    }

    // SYMULACJA dodawania klienta
    const newClient = {
      id: clients.length + 1,
      email: newClientEmail,
      points: parseInt(newClientPoints) || 0,
      createdAt: new Date().toLocaleDateString('pl-PL'),
    };

    setClients([...clients, newClient]);
    setModalVisible(false);
    setNewClientEmail('');
    setNewClientPassword('');
    setNewClientPoints('0');

    Alert.alert('Sukces', `Dodano klienta: ${newClient.email}`);
  };

  const handleDeleteClient = (client) => {
    Alert.alert(
      'Usuwanie klienta',
      `Czy na pewno chcesz usunąć klienta:\n${client.email}?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => {
            setClients(clients.filter((c) => c.id !== client.id));
            Alert.alert('Sukces', 'Klient został usunięty');
          },
        },
      ]
    );
  };

  const handleEditPoints = (client) => {
    Alert.prompt(
      'Edytuj punkty',
      `Podaj nową liczbę punktów dla:\n${client.email}`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Zapisz',
          onPress: (value) => {
            const points = parseInt(value) || 0;
            setClients(
              clients.map((c) =>
                c.id === client.id ? { ...c, points } : c
              )
            );
            Alert.alert('Sukces', `Zaktualizowano punkty na: ${points}`);
          },
        },
      ],
      'plain-text',
      client.points.toString()
    );
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
          <Text style={styles.headerTitle}>Panel Admina</Text>
          <Text style={styles.headerSubtitle}>Zarządzanie klientami</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{clients.length}</Text>
          <Text style={styles.statLabel}>Klientów</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {clients.reduce((sum, c) => sum + c.points, 0)}
          </Text>
          <Text style={styles.statLabel}>Łącznie punktów</Text>
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>➕ Dodaj nowego klienta</Text>
      </TouchableOpacity>

      {/* Clients List */}
      <Text style={styles.sectionTitle}>Lista klientów ({clients.length})</Text>
      <ScrollView style={styles.clientsList}>
        {clients.map((client) => (
          <View key={client.id} style={styles.clientCard}>
            <View style={styles.clientInfo}>
              <Text style={styles.clientEmail}>{client.email}</Text>
              <Text style={styles.clientDate}>
                Zarejestrowany: {client.createdAt}
              </Text>
              <Text style={styles.clientPoints}>{client.points} punktów</Text>
            </View>

            <View style={styles.clientActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPoints(client)}
              >
                <Text style={styles.editButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteClient(client)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {clients.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Brak klientów</Text>
            <Text style={styles.emptySubtext}>Dodaj pierwszego klienta</Text>
          </View>
        )}
      </ScrollView>

      {/* Add Client Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dodaj nowego klienta</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="klient@example.com"
              value={newClientEmail}
              onChangeText={setNewClientEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Hasło tymczasowe</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimum 6 znaków"
              value={newClientPassword}
              onChangeText={setNewClientPassword}
              secureTextEntry
            />

            <Text style={styles.label}>Początkowe punkty (opcjonalnie)</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={newClientPoints}
              onChangeText={setNewClientPoints}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Anuluj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleAddClient}
              >
                <Text style={styles.modalSaveText}>Dodaj</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
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
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  clientsList: {
    flex: 1,
  },
  clientCard: {
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
  clientInfo: {
    flex: 1,
  },
  clientEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  clientDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  clientPoints: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  clientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#8E8E93',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalSaveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
