import deliverio from "../../public/assets/delivericon.svg";

export default function Roles() {
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
    </div>
  );
}
