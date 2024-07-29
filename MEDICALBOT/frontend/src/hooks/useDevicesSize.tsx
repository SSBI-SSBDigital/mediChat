import { useState, useEffect } from "react";

type ScreenSize = "XS" | "SM" | "SMD" | "MD" | "LG" | "XL";

const getScreenSize = (): ScreenSize => {
  const width = window?.innerWidth;
  if (width < 480) {
    return "XS";
  } else if (width >= 480 && width < 768) {
    return "SM";
  } else if (width >= 768 && width < 834) {
    return "SMD";
  } else if (width >= 834 && width < 1024) {
    return "MD";
  } else if (width >= 1024 && width < 1440) {
    return "LG";
  } else {
    return "XL";
  }
};

const useDevicesSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useDevicesSize;
