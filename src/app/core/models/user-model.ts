export interface UserModel {
  status: number;
  user: UserInfo;
  accessToken: string;
}

export interface UserInfo {
  username: string;
  emailAddress: string;
  date: string;
  id: string;
  role: string;
  gender: string;
  dateofbirth: string;
  averageMonthlyIncome: number;
  totalExpenses?: number;
  totalBalance?: number;
}
