import React, { FC, useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Axios from "axios";

import { searchTransactions } from "../helpers";
import { Transaction } from "../types";
import TransactionsListItem from "./TransactionsListItem";
import TransactionsSearchBox from "./TransactionsSearchBox";
import TransactionsSort, { SortOption } from "./TransactionsSort";

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
  const [sortBy, setSortBy] = useState<SortOption>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [term, setTerm] = useState<string>("");
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
  const listItems = searchTransactions(transactions, term);

  return (
    <>
      <View style={styles.header}>
        <TransactionsSearchBox
          term={term}
          onChangeTerm={(newTerm) => setTerm(newTerm)}
        />
        <TransactionsSort
          onChange={(newSort) => setSortBy(newSort)}
          sortBy={sortBy}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={listItems}
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
          return <TransactionsListItem transaction={transaction} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "stretch",
    backgroundColor: "white",
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 8,
  },
  scrollContent: {
    paddingBottom: 48,
    paddingTop: 6,
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
