import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import {
  ICreatePayload,
  ILandingPageList,
  IuserEditResponse,
} from "@/Interface/cms.interface";

export const productUpdate: MutationFunction<IuserEditResponse, void> = async (
  payload
) => {
  const response = await axiosInstance.post<ICreatePayload>(
    endpoints.cms.update,
    payload
  );
  return response.data;
};
