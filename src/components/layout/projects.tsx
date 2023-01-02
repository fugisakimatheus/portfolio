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
    </Flex>
  );
};

export default Projects;
