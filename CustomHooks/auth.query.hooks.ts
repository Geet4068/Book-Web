import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { Log } from "@/Api/Functions/login.api";
import { useGlobalHooks } from "./GlobalHooks";
import { Reg } from "@/Api/Functions/registration.api";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  IuserResponse,
  IuserResponseRegister,
} from "@/Interface/auth.interface";
import { Profile } from "@/Api/Functions/profile.api";

// interface SignInResponse {
//   token: string;
//   profile_pic : File
//   mutationFn: Function;
// }

export const useUserSignInMutation = (): UseMutationResult<
  IuserResponse,
  unknown,
  void,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookies = new Cookies();
  const router = useRouter();

  return useMutation<IuserResponse, unknown>({
    mutationFn: Log,
    onSuccess: (response) => {
      const { token, status, message } = response || {};

      if (status === 200) {
        cookies.set("token", token, {
          path: "/",
          secure: true,
        });
        cookies.set("profile_pic", response.data.profile_pic, { path: "/" });
        cookies.set("first_name", response.data.first_name, { path: "/" });
        toast(message);
        router.push("/cms/list");
      } 

      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUserSignUpMutation = (): UseMutationResult<
  IuserResponseRegister,
  unknown,
  IuserResponseRegister,
  unknown
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<IuserResponseRegister, unknown, IuserResponseRegister>({
    mutationFn: Reg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["REG"] });
      toast.success("Registration Successfull");
    },
  });
};

export const useUserProfileDetails = () => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => Profile(),
  });
};
