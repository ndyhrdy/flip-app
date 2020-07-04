import React, { FC } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { MainNavigatorParamsList } from "../components/MainNavigator";
import { Transaction } from "../types";
import TransactionsList from "../components/TransactionsList";

type Props = {
  navigation: StackNavigationProp<MainNavigatorParamsList, "Transactions">;
};

const TransactionScreen: FC<Props> = ({ navigation }) => {
  return (
    <TransactionsList
      onGoToDetails={(transaction: Transaction) =>
        navigation.push("TransactionDetail", { transaction })
      }
    />
  );
};

export default TransactionScreen;
