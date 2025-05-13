// app/alunos/provaAluno.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProvaAluno() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [aluno, setAluno] = useState({ nome: '', cpf: '', email: '' });
  const [respostas, setRespostas] = useState<number[]>([]);
  const [modelo, setModelo] = useState<any>(null);

  useEffect(() => {
    if (params.modelo) {
      try {
        const modeloStr = Array.isArray(params.modelo) ? params.modelo[0] : params.modelo;
        const parsed = JSON.parse(modeloStr);
        setModelo(parsed);
        setRespostas(new Array(parsed.perguntas.length).fill(-1));
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar a prova.');
      }
    }
  }, [params]);

  const marcarResposta = (pIndex: number, aIndex: number) => {
    const novas = [...respostas];
    novas[pIndex] = aIndex;
    setRespostas(novas);
  };

  const finalizarProva = () => {
    if (!aluno.nome || !aluno.cpf || !aluno.email) {
      Alert.alert('Preencha todos os dados do aluno.');
      return;
    }

    if (respostas.includes(-1)) {
      Alert.alert('Responda todas as perguntas antes de finalizar.');
      return;
    }

    let acertos = 0;
    respostas.forEach((resposta, idx) => {
      if (modelo.perguntas[idx].correta === resposta) acertos++;
    });

    const nota = (acertos / modelo.perguntas.length) * 10;
    const aprovado = nota >= 7;

    Alert.alert(
      aprovado ? '✅ Aprovado' : '❌ Reprovado',
      `Nota: ${nota.toFixed(1)}\n${aprovado ? 'Certificado será enviado por email.' : 'Você poderá refazer a prova.'}`
    );

    // Aqui você pode salvar a tentativa e emitir o certificado
  };

  if (!modelo) return <Text style={{ padding: 16 }}>Carregando prova...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 Prova: {modelo.curso}</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={aluno.nome}
        onChangeText={(v) => setAluno({ ...aluno, nome: v })}
      />
      <TextInput
        placeholder="CPF"
        style={styles.input}
        keyboardType="numeric"
        value={aluno.cpf}
        onChangeText={(v) => setAluno({ ...aluno, cpf: v })}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        keyboardType="email-address"
        value={aluno.email}
        onChangeText={(v) => setAluno({ ...aluno, email: v })}
      />

      {modelo.perguntas.map((p: any, idx: number) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.enunciado}>{idx + 1}. {p.enunciado}</Text>
          {p.alternativas.map((alt: string, aIdx: number) => (
            <TouchableOpacity
              key={aIdx}
              style={[styles.altBtn, respostas[idx] === aIdx && styles.altBtnAtiva]}
              onPress={() => marcarResposta(idx, aIdx)}
            >
              <Text style={styles.altText}>{alt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarProva}>
        <Text style={styles.botaoTexto}>Finalizar Prova</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A1E50',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  enunciado: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  altBtn: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 6,
  },
  altBtnAtiva: {
    backgroundColor: '#E8F0FE',
    borderColor: '#0A1E50',
  },
  altText: {
    color: '#333',
  },
  botaoFinalizar: {
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
