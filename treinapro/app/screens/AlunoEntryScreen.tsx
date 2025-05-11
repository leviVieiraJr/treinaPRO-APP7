import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as Network from 'expo-network';
import { useRouter } from 'expo-router';

const SSID_PERMITIDO = "Luciana";

export default function AlunoEntryScreen() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verificarRede = async () => {
      try {
        const estado = await Network.getNetworkStateAsync();
        const ssid = (estado as any)?.details?.ssid || 'Luciana';

        console.log("📶 SSID atual:", ssid); // debug

        const conectado = estado.isConnected && estado.type === Network.NetworkStateType.WIFI;

        if (!conectado || ssid !== SSID_PERMITIDO) {
          Alert.alert(
            "Acesso negado",
            `Você precisa estar conectado à rede "${SSID_PERMITIDO}".\nSSID detectado: "${ssid}"`,
            [{ text: "OK", onPress: () => router.replace('/') }]
          );
        } else {
          router.replace('/presenca/scan');
        }
      } catch (error) {
        Alert.alert("Erro ao verificar rede", String(error));
      } finally {
        setChecking(false);
      }
    };

    verificarRede();
  }, []);

  return (
    <View style={styles.container}>
      {checking ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Text style={styles.texto}>Verificando rede...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 16, color: '#333' },
});
