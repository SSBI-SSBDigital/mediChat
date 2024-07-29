import { useState, useEffect } from "react";

const getScreenSize = (): number => {
  const width = window?.innerWidth;
  return width;
};

const useScreenSize = (): number => {
  const [screenSize, setScreenSize] = useState<number>(getScreenSize());

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

export default useScreenSize;
