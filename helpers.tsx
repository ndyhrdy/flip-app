import { TransactionStatus, Transaction } from "./types";

export const renderBankName: (bank: string) => string = (bank) => {
  if (bank.length <= 4) {
    return bank.toLocaleUpperCase();
  }
  return bank
    .split(" ")
    .map((word) => `${word[0].toLocaleUpperCase()}${word.slice(1)}`)
    .join(" ");
};

export const renderCurrency: (currency: number) => string = (currency) => {
  const length = currency.toString().length;
  const currencyString = currency
    .toString()
    .split("")
    .reduceRight((agg, decimal, index) => {
      return `${decimal}${(length - 1 - index) % 3 === 0 ? "," : ""}${agg}`;
    }, "")
    .slice(0, -1);
  return `Rp${currencyString}`;
};

export const renderStatus: (status: TransactionStatus) => string = (status) => {
  if (status === "SUCCESS") {
    return "Berhasil";
  }
  return "Pengecekan";
};

export const searchTransactions: (
  transactions: Array<Transaction>,
  term: string
) => Array<Transaction> = (transactions, term) => {
  if (term.trim().length === 0) {
    return transactions;
  }
  return transactions.filter((tx) => {
    if (tx.amount.toString().search(term) === 0) {
      return true;
    }
    if (
      tx.beneficiary_bank
        .toLocaleLowerCase()
        .search(term.toLocaleLowerCase()) === 0
    ) {
      return true;
    }
    if (
      tx.sender_bank.toLocaleLowerCase().search(term.toLocaleLowerCase()) === 0
    ) {
      return true;
    }
    if (
      tx.beneficiary_name.toLocaleLowerCase().search(term.toLocaleLowerCase()) >
      -1
    ) {
      return true;
    }
    return false;
  });
};
