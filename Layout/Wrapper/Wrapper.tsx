import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
