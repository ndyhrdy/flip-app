import React, { FC } from "react";
import { View } from "react-native";

import { Transaction } from "../types";

type Props = {
  transaction: Transaction;
};

const TransactionItem: FC<Props> = ({ transaction }) => {
  return <View></View>;
};

export default TransactionItem;
