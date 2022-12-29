import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import "./path.css";
import { Box } from "@fugisaki/design-system";

const Logo = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const animateRef = useRef(false);

  useEffect(() => {
    if (animateRef.current) return;

    anime({
      targets: ".lines path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3000,
      direction: "alternate",
      loop: false,
      delay: function (_el, i) {
        return i * 300;
      },
      complete: () => {
        setIsAnimating(false);
      },
    });

    animateRef.current = true;
  });

  return (
    <Box className="lines">
      <svg
        height="36px"
        viewBox="0 0 172 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="path"
          d="M16.1875 28H31.0625L55.9375 96.5L80.75 28H95.6875L61.875 119H49.9375L16.1875 28ZM8.6875 28H23.25L25.875 90.9375V119H8.6875V28ZM88.5625 28H103.188V119H86V90.9375L88.5625 28Z"
        />
        <path
          className="path"
          d="M126.875 28V119H109.688V28H126.875ZM163.562 67.3125V80.875H122.375V67.3125H163.562ZM168.375 28V41.5625H122.375V28H168.375Z"
        />
      </svg>
    </Box>
  );
};

export default Logo;
