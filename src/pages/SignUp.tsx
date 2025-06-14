import { useRoleContext } from "../context/RolesProvider";

export default function SignUp() {
  const { role } = useRoleContext();
  return <div className="flex flex-col items-center"></div>;
}
