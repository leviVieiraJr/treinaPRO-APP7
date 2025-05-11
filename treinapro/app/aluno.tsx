import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AlunoEntryScreen() {
  const router = useRouter();

  const continuar = () => {
    router.replace('/presenca/scan');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Bem-vindo, aluno!</Text>
      <TouchableOpacity style={styles.botao} onPress={continuar}>
        <Text style={styles.botaoTexto}>Escanear QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
  botao: { backgroundColor: '#008F9C', padding: 14, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  voltar: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
    color: '#f1f1f1',
    marginBottom: 10,
    backgroundColor:'orange',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
    bottom: 300,
    right: 150,
  },
});
