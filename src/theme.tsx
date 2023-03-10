import { theme as defaultTheme } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = {
  fonts: {
    ...defaultTheme.fonts,
    body: `'Fira Code', sans-serif`,
    heading: `'Fira Code', sans-serif`,
  },
  colors: {
    accent: "#FFF5EE",
    dark: "#101114",
    darkish: "#202228",
  },
};

export default extendTheme({ config, ...theme });
