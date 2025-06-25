import { ILoginResponse, IuserResponse } from "@/Interface/auth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { MutationFunction } from "@tanstack/react-query";


export const Log: MutationFunction<IuserResponse> = async (payload) => {
  const res = await axiosInstance.post<ILoginResponse>(
    endpoints.auth.signin,
    payload
  );

  return res.data;
};

//take an array, return in obect, with the index number as property
//take a string and count numnber of letters
