import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from './../components/Header';

export default function NovaEmpresaScreen() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSalvar = () => {
        if (!nome || !cnpj || !responsavel || !telefone) {
            Alert.alert('Preencha todos os campos!');
            return;
        }

        // Aqui você pode salvar no backend futuramente
        console.log({ nome, cnpj, responsavel, telefone });

        Alert.alert('Empresa cadastrada com sucesso!');
        router.back();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.titulo}>Cadastrar nova empresa</Text>

                <TextInput
                    placeholder="Nome da empresa"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="CNPJ"
                    value={cnpj}
                    onChangeText={setCnpj}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Responsável"
                    value={responsavel}
                    onChangeText={setResponsavel}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
                    <Text style={styles.botaoTexto}>Salvar Empresa</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginBottom: 12,
        fontFamily: 'Poppins',
    },
    voltar: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
        color: '#0A1E50',
        marginBottom: 10,
    },

    botao: {
        backgroundColor: '#0A1E50',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 12,
    },
    botaoTexto: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 16,
    },
});
