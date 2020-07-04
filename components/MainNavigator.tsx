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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
