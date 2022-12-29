import { Box, Flex } from "@fugisaki/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header, { Sections } from "../header";
import aos from "aos";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import LinksBar from "../links-bar";

const Layout = () => {
  aos.init({ duration: 2000 });

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
    align: "center",
    justify: "center",
    fontSize: "2.6rem",
    color: "white",
  };

  return (
    <Box minHeight="100vh" width="100%" position="relative" overflowY="auto">
      <Header selected={selectedSection} onGoToSection={handleGoToSection} />
      <LinksBar />
      <Box paddingTop="56px" height="100%">
        <Flex
          ref={aboutRef}
          as="section"
          {...commonProps}
          height="calc(100vh - 56px)"
        >
          Sobre
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
