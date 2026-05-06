import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import MyScrollView from '@/components/MyScrollView';
import { ThemedView } from '@/components/themed-view';

import VacinaItem from '@/components/vacina/vacina';
import { Vacina } from '@/components/interfaces/IVacina';
import VacinaModal from '@/components/modal/vacinaModal';

export default function  VacinaListScreen() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (vacina: Omit<Vacina, "id">) => {
    const newVacina: Vacina = {
      id: Math.random() * 1000,
      ...vacina,
    };

    const vacinasPlus: Vacina[] = [
      ...vacinas,
      newVacina
    ];

    setVacinas(vacinasPlus);
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
        {vacinas.length === 0 ? (
          <Text>Nenhuma vacina cadastrada</Text>
        ) : (
          vacinas.map(vacina => (
            <VacinaItem
              key={vacina.id}
              nomeVacina={vacina.nomeVacina}
              dataAplicacao = {vacina.dataAplicacao}
              dataReforco = {vacina.dataReforco}
              veterinario = {vacina.veterinario}
              lote = {vacina.lote}
              nomeGato={vacina.nomeGato}
            />
          ))
        )}
      </ThemedView>

      <VacinaModal
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