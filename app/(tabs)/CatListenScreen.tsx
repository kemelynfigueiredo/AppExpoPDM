// app/cat/CatsListScreen.tsx

import { useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect } from 'react';

import MyScrollView from '@/components/MyScrollView';

import { ThemedView } from '@/components/themed-view';

import CatItem from '@/components/cat/cat';

import { Cat } from '@/components/interfaces/ICats';

import CatModal from '@/components/modal/gatoModal';

export default function CatsListScreen() {

  // Estado para armazenar a lista de gatos
  const [cats, setCats] = useState<Cat[]>([]);

  const [modalVisible, setModalVisible] =
    useState<boolean>(false);

  const [catSelecionado, setCatSelecionado] =
    useState<Cat | null>(null);

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem(
          "@PDMApp:cats"
        );

        const catsData =
          data != null ? JSON.parse(data) : [];

        setCats(catsData);
      } catch (e) {
        console.log(e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg(
          'Permission to access location was denied'
        );
        return;
      }

      let location =
        await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  // Função para adicionar um novo gato à lista
  const onAdd = async (
    cat: Omit<Cat, "id">
  ) => {

    const newCat: Cat = {
      id: Math.random() * 1000,
      ...cat,
    };

    const novaLista = [
      ...cats,
      newCat
    ];

    setCats(novaLista);

    await AsyncStorage.setItem(
      "@PDMApp:cats",
      JSON.stringify(novaLista)
    );

    setModalVisible(false);
  };
  // Função para editar um gato existente na lista

  const onEdit = async (
    catAtualizado: Cat
  ) => {

    const novaLista = cats.map(cat =>
      cat.id === catAtualizado.id
        ? catAtualizado
        : cat
    );

    setCats(novaLista);

    await AsyncStorage.setItem(
      "@PDMApp:cats",
      JSON.stringify(novaLista)
    );

    setCatSelecionado(null);

    setModalVisible(false);
  };

  // Função para excluir um gato da lista

  const onDelete = async (
    cat: Cat
  ) => {

    const novaLista = cats.filter(
      item => item.id !== cat.id
    );

    setCats(novaLista);

    await AsyncStorage.setItem(
      "@PDMApp:cats",
      JSON.stringify(novaLista)
    );
  };
  // Funções para abrir e fechar o modal de cadastro/edição de gatos
  const openModal = () => {

    setCatSelecionado(null);

    setModalVisible(true);
  };
  // Função para fechar o modal e limpar o gato selecionado
  const closeModal = () => {

    setModalVisible(false);

    setCatSelecionado(null);
  };
  // Função para abrir o modal de edição com os dados do gato selecionado
  const openEditModal = (
    cat: Cat
  ) => {

    setCatSelecionado(cat);

    setModalVisible(true);
  };

  return (

    <MyScrollView
      headerBackgroundColor={{
        light: '#D0D0D0',
        dark: '#353636'
      }}

      headerImage={
        require('../../assets/images/cat.jpeg')
      }
    >

      <ThemedView style={styles.headerContainer}>

        <TouchableOpacity onPress={openModal}>

          <Text style={styles.headerButton}>
            +
          </Text>

        </TouchableOpacity>

      </ThemedView>

      <ThemedView style={styles.container}>

        {cats.length === 0 ? (

          <Text>
            Nenhum gato cadastrado
          </Text>

        ) : (
          // Renderizar a lista de gatos usando o componente CatItem, passando as funções de edição e exclusão como props
          cats.map(cat => (

            <CatItem
              key={cat.id}
              cat={cat}
              onEdit={openEditModal}
              onDelete={onDelete}
            />

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

  headerContainer: {
    alignItems: 'flex-end',
    padding: 20,
    top: 20,
    right: 20,
    color: '#fff',
  },

  headerButton: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },

  container: {
    padding: 15,
    color: '#fff',
    backgroundColor: '#fff',
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },
});