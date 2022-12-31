import React from "react";
import { Flex, FaIcon, IconButton, FaIconNames } from "@fugisaki/design-system";

type Links = {
  icon: FaIconNames;
  link: string;
  label: string;
};

const links: Links[] = [
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

const LinksBar = () => {
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };

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
      {links.map(({ icon, link, label }) => (
        <IconButton
          key={label}
          aria-label={label}
          variant="link"
          color="gray.300"
          size="xs"
          marginRight={{ base: "0.4rem", sm: "0.4rem", md: "0.7rem" }}
          padding="0.26rem"
          icon={<FaIcon name={icon} size="md" />}
          bgColor="gray.800"
          borderRadius="md"
          _hover={{
            color: label === "github" ? "black" : "blue.500",
            bgColor: "white",
          }}
          _active={{
            opacity: 0.7,
          }}
          onClick={() => handleOpenLink(link)}
        />
      ))}
    </Flex>
  );
};

export default LinksBar;
