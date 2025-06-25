import {IuserResponseRegister } from "@/Interface/auth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { MutationFunction } from "@tanstack/react-query";
export const Reg: MutationFunction<IuserResponseRegister, IuserResponseRegister> = async (
  userPayload: IuserResponseRegister
) => {
 
  const res = await axiosInstance.post<IuserResponseRegister>(
    endpoints.auth.signup,
    userPayload
  );

  return res.data;
};
