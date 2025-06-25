import Wrapper from "@/Layout/Wrapper/Wrapper";
import { NetworkProvider } from "@/Offline";
import { store } from "@/Toolkit/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import "@/styles/profile.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
        <Wrapper>
          <Component {...pageProps} />
          <ToastContainer autoClose={1500} />
        </Wrapper>
        </NetworkProvider>
      </QueryClientProvider>
    </Provider>
  );
}
