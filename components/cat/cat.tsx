// components/cat/cat.tsx

import React from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 18,
    elevation: 0,
    shadowColor: '#9aa8c7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderWidth: 0,
  },

  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: 6,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  buttonEdit: {
    flex: 1,
    backgroundColor: '#4f8cff',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
  },

  buttonDelete: {
    flex: 1,
    backgroundColor: '#ff7aa2',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});