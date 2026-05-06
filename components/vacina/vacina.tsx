import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type VacinaProps = {
  nomeVacina: string,
  dataAplicacao: string,
  dataReforco: string,
  veterinario: string,
  lote: string,
  nomeGato: string
}

export default function VacinaItem({ nomeVacina, dataAplicacao, dataReforco, veterinario, lote, nomeGato }: VacinaProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.nome}>{nomeVacina}</Text>
      <Text> Data da Aplicação: {dataAplicacao}</Text>
      <Text>Data do Reforço: {dataReforco}</Text>
      <Text>Veterinário: {veterinario}</Text>
      <Text>Lote: {lote}</Text>
      <Text>Nome do Gato: {nomeGato}</Text>
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
  },
});
