// app/cat/CatsListScreen.tsx

import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import CatItem from '@/components/cat/cat';
import { Cat } from '@/components/interfaces/ICats';
import CatModal from '@/components/modal/gatoModal';
import MyScrollView from '@/components/MyScrollView';
import { ThemedView } from '@/components/themed-view';

export default function CatsListScreen() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [catSelecionado, setCatSelecionado] = useState<Cat | null>(null);
  const [, setLocation] = useState({});
  const [, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@PDMApp:cats');
        const catsData = data != null ? JSON.parse(data) : [];
        setCats(catsData);
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

  const onAdd = async (cat: Omit<Cat, 'id'>) => {
    const newCat: Cat = {
      id: Math.random() * 1000,
      ...cat,
    };

    const novaLista = [...cats, newCat];
    setCats(novaLista);

    await AsyncStorage.setItem('@PDMApp:cats', JSON.stringify(novaLista));
    setModalVisible(false);
  };

  const onEdit = async (catAtualizado: Cat) => {
    const novaLista = cats.map((cat) =>
      cat.id === catAtualizado.id ? catAtualizado : cat,
    );

    setCats(novaLista);
    await AsyncStorage.setItem('@PDMApp:cats', JSON.stringify(novaLista));
    setCatSelecionado(null);
    setModalVisible(false);
  };

  const onDelete = async (cat: Cat) => {
    const novaLista = cats.filter((item) => item.id !== cat.id);
    setCats(novaLista);
    await AsyncStorage.setItem('@PDMApp:cats', JSON.stringify(novaLista));
  };

  const openModal = () => {
    setCatSelecionado(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCatSelecionado(null);
  };

  const openEditModal = (cat: Cat) => {
    setCatSelecionado(cat);
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
          <Text style={styles.eyebrow}>Gestão de pets</Text>
          <Text style={styles.title}>Gatos cadastrados</Text>
          <Text style={styles.subtitle}>Adicione, edite e acompanhe cada pet em poucos passos.</Text>
        </ThemedView>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {cats.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum gato cadastrado ainda.</Text>
        ) : (
          cats.map((cat) => (
            <CatItem key={cat.id} cat={cat} onEdit={openEditModal} onDelete={onDelete} />
          ))
        )}
      </ThemedView>

      <CatModal
        visible={modalVisible}
        cat={catSelecionado}
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
    backgroundColor: '#ff7aa2',
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