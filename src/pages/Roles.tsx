import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import storeImage from "../../public/assets/house.png";
import scooterImage from "../../public/assets/scooter.png";
import computerImage from "../../public/assets/computer.png";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const { setRole } = useRoleContext();
  const navigate = useNavigate();
  const adminChecked = () => {
    setRole("Admin");
    navigate("/signup");
  };
  const courierChecked = () => {
    setRole("Courier");
    navigate("/signup");
  };
  const storeChecked = () => {
    setRole("Store");
    navigate("/signup");
  };
  return (
    <div className="flex flex-col items-center">
      <div className="navigation pt-[13px] px-[35px] flex items-center w-full justify-between">
        <div className="logos flex items-center gap-[6px]">
          <img src={deliverio} alt="deliverio icon" />
          <p className="text-white text-[20px] font-semibold ">
            Deliver<span className="text-[#F90]">io</span>
          </p>
        </div>
        <div className="about-us">
          <button className="w-[98px] py-[12px] text-center rounded-[8px] bg-[#251B03] text-[#FF9900] text-[14px] font-normal">
            About Us
          </button>
        </div>
      </div>
      <div className="roles flex flex-col items-center mt-[79px]">
        <div className="whatsrole">
          <p className="text-white text-[42px] font-black">
            what’s your <span className="text-[#FFD451]">role</span>
          </p>
        </div>
        <div className="roles-boxes flex items-center gap-[37.22px] mt-[49px]">
          <div
            onClick={storeChecked}
            className="box1 flex flex-col items-center gap-[20px]"
          >
            <div className="bacground flex flex-col items-center justify-center w-[258px] h-[298px] rounded-[14px] bg-[#251B03]">
              <img src={storeImage} alt="store image" />
            </div>
            <div className="text">
              <p className="text-[#FFD451] text-[14px] font-normal">Store</p>
            </div>
          </div>
          <div
            onClick={courierChecked}
            className="box2 flex flex-col items-center gap-[20px]"
          >
            <div className="bacground flex flex-col items-center justify-center w-[258px] h-[298px] rounded-[14px] bg-[#251B03]">
              <img src={scooterImage} alt="scooter image" />
            </div>
            <div className="text">
              <p className="text-[#FFD451] text-[14px] font-normal">Courier</p>
            </div>
          </div>
          <div
            onClick={adminChecked}
            className="box3 flex flex-col items-center gap-[20px]"
          >
            <div className="bacground flex flex-col items-center justify-center w-[258px] h-[298px] rounded-[14px] bg-[#251B03]">
              <img src={computerImage} alt="computer image" />
            </div>
            <div className="text">
              <p className="text-[#FFD451] text-[14px] font-normal">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
