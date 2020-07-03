import React, { FC, useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import Axios from "axios";

import { Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

type Props = {};

type Status = "idle" | "fetching" | "refreshing";

const TransactionsList: FC<Props> = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<any>(null);
  const fetch = async () => {
    if (status !== "idle") {
      return;
    }
    setStatus("fetching");
    try {
      const response = await Axios.get<{ [id: string]: Transaction }>(
        "https://nextar.flip.id/frontend-test"
      );
      setTransactions(
        Object.entries(response.data).map(([id, transaction]) => {
          return {
            ...transaction,
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

  return (
    <FlatList
      data={transactions}
      ListFooterComponent={
        <>{status === "fetching" && <ActivityIndicator size="large" />}</>
      }
      renderItem={({ item: transaction }) => {
        return <TransactionListItem transaction={transaction} />;
      }}
    />
  );
};

export default TransactionsList;
