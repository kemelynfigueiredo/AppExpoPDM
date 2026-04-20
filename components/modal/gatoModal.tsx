import React, { useState } from "react";
import {View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export type CatModalProps = {
  visible: boolean,
  onAdd: (cat:{ 
    nome: string, 
    idade: string
    raca: string,  }) => void;
  onCancel: () => void;
}
export default function CatModal({ visible, onAdd, onCancel }: CatModalProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");


  return (
    <Modal visible={visible} animationType='fade' transparent= {true} onRequestClose= {() => {}}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            placeholder="Nome"
            style={styles.boxInput}
            value={nome}
            onChangeText={text=> setNome(text)}
            autoFocus
          />

          <TextInput
            placeholder="Idade"
            style={styles.boxInput}
            value={idade}
            onChangeText={text=> setIdade(text)}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Raça"
            style={styles.boxInput}
            value={raca}
            onChangeText={text=> setRaca(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd({nome: nome, idade: idade, raca: raca,})}>
            <Text style={styles.buttonText}>
              Add
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={ () => onCancel()}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
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
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#DDD',
    margin: 5,
  },
});