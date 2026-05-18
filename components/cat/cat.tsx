// components/cat/cat.tsx

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Cat } from '../interfaces/ICats';

export type CatProps = {
  cat: Cat;

  onEdit: (cat: Cat) => void;

  onDelete: (cat: Cat) => void;
};

export default function CatItem({
  cat,
  onEdit,
  onDelete,
}: CatProps) {

  return (

    <View style={styles.box}>

      <Text style={styles.nome}>
        {cat.nome}
      </Text>

      <Text>
        Idade: {cat.idade}
      </Text>

      <Text>
        Raça: {cat.raca}
      </Text>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => onEdit(cat)}
        >
          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => onDelete(cat)}
        >
          <Text style={styles.buttonText}>
            Excluir
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  box: {
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },

  buttonEdit: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonDelete: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});