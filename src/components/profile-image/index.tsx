import React from "react";
import { Flex, Image, useBreakpointValue } from "@fugisaki/design-system";
import { Player } from "@lottiefiles/react-lottie-player";

import animatedBackground from "../../lottie/circle.json";

const ProfileImage = () => {
  const size = useBreakpointValue({
    base: "380px",
    sm: "380px",
    md: "580px",
    lg: "740px",
  });

  const top = useBreakpointValue({
    base: "-50px",
    sm: "-50px",
    md: "-66px",
    lg: "-84px",
  });
  const left = useBreakpointValue({
    base: "-64px",
    sm: "-64px",
    md: "-108px",
    lg: "-100px",
  });

  return (
    <Flex
      width={{ base: "250px", sm: "250px", md: "420px", lg: "520px" }}
      height={{ base: "250px", sm: "250px", md: "420px", lg: "520px" }}
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
        speed={0.4}
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
        width={{ base: "220px", sm: "220px", md: "350px", lg: "450px" }}
        height={{ base: "220px", sm: "220px", md: "350px", lg: "450px" }}
        alt="Matheus Fugisaki"
      />
    </Flex>
  );
};

export default ProfileImage;
