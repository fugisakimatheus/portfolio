import { Box } from "@fugisaki/design-system";
import React from "react";
import Header from "../header";

const Layout: React.FC = () => {
  return (
    <Box
      minHeight="100vh"
      width="100%"
      backgroundColor="gray.900"
      position="relative"
      overflowY="auto"
      scrollBehavior="smooth"
    >
      <Header />
      <Box paddingTop="56px" height="100%">
        <Box
          marginTop="200px"
          marginBottom="700px"
          height="800px"
          backgroundColor="white"
        ></Box>
      </Box>
    </Box>
  );
};

export default Layout;
