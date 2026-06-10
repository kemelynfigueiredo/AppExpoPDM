import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Cat } from "../interfaces/ICats";

export type CatModalProps = {
  visible: boolean;

  cat?: Cat | null;

  onAdd: (
    cat: Omit<Cat, "id">
  ) => void;

  onEdit: (
    cat: Cat
  ) => void;

  onCancel: () => void;
};

export default function CatModal({
  visible,
  cat,
  onAdd,
  onEdit,
  onCancel,
}: CatModalProps) {
  // Estados para os campos do formulário

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");

  // Preencher os campos do formulário quando o gato for selecionado para edição
  useEffect(() => {

    if (cat) {

      setNome(cat.nome);
      setIdade(cat.idade);
      setRaca(cat.raca);

    }

    else {

      limparCampos();

    }

  }, [cat]);

// Limpar os campos do formulário quando o modal for fechado ou quando um novo gato for selecionado para criação

  const limparCampos = () => {

    setNome("");
    setIdade("");
    setRaca("");
  };

  const salvar = () => {

    const dados = {
      nome,
      idade,
      raca,
    };

    // UPDATE
    if (cat) {
//      Passar o id do gato junto com os dados atualizados para a função onEdit
      onEdit({
        id: cat.id,
        ...dados,
      });

    }
// Criar um novo gato passando os dados para a função onAdd
    else {

      onAdd(dados);

    }

    limparCampos();
  };
// Renderizar o modal com os campos de entrada e os botões de salvar e cancelar
  return (

    <Modal
      visible={visible}
      animationType='fade'
      transparent={true}
    >

      <View style={styles.container}>

        <View style={styles.boxContainer}>

          <Text style={styles.title}>
            {cat
              ? "Editar Gato"
              : "Cadastrar Gato"}
          </Text>

          <TextInput
            placeholder="Nome"
            style={styles.boxInput}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="Idade"
            style={styles.boxInput}
            value={idade}
            onChangeText={setIdade}
          />

          <TextInput
            placeholder="Raça"
            style={styles.boxInput}
            value={raca}
            onChangeText={setRaca}
          />

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={salvar}
            >
              <Text style={styles.buttonText}>
                {cat
                  ? "Salvar"
                  : "Adicionar"}
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
    backgroundColor: 'rgba(254, 254, 254, 0.7)',
    justifyContent: 'center',
    flex: 1,
  },

  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFF',
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },

  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },

  buttonCancel: {
    backgroundColor: 'red',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 70,
  },

  boxInput: {
    height: 45,
    borderRadius: 5,
    backgroundColor: '#DDD',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});