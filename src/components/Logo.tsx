import { Code } from "@chakra-ui/react";

function Logo() {
  const art = atob(
    "ICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAKICAgX2AgfCAgfCAgIHwgIF9fIGBfXyBcICAgX18gXCAgICBfX3wgIF9ffCAgIF9ffCAKICAoICAgfCAgfCAgIHwgIHwgICB8ICAgfCAgfCAgIHwgXF9fIFwgIHwgICAgfCAgICAKIFxfXyxffCBcX18sX3wgX3wgIF98ICBffCAgLl9fLyAgX19fXy8gXF9ffCBffCAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICBffCAgICAgICAgICAgICAgICAgICAgICA="
  );
  return <Code whiteSpace="pre" bg="transparent" lineHeight="1">{art}</Code>;
}

export default Logo;
