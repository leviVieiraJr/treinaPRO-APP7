import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';


export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    await AsyncStorage.setItem('logged', 'true');
    router.replace('/dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.label}>Entrar</Text>

      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry placeholderTextColor="#aaa" />

      <Text style={styles.forgot}>Esqueceu sua senha?</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.alunoButton} onPress={() => router.push('/aluno')}>
        <Text style={styles.alunoButtonText}>Sou Aluno</Text>
      </TouchableOpacity>
    </ScrollView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#888',
    marginBottom: 24,
    fontSize: 13,
  },
  button: {
    width: '80%',
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alunoButton: {
    width: '80%',
    backgroundColor: '#008f9c',
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f1f1f1',
  },
  alunoButtonText: {
    color: '#f1f1f1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
