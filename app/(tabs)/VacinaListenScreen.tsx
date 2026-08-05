// app/vacina/VacinaListScreen.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Vacina } from '@/components/interfaces/IVacina';
import VacinaModal from '@/components/modal/vacinaModal';
import MyScrollView from '@/components/MyScrollView';
import { ThemedView } from '@/components/themed-view';
import VacinaItem from '@/components/vacina/vacina';

export default function VacinaListScreen() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [vacinaSelecionada, setVacinaSelecionada] = useState<Vacina | null>(null);
  const [, setLocation] = useState({});
  const [, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@PDMApp:vacinas');
        const vacinasData = data != null ? JSON.parse(data) : [];
        setVacinas(vacinasData);
      } catch (e) {
        console.log(e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onAdd = async (vacina: Omit<Vacina, 'id'>) => {
    const novaVacina: Vacina = {
      id: Math.random() * 1000,
      ...vacina,
    };

    const novaLista = [...vacinas, novaVacina];
    setVacinas(novaLista);

    await AsyncStorage.setItem('@PDMApp:vacinas', JSON.stringify(novaLista));
    setModalVisible(false);
  };

  const onEdit = async (vacinaAtualizada: Vacina) => {
    const novaLista = vacinas.map((v) =>
      v.id === vacinaAtualizada.id ? vacinaAtualizada : v,
    );

    setVacinas(novaLista);
    await AsyncStorage.setItem('@PDMApp:vacinas', JSON.stringify(novaLista));
    setVacinaSelecionada(null);
    setModalVisible(false);
  };

  const onDelete = async (vacina: Vacina) => {
    const novaLista = vacinas.filter((item) => item.id !== vacina.id);
    setVacinas(novaLista);
    await AsyncStorage.setItem('@PDMApp:vacinas', JSON.stringify(novaLista));
  };

  const openModal = () => {
    setVacinaSelecionada(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setVacinaSelecionada(null);
  };

  const openEditModal = (vacina: Vacina) => {
    setVacinaSelecionada(vacina);
    setModalVisible(true);
  };

  return (
    <MyScrollView
      headerBackgroundColor={{
        light: '#f7f9ff',
        dark: '#f7f9ff',
      }}
      headerImage={require('../../assets/images/cat.jpeg')}
    >
      <ThemedView style={styles.headerCard}>
        <ThemedView style={styles.headerTextContainer}>
          <Text style={styles.eyebrow}>Saúde e cuidado</Text>
          <Text style={styles.title}>Vacinas cadastradas</Text>
          <Text style={styles.subtitle}>Organize seus registros com muito mais clareza.</Text>
        </ThemedView>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {vacinas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma vacina cadastrada ainda.</Text>
        ) : (
          vacinas.map((vacina) => (
            <VacinaItem key={vacina.id} vacina={vacina} onEdit={openEditModal} onDelete={onDelete} />
          ))
        )}
      </ThemedView>

      <VacinaModal
        visible={modalVisible}
        vacina={vacinaSelecionada}
        onAdd={onAdd}
        onEdit={onEdit}
        onCancel={closeModal}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#7c8db5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#7c8db5',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f2a44',
  },
  subtitle: {
    fontSize: 13,
    color: '#5f6b86',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4f8cff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  container: {
    padding: 12,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    shadowColor: '#7c8db5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#5f6b86',
    paddingVertical: 16,
    fontSize: 15,
  },
});
