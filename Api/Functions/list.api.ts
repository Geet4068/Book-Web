// import { ILandingPageList, IGetLandingPage} from "@/Interface/cms.interface";
// import axiosInstance from "../Axios/Axios";
// import { endpoints } from "../EndPoints/endpoints";

// export const GetLandingPageList = async ({
//   page,
//   perPage,
// }:IGetLandingPage): Promise<ILandingPageList | undefined> => {
//   try {
//     const response = await axiosInstance.post(
//       endpoints.cms.list, {
//         page,
//         perPage,
//       }
//     );
//     if (!response.data) {
//       throw new Error("No data returned from API");
//     }
//     return ({
//       data:response.data.data,
//       totalPages: response.data.totalPages
//     }) as ILandingPageList;
//   }
  
//    catch (error) {
//     console.error("Error fetching landing page list:", error);
//     throw error; // Ensure error is thrown to handle it in useQuery
//   }
// };
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";

interface LandingPage {
  _id: number;
  title: string;
  description: string;
  image:File;
}

interface LandingPageList {
  success: boolean;
  message: string;
  status: number;
  totalPages?: number;
  data: LandingPage[];
}

interface GetLandingPageListParams {
  page: number;
  perPage: number;
}
export const GetLandingPageList = async ({
  page,
  perPage,
}: GetLandingPageListParams): Promise<LandingPageList> => {
  try {
    const response = await axiosInstance.post(endpoints.cms.list, {
      page,
      perPage,
    });

    return {
      success: true,
      message: "Landing pages fetched successfully",
      status: response.status,
      data: response?.data as LandingPage[],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch landing pages",
      status: 500,
      data: [],
    };
  }
};
