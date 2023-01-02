import { Flex, Text } from "@fugisaki/design-system";
import React from "react";
import { useTranslation } from "react-i18next";

type Experience = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: string[];
};

const experiences: Experience[] = [];

const Experiences = () => {
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
        {t("experiences:title")}
      </Text>
    </Flex>
  );
};

export default Experiences;
