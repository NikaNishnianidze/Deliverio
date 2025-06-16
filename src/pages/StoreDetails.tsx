import { useParams } from "react-router-dom";
import { useRoleContext } from "../context/RolesProvider";

export default function StoreDetails() {
  const { id } = useParams();
  const { storeData } = useRoleContext();
  return <div className="flex flex-col items-center"></div>;
}
