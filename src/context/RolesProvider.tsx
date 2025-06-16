import { createContext, useContext, useState, type ReactNode } from "react";
import data from "../data.json";
import type { TStore } from "../datatype";

interface IroleContext {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  storeData: TStore;
  setStoreData: React.Dispatch<React.SetStateAction<TStore>>;
}

const roleContext = createContext<IroleContext>({
  role: "",
  setRole: () => {},
  storeData: data,
  setStoreData: () => {},
});
export default function RolesProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string>("");
  const [storeData, setStoreData] = useState<TStore>(data);
  return (
    <>
      <roleContext.Provider value={{ role, setRole, storeData, setStoreData }}>
        {children}
      </roleContext.Provider>
    </>
  );
}

export const useRoleContext = () => {
  const context = useContext(roleContext);
  return context;
};
