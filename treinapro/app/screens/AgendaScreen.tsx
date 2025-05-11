import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

const AgendaScreen = () => {
  const agenda = [
    { id: '1', curso: 'CPR', horario: '08:00 – 12:00', sala: 'Sala 2' },
    { id: '2', curso: 'Sovraranças', horario: '14:00 – 15:00', sala: 'Auditório' },
  ];

  const participantes = [
    { id: '1', nome: 'Pessodas' },
    { id: '2', nome: 'Lilizanman' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <Header/>
    <View style={styles.container}>
      <Text style={styles.header}>Agenda de Hoje</Text>

      {agenda.map(item => (
        <View key={item.id} style={styles.agendaItem}>
          <Text style={styles.curso}>{item.curso}</Text>
          <Text style={styles.sub}>{item.horario} • {item.sala}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrar presença</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Participantes</Text>
      <FlatList
        data={participantes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.participante}>
            <Text style={styles.nome}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
    <BottomNavBar />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A1E50',
    marginTop:5,
  },
  agendaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    gap: 8,
    marginTop: 30,
  },
  curso: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sub: {
    fontSize: 13,
    color: '#666',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A1E50',
    marginTop: 24,
    marginBottom: 10,
  },
  participante: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    fontSize: 14,
    color: '#333',
  },
});
