import axios from "axios";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";

export const Delete = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.post<void>(endpoints.cms.remove, {
      id,
    });
    return response.data;
  } catch (error) {
    console.log("Delete error", error);
    throw error;
  }
};
