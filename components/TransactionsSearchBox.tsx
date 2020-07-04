import React, { FC } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onChangeTerm: (term: string) => any;
  term: string;
};

const TransactionsSearchBox: FC<Props> = ({ onChangeTerm, term }) => {
  return (
    <>
      <Feather
        color="lightgray"
        name="search"
        size={24}
        style={styles.searchIcon}
      />
      <TextInput
        onChangeText={(text) => onChangeTerm(text)}
        placeholder="Cari nama, bank, atau nominal"
        style={styles.input}
        value={term}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 6,
  },
  searchIcon: {
    alignSelf: "center",
  },
});

export default TransactionsSearchBox;
