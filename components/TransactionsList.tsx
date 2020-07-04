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
import { SafeAreaView } from "react-native-safe-area-context";
import Axios from "axios";

import { searchTransactions } from "../helpers";
import { Transaction, TransactionResponse } from "../types";
import TransactionsListItem from "./TransactionsListItem";
import TransactionsSearchBox from "./TransactionsSearchBox";
import TransactionsSort, { SortOption } from "./TransactionsSort";

type TransactionsListProps = {
  onGoToDetails: (transaction: Transaction) => any;
};
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

const TransactionsList: FC<TransactionsListProps> = ({ onGoToDetails }) => {
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
      const response = await Axios.get<{ [id: string]: TransactionResponse }>(
        "https://nextar.flip.id/frontend-test"
      );
      setTransactions(
        Object.entries(response.data).map(([id, transaction]) => {
          return {
            ...transaction,
            status_dependent_date:
              transaction.status === "SUCCESS"
                ? transaction.completed_at
                : transaction.created_at,
          };
        })
      );
    } catch (error) {
      setError(error);
    }
    setStatus("idle");
  };
  useEffect(() => {
    fetch();
  }, []);
  let listItems = searchTransactions(transactions, term);
  listItems = listItems.sort((a, b) => {
    switch (sortBy) {
      case "beneficiary_name_asc":
        return a.beneficiary_name.toLocaleLowerCase() <
          b.beneficiary_name.toLocaleLowerCase()
          ? -1
          : 0;
      case "beneficiary_name_desc":
        return a.beneficiary_name.toLocaleLowerCase() >
          b.beneficiary_name.toLocaleLowerCase()
          ? -1
          : 0;
      case "date_asc":
        return a.status_dependent_date < b.status_dependent_date ? -1 : 0;
      case "date_desc":
        return a.status_dependent_date > b.status_dependent_date ? -1 : 0;
      default:
        return a.status === "PENDING" ? -1 : 0;
    }
  });

  return (
    <>
      <SafeAreaView>
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
      </SafeAreaView>
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
          return (
            <TransactionsListItem
              onPress={() => onGoToDetails(transaction)}
              transaction={transaction}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 6,
    flexDirection: "row",
    height: 60,
    marginHorizontal: 8,
    marginVertical: 6,
  },
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
