import { ICreatePayload, ICreateResponse } from "@/Interface/cms.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { MutationFunction } from "@tanstack/react-query";

export const Create: MutationFunction<ICreateResponse, void> = async (
  payload
) => {
  const response = await axiosInstance.post<ICreateResponse>(
    endpoints.cms.create,
    payload
  );
  return response.data;
};
