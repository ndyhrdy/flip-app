import React, { FC } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onChangeTerm: (term: string) => any;
  term: string;
};

const TransactionsSearchBox: FC<Props> = ({ onChangeTerm, term }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontFamily: "Lato_400Regular",
    paddingHorizontal: 6,
  },
  searchIcon: {
    alignSelf: "center",
  },
});

export default TransactionsSearchBox;
