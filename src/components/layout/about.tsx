import { Flex, Text, useBreakpointValue } from "@fugisaki/design-system";
import React from "react";
import { useTranslation } from "react-i18next";

import ProfileImage from "../profile-image";

const About = () => {
  const { t } = useTranslation();

  return (
    <Flex
      marginTop={{ base: "2.5rem", sm: "2.5rem", md: "0px" }}
      width="100%"
      maxWidth="1120px"
      height="100%"
      align="center"
      justify={{
        base: "flex-end",
        sm: "flex-end",
        md: "space-between",
      }}
      direction={{
        base: "column-reverse",
        sm: "column-reverse",
        md: "row",
      }}
      marginX="2rem"
    >
      <Flex
        direction="column"
        padding={{ base: "1rem", sm: "1rem", md: "0px" }}
        align={{ base: "center", sm: "center", md: "flex-start" }}
        marginTop={{ base: "3rem", sm: "3rem", md: "0px" }}
        maxWidth="600px"
      >
        <Text
          color="green.400"
          fontWeight="bold"
          fontSize={{
            base: "2rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
          }}
          lineHeight={{
            base: "2rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
          }}
          marginRight="0.3rem"
        >
          Matheus Fugisaki
        </Text>
        <Text
          color="gray.300"
          marginTop={{ base: "0.5rem", sm: "0.5rem", md: "0px" }}
          fontWeight="bold"
          fontSize="1.2rem"
        >
          {t("about:role")}
        </Text>
        <Text
          color="gray.500"
          marginTop="0.5rem"
          textAlign={{ base: "center", sm: "center", md: "left" }}
        >
          {t("about:description")}
        </Text>
      </Flex>
      <ProfileImage />
    </Flex>
  );
};

export default About;
