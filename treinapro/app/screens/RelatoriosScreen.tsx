import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

function gerarCertificadoHTML(
  nome: string,
  curso: string,
  empresa: string,
  data: string,
  qrURL: string,
  link: string
): string {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #fdfdfd;
          }
          .certificado {
            border: 6px solid #0A1E50;
            padding: 40px;
          }
          h1 {
            font-size: 28px;
            color: #0A1E50;
          }
          h2 {
            margin-top: 30px;
            font-size: 22px;
            color: #333;
          }
          p {
            font-size: 16px;
            color: #555;
            margin-top: 20px;
            line-height: 1.6;
          }
          .assinatura {
            margin-top: 40px;
            font-size: 14px;
            color: #999;
          }
          .qr {
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="certificado">
          <h1>CERTIFICADO DE CONCLUSÃO</h1>
          <h2>${nome}</h2>
          <p>
            Participou do treinamento <strong>${curso}</strong><br/>
            realizado para a empresa <strong>${empresa}</strong>.<br/>
            Concluído com sucesso na data <strong>${data}</strong>.
          </p>
          <div class="assinatura">
            TreinaPro • ${new Date().toLocaleDateString()}
          </div>
          <div class="qr">
            <img src="${qrURL}" width="120" />
            <p style="font-size:12px;color:#777;">Validação: ${link}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function exportarCertificadoPDF(
  nome: string,
  curso: string,
  empresa: string,
  data: string
) {
  try {
    const id = `OS001-${nome.replace(/\s+/g, '')}`;
    const link = `https://treinapro.com/certificados/${id}`;
    const qrURL = `https://quickchart.io/qr?text=${encodeURIComponent(link)}&size=120`;

    const html = gerarCertificadoHTML(nome, curso, empresa, data, qrURL, link);
    const file = await Print.printToFileAsync({ html, base64: false });

    if (!file?.uri) {
      alert('Erro ao gerar certificado.');
      return;
    }

    const newUri =
      FileSystem.documentDirectory + `Certificado-${nome.replace(/\s+/g, '_')}.pdf`;

    await FileSystem.moveAsync({ from: file.uri, to: newUri });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newUri);
    } else {
      alert('Compartilhamento não disponível neste dispositivo.');
    }
  } catch (error) {
    console.error('Erro ao exportar certificado:', error);
    if (error instanceof Error) {
      alert('Erro ao gerar o certificado: ' + error.message);
    } else {
      alert('Erro ao gerar o certificado: ' + String(error));
    }
  }
}

export default function RelatoriosScreen() {
  const { os } = useLocalSearchParams();

  const presencas = [
    { nome: 'João Silva', cpf: '123.456.789-00' },
    { nome: 'Ana Souza', cpf: '987.654.321-00' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Relatório - Ordem de Serviço: {os}</Text>

      <Text style={styles.subtitulo}>Presenças</Text>
      {presencas.map((aluno, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{aluno.nome}</Text>
          <Text style={styles.cpf}>CPF: {aluno.cpf}</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              exportarCertificadoPDF(
                aluno.nome,
                'NR-35 - Trabalho em Altura',
                'Construtora Alfa',
                '2024-06-20'
              )
            }
          >
            <Text style={styles.botaoTexto}>Emitir Certificado</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F4F4F4' },
  titulo: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: '#0A1E50',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    elevation: 1,
  },
  nome: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
    color: '#333',
  },
  cpf: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: '#666',
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#008F9C',
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    fontSize: 14,
  },
});
