import React, { FC } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Transaction } from "../types";
import {
  renderBankName,
  renderCurrency,
  renderDate,
  renderStatus,
} from "../helpers";
import Text from "./Text";

type Props = {
  onPress: () => any;
  transaction: Transaction;
};

const TransactionListItem: FC<Props> = ({ onPress, transaction }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        transaction.status === "SUCCESS" && styles.containerSuccess,
        transaction.status === "PENDING" && styles.containerPending,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} strong>
          {renderBankName(transaction.sender_bank)}{" "}
          <Feather name="arrow-right" size={16} />{" "}
          {renderBankName(transaction.beneficiary_bank)}
        </Text>
        <Text style={styles.line1} numberOfLines={1}>
          {transaction.beneficiary_name}
        </Text>
        <Text style={styles.line2} numberOfLines={1}>
          {renderCurrency(transaction.amount)} &bull;{" "}
          {renderDate(transaction.status_dependent_date)}
        </Text>
      </View>
      <View
        style={[
          styles.badge,
          transaction.status === "SUCCESS" && styles.badgeSuccess,
          transaction.status === "PENDING" && styles.badgePending,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            transaction.status === "SUCCESS" && styles.badgeSuccessText,
          ]}
          strong
        >
          {renderStatus(transaction.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderLeftWidth: 6,
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: 8,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  containerSuccess: {
    borderLeftColor: "mediumseagreen",
  },
  containerPending: {
    borderLeftColor: "tomato",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
  },
  line1: {
    lineHeight: 22,
    textTransform: "uppercase",
  },
  line2: {},
  badge: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: "row",
    height: 26,
    paddingHorizontal: 8,
  },
  badgeSuccess: {
    backgroundColor: "mediumseagreen",
    borderColor: "mediumseagreen",
  },
  badgePending: {
    backgroundColor: "white",
    borderColor: "tomato",
  },
  badgeText: {
    fontSize: 12,
    textAlign: "right",
  },
  badgeSuccessText: {
    color: "white",
  },
});

export default TransactionListItem;
