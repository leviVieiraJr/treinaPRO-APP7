// app/tabs/prova.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProvaConfig() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [curso, setCurso] = useState(params.curso || '');
  const [nomeModelo, setNomeModelo] = useState('');

  type Pergunta = {
    enunciado: string;
    alternativas: string[];
    correta: number;
  };

  const [perguntas, setPerguntas] = useState<Pergunta[]>([
    { enunciado: '', alternativas: ['', '', '', ''], correta: 0 }
  ]);

 useEffect(() => {
  if (params.modelo) {
    try {
      const modelo = JSON.parse(params.modelo as string);
      if (perguntas.length === 1 && perguntas[0].enunciado === '') {
        setCurso(modelo.curso);
        setNomeModelo(modelo.nome || '');
        setPerguntas(modelo.perguntas);
      }
    } catch (e) {
      console.warn('Erro ao carregar modelo:', e);
    }
  }
}, [params.modelo]);


  const adicionarPergunta = () => {
    setPerguntas([...perguntas, { enunciado: '', alternativas: ['', '', '', ''], correta: 0 }]);
  };

  const atualizarPergunta = (
    index: number,
    campo: 'enunciado' | 'alternativas' | 'correta',
    valor: string | string[] | number
  ) => {
    const novas = [...perguntas];
    if (campo === 'enunciado' && typeof valor === 'string') {
      novas[index].enunciado = valor;
    } else if (campo === 'alternativas' && Array.isArray(valor)) {
      novas[index].alternativas = valor;
    } else if (campo === 'correta' && typeof valor === 'number') {
      novas[index].correta = valor;
    }
    setPerguntas(novas);
  };

  const atualizarAlternativa = (pIndex: number, aIndex: number, valor: string) => {
    const novas = [...perguntas];
    novas[pIndex].alternativas[aIndex] = valor;
    setPerguntas(novas);
  };

  const salvarProva = () => {
    const cursoStr = Array.isArray(curso) ? curso.join(', ') : curso;
    if (!cursoStr.trim()) {
      alert('Informe o nome do curso.');
      return;
    }

    if (perguntas.some(p => !p.enunciado.trim() || p.alternativas.some(a => !a.trim()))) {
      alert('Preencha todas as perguntas e alternativas.');
      return;
    }

    const estrutura = {
      curso,
      perguntas,
    };
    console.log('Prova salva:', estrutura);
    alert('Prova salva localmente!');
  };

  const salvarComoModelo = () => {
    if (!nomeModelo.trim()) {
      alert('Informe o nome do modelo.');
      return;
    }

    const modelo = {
      nome: nomeModelo,
      curso,
      perguntas,
    };

    console.log('Modelo salvo:', modelo);
    Alert.alert('Modelo salvo!', `Modelo "${modelo.nome}" disponível para reutilização.`);
  };

  const navegarParaModelos = () => {
    router.push('/(tabs)/modelos');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <Text style={styles.title}>Cadastro de Prova</Text>

        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do curso (ex: NR-10)"
          value={Array.isArray(curso) ? curso.join(', ') : curso || ''}
          onChangeText={setCurso}
        />

        <Text style={styles.label}>Nome do Modelo (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Prova NR-10 Avançada"
          value={nomeModelo}
          onChangeText={setNomeModelo}
        />

        {perguntas.map((p, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Pergunta {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o enunciado"
              value={p.enunciado}
              onChangeText={(text) => atualizarPergunta(index, 'enunciado', text)}
            />

            {p.alternativas.map((alt, aIndex) => (
              <TextInput
                key={aIndex}
                style={[styles.input, p.correta === aIndex && styles.inputCorreta]}
                placeholder={`Alternativa ${String.fromCharCode(65 + aIndex)}`}
                value={alt}
                onChangeText={(text) => atualizarAlternativa(index, aIndex, text)}
                onFocus={() => atualizarPergunta(index, 'correta', aIndex)}
              />
            ))}
            <Text style={styles.obs}>* Toque na alternativa para marcar como correta</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={adicionarPergunta}>
          <Text style={styles.addButtonText}>+ Adicionar Pergunta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={salvarProva}>
          <Text style={styles.saveButtonText}>Salvar Prova</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#0A1E50', marginTop: 12 }]} onPress={salvarComoModelo}>
          <Text style={styles.saveButtonText}>Salvar como Modelo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#444', marginTop: 12 }]} onPress={navegarParaModelos}>
          <Text style={styles.saveButtonText}>📚 Ver Modelos Salvos</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navContainer}>
        <BottomNavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A1E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  inputCorreta: {
    borderColor: '#0A1E50',
    backgroundColor: '#E8F0FE',
  },
  obs: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#aaa',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
