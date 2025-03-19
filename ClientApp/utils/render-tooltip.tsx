import { Tooltip } from "primereact/tooltip";

export const renderTooltip = (
  content: string,
  target: string,
  position: "top" | "left" | "right" | "mouse" | "bottom" | undefined = "top",
) => <Tooltip content={content} position={position} target={`.${target}`} />;