interface IStore {
  id: string;
  date: string;
  name: string;
  amount: string;
  status: boolean;
}

export type TStore = IStore[];
