import { Box, Flex } from "@fugisaki/design-system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../header";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const aboutEntry = useIntersectionObserver(aboutRef, { rootMargin: "-57px" });
  const skillsEntry = useIntersectionObserver(skillsRef, {
    rootMargin: "-57px",
  });
  const experienceEntry = useIntersectionObserver(experienceRef, {
    rootMargin: "-57px",
  });
  const projectsEntry = useIntersectionObserver(projectsRef, {
    rootMargin: "-57px",
  });

  const handleGoToSection = useCallback(
    (section: string) => {
      setIsClicked(true);
      setSelectedSection(section);
      if (aboutRef.current && section === "about") {
        window.scrollTo(0, 0);
        return;
      }
      if (skillsRef.current && section === "skills") {
        window.scrollTo(0, skillsRef.current.offsetTop);
        return;
      }
      if (experienceRef.current && section === "experience") {
        window.scrollTo(0, experienceRef.current.offsetTop);
        return;
      }
      if (projectsRef.current && section === "projects") {
        window.scrollTo(0, projectsRef.current.offsetTop);
        return;
      }
    },
    [setIsClicked, setSelectedSection]
  );

  useEffect(() => {
    if (isClicked) return;
    if (aboutEntry?.isIntersecting) {
      setSelectedSection("about");
      return;
    }
    if (skillsEntry?.isIntersecting) {
      setSelectedSection("skills");
      return;
    }
    if (experienceEntry?.isIntersecting) {
      setSelectedSection("experience");
      return;
    }
    if (projectsEntry?.isIntersecting) {
      setSelectedSection("projects");
    }
  }, [
    aboutEntry?.isIntersecting,
    skillsEntry?.isIntersecting,
    experienceEntry?.isIntersecting,
    projectsEntry?.isIntersecting,
  ]);

  useEffect(() => {
    handleGoToSection(
      window.location.hash.slice(1, window.location.hash.length) || "about"
    );
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

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box minHeight="100vh" width="100%" position="relative" overflowY="auto">
      <Header
        selected={selectedSection}
        scrollOffset={scrollPosition}
        onGoToSection={handleGoToSection}
      />

      <Box paddingTop="56px" height="100%">
        <Flex
          ref={aboutRef}
          as="section"
          minHeight="calc(100vh - 56px)"
          align="center"
          justify="center"
          fontSize="4rem"
          color="white"
        >
          Sobre
        </Flex>

        <Flex
          ref={skillsRef}
          as="section"
          minHeight="100vh"
          align="center"
          justify="center"
          fontSize="4rem"
          color="white"
        >
          Habilidades
        </Flex>

        <Flex
          ref={experienceRef}
          as="section"
          minHeight="100vh"
          align="center"
          justify="center"
          fontSize="4rem"
          color="white"
        >
          Experiencias
        </Flex>

        <Flex
          ref={projectsRef}
          as="section"
          minHeight="100vh"
          align="center"
          justify="center"
          fontSize="4rem"
          color="white"
        >
          Projetos
        </Flex>
      </Box>
    </Box>
  );
};

export default Layout;
