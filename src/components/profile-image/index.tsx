import React from "react";
import { Flex, Image } from "@fugisaki/design-system";

const ProfileImage = () => {
  return (
    <Flex
      width={{ base: "300px", sm: "300px", md: "420px", lg: "580px" }}
      height={{ base: "300px", sm: "300px", md: "420px", lg: "580px" }}
      backgroundImage="url(/images/profile-background.svg)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      align="center"
      justify="center"
      direction="column"
    >
      <Image
        pointerEvents="none"
        userSelect="none"
        src="/images/profile.png"
        borderRadius="9999"
        width={{ base: "280px", sm: "280px", md: "350px", lg: "480px" }}
        height={{ base: "280px", sm: "280px", md: "350px", lg: "480px" }}
        alt="Matheus Fugisaki"
      />
    </Flex>
  );
};

export default ProfileImage;
