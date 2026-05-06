import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export type VacinaModalProps = {
  onAdd: (vacina:{ 
    nomeVacina: string,
    dataAplicacao: string,
    dataReforco: string,
    veterinario: string,
    lote: string,
    nomeGato: string, }) => void;
  onCancel: () => void;
}
export default function VacinaModal({ onAdd, onCancel }: VacinaModalProps) {
  const [nomeVacina, setNomeVacina] = useState("");
  const [dataAplicacao, setDataAplicacao] = useState("");
  const [dataReforco, setDataReforco] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [lote, setLote] = useState("");
  const [nomeGato, setNomeGato] = useState("");


  return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Nome"
            style={styles.boxInput}
            value={nomeVacina}
            onChangeText={text=> setNomeVacina(text)}
            autoFocus
          />

          <TextInput
            placeholder="Data Aplicação"
            style={styles.boxInput}
            value={dataAplicacao}
            onChangeText={text=> setDataAplicacao(text)}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Data Reforço"
            style={styles.boxInput}
            value={dataReforco}
            onChangeText={text=> setDataReforco(text)}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="veterinário"
            style={styles.boxInput}
            value={veterinario}
            onChangeText={text=> setVeterinario(text)}
          />
          <TextInput
            placeholder="Lote Vacina"
            style={styles.boxInput}
            value={lote}
            onChangeText={text=> setLote(text)}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Nome do Gato"
            style={styles.boxInput}
            value={nomeGato}
            onChangeText={text=> setNomeGato(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(
                {nomeVacina: nomeVacina, 
                dataAplicacao: dataAplicacao, 
                dataReforco: dataReforco,
                veterinario: veterinario,
                lote: lote,
                nomeGato: nomeGato
                 ,})}>
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
    backgroundColor: 'rgb(254, 253, 253)',
    flex: 1,
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