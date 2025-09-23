import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonProps,
} from "@mui/material";
import * as colors from "@mui/material/colors";
import { alpha, styled, type Theme } from "@mui/material/styles";
import type { MouseEvent } from "react";
import {
  DEFAULT_SHADE,
  type Hue,
} from "@/components/layout/theme/themeHelpers";

const {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} = colors;

const getBorder = (theme: Theme, color: string): string => {
  return theme.spacing(0.25) + " solid " + color;
};
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => {
  const border = getBorder(theme, theme.palette.background.paper);
  const borderActive = getBorder(theme, theme.palette.action.active);
  const borderDisabled = border;
  const borderHover = getBorder(theme, theme.palette.action.hover);
  return {
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border,
      height: theme.spacing(4),
      width: theme.spacing(4),
      "&.Mui-selected": {
        border: borderActive,
        "&:not(:first-of-type)": {
          borderLeft: borderActive,
        },
        "&.Mui-disabled": {
          border: borderDisabled,
          "&:not(:first-of-type)": {
            borderLeft: borderDisabled,
          },
        },
      },
      "&:hover": {
        border: borderHover,
      },
      "&:not(:first-of-type)": {
        borderLeft: border,
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
          borderLeft: borderHover,
        },
        "&.Mui-disabled": {
          border: borderDisabled,
          "&:not(:first-of-type)": {
            borderLeft: borderDisabled,
          },
        },
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  };
});

interface StyledToggleButtonProps extends ToggleButtonProps {
  backgroundColor: string;
}
const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<StyledToggleButtonProps>(({ theme, backgroundColor }) => {
  const { light, dark } = theme.palette.augmentColor({
    color: { main: backgroundColor },
  });
  return {
    backgroundColor,
    "&.Mui-selected": {
      backgroundColor,
      "&:hover": {
        backgroundColor: light,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: alpha(dark, theme.palette.action.disabledOpacity),
    },
    "&:hover": {
      backgroundColor: light,
    },
  };
});

export default function ColorSwatches({
  disabled = false,
  hue,
  setHue,
}: {
  disabled?: boolean;
  hue: Hue;
  setHue: (hue: Hue) => void;
}) {
  const handleValue = (_e: MouseEvent<HTMLElement>, value: Hue | null) => {
    if (value !== null) {
      setHue(value);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={hue}
      exclusive
      onChange={handleValue}
      disabled={disabled}
      aria-label="Color selection"
    >
      <StyledToggleButton
        value="pink"
        aria-label="pink"
        backgroundColor={pink[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="purple"
        aria-label="purple"
        backgroundColor={purple[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="deepPurple"
        aria-label="deep purple"
        backgroundColor={deepPurple[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="indigo"
        aria-label="indigo"
        backgroundColor={indigo[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="blue"
        aria-label="blue"
        backgroundColor={blue[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="lightBlue"
        aria-label="light blue"
        backgroundColor={lightBlue[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="cyan"
        aria-label="cyan"
        backgroundColor={cyan[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="teal"
        aria-label="teal"
        backgroundColor={teal[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="green"
        aria-label="green"
        backgroundColor={green[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="lightGreen"
        aria-label="light green"
        backgroundColor={lightGreen[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="lime"
        aria-label="lime"
        backgroundColor={lime[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="yellow"
        aria-label="yellow"
        backgroundColor={yellow[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="amber"
        aria-label="amber"
        backgroundColor={amber[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="orange"
        aria-label="orange"
        backgroundColor={orange[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="deepOrange"
        aria-label="deep orange"
        backgroundColor={deepOrange[DEFAULT_SHADE]}
      />
      <StyledToggleButton
        value="red"
        aria-label="red"
        backgroundColor={red[DEFAULT_SHADE]}
      />
    </StyledToggleButtonGroup>
  );
}
