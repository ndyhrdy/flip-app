import { TransactionStatus } from "./types";

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
