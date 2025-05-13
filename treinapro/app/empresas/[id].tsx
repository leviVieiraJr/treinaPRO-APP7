import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Aluno = {
  id: string;
  nome: string;
  cpf: string;
};

export default function DetalheEmpresaScreen() {
  const { id } = useLocalSearchParams();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionar = () => {
    if (!nome || !cpf) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const novoAluno: Aluno = {
      id: String(Date.now()),
      nome,
      cpf,
    };

    setAlunos((prev) => [...prev, novoAluno]);
    setNome('');
    setCpf('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Empresa{id}</Text>

      <View style={styles.boxCadastro}>
        <Text style={styles.subtitulo}>Cadastrar Aluno</Text>
        <TextInput
          placeholder="Nome do aluno"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="CPF do aluno"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
          <Text style={styles.botaoTexto}>Adicionar Aluno</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Buscar Alunos</Text>
      <TextInput
        placeholder="Digite um nome"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <Text style={styles.subtitulo}>Lista de Alunos</Text>
      {alunosFiltrados.length === 0 ? (
        <Text style={styles.vazio}>Nenhum aluno encontrado.</Text>
      ) : (
        alunosFiltrados
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((aluno) => (
            <View key={aluno.id} style={styles.card}>
              <Text style={styles.nome}>{aluno.nome}</Text>
              <Text style={styles.cpf}>CPF: {aluno.cpf}</Text>
            </View>
          ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F4F4F4', flexGrow: 1 },
  titulo: {
    fontSize: 22,
    fontFamily: 'PoppinsBold',
    color: '#0A1E50',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  botao: {
    backgroundColor: '#0A1E50',
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoTexto: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'PoppinsBold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  nome: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: '#333',
  },
  cpf: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: '#666',
    marginTop: 4,
  },
  boxCadastro: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  vazio: {
    fontFamily: 'Poppins',
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
});
