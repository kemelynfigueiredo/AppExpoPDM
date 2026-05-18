// app/cat/CatsListScreen.tsx

import { useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import MyScrollView from '@/components/MyScrollView';

import { ThemedView } from '@/components/themed-view';

import CatItem from '@/components/cat/cat';

import { Cat } from '@/components/interfaces/ICats';

import CatModal from '@/components/modal/gatoModal';

export default function CatsListScreen() {

  const [cats, setCats] = useState<Cat[]>([]);

  const [modalVisible, setModalVisible] =
    useState<boolean>(false);

  const [catSelecionado, setCatSelecionado] =
    useState<Cat | null>(null);

  //Criar
  const onAdd = (
    cat: Omit<Cat, "id">
  ) => {

    const newCat: Cat = {
      id: Math.random() * 1000,
      ...cat,
    };

    setCats([
      ...cats,
      newCat
    ]);

    setModalVisible(false);
  };

  //Atualizar

  const onEdit = (
    catAtualizado: Cat
  ) => {

    const novaLista = cats.map(cat =>

      cat.id === catAtualizado.id
        ? catAtualizado
        : cat

    );

    setCats(novaLista);

    setCatSelecionado(null);

    setModalVisible(false);
  };

  //Deletar

  const onDelete = (
    cat: Cat
  ) => {

    const novaLista = cats.filter(
      item => item !== cat
    );

    setCats(novaLista);
  };

  const openModal = () => {

    setCatSelecionado(null);

    setModalVisible(true);
  };

  const closeModal = () => {

    setModalVisible(false);

    setCatSelecionado(null);
  };

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
    padding: 10,
    top: 20,
    right: 20,
  },

  headerButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  container: {
    padding: 10,
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },
});