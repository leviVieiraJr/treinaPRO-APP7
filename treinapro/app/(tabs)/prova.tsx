import React, { useState } from 'react';
import Header from '../components/Header';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProvaScreen() {
  const { os } = useLocalSearchParams();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [respostas, setRespostas] = useState<number[]>([-1, -1, -1]);

  const perguntas = [
    {
      texto: 'Qual é a primeira ação ao encontrar uma vítima desacordada?',
      alternativas: [
        'Chamar o resgate',
        'Verificar a respiração',
        'Gritar com ela',
        'Oferecer água',
      ],
    },
    {
      texto: 'O extintor de incêndio tipo ABC é indicado para:',
      alternativas: [
        'Apenas papel',
        'Qualquer tipo de fogo',
        'Fogo elétrico somente',
        'Plástico e vidro',
      ],
    },
    {
      texto: 'Em caso de queimadura leve, o que se deve fazer?',
      alternativas: [
        'Passar manteiga',
        'Usar gelo diretamente',
        'Lavar com água corrente',
        'Cobrir com pano sujo',
      ],
    },
  ];

  const gabarito = [1, 1, 2];

  const handleSelecionar = (index: number, resposta: number) => {
    const novas = [...respostas];
    novas[index] = resposta;
    setRespostas(novas);
  };

  const handleFinalizar = () => {
    if (!nome || !cpf || respostas.includes(-1)) {
      Alert.alert('Preencha todos os campos e responda todas as perguntas.');
      return;
    }

    let acertos = 0;
    respostas.forEach((resposta, index) => {
      if (resposta === gabarito[index]) acertos++;
    });

    const nota = Math.round((acertos / perguntas.length) * 10);

    console.log('Prova enviada:', { os, nome, cpf, respostas, nota });

    Alert.alert('Avaliação enviada!', `Nota: ${nota}\nObrigado por participar.`);

    setNome('');
    setCpf('');
    setRespostas([-1, -1, -1]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <Header/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Avaliação do Treinamento</Text>
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

      {perguntas.map((pergunta, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.pergunta}>{index + 1}. {pergunta.texto}</Text>
          {pergunta.alternativas.map((alt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.opcao,
                respostas[index] === i && styles.selecionado,
              ]}
              onPress={() => handleSelecionar(index, i)}
            >
              <Text style={[
                styles.opcaoTexto,
                respostas[index] === i && { color: '#fff' },
              ]}>
                {alt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.botao} onPress={handleFinalizar}>
        <Text style={styles.botaoTexto}>Finalizar Avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#F4F4F4' },
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  pergunta: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: '#333',
    marginBottom: 10,
  },
  opcao: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 6,
  },
  selecionado: {
    backgroundColor: '#0A1E50',
    borderColor: '#0A1E50',
  },
  opcaoTexto: {
    fontFamily: 'Poppins',
    color: '#333',
  },
  botao: {
    marginTop: 24,
    backgroundColor: '#008F9C',
    paddingVertical: 14,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    fontSize: 15,
  },
});
