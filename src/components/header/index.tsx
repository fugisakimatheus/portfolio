import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Box,
  utils,
  theme,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MdIcon,
  IconButton,
  Fade,
} from "@fugisaki/design-system";
import Logo from "../logo";
import { useTranslation } from "react-i18next";

export type Sections = "about" | "skills" | "experience" | "projects";

type Link = {
  title: string;
  link: Sections;
};

const links: Link[] = [
  { title: "header:about", link: "about" },
  { title: "header:skills", link: "skills" },
  { title: "header:experience", link: "experience" },
  { title: "header:projects", link: "projects" },
];

type HeaderProps = {
  selected: Sections;
  onGoToSection: (section: Sections) => void;
};

const Header = ({ selected, onGoToSection }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const storedLanguage = localStorage.getItem("language") || "";

  const [currentLanguage, setCurrentLanguage] = useState(storedLanguage);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const isInitialScroll = scrollPosition <= 100;

  const backgroundColor = isInitialScroll
    ? "transparent"
    : utils.rgba(theme.colors.gray[900], 0.9);

  const optionBackgroundColor = utils.rgba(theme.colors.green[500], 0.06);

  const handleSection = (section: Sections) => {
    onGoToSection(section);
  };

  const handleChangeLanguage = (language: "pt-BR" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setCurrentLanguage(language);
  };

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, [setScrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getButtonLinkStyles = (link?: string) => {
    const common = {
      variant: "link",
      color: "gray.300",
      fontSize: "1rem",
      fontWeight: "semibold",
      marginRight: "1rem",
      paddingY: "6px",
      borderBottom: "1px solid transparent",
      borderRadius: 0,
      size: "sm",
      _hover: { color: "green.200", borderBottom: "1px solid" },
      _active: { color: "green.200", opacity: 0.86 },
    };

    if (link && link === selected) {
      return {
        ...common,
        color: "green.200",
        borderBottom: "1px solid",
      };
    }

    return common;
  };

  const getMenuItemStyles = (selected: "pt-BR" | "en") => {
    return {
      color: currentLanguage === selected ? "green.200" : "inherit",
      fontWeight: currentLanguage === selected ? "bold" : "inherit",
      backgroundColor:
        currentLanguage === selected ? optionBackgroundColor : "gray.800",
      _hover: {
        backgroundColor: optionBackgroundColor,
      },
    };
  };

  return (
    <>
      <Flex
        as="nav"
        backgroundColor={backgroundColor}
        width="100%"
        height="56px"
        backdropFilter={isInitialScroll ? "none" : "blur(5px)"}
        justify="center"
        paddingY="0.5rem"
        paddingX="1rem"
        position="fixed"
        transition="background ease-in-out 240ms"
      >
        <Flex
          width="100%"
          maxWidth="1120px"
          align="center"
          justify="space-between"
        >
          <Box>
            <Logo size="md" variant="dark-with-background" />
          </Box>

          <Box>
            <IconButton
              aria-label="menu"
              {...getButtonLinkStyles()}
              borderBottom="none !important"
              size="md"
              marginRight="0px"
              display={{ base: "flex", sm: "flex", md: "none" }}
              icon={<MdIcon name={isOpenMenu ? "MdClose" : "MdMenu"} />}
              onClick={() => setIsOpenMenu((old) => !old)}
            />

            <Flex
              align="center"
              display={{ base: "none", sm: "none", md: "flex" }}
            >
              <Flex>
                {links.map(({ title, link }) => (
                  <Button
                    key={link}
                    {...getButtonLinkStyles(link)}
                    onClick={() => handleSection(link)}
                  >
                    {t(title)}
                  </Button>
                ))}
              </Flex>

              <Flex align="center">
                <Menu>
                  <MenuButton
                    as={Button}
                    {...getButtonLinkStyles()}
                    leftIcon={<MdIcon name="MdLanguage" size="sm" />}
                    rightIcon={<MdIcon name="MdKeyboardArrowDown" size="sm" />}
                  >
                    {t(`header:translator:${currentLanguage}`)}
                  </MenuButton>

                  <MenuList
                    color="gray.300"
                    backgroundColor="gray.800"
                    border="1px solid"
                    borderColor="gray.700"
                    fontSize="14px"
                  >
                    <MenuItem
                      {...getMenuItemStyles("pt-BR")}
                      onClick={() => handleChangeLanguage("pt-BR")}
                    >
                      {t(`header:translator:pt-BR`)}
                    </MenuItem>

                    <MenuItem
                      {...getMenuItemStyles("en")}
                      onClick={() => handleChangeLanguage("en")}
                    >
                      {t(`header:translator:en`)}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Fade in={isOpenMenu} unmountOnExit>
        <Flex
          backgroundColor={backgroundColor}
          backdropFilter={isInitialScroll ? "none" : "blur(5px)"}
          padding="1rem"
          paddingBottom="2rem"
          width="100%"
          marginTop="56px"
          transition="background ease-in-out 240ms"
          position="fixed"
        >
          <Flex width="100%" direction="column" align="center" justify="center">
            <Menu>
              <MenuButton
                as={Button}
                {...getButtonLinkStyles()}
                marginRight="0px"
                leftIcon={<MdIcon name="MdLanguage" size="sm" />}
                rightIcon={<MdIcon name="MdKeyboardArrowDown" size="sm" />}
              >
                {t(`header:translator:${currentLanguage}`)}
              </MenuButton>

              <MenuList
                color="gray.300"
                backgroundColor="gray.800"
                border="1px solid"
                borderColor="gray.700"
                fontSize="14px"
              >
                <MenuItem
                  {...getMenuItemStyles("pt-BR")}
                  onClick={() => handleChangeLanguage("pt-BR")}
                >
                  {t(`header:translator:pt-BR`)}
                </MenuItem>

                <MenuItem
                  {...getMenuItemStyles("en")}
                  onClick={() => handleChangeLanguage("en")}
                >
                  {t(`header:translator:en`)}
                </MenuItem>
              </MenuList>
            </Menu>

            {links.map(({ title, link }) => (
              <Button
                key={link}
                {...getButtonLinkStyles(link)}
                marginTop="0.4rem"
                marginRight="0px"
                onClick={() => handleSection(link)}
              >
                {t(title)}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Fade>
    </>
  );
};

export default Header;
