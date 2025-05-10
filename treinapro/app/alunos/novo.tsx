import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from './../components/Header';

export default function NovoAlunoScreen() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [empresa, setEmpresa] = useState('');

    const empresas = [
        { id: '1', nome: 'Bombeiro civil' },
        { id: '2', nome: 'Hospital DFG' },
        { id: '3', nome: 'Transportadora Norte-LTDA' },
    ];

    const handleSalvar = () => {
        if (!nome || !cpf || !empresa) {
            Alert.alert('Preencha todos os campos!');
            return;
        }

        console.log({ nome, cpf, empresa });
        Alert.alert('Aluno cadastrado com sucesso!');
        router.back();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <Header/>
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Cadastrar novo aluno</Text>

            <TextInput
                placeholder="Nome do aluno"
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

            <Text style={styles.label}>Selecione a empresa</Text>
            {empresas.map((e) => (
                <TouchableOpacity
                    key={e.id}
                    style={[
                        styles.empresaBotao,
                        empresa === e.id && styles.empresaSelecionada,
                    ]}
                    onPress={() => setEmpresa(e.id)}
                >
                    <Text style={styles.empresaTexto}>{e.nome}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
                <Text style={styles.botaoTexto}>Salvar Aluno</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#F4F4F4', flexGrow: 1 },
    titulo: {
        fontSize: 20,
        fontFamily: 'PoppinsBold',
        marginBottom: 20,
        color: '#0A1E50',
    },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 14,
        fontFamily: 'Poppins',
    },
    voltar: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
        color: '#0A1E50',
        marginBottom: 10,
    },

    label: {
        fontFamily: 'PoppinsBold',
        marginBottom: 8,
        color: '#333',
    },
    empresaBotao: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    empresaSelecionada: {
        borderColor: '#0A1E50',
        backgroundColor: '#E7F0FF',
    },
    empresaTexto: {
        fontFamily: 'Poppins',
        color: '#333',
    },
    botao: {
        marginTop: 20,
        backgroundColor: '#0A1E50',
        paddingVertical: 14,
        borderRadius: 10,
    },
    botaoTexto: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 16,
    },
});
