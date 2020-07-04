import React, { FC } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";

import { MainNavigatorParamsList } from "../components/MainNavigator";
import { renderBankName, renderCurrency, renderDate } from "../helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation: StackNavigationProp<MainNavigatorParamsList, "TransactionDetail">;
  route: RouteProp<MainNavigatorParamsList, "TransactionDetail">;
};

const TransactionDetailScreen: FC<Props> = ({ navigation, route }) => {
  const transaction = route.params.transaction;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <Text style={styles.headingText}>
                ID Transaksi: #{transaction.id}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <View style={styles.sectionRow}>
                <Text
                  style={[
                    styles.sectionRowItem,
                    styles.fill,
                    styles.headingText,
                  ]}
                >
                  Detail Transaksi
                </Text>
                <TouchableOpacity
                  style={styles.sectionRowItem}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.headingTextAction}>Tutup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.section, styles.sectionLast]}>
            <View style={styles.sectionContent}>
              <Text style={styles.titleText}>
                {renderBankName(transaction.sender_bank)}{" "}
                <Feather name="arrow-right" size={20} />{" "}
                {renderBankName(transaction.beneficiary_bank)}
              </Text>
              <View style={[styles.sectionRow, styles.detailSection]}>
                <View style={[styles.sectionRowItem, styles.fill]}>
                  <Text style={styles.detailTitle}>
                    {transaction.beneficiary_name}
                  </Text>
                  <Text style={styles.detailValue}>
                    {transaction.account_number}
                  </Text>
                </View>
                <View style={[styles.sectionRowItem, styles.fill]}>
                  <Text style={styles.detailTitle}>Nominal</Text>
                  <Text style={styles.detailValue}>
                    {renderCurrency(transaction.amount)}
                  </Text>
                </View>
              </View>

              <View style={[styles.sectionRow, styles.detailSection]}>
                <View style={[styles.sectionRowItem, styles.fill]}>
                  <Text style={styles.detailTitle}>Berita Transfer</Text>
                  <Text style={styles.detailValue}>{transaction.remark}</Text>
                </View>
                <View style={[styles.sectionRowItem, styles.fill]}>
                  <Text style={styles.detailTitle}>Kode Unik</Text>
                  <Text style={styles.detailValue}>
                    {transaction.unique_code.toString()}
                  </Text>
                </View>
              </View>

              <View style={[styles.sectionRow, styles.detailSection]}>
                <View style={[styles.sectionRowItem, styles.fill]}>
                  <Text style={styles.detailTitle}>Waktu Dibuat</Text>
                  <Text style={styles.detailValue}>
                    {renderDate(transaction.created_at)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  fill: {
    flex: 1,
  },
  section: {
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
    paddingVertical: 24,
  },
  sectionLast: {
    borderBottomWidth: 0,
  },
  sectionContent: {
    paddingHorizontal: 20,
  },
  sectionRow: {
    flexDirection: "row",
    marginHorizontal: -20,
  },
  sectionRowItem: {
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headingTextAction: {
    color: "tomato",
    fontSize: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  detailValue: {
    lineHeight: 20,
  },
});

export default TransactionDetailScreen;
