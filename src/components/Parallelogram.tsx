import { Box, SxProps } from "@mui/material";
import { ReactNode, ElementType } from "react";

type ParallelogramProps = {
  angle?: number;
  component?: ElementType;
  href?: string;
  sx?: SxProps;
  children?: ReactNode;
  [key: string]: any;
};

export default function Parallelogram({
  angle = 20,
  component = "div",
  href,
  sx,
  children,
  ...props
}: ParallelogramProps) {
  props ??= {};
  if (component === "a" && href) {
    props.href = href;
  }
  return (
    <Box
      component={component}
      {...props}
      sx={{ ...sx, transform: `skew(${angle}deg)` }}
    >
      <Box sx={{ transform: `skew(${angle * -1}deg)` }}>{children}</Box>
    </Box>
  );
}
