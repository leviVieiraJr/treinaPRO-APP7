import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { name: 'dashboard', icon: 'home', label: 'Início' },
  { name: 'agenda', icon: 'calendar', label: 'Agenda' },
  { name: 'empresas', icon: 'business-outline', label: 'Empresas' },
  { name: 'relatorios', icon: 'document-text', label: 'Relatórios' },
  { name: 'presenca', icon: 'qr-code-outline', label: 'Presença' },
  { name: 'prova', icon: 'school-outline', label: 'Prova' },
];

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (name: string) => {
    switch (name) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'agenda':
        router.push('/agenda');
        break;
      case 'empresas':
        router.push('/empresas/');
        break;
      case 'relatorios':
        router.push('/relatorios');
        break;
      case 'prova':
        router.push('/prova');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = pathname.includes(tab.name);
        return (
          <TouchableOpacity key={tab.name} onPress={() => handleNav(tab.name)} style={styles.tab}>
            <Ionicons name={tab.icon as any} size={22} color={active ? '#0A1E50' : '#999'} />
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  activeLabel: {
    color: '#0A1E50',
    fontWeight: 'bold',
  },
});
