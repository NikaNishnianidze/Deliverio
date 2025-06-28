import deliverio from "../../public/assets/delivericon.svg";

export default function Courier() {
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
      </div>
    </div>
  );
}
