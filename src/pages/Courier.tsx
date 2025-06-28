import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import homeIcon from "../../public/assets/homeIcon.svg";
import arrowDown from "../../public/assets/arrowDown.svg";
import { useState } from "react";
import courierData from "../CourierData.json";
import phoneIcon from "../../public/assets/phone.svg";
import messageIcon from "../../public/assets/message.svg";
import editIcon from "../../public/assets/edit.svg";
import carrotLeft from "../../public/assets/arrowLeft.svg";
import carrotRight from "../../public/assets/arrowRight.svg";
import type { TCourierType } from "../Couriertype";
import chechMark from "../../public/assets/gridicons_checkmark.svg";

export default function Courier() {
  const { role } = useRoleContext();
  const navigate = useNavigate();
  const [packagesIsClicked, setPackagesIsClicked] = useState<boolean>(true);
  const [mapIsClicked, setMapIsClicked] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState<TCourierType>(courierData);
  const [selectedSort, setSelectedSort] = useState<string>("id");
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  const handlePackagesClick = () => {
    setPackagesIsClicked(true);
    setMapIsClicked(false);
  };
  const handleMapClick = () => {
    setPackagesIsClicked(false);
    setMapIsClicked(true);
  };
  const handleSort = (criteria: string) => {
    setSelectedSort(criteria);
    const sorted = [...sortedData].sort((a, b) => {
      if (criteria === "id") {
        return Number(a.id) - Number(b.id);
      } else if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    setSortedData(sorted);
    setSortOpen(false);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="navigation w-full py-[13px] px-[35px] flex items-center justify-between bg-[#111111]">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="deliverio flex items-center gap-[6px]"
        >
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
      <div className="dashboard mt-[44px] w-full px-[35px]  flex items-center gap-[6px]">
        <img src={homeIcon} alt="home icon" />
        <p className="text-[#FFD451] text-[14px] font-normal">Dashboard</p>
      </div>
      <div className="main-box dk:flex dk:items-start dk:justify-between dk:px-[35px] mt-[11px] w-full">
        <div className="options-list w-[220px] rounded-[8px] border-[1px] border-[#545454] flex flex-col py-[5px]">
          <div onClick={handlePackagesClick} className="my-packages">
            <p className="pl-[21px] text-white text-[14px] font-normal">
              My Packages
            </p>
          </div>
          <div className="divider w-[220px] h-[1px] bg-[#545454] mt-[5px] mb-[5px]"></div>
          <div onClick={handleMapClick} className="map">
            <p className="pl-[21px] text-white text-[14px] font-normal">Map</p>
          </div>
        </div>
        <div className="all-packages">
          {packagesIsClicked ? (
            <div className="w-[807px] flex flex-col items-center p-[20px] rounded-[6px] bg-[#111111]">
              <div className="sort-line flex items-center justify-between w-full">
                <p className="text-white text-[18px] font-semibold">
                  My Packages
                </p>
                <div
                  onClick={() => setSortOpen(true)}
                  className="sort w-[103px] rounded-[8px] bg-[#343434] flex items-center justify-center cursor-pointer gap-[6px] py-[7px]"
                >
                  <p className="text-white text-[14px] font-normal">Sort by</p>
                  <img src={arrowDown} alt="arrow down icon" />
                </div>
                {sortOpen ? (
                  <div className="fixed inset-0 z-50 top-55 left-330.5">
                    <div className="w-[103px] rounded-[8px] bg-[#292929] shadow-sort py-[8px] pl-[8px]">
                      <div className="id flex items-center gap-[3px] cursor-pointer">
                        {selectedSort === "id" && (
                          <img src={chechMark} alt="checkmark" />
                        )}
                        <p
                          onClick={() => handleSort("id")}
                          className="text-white text-[14px] cursor-pointer"
                        >
                          ID
                        </p>
                      </div>
                      <div className="name flex items-center gap-[3px] cursor-pointer">
                        {selectedSort === "name" && (
                          <img src={chechMark} alt="checkmark" />
                        )}
                        <p
                          onClick={() => handleSort("name")}
                          className="text-white text-[14px] cursor-pointer"
                        >
                          Name
                        </p>
                      </div>
                      <div className="status flex items-center gap-[3px] cursor-pointer">
                        {selectedSort === "status" && (
                          <img src={chechMark} alt="checkmark" />
                        )}
                        <p
                          onClick={() => handleSort("status")}
                          className="text-white text-[14px] cursor-pointer"
                        >
                          Status
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="packages-box border-[1px] border-[#B8B8B8]/20 rounded-[10px] w-[655px] mt-[26px] flex flex-col">
                {sortedData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div
                          className="id w-[91px] py-[9px] pl-[13px]"
                          style={{
                            backgroundColor:
                              item.status === "Completed"
                                ? "#00AB55"
                                : item.status === "Denied-Once"
                                ? "#FF9900"
                                : item.status === "Denied-Twice"
                                ? "#FF0000"
                                : item.status === "To-Deliver"
                                ? "#999696"
                                : "",
                            borderRadius:
                              index === 0
                                ? "10px 0 0 0"
                                : index === courierData.length - 1
                                ? "0 0 0 10px"
                                : "0",
                          }}
                        >
                          <p className="text-white text-[14px] font-semibold">
                            #{item.id}
                          </p>
                        </div>
                        <div className="names ml-[65px] w-[70px]">
                          <p className="text-[#B8B8B8] text-[14px] font-normal text-center">
                            {item.name}
                          </p>
                        </div>
                        <div className="numbers flex items-center justify-center ml-[96px] gap-[2px] w-[100px]">
                          <img src={phoneIcon} alt="phone icon" />
                          <p className="text-[#B8B8B8] text-[14px] font-normal">
                            {item.phoneNumber}
                          </p>
                        </div>
                        <div className="message ml-[60px] flex items-center gap-[2px]">
                          <img src={messageIcon} alt="message icon " />
                          <p className="text-[#B8B8B8] text-[14px] font-normal">
                            Message
                          </p>
                        </div>
                        <div className="edit ml-[36px] flex items-center gap-[2px]">
                          <img src={editIcon} alt="edit icon" />
                          <p className="text-[#B8B8B8] text-[14px] font-normal">
                            Edit
                          </p>
                        </div>
                      </div>
                      {index !== courierData.length - 1 && (
                        <div className="divide w-[655px] h-[1px] bg-[#FFFFFF]/20"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="prev-next-colors mt-[40px] flex items-center justify-between w-full px-[20px]">
                <div className="prev-next flex items-center gap-[6px]">
                  <div className="prev w-[70px] rounded-[8px] py-[6px] flex items-center justify-center gap-[3px] bg-[#292929]">
                    <img src={carrotLeft} alt="arrow left" />
                    <p className="text-white text-[12px] font-normal">Prev</p>
                  </div>
                  <div className="next w-[70px] rounded-[8px] py-[6px] flex items-center justify-center gap-[3px] bg-[#292929]">
                    <p className="text-white text-[12px] font-normal">Next</p>
                    <img src={carrotRight} alt="arrow right" />
                  </div>
                </div>
                <div className="colors flex items-center gap-[20px]">
                  <div className="completed flex items-center gap-[6px]">
                    <div className="circle w-[21px] h-[21px] rounded-[7.3px] bg-[#00AB55]"></div>
                    <p className="text-[#00AB55] text-[12px] font-normal">
                      Completed
                    </p>
                  </div>
                  <div className="denied-once flex items-center gap-[6px]">
                    <div className="circle w-[21px] h-[21px] rounded-[7.3px] bg-[#FF9900]"></div>
                    <p className="text-[#FF9900] text-[12px] font-normal">
                      Denied Once
                    </p>
                  </div>
                  <div className="denied-twice flex items-center gap-[6px]">
                    <div className="circle w-[21px] h-[21px] rounded-[7.3px] bg-[#FF0000]"></div>
                    <p className="text-[#FF0000] text-[12px] font-normal">
                      Denied Twice
                    </p>
                  </div>
                  <div className="to-deliver flex items-center gap-[6px]">
                    <div className="circle w-[21px] h-[21px] rounded-[7.3px] bg-[#999696]"></div>
                    <p className="text-[#999696] text-[12px] font-normal">
                      To Deliver
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {mapIsClicked ? <div></div> : null}
        </div>
      </div>
    </div>
  );
}
