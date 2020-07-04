import React, { FC, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type Props = {
  onChange: (sort: SortOption) => any;
  sortBy: SortOption;
};

export type SortOption =
  | "beneficiary_name_asc"
  | "beneficiary_name_desc"
  | "date_desc"
  | "date_asc"
  | null;

const options: Array<{ key: SortOption; label: string }> = [
  { key: null, label: "URUTKAN" },
  { key: "beneficiary_name_asc", label: "Nama A-Z" },
  { key: "beneficiary_name_desc", label: "Nama Z-A" },
  { key: "date_desc", label: "Tanggal Terbaru" },
  { key: "date_asc", label: "Tanggal Terlama" },
];

const TransactionsSort: FC<Props> = ({ onChange, sortBy }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const sortLabel = options.find((sortLabel) => sortLabel.key === sortBy)
    ?.label;

  const handleChange = (option: SortOption) => {
    onChange(option);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>{sortLabel}</Text>
        <Feather name="chevron-down" size={20} color="tomato" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
        statusBarTranslucent
        transparent
        visible={showModal}
      >
        <View
          style={styles.modalOverlay}
          onStartShouldSetResponder={() => true}
          onResponderStart={() => setShowModal(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            {options.map((option) => {
              const selected = option.key === sortBy;
              return (
                <TouchableOpacity
                  key={option.key || ""}
                  onPress={() => handleChange(option.key)}
                  style={styles.option}
                >
                  <MaterialIcons
                    name={
                      selected
                        ? "radio-button-checked"
                        : "radio-button-unchecked"
                    }
                    color="tomato"
                    size={24}
                  />
                  <Text numberOfLines={1} style={styles.optionText}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 24,
    maxHeight: Dimensions.get("screen").height * 0.8,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  option: {
    alignItems: "center",
    flexDirection: "row",
    height: 48,
  },
  optionText: {
    fontSize: 16,
    paddingLeft: 12,
  },
});

export default TransactionsSort;
