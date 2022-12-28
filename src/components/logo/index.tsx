import React from "react";
import { Image } from "@fugisaki/design-system";

type Variants =
  | "dark-with-background"
  | "light-with-background"
  | "light"
  | "dark";

type Sizes = "xs" | "sm" | "md" | "lg";

type LogoProps = {
  variant: Variants;
  size: Sizes;
};

const logosPathsMap = new Map<Variants, string>([
  ["dark-with-background", "/images/dark-logo.svg"],
  ["dark", "/images/dark-without-background-logo.svg"],
  ["light-with-background", "/images/light-logo.svg"],
  ["light", "/images/light-without-background-logo.svg"],
]);

const sizesMap = new Map<Sizes, string>([
  ["xs", "16px"],
  ["sm", "24px"],
  ["md", "32px"],
  ["lg", "64px"],
]);

const Logo = (props: LogoProps) => {
  const { variant, size } = props;

  const imageSize = sizesMap.get(size);
  const imageSrc = logosPathsMap.get(variant);

  return (
    <Image
      pointerEvents="none"
      userSelect="none"
      src={imageSrc}
      width={imageSize}
      height={imageSize}
      alt="Matheus Fugisaki"
    />
  );
};

export default Logo;
