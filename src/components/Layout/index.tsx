import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import AppNavBar from "../AppNavBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <AppNavBar />
      <>{children}</>
    </Box>
  );
};

export default Layout;
