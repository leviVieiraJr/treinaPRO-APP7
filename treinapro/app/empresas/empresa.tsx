import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from './../components/Header';

export default function ListaEmpresasScreen() {
  const router = useRouter();

  const [busca, setBusca] = useState('');

  const empresas = [
    { id: '1', nome: 'Construtora Alfa' },
    { id: '2', nome: 'Hospital Vida' },
    { id: '3', nome: 'Distribuidora Brasil' },
  ];

  const empresasFiltradas = empresas
    .filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <Header/>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Empresas Contratantes</Text>

      <TextInput
        placeholder="Buscar por nome"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <FlatList
        data={empresasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/empresas/[id]', params: { id: item.id } })}


          >
            <Text style={styles.cardTexto}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.naoEncontrado}>Nenhuma empresa encontrada.</Text>
        }
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/empresas/nova')}

      >
        <Text style={styles.botaoTexto}>Nova Empresa</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', padding: 20 },
  titulo: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: '#0A1E50',
    marginBottom: 12,
  },
  voltar: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
        color: '#0A1E50',
        marginBottom: 10,
    },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontFamily: 'Poppins',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  cardTexto: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#333',
  },
  naoEncontrado: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#0A1E50',
    paddingVertical: 14,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 16,
  },
});
