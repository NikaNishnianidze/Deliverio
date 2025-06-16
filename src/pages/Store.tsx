import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import homeIcon from "../../public/assets/homeIcon.svg";
import { useState } from "react";
import arrowDown from "../../public/assets/arrowDown.svg";

export default function Store() {
  const { role } = useRoleContext();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState<boolean>(true);
  const [uploadOrder, setUploadOrder] = useState<boolean>(false);

  const handleMyOrdersClick = () => {
    setMyOrders(true);
    setUploadOrder(false);
  };
  const handleUploadOrderClick = () => {
    setUploadOrder(true);
    setMyOrders(false);
  };
  return (
    <div className="flex flex-col items-center px-[35px]">
      <div className="navigation pt-[22px] flex items-center justify-between w-full">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo flex cursor-pointer items-center gap-[8px]"
        >
          <img src={deliverio} alt="deliverio icon" />
          <p className="text-white text-[20px] font-semibold">
            Deliver<span className="text-[#F90]">io</span>
          </p>
        </div>
        <div className="role">
          <p className="text-[#FFD451] text-[13px] font-normal">{role}</p>
        </div>
        <div className="logout">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-[98px] cursor-pointer py-[12px] rounded-[8px] border-[1px] border-about bg-[#111] text-white text-[14px] font-normal"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="dashboard flex items-center gap-[7px] w-full mt-[66px]">
        <img src={homeIcon} alt="homeicon" />
        <p className="text-[#FFD451] text-[14px] font-normal">Dashboard</p>
      </div>
      {myOrders && (
        <div className="orders-main-box mb:flex mb:flex-col dk:flex dk:flex-row dk:items-start dk:justify-between w-full">
          <div className="order-options-box">
            <div className="order-options flex flex-col w-[220px] border-[1px] border-about rounded-[8px] py-[5px] mt-[16px]">
              <div onClick={handleMyOrdersClick} className="myOrders mb-[5px]">
                <p
                  className="ml-[21px]"
                  style={{ color: myOrders ? "white" : "#858585" }}
                >
                  My Orders
                </p>
              </div>
              <div className="divider w-[220px] h-[1px] bg-[#545454]"></div>
              <div
                onClick={handleUploadOrderClick}
                className="uploadOrder mt-[5px]"
              >
                <p
                  className="ml-[21px]"
                  style={{ color: uploadOrder ? "white" : "#858585" }}
                >
                  Upload Order
                </p>
              </div>
            </div>
            <div className="hash mt-[359px]">
              <p className="text-[14px] text-[#858585] font-normal">
                © Deliverio
              </p>
            </div>
          </div>
          <div className="orders-list-box flex flex-col dk:w-[807px] p-[20px]">
            <div className="sorting flex items-center justify-between">
              <p className="text-white text-[18px] font-semibold">My Orders</p>
              <div className="sort flex items-center justify-center gap-[5px] w-[103px] rounded-[8px] py-[9px] bg-[#343434]">
                <p className="text-white text-[14px] font-normal">Sort by</p>
                <img src={arrowDown} alt="arrow down icon" />
              </div>
            </div>
            <div className="numerations mt-[17px] text-white text-[14px] font-normal dk:w-[767px] rounded-[6px] bg-[#858585] py-[12px] px-[24px] flex items-center justify-between">
              <p>#</p>
              <p>DATE</p>
              <p>NAME</p>
              <p>AMOUNT</p>
              <p>STATUS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
