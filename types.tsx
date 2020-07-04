export type TransactionStatus = "SUCCESS" | "PENDING";

export type TransactionResponse = {
  id: string;
  amount: number;
  unique_code: number;
  status: TransactionStatus;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
};

export type Transaction = TransactionResponse & {
  status_dependent_date: string;
};
