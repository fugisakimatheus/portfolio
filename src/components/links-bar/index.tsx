import React, { useEffect } from "react";
import {
  Flex,
  FaIcon,
  IconButton,
  FaIconNames,
  Text,
  Button,
} from "@fugisaki/design-system";
import { useTranslation } from "react-i18next";

type Links = {
  icon: FaIconNames;
  link: string;
  label: string;
  showLabel?: boolean;
};

const LinksBar = () => {
  const { i18n, t } = useTranslation();

  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };

  const links: Links[] = [
    {
      icon: "FaPortrait",
      showLabel: true,
      link:
        i18n.language === "en"
          ? "https://drive.google.com/file/d/12H-Cayky5HzbHftbePZIr3-QGKUmDAip/view?usp=sharing"
          : "https://drive.google.com/file/d/1suwABJqZo9VdI_LA1ZMzVy4vxQgbW9KL/view?usp=sharing",
      label: t("linksBar:curriculum"),
    },
    {
      icon: "FaLinkedin",
      link: "https://www.linkedin.com/in/matheus-fugisaki",
      label: "linkedin",
    },
    {
      icon: "FaGithub",
      link: "https://github.com/fugisakimatheus",
      label: "github",
    },
  ];

  return (
    <Flex
      paddingY={{ base: "0.7rem", sm: "0.7rem", md: "1rem" }}
      paddingX={{ base: "0.5rem", sm: "0.5rem", md: "0.8rem" }}
      position="fixed"
      color="white"
      align="center"
      bottom="0px"
      zIndex={999999}
    >
      {links.map(({ icon, link, label, showLabel }) => (
        <Button
          key={label}
          variant="link"
          bgColor="gray.800"
          borderRadius="md"
          border="2px solid"
          borderColor="gray.700"
          _hover={{
            color: label === "github" ? "black" : "blue.500",
            bgColor: "white",
            borderColor: label === "github" ? "black" : "blue.500",
          }}
          _active={{
            opacity: 0.7,
          }}
          marginRight={{ base: "0.4rem", sm: "0.4rem", md: "0.7rem" }}
          padding="0.28rem"
          color="gray.300"
          cursor="pointer"
          onClick={() => handleOpenLink(link)}
        >
          <FaIcon name={icon} size="md" />
          {showLabel && (
            <Text ml="6px" fontSize="sm">
              {label}
            </Text>
          )}
        </Button>
      ))}
    </Flex>
  );
};

export default LinksBar;
