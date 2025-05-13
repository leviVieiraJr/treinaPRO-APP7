// app/tabs/modelos.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavBar from '../components/BottomNavBar';

// Simulação de modelos disponíveis
const modelos = [
    {
        nome: 'Modelo - NR-10',
        curso: 'NR-10',
        perguntas: [
            {
                enunciado: 'Qual a voltagem mínima para segurança?',
                alternativas: ['110V', '220V', '24V', '380V'],
                correta: 2,
            },
        ],
    },
    {
        nome: 'Modelo - NR-35',
        curso: 'NR-35',
        perguntas: [
            {
                enunciado: 'Qual EPI é obrigatório em altura?',
                alternativas: ['Capacete', 'Cinto paraquedista', 'Botina', 'Protetor auricular'],
                correta: 1,
            },
        ],
    },
];

type Modelo = {
    nome: string;
    curso: string;
    perguntas: {
        enunciado: string;
        alternativas: string[];
        correta: number;
    }[];
};

export default function Modelos() {
    const router = useRouter();

    const carregarModelo = (modelo: Modelo) => {
        router.push({
            pathname: '/(tabs)/prova',
            params: {
                curso: modelo.curso,
                modelo: JSON.stringify(modelo),
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Modelos de Provas</Text>

            <FlatList
                data={modelos}
                keyExtractor={(item) => item.nome}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => carregarModelo(item)}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.info}>Perguntas: {item.perguntas.length}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
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
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#0A1E50',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    info: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
});
