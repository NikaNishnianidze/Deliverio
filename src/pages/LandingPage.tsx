import deliverio from "../../public/assets/delivericon.svg";
import titleImage from "../../public/assets/titleImage.png";
import titleImageDesktop from "../../public/assets/titleImage desktop.png";
import storeImage from "../../public/assets/house.png";
import scooterImage from "../../public/assets/scooter.png";
import computerImage from "../../public/assets/computer.png";
import storeMobile from "../../public/assets/storemobile.png";

export default function LandginPage() {
  return (
    <div className="flex flex-col items-center px-[18px] pt-[16px]">
      <div className="navigation flex items-center w-full justify-between">
        <div className="logo flex items-center gap-[8px]">
          <img src={deliverio} alt="deliverio" />
          <p className="text-white text-[20px] font-semibold">
            Deliver<span className="text-[#F90]">io</span>
          </p>
        </div>
        <div className="buttons mb:hidden dk:block dk:flex dk:items-center dk:gap-[30px]">
          <button className="text-white text-[14px] cursor-pointer">
            About Us
          </button>
          <button className="text-white text-[14px] cursor-pointer">
            Log In
          </button>
          <button className="w-[98px] bg-[#251B03] cursor-pointer rounded-[8px]  py-[12px] text-[14px] text-[#FF9900] font-normal">
            Sign Up
          </button>
        </div>
      </div>
      <div className="mainbox flex flex-col items-center mt-[51px] dk:mt-[141px]">
        <div className="headingtitle mb:flex mb:flex-col mb:items-center gap-[45px] dk:flex-row dk:w-[1350px]  dk:justify-between dk:items-center">
          <div className="text mb:flex mb:flex-col">
            <div className="title">
              <p className="text-[#FFD451] text-center dk:text-left text-[44.835px] dk:text-[68px] font-black">
                Simplifying
              </p>
              <p className="text-white text-center dk:text-left text-[44.835px] dk:text-[68px] font-black">
                Deliveries
              </p>
              <p className="text-[18.4px] text-[#FFD451] dk:text-left font-normal text-center">
                For Businesses & Couriers
              </p>
              <img
                src={titleImage}
                alt="title image"
                className="mb:block dk:hidden mt-[40px]"
              />
              <div className="button w-full mb:flex mb:flex-col mb:items-center dk:items-start">
                <button className="w-[124px] cursor-pointer mt-[63px] bg-[#251B03] rounded-[8px] py-[12px] text-[#FF9900] text-[18px] font-normal">
                  Sing Up
                </button>
              </div>
            </div>
          </div>
          <div className="image mb:hidden dk:block">
            <img src={titleImageDesktop} alt="title image desktop" />
          </div>
        </div>
        <div className="howitworks flex flex-col mt-[154px] gap-[46px]">
          <p className="text-white font-bold text-[42px] text-center">
            How It Works
          </p>
          <div className="boxes mb:flex mb:flex-col dk:flex-row gap-[46px] dk:gap-[90px]">
            <div className="box1 w-[337px] rounded-[14px] bg-[#251B03] py-[52px] px-[32px] flex flex-col items-center">
              <img src={storeImage} alt="store image " />
              <p className="text-[#FF9900] w-[268px] mt-[38px] font-semibold text-[18px]">
                Upload Orders
              </p>
              <p className="text-white/60 w-[268px] text-[14px] font-normal">
                See live updates of deliveries and customer feedback.
              </p>
            </div>
            <div className="box2 w-[337px] rounded-[14px] bg-[#543200] py-[52px] px-[32px] flex flex-col items-center">
              <img src={scooterImage} alt="scooter image " />
              <p className="text-[#FF9900] w-[268px] mt-[38px] font-semibold text-[18px]">
                Manage Deliveries
              </p>
              <p className="text-white/60 w-[268px] text-[14px] font-normal">
                Accept deliveries, update statuses, and optimize routes.
              </p>
            </div>
            <div className="box3 w-[337px] rounded-[14px] bg-[#251B03] py-[52px] px-[32px] flex flex-col items-center">
              <img src={computerImage} alt="computer image " />
              <p className="text-[#FF9900] w-[268px] mt-[38px] font-semibold text-[18px]">
                Monitor Performance
              </p>
              <p className="text-white/60 w-[268px] text-[14px] font-normal">
                View detailed analytics on store and courier activities.
              </p>
            </div>
          </div>
        </div>
        <div className="forRoles flex flex-col mt-[210px]">
          <div className="boxes mb:flex mb:flex-col mb:gap-[34px]">
            <div className="cont1 mb:flex mb:flex-col dk:flex-row w-[357px] rounded-[14px] bg-[#251B03] py-[37px] px-[42px]">
              <div className="main-text">
                <p className="text-[#FFD451] text-[14px] font-normal">
                  For Stores
                </p>
                <p className="text-white text-[24px] font-extrabold">
                  Streamline Your Orders with Ease
                </p>
                <p className="mt-[312px] text-left text-white/60">
                  Upload, manage, and track all your orders effortlessly. Stay
                  in control and ensure smooth deliveries to your customers with
                  our intuitive platform.
                </p>
                <div className="button flex flex-col items-center">
                  <button className="mt-[52px] w-[145px] py-[12px] rounded-[14px] bg-[#543200] border-[1px] border-about shadow-getstarted text-[#FF9900] text-[14px] font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="image mb:hidden dk:blocka"></div>
            </div>
            <div className="cont2"></div>
            <div className="cont3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
