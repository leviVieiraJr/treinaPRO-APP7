import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerBackVisible: true, headerTitle: '' }}>
      <Stack.Screen name="tabs/dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/agenda" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/empresas" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/relatorios" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/presenca" options={{ headerShown: false }} />
      <Stack.Screen name="tabs/prova" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="aluno" options={{ headerShown: false }} />
    </Stack>
  );
}
