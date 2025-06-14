import { useNavigate } from "react-router-dom";
import deliverio from "../../public/assets/delivericon.svg";
import { useRoleContext } from "../context/RolesProvider";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

interface IInputs {
  email: string;
  password: string;
}
const schema: yup.ObjectSchema<IInputs> = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
  password: yup.string().required("Password is Required"),
});
export default function Login() {
  const { role } = useRoleContext();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    if (!localStorage.getItem("user")) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email === data.email && user.password == data.password) {
      if (role === "Store") {
        navigate("/store");
      } else if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Courier") {
        navigate("/courier");
      }
    } else {
      setError("Email Or PassWord Is Incorrect");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="navigation pt-[13px] px-[35px] flex items-center justify-between w-full">
        <div className="logo flex items-center gap-[8px]">
          <img src={deliverio} alt="deliverio" />
          <p className="text-white text-[20px] font-semibold">
            Deliver<span className="text-[#F90]">io</span>
          </p>
        </div>
        <div className="role">
          <p className="text-[#FFD451] text-[14px] font-normal">{role}</p>
        </div>
        <div className="aboutUs">
          <button className="text-[14px] text-white font-normal w-[98px] border-[1px] border-about py-[12px] rounded-[8px] bg-[#111]">
            About Us
          </button>
        </div>
      </div>
      <div className="main flex flex-col items-center mt-[47px]">
        <div className="text flex flex-col items-center">
          <p className="text-[50px] text-white font-normal">Sign In</p>
          <p className="text-[#4F4F4F] text-[14px] font-normal">
            or{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
              className="font-bold"
            >
              Sign up
            </span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="email mt-[12px] flex flex-col gap-[7px]">
            <label
              htmlFor="email"
              className="text-white text-[14px] font-normal"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="w-[379px] bg-[#111] border-[1px] border-about rounded-[8px] py-[7px] outline-none px-[12px] text-white"
            />
            <div className="errors">
              {errors.email && (
                <p className="text-[12px] text-[#D92D2A] flex items-center gap-[4px]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="password mt-[12px] flex flex-col gap-[7px]">
            <label
              htmlFor="password"
              className="text-white text-[14px] font-normal"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-[379px] bg-[#111] border-[1px] border-about rounded-[8px] py-[7px] outline-none px-[12px] text-white"
            />
            <div className="errors">
              {errors.password && (
                <p className="text-[12px] text-[#D92D2A] flex items-center gap-[4px]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {error && <p className="text-white text-[14px] mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-[44px] w-[100px] bg-[#251B03] py-[12px] rounded-[10px] text-[#F90] text-[14px] font-normal"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
