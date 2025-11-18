import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [ocrResults, setOcrResults] = useState(null);
  const [processing, setProcessing] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container}><Text>Ładowanie kamery...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Potrzebujemy dostępu do kamery aby skanować paragony
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Zezwól na dostęp</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      setCapturedPhoto(photo);
      simulateOCR(photo);
    }
  };

  // SYMULACJA OCR - rozpoznawanie tekstu
  const simulateOCR = (photo) => {
    setProcessing(true);

    // Symulacja przetwarzania przez 2 sekundy
    setTimeout(() => {
      // PRZYKŁADOWE DANE - w prawdziwej aplikacji to będą dane z OCR
      const mockData = {
        nip: '1234567890',
        store: 'Sklep Spożywczy ABC',
        amount: '125.50',
        date: new Date().toLocaleDateString('pl-PL'),
        receiptNumber: 'PAR/2024/11/001234',
        items: [
          { name: 'Chleb', price: '4.50' },
          { name: 'Mleko', price: '6.99' },
          { name: 'Masło', price: '8.99' },
          { name: 'Inne produkty', price: '105.02' },
        ],
        confidence: 0.92, // 92% pewności rozpoznania
      };

      setOcrResults(mockData);
      setProcessing(false);

      Alert.alert(
        'OCR zakończone!',
        `Rozpoznano paragon ze sklepu: ${mockData.store}\nKwota: ${mockData.amount} zł`
      );
    }, 2000);
  };

  const sendToSupabase = () => {
    if (!ocrResults) return;

    Alert.alert(
      'Symulacja wysyłki do Supabase',
      JSON.stringify({
        nip: ocrResults.nip,
        store: ocrResults.store,
        amount: ocrResults.amount,
        date: ocrResults.date,
        receiptNumber: ocrResults.receiptNumber,
        pointsAwarded: Math.floor(parseFloat(ocrResults.amount) * 10),
      }, null, 2),
      [
        {
          text: 'OK',
          onPress: () => {
            Alert.alert(
              'Sukces!',
              `Przyznano ${Math.floor(parseFloat(ocrResults.amount) * 10)} punktów!`,
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const retake = () => {
    setCapturedPhoto(null);
    setOcrResults(null);
    setProcessing(false);
  };

  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.previewContainer}>
          <Text style={styles.title}>Podgląd paragonu</Text>

          <Image
            source={{ uri: capturedPhoto.uri }}
            style={styles.preview}
            resizeMode="contain"
          />

          {processing && (
            <View style={styles.processingBox}>
              <Text style={styles.processingText}>🔍 Rozpoznawanie tekstu...</Text>
              <Text style={styles.processingSubtext}>Proszę czekać (symulacja 2s)</Text>
            </View>
          )}

          {ocrResults && (
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>📋 Rozpoznane dane:</Text>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Sklep:</Text>
                <Text style={styles.resultValue}>{ocrResults.store}</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>NIP:</Text>
                <Text style={styles.resultValue}>{ocrResults.nip}</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Kwota:</Text>
                <Text style={styles.resultValue}>{ocrResults.amount} zł</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Data:</Text>
                <Text style={styles.resultValue}>{ocrResults.date}</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Nr paragonu:</Text>
                <Text style={styles.resultValue}>{ocrResults.receiptNumber}</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Punkty:</Text>
                <Text style={styles.pointsValue}>
                  {Math.floor(parseFloat(ocrResults.amount) * 10)} pkt
                </Text>
              </View>

              <View style={styles.confidenceBox}>
                <Text style={styles.confidenceText}>
                  Pewność rozpoznania: {(ocrResults.confidence * 100).toFixed(0)}%
                </Text>
              </View>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendToSupabase}
              >
                <Text style={styles.sendButtonText}>📤 Wyślij do Supabase (Symulacja)</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.retakeButton} onPress={retake}>
              <Text style={styles.retakeButtonText}>Zrób ponownie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraText}>
            Umieść paragon w ramce
          </Text>
          <View style={styles.frame} />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>✕</Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  frame: {
    width: 300,
    height: 400,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderRadius: 12,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#007AFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
  previewContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 20,
  },
  processingBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  processingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  resultsBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  resultLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 14,
    color: '#000',
  },
  pointsValue: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: 'bold',
  },
  confidenceBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  confidenceText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  retakeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#8E8E93',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  permissionText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
