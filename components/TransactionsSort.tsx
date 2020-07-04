import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onChange: (sort: SortOption) => any;
  sortBy: SortOption;
};

export type SortOption =
  | "beneficiary_name_asc"
  | "beneficiary_name_desc"
  | "date_asc"
  | "date_desc"
  | null;

const sortLabels: Array<{ key: SortOption; label: string }> = [
  { key: "beneficiary_name_asc", label: "Nama A-Z" },
  { key: "beneficiary_name_desc", label: "Nama Z-A" },
  { key: "date_asc", label: "Tanggal Terbaru" },
  { key: "date_desc", label: "Tanggal Terlama" },
  { key: null, label: "URUTKAN" },
];

const TransactionsSort: FC<Props> = ({ onChange, sortBy }) => {
  const sortLabel = sortLabels.find((sortLabel) => sortLabel.key === sortBy)
    ?.label;
  return (
    <>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{sortLabel}</Text>
        <Feather name="chevron-down" size={20} color="tomato" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "tomato",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default TransactionsSort;
