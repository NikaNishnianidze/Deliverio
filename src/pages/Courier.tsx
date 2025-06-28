import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";

export default function Courier() {
  const { role } = useRoleContext();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="navigation w-full py-[13px] px-[35px] flex items-center justify-between bg-[#111111]">
        <div className="deliverio flex items-center gap-[6px]">
          <img src={deliverio} alt="deliverio icon" />
          <p className="text-white text-[20px] font-semibold">
            Deliver
            <span className="text-[#f90]">io</span>
          </p>
        </div>
        <div className="role">
          <p className="text-[#FFD451] text-[14px] font-normal">{role}</p>
        </div>
        <div className="logout">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-white text-[14px] font-normal w-[98px] rounded-[6px] py-[12px] bg-[#111111] border-[1px] border-about"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
