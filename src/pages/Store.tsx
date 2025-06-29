import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import homeIcon from "../../public/assets/homeIcon.svg";
import { useRef, useState } from "react";
import arrowDown from "../../public/assets/arrowDown.svg";
import arrowLeft from "../../public/assets/arrowLeft.svg";
import arrowRight from "../../public/assets/arrowRight.svg";
import folderIcon from "../../public/assets/Folder.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { IInputs } from "../Inputs";
import checkmark from "../../public/assets/gridicons_checkmark.svg";
import type { TStore } from "../datatype";
const schema: yup.ObjectSchema<IInputs> = yup.object({
  name: yup.string().required("name is required"),
  address: yup.string().required("address is required"),
  phoneNumber: yup.string().required("phone number is required"),
  date: yup.string().required("date is required"),
  amount: yup.string().required("amount is required"),
});
export default function Store() {
  const [selectedOrder, setSelectedOrder] = useState<
    null | (typeof storeData)[0]
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
  });
  const { role, storeData, setStoreData } = useRoleContext();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState<boolean>(true);
  const [uploadOrder, setUploadOrder] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);
  const [chosenSort, setChosenSort] = useState<string>("");
  const [sortedOrders, setSortedOrders] = useState<TStore>(storeData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMyOrdersClick = () => {
    setMyOrders(true);
    setUploadOrder(false);
  };
  const handleUploadOrderClick = () => {
    setUploadOrder(true);
    setMyOrders(false);
  };
  const handleStoreClick = (order: (typeof storeData)[0]) => {
    setSelectedOrder(order);
  };
  const handleDelete = () => {
    if (!selectedOrder) return;
    const updatedStore = storeData.filter(
      (order) => order.id !== selectedOrder.id
    );
    setStoreData(updatedStore);
    setSelectedOrder(null);
    setDeleteOpen(false);
  };
  const handleEdit = (data: IInputs) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      ...selectedOrder,
      ...data,
    };

    const updatedStore = storeData.map((order) =>
      order.id === selectedOrder.id ? updatedOrder : order
    );

    setStoreData(updatedStore);
    setSelectedOrder(updatedOrder);
    setEdit(false);
  };

  const handleDateSort = () => {
    setChosenSort("Date");
    const sorted = [...storeData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSortedOrders(sorted);
    setSort(false);
  };

  const handleStoreSort = () => {
    setChosenSort("Store");
    const sorted = [...storeData].sort((a, b) => a.name.localeCompare(b.name));
    setSortedOrders(sorted);
    setSort(false);
  };

  const handleStatusSort = () => {
    setChosenSort("Status");
    const sorted = [...storeData].sort(
      (a, b) => Number(b.status) - Number(a.status)
    );
    setSortedOrders(sorted);
    setSort(false);
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        const lines = content
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "")
          .map((line) => line.split(","));

        const newOrders: TStore = lines.slice(1).map((line, index) => ({
          id: `${(storeData.length + index + 1).toString().padStart(2, "0")}`,
          date: line[0],
          name: line[1],
          address: line[2],
          phoneNumber: line[3],
          amount: `${line[4]}₾`,
          status: line[5] === "true",
          store: line[6] ?? "",
        }));

        const updatedStore = [...storeData, ...newOrders];
        setStoreData(updatedStore);
        setSortedOrders(updatedStore);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="navigation py-[13px] flex px-[35px] items-center justify-between w-full bg-[#111]">
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
      <div className="dashboard flex items-center gap-[7px] w-full mt-[66px] px-[35px]">
        <img src={homeIcon} alt="homeicon" />
        <p className="text-[#FFD451] text-[14px] font-normal">Dashboard</p>
      </div>
      {myOrders && (
        <div className="orders-main-box px-[35px] mb:flex mb:flex-col dk:flex dk:flex-row dk:items-start dk:justify-between w-full">
          <div className="order-options-box">
            <div className="order-options flex flex-col w-[220px] border-[1px] border-about rounded-[8px] py-[5px] mt-[16px]">
              <div onClick={handleMyOrdersClick} className="myOrders mb-[5px]">
                <p
                  className="ml-[21px]"
                  style={{ color: myOrders ? "white" : "#858585" }}
                >
                  {myOrders
                    ? selectedOrder
                      ? "Order Details"
                      : "My Orders"
                    : "Upload Order"}
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
          <div className="orders-list-box relative flex flex-col dk:w-[807px] p-[20px]">
            <div className="sorting flex items-center justify-between">
              <p className="text-white text-[18px] font-semibold">My Orders</p>
              <div
                onClick={() => setSort(true)}
                className="sort flex items-center justify-center gap-[5px] w-[103px] rounded-[8px] py-[9px] bg-[#343434]"
              >
                <p className="text-white text-[14px] font-normal">
                  {chosenSort ? chosenSort : "Sort by"}
                </p>
                <img src={arrowDown} alt="arrow down icon" />
              </div>
              {sort && (
                <div className="fixed inset-0 z-50 absolute top-56 left-430">
                  <div className="w-[103px] rounded-[8px] p-[8px] bg-[#292929] border-[1px] border-[#585858] shadow-sort">
                    <div
                      onClick={handleDateSort}
                      className="date flex items-center gap-[6px]"
                    >
                      <img
                        src={checkmark}
                        alt="checkmark"
                        style={{
                          display: chosenSort === "Date" ? "block" : "none",
                        }}
                      />
                      <p className="text-white text-[14px] font-normal">Date</p>
                    </div>
                    <div
                      onClick={handleStoreSort}
                      className="store flex items-center gap-[6px]"
                    >
                      <img
                        src={checkmark}
                        alt="checkmark"
                        style={{
                          display: chosenSort === "Store" ? "block" : "none",
                        }}
                      />
                      <p className="text-white text-[14px] font-normal">
                        Store
                      </p>
                    </div>
                    <div
                      onClick={handleStatusSort}
                      className="status flex items-center gap-[6px]"
                    >
                      <img
                        src={checkmark}
                        alt="checkmark"
                        style={{
                          display: chosenSort === "Status" ? "block" : "none",
                        }}
                      />
                      <p className="text-white text-[14px] font-normal">
                        Status
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {selectedOrder ? (
              <div className="numerations mb-[14px] mt-[17px] text-white text-[14px] font-normal dk:w-[767px] rounded-[6px] bg-[#858585] py-[12px] px-[10px] flex items-center">
                <p>Name</p>
                <p className="ml-[131px]">Address</p>
                <p className="ml-[117px]">Phone Number</p>
                <p className="ml-[115px]">Date</p>
                <p className="ml-[120px]">Amount</p>
              </div>
            ) : (
              <div className="numerations mb-[14px] mt-[17px] text-white text-[14px] font-normal dk:w-[767px] rounded-[6px] bg-[#858585] py-[12px] px-[24px] flex items-center">
                <p>#</p>
                <p
                  className="ml-[142px]"
                  style={{ marginLeft: selectedOrder ? "210px" : "142px" }}
                >
                  DATE
                </p>
                <p
                  className="ml-[156px]"
                  style={{ marginLeft: selectedOrder ? "222px" : "156px" }}
                >
                  NAME
                </p>
                <p
                  className="ml-[110px]"
                  style={{ marginLeft: selectedOrder ? "155px" : "110px" }}
                >
                  AMOUNT
                </p>
                {selectedOrder ? null : <p className="ml-[120px]">STATUS</p>}
              </div>
            )}
            <div className="list dk:w-[767px] flex flex-col gap-[14px]">
              {selectedOrder ? (
                <div className="main flex flex-col">
                  <div className="dk:w-[767px] px-[10px] flex items-center justify-between">
                    <p className="text-white text-[14px] font-semibold">
                      {selectedOrder.name}
                    </p>
                    <p className="text-white text-[14px] font-semibold w-[87px] text-center">
                      {selectedOrder.address}
                    </p>
                    <p className="text-white text-[14px] font-semibold">
                      {selectedOrder.phoneNumber}
                    </p>
                    <p className="text-white text-[14px] font-semibold">
                      {selectedOrder.date}
                    </p>
                    <p className="text-white text-[14px] font-semibold">
                      {selectedOrder.amount}
                    </p>
                  </div>
                  <div className="divider w-[767px] h-[1px] bg-[#E0E6ED]/40 mt-[10px]"></div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="mt-[20px] flex items-center gap-[5px] self-start text-[13px] text-[#FFD451] underline"
                  >
                    <img src={arrowLeft} alt="arrow left" /> Back to list
                  </button>
                  <div className="details mt-[26px] flex flex-col">
                    <p className="text-white text-[14px] font-normal">
                      Product Details:
                    </p>
                    <p className="text-[#757575] text-[15px] font-normal w-[707px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type
                    </p>
                  </div>
                  <p className="mt-[18px] text-white text-[14px] font-normal">
                    Order Status:
                  </p>
                  <div className="status-buttons mt-[7px] flex items-center justify-between">
                    <div className="status flex justify-center w-[109px] rounded-[35px] py-[7px] bg-[#00AB55]/30 text-[#00AB55] text-[11px] font-semibold ">
                      <p>
                        {selectedOrder.status === true
                          ? "Completed"
                          : "In Process"}
                      </p>
                    </div>
                    <div className="buttons flex items-center gap-[13px]">
                      <button
                        onClick={() => setEdit(true)}
                        className="cursor-pointer w-[46px] flex justify-center py-[6px] text-[#F90] text-[11px] font-normal"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteOpen(true)}
                        className="cursor-pointer w-[108px] rounded-[35px] py-[7px] flex justify-center text-[#FF0000] bg-[#F00]/30 text-[11px] font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {deleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="w-[244px] py-[13px] px-[32px] flex flex-col items-center">
                        <p className="text-white text-[14px] font-bold">
                          Delete Order?
                        </p>
                        <div className="buttons mt-[30px] flex items-center gap-[38px]">
                          <button
                            onClick={handleDelete}
                            className="w-[91px] rounded-[6px] py-[3px] flex justify-center bg-[#580C0C] text-[#FF0000] text-[14px] font-normal cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteOpen(false)}
                            className="text-white text-[14px] font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {edit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="w-[409px] py-[20px] px-[28px] flex flex-col items-center">
                        <p className="text-white text-[18px] font-normal">
                          Edit
                        </p>
                        <form
                          onSubmit={handleSubmit(handleEdit)}
                          className="flex flex-col gap-[21px] mt-[21px]"
                        >
                          <div className="name">
                            <label
                              htmlFor="name"
                              className="text-white text-[14px] font-normal"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              {...register("name")}
                              className="w-[352px] rounded-[4px] outline-none h-[28px] bg-[#343434] text-white"
                              defaultValue={selectedOrder?.name}
                            />
                          </div>
                          <div className="address">
                            <label
                              htmlFor="address"
                              className="text-white text-[14px] font-normal"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              {...register("address")}
                              className="w-[352px] rounded-[4px] outline-none h-[28px] bg-[#343434] text-white"
                              defaultValue={selectedOrder?.address}
                            />
                          </div>
                          <div className="phoneNumber">
                            <label
                              htmlFor="phoneNumber"
                              className="text-white text-[14px] font-normal"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="phoneNumber"
                              {...register("phoneNumber")}
                              className="w-[352px] rounded-[4px] outline-none h-[28px] bg-[#343434] text-white"
                              defaultValue={selectedOrder?.phoneNumber}
                            />
                          </div>
                          <div className="Date">
                            <label
                              htmlFor="date"
                              className="text-white text-[14px] font-normal"
                            >
                              Date
                            </label>
                            <input
                              type="text"
                              id="date"
                              {...register("date")}
                              className="w-[352px] rounded-[4px] outline-none h-[28px] bg-[#343434] text-white"
                              defaultValue={selectedOrder?.date}
                            />
                          </div>
                          <div className="Amount">
                            <label
                              htmlFor="amount"
                              className="text-white text-[14px] font-normal"
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              id="amount"
                              {...register("amount")}
                              className="w-[352px] rounded-[4px] outline-none h-[28px] bg-[#343434] text-white"
                              defaultValue={selectedOrder?.amount}
                            />
                          </div>
                          <div className="buttons flex items-center justify-center gap-[38px]">
                            <button
                              type="submit"
                              className="w-[91px] rounded-[6px] py-[5px] bg-[#585858] text-white text-[14px] font-normal"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEdit(false)}
                              className="text-white text-[14px] font-normal"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                sortedOrders.map((item, index) => (
                  <div key={index} className="main flex flex-col">
                    <div
                      onClick={() => handleStoreClick(item)}
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
                          backgroundColor: item.status ? "#00AB55" : "#292929",
                        }}
                      >
                        <p className="text-white text-[11px] font-semibold">
                          {item.status ? "Completed" : "In Process"}
                        </p>
                      </div>
                    </div>
                    <div className="divider w-[767px] h-[1px] bg-[#E0E6ED]/40 mt-[10px]"></div>
                  </div>
                ))
              )}
            </div>
            {selectedOrder ? null : (
              <div className="prev-next flex items-center mt-[40px] gap-[6px]">
                <button className="w-[70px] flex items-center justify-center gap-[4px] py-[6px] bg-[#292929] rounded-[8px] text-white text-[12px] font-normal">
                  <img src={arrowLeft} alt="arrow left" /> Prev
                </button>
                <button className="w-[70px] flex items-center justify-center gap-[4px] py-[6px] bg-[#292929] rounded-[8px] text-white text-[12px] font-normal">
                  <img src={arrowRight} alt="arrow right" />
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {uploadOrder && (
        <div className="orders-main-box px-[35px] mb:flex mb:flex-col dk:flex dk:flex-row dk:items-start dk:justify-between w-full">
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
          <div className="upload-order dk:w-[807px] flex flex-col items-center p-[20px] bg-[#111] rounded-[6px]">
            <p className="text-white text-[18px] font-bold w-[767px]">
              Upload Order
            </p>
            <div className="upload-close flex items-center justify-between mt-[19px] w-[767px]">
              <p className="text-[#FF9900] text-[16px] font-semibold">Upload</p>
              <p className="text-[#5D482A] text-[16px] font-semibold">X</p>
            </div>
            <div className="choose-file w-[767px] flex items-center justify-between rounded-[6px] bg-[#343434] border-[1px] border-choosefile mt-[16px] pl-[17px]">
              <p className="text-choosefiletext text-[14px] font-normal py-[8px]">
                Choose file...
              </p>
              <label
                htmlFor="file"
                className="w-[80px] py-[8px] cursor-pointer text-[#FF9900] text-[14px] flex justify-center font-black bg-[#FF9900]/20 rounded-[5px]"
              >
                Browse
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".csv"
                onChange={handleFile}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </div>
            <img
              src={folderIcon}
              alt="folder icon"
              className="mt-[85px] mb-[87px]"
              onClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
