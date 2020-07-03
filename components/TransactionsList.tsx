import React, { FC, useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Axios from "axios";

import { Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

type TransactionsListProps = {};
type TransactionsListErrorProps = {
  onRetry: () => any;
};

type Status = "idle" | "fetching" | "refreshing";

const TransactionsListError: FC<TransactionsListErrorProps> = ({ onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Tidak dapat memuat data.</Text>
      <TouchableOpacity onPress={onRetry}>
        <Text style={styles.errorRetryText}>Coba lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

const TransactionsList: FC<TransactionsListProps> = () => {
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const fetch = async (refresh: boolean = false) => {
    if (status !== "idle") {
      return;
    }
    setStatus(refresh ? "refreshing" : "fetching");
    try {
      const response = await Axios.get<{ [id: string]: Transaction }>(
        "https://nextar.flip.id/frontend-test"
      );
      setTransactions(
        Object.entries(response.data)
          .map(([id, transaction]) => {
            return {
              ...transaction,
            };
          })
          .sort((a) => (a.status === "PENDING" ? -1 : 0))
      );
    } catch (error) {
      setError(error);
    }
    setStatus("idle");
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.scrollContent}
      data={transactions}
      ListFooterComponent={
        <>
          {status === "fetching" && (
            <ActivityIndicator
              color="tomato"
              size="large"
              style={styles.loadingSpinner}
            />
          )}
          {!!error && status === "idle" && transactions.length === 0 && (
            <TransactionsListError onRetry={() => fetch(false)} />
          )}
        </>
      }
      refreshControl={
        <RefreshControl
          onRefresh={() => fetch(true)}
          refreshing={status === "refreshing"}
        />
      }
      renderItem={({ item: transaction }) => {
        return <TransactionListItem transaction={transaction} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 48,
  },
  loadingSpinner: {
    paddingVertical: 24,
  },
  errorContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  errorText: {
    marginBottom: 6,
    textAlign: "center",
  },
  errorRetryText: {
    color: "tomato",
    textAlign: "center",
  },
});

export default TransactionsList;
