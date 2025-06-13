import { createContext, useContext, useState, type ReactNode } from "react";

interface IroleContext {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

const roleContext = createContext<IroleContext>({
  role: "",
  setRole: () => {},
});
export default function RolesProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string>("");
  return (
    <>
      <roleContext.Provider value={{ role, setRole }}>
        {children}
      </roleContext.Provider>
    </>
  );
}

export const useRoleContext = () => {
  const context = useContext(roleContext);
  return context;
};
