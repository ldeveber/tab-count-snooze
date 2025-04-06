import useScrollTrigger from "@mui/material/useScrollTrigger";
import { cloneElement } from "react";

/**
 * @see https://mui.com/material-ui/react-app-bar/#elevate-app-bar
 */
export default function ElevationScroll({
  children,
  window,
}: {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}
