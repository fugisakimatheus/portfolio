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
      "react native",
      "typescript",
      "redux",
      "redux saga",
      "indexedDB",
      "realmDB",
      "design system",
      "clean architecture",
      "jest",
      "cypress",
      "styled components",
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
      "graphQL",
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
        paddingY={{ base: "1.2rem", sm: "1.2rem", md: "1.5rem" }}
        paddingX={{ base: "1.2rem", sm: "1.2rem", md: "2.5rem" }}
        borderRadius="6px"
        width="100%"
        maxWidth="860px"
        minHeight={{ base: "520px", sm: "520px", md: "350px" }}
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

        <Box position="absolute" top="46%" right="-18px">
          <IconButton
            {...buttonStyles}
            aria-label="next-slide"
            icon={<MdIcon name="MdKeyboardArrowRight" size="md" />}
            onClick={() => handleChangePage(1)}
          />
        </Box>

        <Flex
          direction="column"
          height="100%"
          width="100%"
          color="gray.200"
          textAlign="justify"
          px={{ base: "3", sm: "3", md: "0" }}
        >
          <Text
            width="100%"
            fontWeight="medium"
            color="gray.200"
            fontSize="3xl"
            mb="0"
          >
            {t(currentExperience.name)}
          </Text>
          <Flex fontSize="sm" fontWeight="semibold" color="gray.300">
            <Text mr="1">{t(currentExperience.startDate)} -</Text>
            <Text>{t(currentExperience.endDate)}</Text>
          </Flex>
          <Text mb="2" fontSize="sm" fontWeight="semibold" color="gray.300">
            {t(currentExperience.location)}
          </Text>
          <Text width="100%" mb="3">
            {t(currentExperience.description)}
          </Text>

          <Flex width="100%" flexWrap="wrap" marginBottom="40px">
            {currentExperience.tags.map((tag) => (
              <Text
                key={tag}
                py="1"
                px="2"
                mr="2"
                mb="2"
                bgColor="rgba(72, 187, 120, 0.16)"
                borderRadius="md"
                minWidth="max-content"
                border="1px solid"
                color="gray.200"
                borderColor="green.600"
              >
                {t(tag)}
              </Text>
            ))}
          </Flex>

          <Flex
            position="absolute"
            bottom="20px"
            align="center"
            left="50%"
            transform="translate(-50%, 50%)"
          >
            {experiences.map((experience, index) => (
              <Flex
                key={experience.name}
                bgColor={currentPage === index ? "green.400" : "gray.200"}
                borderRadius="full"
                h="12px"
                w="12px"
                mr={index < experiences.length - 1 ? "2" : "0"}
                cursor="pointer"
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Experiences;
