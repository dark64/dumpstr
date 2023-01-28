import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type LoaderProps = { displayText?: string };

function Loader(props: LoaderProps) {
  const chars = ["-", "\\", "|", "/"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(
      () => setIndex((index) => (index == chars.length - 1 ? 0 : index + 1)),
      100
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      {props.displayText} {chars[index]}
    </Flex>
  );
}

export default Loader;
