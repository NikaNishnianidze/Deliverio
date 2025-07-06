import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../context/RolesProvider";
import deliverio from "../../public/assets/delivericon.svg";
import homeIcon from "../../public/assets/homeIcon.svg";
import { useEffect, useState } from "react";
import filterIcon from "../../public/assets/filterIcon.svg";
import arrowDown from "../../public/assets/arrowDown.svg";
import arrowLeft from "../../public/assets/arrowLeft.svg";
import arrowRight from "../../public/assets/arrowRight.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import chechMark from "../../public/assets/gridicons_checkmark.svg";
import type { IAdminInputs } from "../AdminInputs";
import courierData from "../CourierData.json";

const schema: yup.ObjectSchema<IAdminInputs> = yup.object({
  buyer: yup.string().required("Buyer is required"),
  store: yup.string().required("store is required"),
  address: yup.string().required("address is required"),
  phoneNumber: yup.string().required("phone number is required"),
  amount: yup.string().required("amount is required"),
});
export default function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdminInputs>({
    resolver: yupResolver(schema),
  });
  const [StoreOrders, setStoreOrders] = useState(true);
  const [ManagePackages, setManagePackages] = useState(false);
  const [GPS, setGPS] = useState(false);
  const { role, storeData, setStoreData } = useRoleContext();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<
    null | (typeof storeData)[0]
  >(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>("date");
  const [sortedData, setSortedData] = useState(storeData);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [openCourierDropdown, setOpenCourierDropdown] = useState<number | null>(
    null
  );
  const [selectedCouriers, setSelectedCouriers] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    setSortedData(storeData);
  }, [storeData]);
  const getDisplayedData = () => {
    let data = [...storeData];
    if (selectedFilter) {
      data = data.filter(
        (order) => order.store?.toLowerCase() === selectedFilter.toLowerCase()
      );
    }
    if (selectedSort === "date") {
      data.sort((a, b) => a.date.localeCompare(b.date));
    } else if (selectedSort === "store") {
      data.sort((a, b) => (a.store || "").localeCompare(b.store || ""));
    } else if (selectedSort === "status") {
      data.sort((a, b) =>
        (a.orderStatus || "").localeCompare(b.orderStatus || "")
      );
    }
    return data;
  };

  const displayedData = getDisplayedData();
  const handleSort = (criteria: string) => {
    setSelectedSort(criteria);
    setSortOpen(false);
  };

  const handleFilter = (storeName: string | null) => {
    setSelectedFilter(storeName);
    setFiltersOpen(false);
  };

  const handleStoreOrders = () => {
    setStoreOrders(true);
    setManagePackages(false);
    setGPS(false);
  };
  const handleManagePackages = () => {
    setStoreOrders(false);
    setManagePackages(true);
    setGPS(false);
  };
  const handleGPS = () => {
    setStoreOrders(false);
    setManagePackages(false);
    setGPS(true);
  };
  const handleSeeItem = (order: (typeof storeData)[0]) => {
    setSelectedOrder(order);
  };
  const handleGoBack = () => {
    setSelectedOrder(null);
  };
  const handleDelete = () => {
    if (!selectedOrder) return;
    const updateStoreData = storeData.filter(
      (order) => order.id !== selectedOrder.id
    );
    setStoreData(updateStoreData);
    setSelectedOrder(null);
    setDeleteOpen(false);
  };

  const handleEdit = (data: IAdminInputs) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      ...selectedOrder,
      name: data.buyer,
      store: data.store,
      address: data.address,
      phoneNumber: data.phoneNumber,
      amount: data.amount,
    };

    const updatedStoreData = storeData.map((order) =>
      order.id === selectedOrder.id ? updatedOrder : order
    );

    setStoreData(updatedStoreData);
    setSelectedOrder(updatedOrder);
    setEditOpen(false);
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
      <div className="dashboard pl-[39px] mt-[51px] flex items-center gap-[7px] w-full">
        <img src={homeIcon} alt="home icon" />
        <p className="text-[#FFD451] text-[14px] font-normal">Dashboard</p>
      </div>
      <div className="main-box flex items-start px-[39px] justify-between w-full mt-[11px]">
        <div className="list-items flex flex-col py-[5px] bg-[#111111] border-[1px] rounded-[8px] border-[#545454] w-[220px]">
          <div className="store-orders">
            <p
              className="text-[14px] text-[#858585] font-normal pl-[21px]"
              style={{ color: StoreOrders ? "#fff" : "#858585" }}
              onClick={handleStoreOrders}
            >
              Store Orders
            </p>
          </div>
          <div className="divider w-[220px] h-[1px] bg-[#545454]"></div>
          <div
            className="manage-packages"
            style={{ color: ManagePackages ? "#fff" : "#858585" }}
            onClick={handleManagePackages}
          >
            <p
              className="text-[14px] text-[#858585] font-normal pl-[21px]"
              style={{ color: ManagePackages ? "#fff" : "#858585" }}
            >
              Manage Packages
            </p>
          </div>
          <div className="divide w-[220px] h-[1px] bg-[#545454]"></div>
          <div className="GPS" onClick={handleGPS}>
            <p
              className="text-[14px] text-[#858585] font-normal pl-[21px]"
              style={{ color: GPS ? "#fff" : "#858585" }}
            >
              GPS
            </p>
          </div>
        </div>
        <div className="order-big-box">
          {StoreOrders && (
            <div className="w-[807px] relative rounded-[6px] bg-[#111] p-[20px] flex flex-col">
              <div className="filter-sort-line flex items-center justify-between w-full">
                <div className={`orders ${selectedOrder ? "hidden" : ""}`}>
                  <p className="text-white text-[18px] font-semibold">
                    Store Orders
                  </p>
                </div>
                <div
                  className={`filter-sort flex items-center gap-[10px] ${
                    selectedOrder ? "hidden" : ""
                  }`}
                >
                  <div
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="filters w-[103px] rounded-[8px] py-[6px] flex items-center justify-center gap-[2px] bg-[#343434]"
                  >
                    <p className="text-white text-[14px] font-normal">
                      Filters
                    </p>
                    <img src={filterIcon} alt="filter icon" />
                  </div>
                  <div
                    onClick={() => setSortOpen(!sortOpen)}
                    className="sort w-[103px] rounded-[8px] py-[6px] flex items-center justify-center gap-[4px] bg-[#343434]"
                  >
                    <p className="text-white text-[14px] font-normal">
                      Sort by
                    </p>
                    <img src={arrowDown} alt="arrow down icon" />
                  </div>
                </div>
              </div>
              {filtersOpen && (
                <div className="absolute z-50 top-[60px] right-6">
                  <div className="w-[210px] rounded-[8px] bg-[#292929] shadow-sort py-[13px] pl-[8px] flex flex-col gap-2">
                    <p
                      onClick={() => handleFilter("")}
                      className="text-[#ADADAD] text-[14px] font-normal"
                    >
                      Store
                    </p>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleFilter("Quickmart")}
                    >
                      {selectedFilter === "Quickmart" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">Quickmart</span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleFilter("Urban Goods")}
                    >
                      {selectedFilter === "Urban Goods" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">
                        Urban Goods
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleFilter("MegaMart")}
                    >
                      {selectedFilter === "MegaMart" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">Megamart</span>
                    </div>
                  </div>
                </div>
              )}
              {sortOpen && (
                <div className="absolute z-50 top-[60px] right-5">
                  <div className="w-[103px] rounded-[8px] bg-[#292929] shadow-sort py-[8px] pl-[8px] flex flex-col gap-2">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      {selectedSort === "date" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">Date</span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleSort("store")}
                    >
                      {selectedSort === "store" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">Store</span>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      {selectedSort === "status" && (
                        <img src={chechMark} alt="checkmark" />
                      )}
                      <span className="text-white text-[14px]">Status</span>
                    </div>
                  </div>
                </div>
              )}
              {selectedOrder ? (
                <div className="flex flex-col">
                  <div
                    onClick={handleGoBack}
                    className="first-line flex items-center gap-[11px]"
                  >
                    <img src={arrowLeft} alt="arrow left" />
                    <p className="text-white text-[18px] font-semibold">
                      Order Details
                    </p>
                  </div>
                  <div className="detailed-info flex flex-col ">
                    <div className="header w-[767px] text-white text-[14px] font-normal mt-[17px] rounded-[6px] px-[40px] py-[12px] flex items-center justify-between bg-[#858585]/30">
                      <div className="buyer">
                        <p>Buyer</p>
                      </div>
                      <div className="phoneNumber">
                        <p>Phone Number</p>
                      </div>
                      <div className="address">
                        <p>Address</p>
                      </div>
                      <div className="store">
                        <p>Store</p>
                      </div>
                      <div className="amount">
                        <p>Amount</p>
                      </div>
                    </div>
                  </div>
                  <div className="info w-[767px] px-[37px] py-[12px] flex imtems-center justify-between">
                    <div className="name">
                      <p className="text-white text-[14px] font-semibold">
                        {selectedOrder.name}
                      </p>
                    </div>
                    <div className="phoneNumber">
                      <p className="text-white text-[14px] font-semibold">
                        {selectedOrder.phoneNumber}
                      </p>
                    </div>
                    <div className="address">
                      <p className="text-white text-[14px] font-semibold">
                        {selectedOrder.address}
                      </p>
                    </div>
                    <div className="store">
                      <p className="text-white text-[14px] font-semibold">
                        {selectedOrder.store}
                      </p>
                    </div>
                    <div className="amount">
                      <p className="text-white text-[14px] font-semibold">
                        {selectedOrder.amount}
                      </p>
                    </div>
                  </div>
                  <div className="divider w-[767px] h-[1px] bg-[#E0E6ED]/40"></div>
                  <div className="text mt-[26px]">
                    <p className="text-[14px] text-white font-normal">
                      Product Details:
                    </p>
                    <p className="text-[15px] text-[#757575] font-normal w-[707px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type
                    </p>
                  </div>
                  <p className="mt-[18px] text-white text-[14px] font-normal">
                    Package Status:
                  </p>
                  <div className="status-buttons flex items-center justify-between mt-[7px] w-[767px]">
                    <div className="status w-[108.5px] rounded-[35px] bg-[#00AB55]/30 py-[5px] flex justify-center">
                      <p className="text-[#00AB55] text-[13px] font-semibold">
                        {selectedOrder.orderStatus}
                      </p>
                    </div>
                    <div className="date">
                      <p className="text-[#757575] text-[14px] font-normal">
                        {selectedOrder.date}
                      </p>
                    </div>
                    <div className="edit-delete flex items-center gap-[23px]">
                      <p
                        onClick={() => setEditOpen(true)}
                        className="text-[#FF9900] cursor-pointer text-[13px] font-normal"
                      >
                        Edit
                      </p>
                      <button
                        onClick={() => setDeleteOpen(true)}
                        className="w-[108.5px] cursor-pointer rounded-[35px] flex justify-center py-[5px] bg-[#FF0000]/30 text-[#FF0000] text-[13px] font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {deleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="w-[244px] rounded-[8px] bg-[#111] px-[32px] py-[16px] flex flex-col items-center">
                        <p className="text-white text-[18px] font-normal">
                          Delete Order?
                        </p>
                        <div className="buttons flex mt-[30px] items-center gap-[38px]">
                          <button
                            onClick={() => handleDelete()}
                            className="w-[91px] rounded-[6px] cursor-pointer bg-[#580C0C] py-[5px] flex justify-center text-[#FF0000] text-[14px] font-normal"
                          >
                            Delete
                          </button>
                          <p
                            className="text-white cursor-pointer text-[14px] font-normal"
                            onClick={() => setDeleteOpen(false)}
                          >
                            Cancel
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {editOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="w-[409px] py-[26px] px-[23px] rounded-[8px] bg-[#111] flex flex-col items-center">
                        <p className="text-[18px] text-white font-normal">
                          Edit
                        </p>
                        <form
                          className="mt-[21px] flex flex-col gap-[22px]"
                          onSubmit={handleSubmit(handleEdit)}
                        >
                          <div className="buyer">
                            <label
                              htmlFor="buyer"
                              className="text-[14px] text-white font-normal"
                            >
                              Buyer
                            </label>
                            <input
                              type="text"
                              id="buyer"
                              {...register("buyer")}
                              className="bg-[#343434] cursor-pointer outline-none w-[352px] h-[40px] rounded-[4px] px-[10px] text-white text-[14px] font-normal"
                            />
                          </div>
                          <div className="store">
                            <label
                              htmlFor="store"
                              className="text-[14px] text-white font-normal"
                            >
                              Store
                            </label>
                            <input
                              type="text"
                              id="store"
                              {...register("store")}
                              className="bg-[#343434] cursor-pointer outline-none w-[352px] h-[40px] rounded-[4px] px-[10px] text-white text-[14px] font-normal"
                            />
                          </div>
                          <div className="address">
                            <label
                              htmlFor="address"
                              className="text-[14px] text-white font-normal"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              {...register("address")}
                              className="bg-[#343434] cursor-pointer outline-none w-[352px] h-[40px] rounded-[4px] px-[10px] text-white text-[14px] font-normal"
                            />
                          </div>
                          <div className="phoneNumber">
                            <label
                              htmlFor="phoneNumber"
                              className="text-[14px] text-white font-normal"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="phoneNumber"
                              {...register("phoneNumber")}
                              className="bg-[#343434] cursor-pointer outline-none w-[352px] h-[40px] rounded-[4px] px-[10px] text-white text-[14px] font-normal"
                            />
                          </div>
                          <div className="amount">
                            <label
                              htmlFor="amount"
                              className="text-[14px] text-white font-normal"
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              id="amount"
                              {...register("amount")}
                              className="bg-[#343434] cursor-pointer outline-none w-[352px] h-[40px] rounded-[4px] px-[10px] text-white text-[14px] font-normal"
                            />
                          </div>
                          <div className="status flex flex-col gap-[7px]">
                            <p className="text-[14px] text-white font-normal">
                              Status
                            </p>
                            <button
                              style={{
                                backgroundColor:
                                  selectedOrder.orderStatus === "Completed"
                                    ? "[#00FF00]30"
                                    : selectedOrder.orderStatus === "In-Process"
                                    ? "#292929/30"
                                    : selectedOrder.orderStatus === "Cancelled"
                                    ? "#FF0000/30"
                                    : "",
                              }}
                              className="w-[108.5px] rounded-[35px] py-[5px] flex justify-center text-[#022514] text-[13px] font-semibold"
                            >
                              {selectedOrder.orderStatus}
                            </button>
                          </div>
                          <div className="buttons flex items-center gap-[38px] mt-[26px]">
                            <button
                              type="submit"
                              className="w-[91px] cursor-pointer rounded-[6px] py-[6px] flex justify-center bg-[#585858] text-[14px] text-white font-normal"
                            >
                              Save
                            </button>
                            <p
                              className="text-white cursor-pointer text-[14px] font-normal"
                              onClick={() => setEditOpen(false)}
                            >
                              Cancel
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="titles-orders flex flex-col mt-[17px]">
                  <div className="titles w-[767px] rounded-[6px] bg-[#858585]/30 py-[12px] px-[40px] flex items-center justify-between text-white text-[14px]">
                    <div className="order w-[55px]">
                      <p>Order #</p>
                    </div>
                    <div className="date w-[87px]">
                      <p className="ml-[25px]">Date</p>
                    </div>
                    <div className="store w-[92px] ml-[50px]">
                      <p>Store</p>
                    </div>
                    <div className="status w-[96px]">
                      <p>Status</p>
                    </div>
                  </div>
                  {displayedData.map((order, index) => {
                    return (
                      <div
                        className="orders flex flex-col items-start cursor-pointer mt-[10px]"
                        key={index}
                      >
                        <div
                          onClick={() => handleSeeItem(order)}
                          className="flex items-center w-[767px] flex items-center justify-between px-[50px]"
                        >
                          <div className="id">
                            <p className="text-white text-[14px] font-normal">
                              #{order.id}
                            </p>
                          </div>
                          <div className="date">
                            <p className="text-white text-[14px] font-normal">
                              {order.date}
                            </p>
                          </div>
                          <div className="store">
                            <p className="text-white text-[14px] font-normal">
                              {order.store}
                            </p>
                          </div>
                          <div
                            className="status w-[95px] py-[3px] rounded-[35px] flex items-center justify-center"
                            style={{
                              backgroundColor:
                                order.orderStatus === "Completed"
                                  ? "#00FF00/30"
                                  : order.orderStatus === "In-Process"
                                  ? "#292929/30"
                                  : order.orderStatus === "Cancelled"
                                  ? "#FF0000/30"
                                  : "",
                            }}
                          >
                            <p
                              className="text-[14px] font-black"
                              style={{
                                color:
                                  order.orderStatus === "Completed"
                                    ? "#00AB55"
                                    : order.orderStatus === "In-Process"
                                    ? "#ACACAC"
                                    : order.orderStatus === "Cancelled"
                                    ? "#FF0000"
                                    : "",
                              }}
                            >
                              {order.orderStatus}
                            </p>
                          </div>
                        </div>
                        <div className="divider w-[767px] h-[1px] bg-[#E0E6ED]/30"></div>
                      </div>
                    );
                  })}
                  <div className="buttons flex items-center gap-[6px] mt-[20px]">
                    <div className="prev flex items-center justify-center gap-[4px] py-[10px] w-[70px] rounded-[8px] bg-[#343434]">
                      <img src={arrowLeft} alt="arrow left icon" />
                      <p className="text-[12px] text-white font-normal">Prev</p>
                    </div>
                    <div className="next flex items-center justify-center gap-[4px] py-[10px] w-[70px] rounded-[8px] bg-[#343434]">
                      <p className="text-[12px] text-white font-normal">Next</p>
                      <img src={arrowRight} alt="arrow right icon" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {ManagePackages && (
            <div className="w-[807px] flex flex-col py-[20px] pl-[20px]">
              <p className="text-white text-[18px] font-semibold">
                Manage Packages
              </p>
              <div className="header mt-[43px] w-[660px] py-[10px] pl-[15px] flex items-center gap-[45px] bg-[#858585]/30 rounded-[6px]">
                <p className="text-white text-[14px] font-normal">Order #</p>
                <p className="text-white text-[14px] font-normal">
                  Assigned Courier
                </p>
              </div>
              <div className="orders-list w-[655px] rounded-[10px] border-[1px] border-[#343434] mt-[13px] flex flex-col">
                {courierData.map((order, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <div
                        className="order-number w-[91px] pl-[12px] py-[15px]"
                        style={{
                          backgroundColor:
                            order.status === "Completed"
                              ? "#00AB55"
                              : order.status === "Denied-Once"
                              ? "#FF9900"
                              : order.status === "Denied-Twice"
                              ? "#FF0000"
                              : order.status === "To-Deliver"
                              ? "#999696"
                              : "",
                          borderRadius: index === 0 ? "8px 0 0 0" : "0",
                          borderEndStartRadius:
                            index === courierData.length - 1 ? "8px" : "0",
                        }}
                      >
                        <p className="text-white text-[14px] font-semibold">
                          #{order.id}
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          setOpenCourierDropdown(
                            openCourierDropdown === index ? null : index
                          )
                        }
                        className="relative assigned-courier w-[103px] py-[5px] flex items-center justify-center ml-[20px] gap-[5px] bg-[#343434] rounded-[8px]"
                      >
                        <p className="text-white text-[14px] font-normal">
                          {selectedCouriers[index] || order.name}
                        </p>
                        <img src={arrowDown} alt="Arrow down" />
                        {openCourierDropdown === index && (
                          <div className="absolute left-0 top-full mt-2 w-[120px] bg-[#292929] rounded-[8px] shadow-sort z-10">
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: order.name,
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              {order.name}
                            </p>
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: "Daviti",
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              Daviti
                            </p>
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: "Mariami",
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              Mariami
                            </p>
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: "Nika",
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              Nika
                            </p>
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: "Nini",
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              Nini
                            </p>
                            <p
                              onClick={() => {
                                setSelectedCouriers({
                                  ...selectedCouriers,
                                  [index]: "James",
                                });
                                setOpenCourierDropdown(null);
                              }}
                              className="text-white text-[14px] px-4 py-2 cursor-pointer hover:bg-[#343434]"
                            >
                              James
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {GPS && <div></div>}
        </div>
      </div>
    </div>
  );
}
