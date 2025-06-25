import { ILandingPageDetails } from "@/Interface/cms.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";



export const GetLandingPageDetails = async (
  slug: string
): Promise<ILandingPageDetails> => {
    const response = await axiosInstance.get(`${endpoints.cms.details}/${slug}`);
    // if (!response) throw new Error("Network response was not ok");
  
    return response.data.data;
 

};


