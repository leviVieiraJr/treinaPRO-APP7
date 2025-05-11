import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from '../components/BottomNavBar';

export default function DashboardScreen() {
  const router = useRouter();

   const handleLogout = async () => {
    await AsyncStorage.removeItem('logged');
    router.replace('/');
  };


  const empresas = [
    { id: '1', nome: 'Construtora Alfa' },
    { id: '2', nome: 'Hospital Vida' },
  ];

  const ordensDeServico = [
    {
      id: 'OS001',
      empresa: 'Construtora Alfa',
      curso: 'NR-35',
      data: '2024-06-20T14:00:00',
    },
    {
      id: 'OS002',
      empresa: 'Hospital Vida',
      curso: 'Primeiros Socorros',
      data: '2024-06-22T09:00:00',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Empresas Cadastradas</Text>
        {empresas.map((empresa) => (
          <View key={empresa.id} style={styles.card}>
            <Text style={styles.cardTitle}>{empresa.nome}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={() => router.push('/empresas/nova')}>
          <Text style={styles.botaoEmpresas}>Nova Empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/empresas/empresa')}>
          <Text style={styles.botaoEmpresas}>Gerenciar Empresas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/alunos/novo')}>
          <Text style={styles.botaoEmpresas}>Cadastrar Aluno</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Ordens de Serviço Agendadas</Text>
        {ordensDeServico.map((os) => (
          <View key={os.id} style={styles.card}>
            <Text style={styles.cardTitle}>{os.curso}</Text>
            <Text style={styles.cardSub}>{os.empresa}</Text>
            <Text style={styles.cardSub}>
              {new Date(os.data).toLocaleString()}
            </Text>
            <View style={styles.botaoContainer}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => router.push(`/prova?os=${os.id}`)}
              >
                <Text style={styles.botaoTexto}>QR Lista Presença</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, { backgroundColor: '#008F9C' }]}
                onPress={() => router.push(`/prova?os=${os.id}`)}
              >
                <Text style={styles.botaoTexto}>QR Avaliação</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: {
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginVertical: 12,
    color: '#0A1E50',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center'
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  botaoEmpresas: {
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    color: '#f1f1f1',
    backgroundColor: '#0A1E50',
    gap: 10,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    color: '#333',
  },
  cardSub: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: '#777',
    marginTop: 2,
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  botao: {
    flex: 1,
    backgroundColor: '#0A1E50',
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  botaoTexto: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'PoppinsBold',
    fontSize: 13,
  },
});
