import React, { useState } from "react";
import {View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export type CatModalProps = {
  onAdd: (cat:{ 
    nome: string, 
    idade: string,
    raca: string,  }) => void;
  onCancel: () => void;
}
export default function CatModal({onAdd, onCancel }: CatModalProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");


  return (
      <View style={styles.container}>
        <View>
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
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(253, 252, 252, 0.7)',
    flex: 1,
  },
  boxContainer: {
    backgroundColor: '#f7f2f2',
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