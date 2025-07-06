interface IStore {
  id: string;
  date: string;
  name: string;
  amount: string;
  status: boolean;
  address: string;
  phoneNumber: string;
  store: string;
  orderStatus: string;
}

export type TStore = IStore[];
