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
      paddingY="1rem"
      paddingX="0.5rem"
      position="fixed"
      color="white"
      align="center"
      bottom="0px"
    >
      {links.map(({ icon, link, label }) => (
        <IconButton
          key={label}
          aria-label={label}
          variant="link"
          color="gray.400"
          size="md"
          icon={<FaIcon name={icon} size="md" />}
          _hover={{
            color: "blue.400",
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
