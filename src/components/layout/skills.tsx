import {
  Flex,
  Text,
  SiIcon,
  SiIconNames,
  ColorsNames,
  SimpleGrid,
} from "@fugisaki/design-system";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { useTranslation } from "react-i18next";
import animatedBackground from "../../lottie/shapes.json";

type Skill = {
  icon: SiIconNames;
  color: ColorsNames;
  label: string;
  priority: number;
};

const skills: Skill[] = [
  {
    icon: "SiTypescript",
    label: "skills:typescript",
    color: "blue.500",
    priority: 1,
  },
  {
    icon: "SiReact",
    label: "skills:react",
    color: "blue.500",
    priority: 4,
  },
  {
    icon: "SiReact",
    label: "skills:reactnative",
    color: "blue.500",
    priority: 7,
  },
  {
    icon: "SiNextdotjs",
    label: "skills:nextjs",
    color: "green.500",
    priority: 10,
  },
  {
    icon: "SiRedux",
    label: "skills:redux",
    color: "purple.600",
    priority: 16,
  },
  {
    icon: "SiVuedotjs",
    label: "skills:vuejs",
    color: "green.500",
    priority: 13,
  },
  {
    icon: "SiSass",
    label: "skills:sass",
    color: "pink.300",
    priority: 2,
  },
  {
    icon: "SiElectron",
    label: "skills:electron",
    color: "blue.500",
    priority: 14,
  },
  {
    icon: "SiNodedotjs",
    label: "skills:nodejs",
    color: "green.500",
    priority: 17,
  },
  {
    icon: "SiExpress",
    label: "skills:expressjs",
    color: "green.500",
    priority: 3,
  },
  {
    icon: "SiJest",
    label: "skills:jest",
    color: "red.600",
    priority: 8,
  },
  {
    icon: "SiTestinglibrary",
    label: "skills:testinglibrary",
    color: "red.600",
    priority: 5,
  },
  {
    icon: "SiCypress",
    label: "skills:cypress",
    color: "gray.200",
    priority: 11,
  },
  {
    icon: "SiMongodb",
    label: "skills:mongodb",
    color: "green.500",
    priority: 6,
  },
  {
    icon: "SiMysql",
    label: "skills:mysql",
    color: "blue.500",
    priority: 9,
  },
  {
    icon: "SiDocker",
    label: "skills:docker",
    color: "blue.500",
    priority: 12,
  },
  {
    icon: "SiFigma",
    label: "skills:figma",
    color: "gray.200",
    priority: 15,
  },
];

const Skills = () => {
  const { t } = useTranslation();

  const sortedSkills = skills.sort((a, b) => a.priority - b.priority);

  return (
    <Flex
      width="100%"
      maxWidth="1120px"
      height="100%"
      align="center"
      justify="center"
      marginX="2rem"
      direction="column"
      position="relative"
    >
      <Text
        color="green.400"
        fontWeight="bold"
        fontSize="1.75rem"
        lineHeight="1.5rem"
        marginBottom="3rem"
      >
        {t("skills:title")}
      </Text>
      <Player
        autoplay
        loop
        src={animatedBackground}
        speed={0.25}
        style={{
          height: "100%",
          width: "100%",
          top: "0px",
          left: "0px",
          position: "absolute",
          zIndex: -1,
          opacity: 0.1,
        }}
      />
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3 }}
        rowGap={{ base: "0.6rem", sm: "1.5rem", md: "1.5rem" }}
        columnGap={{ base: "2rem", sm: "2rem", md: "4rem" }}
        padding={{ base: "1rem", sm: "1rem", md: "3rem" }}
        borderRadius="6px"
        bgColor="rgba(255, 255, 255, 0.03)"
        border="1px solid rgba(255, 255, 255, 0.05)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(5px)"
      >
        {sortedSkills.map(({ icon, color, label }) => (
          <Flex
            key={label}
            align="center"
            color="gray.400"
            direction="row"
            _hover={{
              color,
            }}
            userSelect="none"
            transition="color ease-in-out 200ms"
          >
            <SiIcon name={icon} marginRight="1rem" />
            <Text fontSize={{ base: "1rem", sm: "1rem", md: "1.2rem" }}>
              {t(label)}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Skills;
