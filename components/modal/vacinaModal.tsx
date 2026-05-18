// components/modal/vacinaModal.tsx

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Vacina } from "../interfaces/IVacina";

export type VacinaModalProps = {
  visible: boolean;

  vacina?: Vacina | null;

  onAdd: (vacina: Omit<Vacina, "id">) => void;

  onEdit: (vacina: Vacina) => void;

  onCancel: () => void;
};

export default function VacinaModal({
  visible,
  vacina,
  onAdd,
  onEdit,
  onCancel,
}: VacinaModalProps) {

  const [nomeVacina, setNomeVacina] = useState("");
  const [dataAplicacao, setDataAplicacao] = useState("");
  const [dataReforco, setDataReforco] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [lote, setLote] = useState("");
  const [nomeGato, setNomeGato] = useState("");

  useEffect(() => {

    if (vacina) {
      setNomeVacina(vacina.nomeVacina);
      setDataAplicacao(vacina.dataAplicacao);
      setDataReforco(vacina.dataReforco);
      setVeterinario(vacina.veterinario);
      setLote(vacina.lote);
      setNomeGato(vacina.nomeGato);
    }

    else {
      limparCampos();
    }

  }, [vacina]);

  const limparCampos = () => {
    setNomeVacina("");
    setDataAplicacao("");
    setDataReforco("");
    setVeterinario("");
    setLote("");
    setNomeGato("");
  };

  const salvar = () => {

    const dados = {
      nomeVacina,
      dataAplicacao,
      dataReforco,
      veterinario,
      lote,
      nomeGato,
    };

    // UPDATE
    if (vacina) {

      onEdit({
        id: vacina.id,
        ...dados,
      });

    }

    // CREATE
    else {

      onAdd(dados);

    }

    limparCampos();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >

      <View style={styles.container}>

        <View style={styles.boxContainer}>

          <Text style={styles.title}>
            {vacina ? "Editar Vacina" : "Cadastrar Vacina"}
          </Text>

          <TextInput
            placeholder="Nome da Vacina"
            style={styles.boxInput}
            value={nomeVacina}
            onChangeText={setNomeVacina}
          />

          <TextInput
            placeholder="Data Aplicação"
            style={styles.boxInput}
            value={dataAplicacao}
            onChangeText={setDataAplicacao}
          />

          <TextInput
            placeholder="Data Reforço"
            style={styles.boxInput}
            value={dataReforco}
            onChangeText={setDataReforco}
          />

          <TextInput
            placeholder="Veterinário"
            style={styles.boxInput}
            value={veterinario}
            onChangeText={setVeterinario}
          />

          <TextInput
            placeholder="Lote"
            style={styles.boxInput}
            value={lote}
            onChangeText={setLote}
          />

          <TextInput
            placeholder="Nome do Gato"
            style={styles.boxInput}
            value={nomeGato}
            onChangeText={setNomeGato}
          />

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={salvar}
            >
              <Text style={styles.buttonText}>
                {vacina ? "Salvar" : "Adicionar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => {
                limparCampos();
                onCancel();
              }}
            >
              <Text style={styles.buttonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },

  boxContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  boxInput: {
    backgroundColor: '#DDD',
    borderRadius: 5,
    height: 45,
    marginVertical: 5,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },

  buttonAdd: {
    flex: 1,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonCancel: {
    flex: 1,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});