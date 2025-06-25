import { useQueryClient, QueryClient } from "@tanstack/react-query";
// import { useDispatch, AppDispatch } from "react-redux";

interface GlobalHooks {
  queryClient: QueryClient;
//   dispatch: AppDispatch;
  // navigate: NavigateFunction;
}

export const useGlobalHooks = (): GlobalHooks => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
//   const dispatch = useDispatch();

  return { queryClient };
};
