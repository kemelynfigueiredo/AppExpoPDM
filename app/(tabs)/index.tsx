import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.heroCard}>
        <Text style={styles.eyebrow}>PDM Pet Care</Text>
        <Text style={styles.title}>Organize tudo com praticidade</Text>
        <Text style={styles.subtitle}>
          Acompanhe seus gatos e vacinas em uma experiência mais clean e moderna.
        </Text>
      </ThemedView>

      <ThemedView style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, styles.cardCat]}
          activeOpacity={0.9}
          onPress={() => router.push('/CatListenScreen')}>
          <Text style={styles.cardIcon}>🐱</Text>
          <Text style={styles.cardTitle}>Gatos</Text>
          <Text style={styles.cardText}>Cadastre e mantenha o perfil dos seus pets.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardVaccine]}
          activeOpacity={0.9}
          onPress={() => router.push('/VacinaListenScreen')}>
          <Text style={styles.cardIcon}>💉</Text>
          <Text style={styles.cardTitle}>Vacinas</Text>
          <Text style={styles.cardText}>Gerencie lembretes e registros de vacinação.</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.footerCard}>
        <Text style={styles.footerTitle}>Por que usar?</Text>
        <Text style={styles.footerText}>• Interface simples e visual agradável</Text>
        <Text style={styles.footerText}>• Navegação direta entre gatos e vacinas</Text>
        <Text style={styles.footerText}>• Organização centralizada para o seu dia a dia</Text>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fb',
  },
  heroCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#7c8db5',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2a44',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5f6b86',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    minHeight: 180,
    justifyContent: 'center',
  },
  cardCat: {
    backgroundColor: '#ffe4ec',
  },
  cardVaccine: {
    backgroundColor: '#e4f1ff',
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f2a44',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4f5e75',
  },
  footerCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2a44',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#5f6b86',
    marginBottom: 4,
  },
});
