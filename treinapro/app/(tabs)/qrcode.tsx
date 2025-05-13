// app/tabs/qrcode.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import dayjs from 'dayjs';

export default function QRCodeGenerator() {
  const [tipo, setTipo] = useState<'presenca' | 'prova'>('presenca');
  const [empresa, setEmpresa] = useState('');
  const [curso, setCurso] = useState('');
  const [data, setData] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [qrUrl, setQrUrl] = useState('');

  const gerarQR = () => {
    const payload = {
      tipo,
      empresa,
      curso,
      data,
    };

    const json = encodeURIComponent(JSON.stringify(payload));
    setQrUrl(`https://quickchart.io/qr?text=${json}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Gerar QR Code</Text>

      <Text style={styles.label}>Tipo de QR</Text>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, tipo === 'presenca' && styles.activeType]}
          onPress={() => setTipo('presenca')}
        >
          <Text style={styles.typeText}>Presença</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, tipo === 'prova' && styles.activeType]}
          onPress={() => setTipo('prova')}
        >
          <Text style={styles.typeText}>Prova</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Empresa</Text>
      <TextInput style={styles.input} placeholder="Nome da empresa" value={empresa} onChangeText={setEmpresa} />

      <Text style={styles.label}>Curso</Text>
      <TextInput style={styles.input} placeholder="Ex: NR-10, NR-35" value={curso} onChangeText={setCurso} />

      <Text style={styles.label}>Data e Hora</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="2025-05-14T14:00"
      />

      <TouchableOpacity style={styles.button} onPress={gerarQR}>
        <Text style={styles.buttonText}>Gerar QR Code</Text>
      </TouchableOpacity>

      {qrUrl !== '' && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Image source={{ uri: qrUrl }} style={{ width: 200, height: 200 }} />
          <Text style={{ marginTop: 10, fontSize: 12, color: '#555' }}>Escaneie para testar</Text>
        </View>
      )}

      <BottomNavBar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0A1E50',
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 6,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  typeButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  activeType: {
    backgroundColor: '#0A1E50',
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
