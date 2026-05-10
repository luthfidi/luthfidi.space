import { useWindowSize } from "usehooks-ts";

const useIsMobile = () => {
  const { width } = useWindowSize();
  return width < 1024;
};

export default useIsMobile;
