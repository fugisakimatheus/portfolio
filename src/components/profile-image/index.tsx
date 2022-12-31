import React from "react";
import { Flex, Image, useBreakpointValue } from "@fugisaki/design-system";
import { Player } from "@lottiefiles/react-lottie-player";

import animatedBackground from "../../lottie/circle.json";

const ProfileImage = () => {
  const size = useBreakpointValue({
    base: "500px",
    sm: "500px",
    md: "600px",
    lg: "800px",
  });

  const top = useBreakpointValue({
    base: "-80px",
    sm: "-80px",
    md: "-70px",
    lg: "-115px",
  });
  const left = useBreakpointValue({
    base: "-90px",
    sm: "-90px",
    md: "-115px",
    lg: "-130px",
  });

  return (
    <Flex
      width={{ base: "300px", sm: "300px", md: "420px", lg: "520px" }}
      height={{ base: "300px", sm: "300px", md: "420px", lg: "520px" }}
      backgroundImage="url(/images/profile-background.svg)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      align="center"
      justify="center"
      direction="column"
      position="relative"
    >
      <Player
        autoplay
        loop
        src={animatedBackground}
        speed={0.5}
        style={{
          height: size,
          width: size,
          top,
          left,
          position: "absolute",
          zIndex: -1,
          opacity: 0.3,
        }}
      />
      <Image
        pointerEvents="none"
        userSelect="none"
        src="/images/profile.png"
        borderRadius="9999"
        width={{ base: "280px", sm: "280px", md: "350px", lg: "450px" }}
        height={{ base: "280px", sm: "280px", md: "350px", lg: "450px" }}
        alt="Matheus Fugisaki"
      />
    </Flex>
  );
};

export default ProfileImage;
