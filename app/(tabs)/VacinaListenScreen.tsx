// app/vacina/VacinaListScreen.tsx

import { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import MyScrollView from '@/components/MyScrollView';

import { ThemedView } from '@/components/themed-view';

import VacinaItem from '@/components/vacina/vacina';

import { Vacina } from '@/components/interfaces/IVacina';

import VacinaModal from '@/components/modal/vacinaModal';

export default function VacinaListScreen() {

  const [vacinas, setVacinas] = useState<Vacina[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [vacinaSelecionada, setVacinaSelecionada] =
    useState<Vacina | null>(null);

  // CREATE
  const onAdd = (vacina: Omit<Vacina, "id">) => {

    const novaVacina: Vacina = {
      id: Math.random() * 1000,
      ...vacina,
    };

    setVacinas([...vacinas, novaVacina]);

    setModalVisible(false);
  };

  // UPDATE
  const onEdit = (vacinaAtualizada: Vacina) => {

    const novaLista = vacinas.map(v =>
      v.id === vacinaAtualizada.id
        ? vacinaAtualizada
        : v
    );

    setVacinas(novaLista);

    setVacinaSelecionada(null);

    setModalVisible(false);
  };

  // DELETE
 const onDelete = (vacina: Vacina) => {

  const novaLista = vacinas.filter(
    item => item !== vacina
  );

  setVacinas(novaLista);
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

        {vacinas.length === 0 ? (

          <Text>
            Nenhuma vacina cadastrada
          </Text>

        ) : (

          vacinas.map(vacina => (

            <VacinaItem
              key={vacina.id}
              vacina={vacina}
              onEdit={openEditModal}
              onDelete={onDelete}
            />

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

  headerContainer: {
    alignItems: 'flex-end',
    padding: 10,
    top: 20,
    right: 20,
  },

  headerButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },

  container: {
    padding: 10,
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },
});