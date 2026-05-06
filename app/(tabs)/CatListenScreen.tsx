import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import MyScrollView from '@/components/MyScrollView';
import { ThemedView } from '@/components/themed-view';

import CatItem from '@/components/cat/cat';
import { Cat } from '@/components/interfaces/ICats';
import CatModal from '@/components/modal/gatoModal';

export default function CatsListScreen() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (cat: Omit<Cat, "id">) => {
    const newCat: Cat = {
      id: Math.random() * 1000,
      ...cat,
    };

    const catsPlus: Cat[] = [
      ...cats,
      newCat
    ];

    setCats(catsPlus);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView 
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={require('../../assets/images/cat.jpeg')}
      >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
        <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>


      <ThemedView style={styles.container}>
        {cats.length === 0 ? (
          <Text>Nenhum gato cadastrado</Text>
        ) : (
          cats.map(cat => (
            <CatItem
              key={cat.id}
              nome={cat.nome}
              idade={cat.idade}
              raca={cat.raca}
            />
          ))
        )}
      </ThemedView>

      <CatModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
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