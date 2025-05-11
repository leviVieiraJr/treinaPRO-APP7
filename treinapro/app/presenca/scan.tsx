import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Camera } from 'expo-camera';

import { useRouter } from 'expo-router';

export default function Scan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    try {
      const payload = JSON.parse(data);

      if (!payload.os || !payload.empresaId || !payload.curso || !payload.data) {
        throw new Error('QR inválido');
      }

      setScanned(true);
      router.push({
        pathname: '/presenca/confirmar',
        params: {
          os: payload.os,
          empresaId: payload.empresaId,
          curso: payload.curso,
          data: payload.data,
        },
      });
    } catch (err) {
      Alert.alert('Erro', 'QR Code inválido ou malformado.');
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão negada para usar a câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        React.createElement(Camera as any, {
          style: StyleSheet.absoluteFillObject,
          onBarCodeScanned: scanned ? undefined : handleBarCodeScanned,
          barCodeScannerSettings: { barCodeTypes: ['qr'] },
        })
      )}
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Escanear novamente" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
});
