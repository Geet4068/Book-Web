import { GetLandingPageList } from "@/Api/Functions/list.api";
import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useGlobalHooks } from "./GlobalHooks";
import { toast } from "react-toastify";
import { Create } from "@/Api/Functions/create.api";
import { Delete } from "@/Api/Functions/remove.api";
import { productUpdate } from "@/Api/Functions/edit.api";
import {
  ICreateResponse,
  ILandingPageDetails,
  ILandingPageList,
  IuserEditResponse,
} from "@/Interface/cms.interface";
import { GetLandingPageDetails } from "../Api/Functions/details.api";

// interface Landingpagelist {
//   page: number;
//   perPage: number;
//   success: boolean;
//   message: string;
//   status: number;
// }

// interface LandingDetailslist {
//   title: string;
//   description: string;
//   image: File;
//   data: {};
// }

export const listQuery = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ["PRODUCTS", page, perPage],
    queryFn: () => GetLandingPageList({ page, perPage }),
  });
};

export const useUserProductCreateInMutation = (): UseMutationResult<
  ICreateResponse,
  unknown,
  void,
  unknown
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<ICreateResponse, unknown>({
    mutationFn: Create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCT"] });

      toast.success("New Booklist Created!");
    },
    onError: (error) => {
      toast.error(`Booklist creation failed: ${error}`);
    },
  });
};

export const useProductDeleteMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation<void, unknown, { id: number }>({
    mutationFn: ({ id }) => Delete(id),
    onSuccess: () => {
      toast.error("Booklist Deleted!");
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
    },
  });
};

export const useProductUpdateMutation = (): UseMutationResult<
  IuserEditResponse,
  unknown,
  void,
  unknown
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<IuserEditResponse, unknown, void>({
    mutationFn: productUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
      toast.success("Booklist Updated successfully!");
    },
    onError: () => {
      console.error();
    },
  });
};

export const useDetailsMutation = (id: string) => {
  return useQuery({
    queryFn: () => GetLandingPageDetails(id),
    queryKey: ["DETAILS", id],
  });
};
