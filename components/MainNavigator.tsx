import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TransactionScreen from "../screens/TransactionsScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transactions" component={TransactionScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
