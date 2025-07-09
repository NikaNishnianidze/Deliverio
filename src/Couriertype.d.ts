interface ICourierType {
  id: string;
  name: string;
  phoneNumber: string;
  status: strinng;
  lat?: number;
  lng?: number;
}

export type TCourierType = ICourierType[];

interface ICourierTypeWithDate extends ICourierType {
  date: string;
}
export type TCourierTypeWithDate = ICourierTypeWithDate[];
