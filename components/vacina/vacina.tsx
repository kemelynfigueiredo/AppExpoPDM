import React from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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

  editButton: {
    flex: 1,
    backgroundColor: '#4f8cff',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
  },

  deleteButton: {
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