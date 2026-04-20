import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type CatProps = {
  nome: string;
  idade: string;
  raca: string;
};

export default function CatItem({ nome, idade, raca }: CatProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.nome}>{nome}</Text>
      <Text>Idade: {idade}</Text>
      <Text>Raça: {raca}</Text>
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