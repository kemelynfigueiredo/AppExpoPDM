// app/vacina/VacinaListScreen.tsx

import { useEffect, useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

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

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem(
          "@PDMApp:vacinas"
        );

        const vacinasData =
          data != null ? JSON.parse(data) : [];

        setVacinas(vacinasData);
      } catch (e) {
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

  let text = 'Waiting...';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //criar
  const onAdd = async (vacina: Omit<Vacina, "id">) => {

    const novaVacina: Vacina = {
      id: Math.random() * 1000,
      ...vacina,
    };

    const novaLista = [...vacinas, novaVacina];

    setVacinas(novaLista);

    await AsyncStorage.setItem(
      "@PDMApp:vacinas",
      JSON.stringify(novaLista)
    );

    setModalVisible(false);
  };

  // UPDATE
  const onEdit = async (vacinaAtualizada: Vacina) => {

    const novaLista = vacinas.map(v =>
      v.id === vacinaAtualizada.id
        ? vacinaAtualizada
        : v
    );

    setVacinas(novaLista);

    await AsyncStorage.setItem(
      "@PDMApp:vacinas",
      JSON.stringify(novaLista)
    );

    setVacinaSelecionada(null);
    setModalVisible(false);
  };

  // DELETE
  const onDelete = async (vacina: Vacina) => {

  const novaLista = vacinas.filter(
    item => item.id !== vacina.id
  );

  setVacinas(novaLista);

  await AsyncStorage.setItem(
    "@PDMApp:vacinas",
    JSON.stringify(novaLista)
  );
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