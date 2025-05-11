import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ConfirmarPresenca() {
  const router = useRouter();
  const { os, empresaId, curso, data } = useLocalSearchParams();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirmar = () => {
    if (!nome || !cpf || !telefone || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const presenca = {
      nome,
      cpf,
      telefone,
      email,
      os,
      empresaId,
      curso,
      data,
    };

    console.log('✅ Presença registrada:', presenca);
    Alert.alert('Presença confirmada!', 'Obrigado por registrar sua presença.');
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Confirmação de Presença</Text>

      <Text style={styles.label}>Nome completo*</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome" />

      <Text style={styles.label}>CPF*</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" keyboardType="numeric" />

      <Text style={styles.label}>Telefone*</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="(00) 00000-0000" keyboardType="phone-pad" />

      <Text style={styles.label}>E-mail*</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" />

      <TouchableOpacity style={styles.botao} onPress={handleConfirmar}>
        <Text style={styles.botaoTexto}>Confirmar Presença</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  botao: {
    marginTop: 30,
    backgroundColor: '#1e88e5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
