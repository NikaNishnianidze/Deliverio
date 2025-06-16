import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import homeIcon from "../../public/assets/homeIcon.svg";
import { useState } from "react";
import arrowDown from "../../public/assets/arrowDown.svg";
import arrowLeft from "../../public/assets/arrowLeft.svg";
import arrowRight from "../../public/assets/arrowRight.svg";

export default function Store() {
  const { role, storeData } = useRoleContext();
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
  const handleStoreClick = (index: number) => {
    navigate(`/store/${index}`);
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
            <div className="numerations mb-[14px] mt-[17px] text-white text-[14px] font-normal dk:w-[767px] rounded-[6px] bg-[#858585] py-[12px] px-[24px] flex items-center">
              <p>#</p>
              <p className="ml-[142px]">DATE</p>
              <p className="ml-[156px]">NAME</p>
              <p className="ml-[110px]">AMOUNT</p>
              <p className="ml-[120px]">STATUS</p>
            </div>
            <div className="list dk:w-[767px] flex flex-col gap-[14px]">
              {storeData.map((item, index) => {
                return (
                  <div key={item.id} className="main flex flex-col">
                    <div
                      onClick={() => handleStoreClick(index)}
                      className="dk:w-[767px] cursor-pointer px-[10px] flex items-center justify-between"
                    >
                      <p className="text-white text-[14px] font-semibold">
                        #{item.id}
                      </p>
                      <p className="text-white text-[14px] font-semibold w-[87px] text-center">
                        {item.date}
                      </p>
                      <p className="text-white text-[14px] font-semibold">
                        {item.name}
                      </p>
                      <p className="text-white text-[14px] font-semibold">
                        {item.amount}
                      </p>
                      <div
                        className="statusdiv w-[77px] rounded-[35px] py-[3px] px-[10px]"
                        style={{
                          backgroundColor:
                            item.status === true ? "#00AB55" : "#292929",
                        }}
                      >
                        <p className="text-white text-[11px] font-semibold">
                          {item.status === true ? "Completed" : "In Process"}
                        </p>
                      </div>
                    </div>
                    <div className="divider w-[767px] h-[1px] bg-[#E0E6ED]/40 mt-[10px]"></div>
                  </div>
                );
              })}
            </div>
            <div className="prev-next flex items-center mt-[40px] gap-[6px]">
              <button className="w-[70px] flex items-center justify-center gap-[4px] py-[6px] bg-[#292929] rounded-[8px] text-white text-[12px] font-normal">
                <img src={arrowLeft} alt="arrow left" /> Prev
              </button>
              <button className="w-[70px] flex items-center justify-center gap-[4px] py-[6px] bg-[#292929] rounded-[8px] text-white text-[12px] font-normal">
                <img src={arrowRight} alt="arrow right" />
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
