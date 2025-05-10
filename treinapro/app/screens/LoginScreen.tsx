import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem('logged');
      if (logged === 'true') {
        router.replace('/dashboard');
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    await AsyncStorage.setItem('logged', 'true');
    router.replace('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.box}>
        <Text style={styles.label}>Entrar</Text>
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry placeholderTextColor="#aaa" />
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 300,
    height: 200,
    position: 'relative',
    top: 30,
  },
  box: {
    width: '100%',
    gap: 12,
    position: 'relative',
    top: 60,
  },
  label: {
    fontSize: 20,
    color: '#444',
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  forgot: {
    textAlign: 'right',
    color: '#999',
    marginTop: 4,
    fontSize: 13,
    fontFamily: 'Poppins',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#008F9C',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
