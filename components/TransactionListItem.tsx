import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Transaction } from "../types";
import { renderBankName, renderCurrency, renderStatus } from "../helpers";

type Props = {
  transaction: Transaction;
};

const TransactionListItem: FC<Props> = ({ transaction }) => {
  const date = new Date(
    (transaction.status === "SUCCESS"
      ? transaction.completed_at
      : transaction.created_at
    ).replace(" ", "T")
  ).toDateString();

  return (
    <View
      style={[
        styles.container,
        transaction.status === "SUCCESS" && styles.containerSuccess,
        transaction.status === "PENDING" && styles.containerPending,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {renderBankName(transaction.sender_bank)} &rarr;{" "}
          {renderBankName(transaction.beneficiary_bank)}
        </Text>
        <Text style={styles.line1}>{transaction.beneficiary_name}</Text>
        <Text style={styles.line2}>
          {renderCurrency(transaction.amount)} &bull; {date}
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
        >
          {renderStatus(transaction.status)}
        </Text>
      </View>
    </View>
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    textAlign: "right",
  },
  badgeSuccessText: {
    color: "white",
  },
});

export default TransactionListItem;
