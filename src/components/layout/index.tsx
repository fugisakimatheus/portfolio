import { Box, Flex, MdIcon, IconButton } from "@fugisaki/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header, { Sections } from "../header";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import LinksBar from "../links-bar";
import About from "./about";
import Skills from "./skills";
import Projects from "./projects";
import { Player } from "@lottiefiles/react-lottie-player";
import animatedBackground from "../../lottie/ocean.json";
import Experiences from "./experiences";

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState<Sections>(
    "" as Sections
  );
  const [isClicked, setIsClicked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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
        about: { offsetTop: 0 },
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

    const sections = Object.keys(intersectBySection) as Sections[];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (intersectBySection[section]) {
        setSelectedSection(section);
        break;
      }
    }
  }, [
    aboutEntry?.isIntersecting,
    skillsEntry?.isIntersecting,
    experienceEntry?.isIntersecting,
    projectsEntry?.isIntersecting,
  ]);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, [setScrollPosition]);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const commonProps = {
    height: "100vh",
    width: "100%",
    align: "center",
    justify: "center",
  };

  return (
    <Box
      minHeight="100vh"
      width="100%"
      position="relative"
      overflowY="auto"
      overflowX="clip"
    >
      <Header selected={selectedSection} onGoToSection={handleGoToSection} />
      <LinksBar />
      <Box paddingTop="56px" height="100%" width="100%">
        <Flex
          ref={aboutRef}
          as="section"
          {...commonProps}
          height="calc(100vh - 56px)"
          position="relative"
        >
          <About />
        </Flex>

        <Flex ref={skillsRef} as="section" {...commonProps}>
          <Skills />
        </Flex>

        <Flex ref={experienceRef} as="section" {...commonProps}>
          <Experiences />
        </Flex>

        <Flex
          ref={projectsRef}
          as="section"
          {...commonProps}
          position="relative"
        >
          <Projects />
          <Player
            autoplay
            loop
            src={animatedBackground}
            speed={0.2}
            style={{
              width: "100%",
              bottom: "0px",
              left: "0px",
              position: "absolute",
              transform: "rotateY(180deg)",
              zIndex: -1,
              opacity: 0.12,
            }}
          />
        </Flex>
      </Box>

      <Box
        visibility={scrollPosition < 100 ? "hidden" : "visible"}
        opacity={scrollPosition < 100 ? 0 : 1}
        transition="opacity ease-in-out 240ms"
        position="fixed"
        bottom="0px"
        right="0px"
        padding="0.72rem"
      >
        <IconButton
          aria-label="go-to-top"
          variant="link"
          color="gray.900"
          size="sm"
          height="34px"
          width="34px"
          icon={<MdIcon name="MdKeyboardArrowUp" size="md" />}
          bgColor="green.500"
          borderRadius="full"
          _hover={{
            color: "gray.200",
            bgColor: "green.600",
          }}
          _active={{
            opacity: 0.7,
          }}
          onClick={() => handleGoToSection("about")}
        />
      </Box>
    </Box>
  );
};

export default Layout;
