import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Transaction } from "../types";
import TransactionsScreen from "../screens/TransactionsScreen";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";

export type MainNavigatorParamsList = {
  Transactions: undefined;
  TransactionDetail: {
    transaction: Transaction;
  };
};

const Stack = createStackNavigator<MainNavigatorParamsList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ title: "Transaksi" }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{ title: "Detail Transaksi" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
