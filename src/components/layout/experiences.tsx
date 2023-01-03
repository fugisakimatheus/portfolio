import {
  Box,
  Flex,
  IconButton,
  MdIcon,
  Text,
  ScaleFade,
} from "@fugisaki/design-system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Experience = {
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    name: "experiences:objective:name",
    description: "experiences:objective:description",
    location: "experiences:objective:location",
    endDate: "experiences:objective:endDate",
    startDate: "experiences:objective:startDate",
    tags: [
      "react",
      "react-native",
      "typescript",
      "redux",
      "redux-saga",
      "indexedDB",
      "design-system",
      "clean architecture",
    ],
  },
  {
    name: "experiences:grandchef:name",
    description: "experiences:grandchef:description",
    location: "experiences:grandchef:location",
    endDate: "experiences:grandchef:endDate",
    startDate: "experiences:grandchef:startDate",
    tags: [
      "react",
      "react-native",
      "vue.js",
      "vuex",
      "electron",
      "typescript",
      "less",
      "figma",
    ],
  },
  {
    name: "experiences:resenhe:name",
    description: "experiences:resenhe:description",
    location: "experiences:resenhe:location",
    endDate: "experiences:resenhe:endDate",
    startDate: "experiences:resenhe:startDate",
    tags: ["react-native", "javascript", "node.js", "express.js", "mongoDB"],
  },
];

const Experiences = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleChangePage = (operator: number) => {
    const newPage = currentPage + operator;
    if (newPage === -1) {
      setCurrentPage(2);
      return;
    }
    if (newPage === 3) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage(newPage);
  };

  const currentExperience = experiences[currentPage];

  const buttonStyles = {
    variant: "link",
    size: "sm",
    height: "34px",
    width: "34px",
    borderRadius: "full",
    color: "gray.900",
    bgColor: "green.500",
    _hover: {
      color: "gray.200",
      bgColor: "green.600",
    },
    _active: {
      opacity: 0.7,
    },
  };

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
      <Flex
        border="1px solid rgba(255, 255, 255, 0.05)"
        boxShadow="0 4px 26px rgba(0, 0, 0, 0.1)"
        bgColor="rgba(255, 255, 255, 0.03)"
        backdropFilter="blur(6px)"
        padding={{ base: "1rem", sm: "1rem", md: "3rem" }}
        borderRadius="6px"
        width="100%"
        maxWidth="860px"
        minHeight="56%"
        position="relative"
      >
        <Box position="absolute" top="46%" left="-18px">
          <IconButton
            {...buttonStyles}
            aria-label="previous-slide"
            icon={<MdIcon name="MdKeyboardArrowLeft" size="md" />}
            onClick={() => handleChangePage(-1)}
          />
        </Box>

        <Flex
          direction="column"
          height="100%"
          width="100%"
          align="center"
          justify="center"
        >
          <Flex key={currentExperience.name} color="gray.200">
            <Text>{t(currentExperience.name)}</Text>
            <Text>{t(currentExperience.startDate)}</Text>
            <Text>{t(currentExperience.endDate)}</Text>
            <Text>{t(currentExperience.location)}</Text>
            <Text>{t(currentExperience.description)}</Text>
            <Flex>
              {currentExperience.tags.map((tag) => (
                <Text key={tag}>{t(tag)}</Text>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Box position="absolute" top="46%" right="-18px">
          <IconButton
            {...buttonStyles}
            aria-label="next-slide"
            icon={<MdIcon name="MdKeyboardArrowRight" size="md" />}
            onClick={() => handleChangePage(1)}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Experiences;
