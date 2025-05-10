import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PresencaScreen() {
  const { os } = useLocalSearchParams(); // ID da ordem de serviço
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const handleRegistrar = () => {
    if (!nome || !cpf) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    // Aqui você poderá enviar os dados para a API ou armazenar localmente
    console.log('Presença registrada:', { os, nome, cpf });

    Alert.alert('Presença confirmada!', 'Obrigado por comparecer.');
    setNome('');
    setCpf('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Presença</Text>
      <Text style={styles.subtitulo}>Treinamento: {os}</Text>

      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
        <Text style={styles.botaoTexto}>Registrar Presença</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', padding: 24 },
  titulo: {
    fontSize: 22,
    fontFamily: 'PoppinsBold',
    color: '#0A1E50',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#444',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#0A1E50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontFamily: 'PoppinsBold',
    fontSize: 15,
  },
});
