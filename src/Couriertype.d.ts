interface ICourierType {
  id: string;
  name: string;
  phoneNumber: string;
  status: strinng;
}

export type TCourierType = ICourierType[];

interface ICourierTypeWithDate extends ICourierType {
  date: string;
}
export type TCourierTypeWithDate = ICourierTypeWithDate[];
