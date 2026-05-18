import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Vacina } from '../interfaces/IVacina';

export type VacinaProps = {
  vacina: Vacina;

  onEdit: (vacina: Vacina) => void;

  onDelete: (vacina: Vacina) => void;
};

export default function VacinaItem({
  vacina,
  onEdit,
  onDelete,
}: VacinaProps) {

  return (
    <View style={styles.box}>

      <Text style={styles.nome}>
        {vacina.nomeVacina}
      </Text>

      <Text>
        Data da Aplicação: {vacina.dataAplicacao}
      </Text>

      <Text>
        Data do Reforço: {vacina.dataReforco}
      </Text>

      <Text>
        Veterinário: {vacina.veterinario}
      </Text>

      <Text>
        Lote: {vacina.lote}
      </Text>

      <Text>
        Nome do Gato: {vacina.nomeGato}
      </Text>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(vacina)}
        >
          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(vacina)}
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

  editButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButton: {
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