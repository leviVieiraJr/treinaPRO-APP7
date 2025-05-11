import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem('logged');
      if (logged === 'true') {
        router.replace('/dashboard');
      } else {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#008F9C" />
          <Text style={styles.texto}>Verificando login...</Text>
        </>
      ) : (
        <>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.titulo}>Bem-vindo ao TreinaPRO</Text>

          <TouchableOpacity style={styles.alunoButton} onPress={() => router.replace('/aluno')}>
            <Text style={styles.alunoButtonText}>Sou Aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.instrutorButton} onPress={() => router.replace('/login')}>
            <Text style={styles.instrutorButtonText}>Sou Instrutor</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
  },
  titulo: {
    fontSize: 22,
    marginVertical: 20,
    color: '#333',
    position: 'relative',
    bottom: 30,
    fontFamily: 'Poppins',
    fontWeight: '300',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  alunoButton: {
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#F1F1F1',
    marginBottom: 12,
  },
  alunoButtonText: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  instrutorButton: {
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  instrutorButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
