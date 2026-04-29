import { useWindowSize } from "usehooks-ts";

const useIsTablet = () => {
  const { width } = useWindowSize();
  return width < 1025;
};

export default useIsTablet;
