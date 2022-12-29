import { Box, Flex, Text } from "@fugisaki/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header, { Sections } from "../header";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import LinksBar from "../links-bar";
import ProfileImage from "../profile-image";

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState<Sections>(
    "" as Sections
  );
  const [isClicked, setIsClicked] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const interOptions = { rootMargin: "-56px" };
  const aboutEntry = useIntersectionObserver(aboutRef, interOptions);
  const skillsEntry = useIntersectionObserver(skillsRef, interOptions);
  const experienceEntry = useIntersectionObserver(experienceRef, interOptions);
  const projectsEntry = useIntersectionObserver(projectsRef, interOptions);

  const handleGoToSection = useCallback(
    (section: Sections) => {
      setIsClicked(true);
      setSelectedSection(section);

      const refBySection = {
        about: aboutRef.current,
        skills: skillsRef.current,
        experience: experienceRef.current,
        projects: projectsRef.current,
      };

      const currentRef = refBySection[section];

      if (!currentRef) return;

      window.scrollTo(0, currentRef.offsetTop);
    },
    [setIsClicked, setSelectedSection]
  );

  useEffect(() => {
    if (isClicked) return;

    const intersectBySection = {
      about: aboutEntry?.isIntersecting,
      skills: skillsEntry?.isIntersecting,
      experience: experienceEntry?.isIntersecting,
      projects: projectsEntry?.isIntersecting,
    };

    (Object.keys(intersectBySection) as Sections[]).forEach((key) => {
      if (intersectBySection[key]) {
        setSelectedSection(key);
        return;
      }
    });
  }, [
    aboutEntry?.isIntersecting,
    skillsEntry?.isIntersecting,
    experienceEntry?.isIntersecting,
    projectsEntry?.isIntersecting,
  ]);

  useEffect(() => {
    const section = window.location.hash.slice(1) as Sections;
    handleGoToSection(section || "about");
  }, [handleGoToSection]);

  useEffect(() => {
    if (!isClicked) return;

    const timeout = setTimeout(() => {
      setIsClicked(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isClicked]);

  useEffect(() => {
    if (!selectedSection) return;
    window.location.replace(`${window.location.origin}/#${selectedSection}`);
  }, [selectedSection]);

  const commonProps = {
    height: "100vh",
    width: "100%",
    align: "center",
    justify: "center",
  };

  return (
    <Box minHeight="100vh" width="100%" position="relative" overflowY="auto">
      <Header selected={selectedSection} onGoToSection={handleGoToSection} />
      <LinksBar />
      <Box paddingTop="56px" height="100%" width="100%">
        <Flex
          ref={aboutRef}
          as="section"
          {...commonProps}
          height="calc(100vh - 56px)"
        >
          <Flex
            marginTop={{ base: "2.5rem", sm: "2.5rem", md: "0px" }}
            width="100%"
            maxWidth="1120px"
            height="100%"
            align="center"
            justify={{
              base: "flex-end",
              sm: "flex-end",
              md: "space-between",
            }}
            direction={{
              base: "column-reverse",
              sm: "column-reverse",
              md: "row",
            }}
            marginX="2rem"
          >
            <Flex
              direction="column"
              padding={{ base: "1rem", sm: "1rem", md: "0px" }}
              align={{ base: "center", sm: "center", md: "flex-start" }}
              marginTop={{ base: "1rem", sm: "1rem", md: "0px" }}
            >
              <Text
                color="green.400"
                fontWeight="bold"
                fontSize={{
                  base: "2rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                }}
                lineHeight={{
                  base: "2rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                }}
                marginRight="0.3rem"
              >
                Matheus Fugisaki
              </Text>
              <Text
                color="gray.200"
                marginTop={{ base: "0.5rem", sm: "0.5rem", md: "0px" }}
                fontWeight="bold"
                fontSize="1.25rem"
              >
                Desenvolvedor Front-end
              </Text>
              <Text
                color="gray.400"
                marginTop="0.5rem"
                textAlign={{ base: "center", sm: "center", md: "left" }}
              >
                kjashdskj askjdakdjh askjd haskjas as ja dhas akjkash ka ahska
                sjdkahs dkjashaska jashdah kjashdkj askdj ah sjdka hsdkjashaska
                jashdah kjashdkj askdj ah sjdkahsdkjashaska jashdah kjashdkj
                askdj ah sjdkahsd kjashaska jashdah kjashdkj askdj ah
                sjdkahsdkjashaska jashdah kjashdkj askdj ah sjdkahs dkjashaska
                jashdah kjashdkj
              </Text>
            </Flex>
            <ProfileImage />
          </Flex>
        </Flex>

        <Flex ref={skillsRef} as="section" {...commonProps}>
          Habilidades
        </Flex>

        <Flex ref={experienceRef} as="section" {...commonProps}>
          Experiencias
        </Flex>

        <Flex ref={projectsRef} as="section" {...commonProps}>
          Projetos
        </Flex>
      </Box>
    </Box>
  );
};

export default Layout;
