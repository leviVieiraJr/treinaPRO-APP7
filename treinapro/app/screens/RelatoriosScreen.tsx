// app/tabs/relatorios.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

const presencas = [
  { id: '1', aluno: 'João Silva', cpf: '12345678900', empresa: 'Construmax', cnpj: '12345678000199', curso: 'NR-10', data: '12/05/2025', hora: '08:00' },
  { id: '2', aluno: 'Maria Souza', cpf: '98765432100', empresa: 'Metalbras', cnpj: '98765432000100', curso: 'NR-35', data: '12/05/2025', hora: '09:00' },
];

const provas = [
  { id: '1', aluno: 'João Silva', cpf: '12345678900', empresa: 'Construmax', cnpj: '12345678000199', curso: 'NR-10', data: '12/05/2025', nota: 8.5, status: 'Aprovado', certificado: true },
  { id: '2', aluno: 'Maria Souza', cpf: '98765432100', empresa: 'Metalbras', cnpj: '98765432000100', curso: 'NR-35', data: '12/05/2025', nota: 6.0, status: 'Reprovado', certificado: false },
];

export default function Relatorios() {
  const [filtro, setFiltro] = useState('');

  const presencasFiltradas = presencas.filter(p =>
    p.aluno.toLowerCase().includes(filtro.toLowerCase()) ||
    p.cpf.includes(filtro) ||
    p.empresa.toLowerCase().includes(filtro.toLowerCase()) ||
    p.cnpj.includes(filtro)
  );

  const provasFiltradas = provas.filter(p =>
    p.aluno.toLowerCase().includes(filtro.toLowerCase()) ||
    p.cpf.includes(filtro) ||
    p.empresa.toLowerCase().includes(filtro.toLowerCase()) ||
    p.cnpj.includes(filtro)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <TextInput
        placeholder="Buscar por nome, CPF ou CNPJ"
        style={styles.search}
        value={filtro}
        onChangeText={setFiltro}
      />

      <Text style={styles.sectionTitle}>Presenças Registradas</Text>
      <FlatList
        data={presencasFiltradas}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.line}>{item.aluno} ({item.cpf}) - {item.empresa} ({item.cnpj})</Text>
            <Text style={styles.line}>Curso: {item.curso}</Text>
            <Text style={styles.line}>Data: {item.data} às {item.hora}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Resultados de Provas</Text>
      <FlatList
        data={provasFiltradas}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.line}>{item.aluno} ({item.cpf}) - {item.empresa} ({item.cnpj})</Text>
            <Text style={styles.line}>Curso: {item.curso}</Text>
            <Text style={styles.line}>Data: {item.data}</Text>
            <Text style={styles.line}>Nota: {item.nota} - {item.status}</Text>
            <Text style={styles.line}>Certificado: {item.certificado ? 'Emitido' : 'Não emitido'}</Text>
          </View>
        )}
      />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0A1E50',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  list: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  line: {
    fontSize: 14,
    color: '#444',
  },
  search: {
    backgroundColor: '#A9A9A9',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
});
