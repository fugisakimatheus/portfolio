import { Flex, Text } from "@fugisaki/design-system";
import React from "react";
import { useTranslation } from "react-i18next";

type Project = {
  name: string;
  images: string[];
  tags: string[];
  description: string;
  link: string;
};

const projects: Project[] = [];

const Projects = () => {
  const { t } = useTranslation();

  return (
    <Flex
      width="100%"
      maxWidth="1120px"
      height="100%"
      align="center"
      justify="center"
      direction="column"
      marginX={{ base: "1.4rem", sm: "1.4rem", md: "2rem" }}
    >
      <Text
        color="green.400"
        fontWeight="bold"
        fontSize="1.75rem"
        lineHeight="1.5rem"
        marginBottom="3rem"
      >
        {t("projects:title")}
      </Text>

      <Flex
        border="1px solid rgba(255, 255, 255, 0.05)"
        boxShadow="0 4px 26px rgba(0, 0, 0, 0.1)"
        bgColor="rgba(255, 255, 255, 0.03)"
        backdropFilter="blur(6px)"
        paddingY={{ base: "1.2rem", sm: "1.2rem", md: "1.5rem" }}
        paddingX={{ base: "1.2rem", sm: "1.2rem", md: "2.5rem" }}
        borderRadius="6px"
        width="100%"
        maxWidth="860px"
        align="center"
        justify="center"
        minHeight={{ base: "520px", sm: "520px", md: "350px" }}
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: "1rem", sm: "1rem", md: "1.2rem" }}
        >
          {t("projects:building")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Projects;
