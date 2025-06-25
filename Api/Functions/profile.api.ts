import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";

interface LandingPageList {
  message: string;
  status: number;
  data: [];
}
export const Profile = async (): Promise<LandingPageList> => {
  try {
    const res = await axiosInstance.get(endpoints.auth.profile);
    return {
      status: res.status,
      data: res.data.data,
      message: "Profile details fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: [],
      message: "Cannot fetch profile details",
    };
  }
};
