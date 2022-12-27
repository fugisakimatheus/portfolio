import React, { useState } from "react";
import {
  Flex,
  Box,
  utils,
  theme,
  Image,
  Button,
  SelectSearch,
} from "@fugisaki/design-system";
import Logo from "../logo";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const storedLanguage = localStorage.getItem("language") || "";
  const [currentLanguage, setCurrentLanguage] = useState(storedLanguage);
  const backgroundColor = utils.rgba(theme.colors.gray[900], 0.9);

  const handleChangeLanguage = ({ value }: any) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    setCurrentLanguage(value);
  };

  const buttonLinkStyles = {
    variant: "link",
    color: "gray.300",
    fontSize: "0.94rem",
    marginRight: "1rem",
    borderBottom: "1px solid transparent",
    _hover: { color: "blue.300", borderBottom: "1px solid", borderRadius: 0 },
    _active: { color: "blue.300" },
  };

  return (
    <Flex
      backgroundColor={backgroundColor}
      width="100%"
      height="56px"
      backdropFilter="blur(9px)"
      justify="center"
      paddingY="0.5rem"
      paddingX="1rem"
      position="fixed"
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
          <Flex align="center">
            <Flex>
              <Button {...buttonLinkStyles}>{t("header:about")}</Button>
              <Button {...buttonLinkStyles}>{t("header:skills")}</Button>
              <Button {...buttonLinkStyles}>{t("header:experience")}</Button>
              <Button {...buttonLinkStyles}>{t("header:projects")}</Button>
            </Flex>

            <Flex align="center">
              <SelectSearch
                value={currentLanguage || "pt-BR"}
                width="140px"
                size="sm"
                color="gray.300"
                options={[
                  {
                    value: "pt-BR",
                    label: "Português Brasil",
                  },
                  {
                    value: "en",
                    label: "Inglês",
                  },
                ]}
                onChange={(value) => handleChangeLanguage(value)}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
