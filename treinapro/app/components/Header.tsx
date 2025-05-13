import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type HeaderProps = {
  nome?: string;
};

export default function Header({ nome = 'Maria' }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#008F9C',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 100, // ALTURA FIXA do header
      paddingHorizontal: 20,
    },
    logo: {
      width: 300,    // altere aqui para aumentar
      height: 200,   // altere aqui para aumentar
      top: 0,
      position: 'relative',
    },
    nome: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'PoppinsBold',
    },
  });
  
