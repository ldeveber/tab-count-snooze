import { Paper as MuiPaper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import ElevationScroll from "@/components/ElevationScroll";

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

export function Loading({ children }: PropsWithChildren) {
  return (
    <Paper
      elevation={0}
      className="flex items-center justify-end"
      sx={{ zIndex: "appBar", position: "sticky", top: 72 }}
    >
      {children}
    </Paper>
  );
}

export default function StickyTabSubMenuBar({ children }: PropsWithChildren) {
  return (
    <ElevationScroll>
      <Paper
        square
        elevation={0}
        className="flex min-h-14 items-center justify-between"
        sx={{ zIndex: "appBar", position: "sticky", top: 72 }}
      >
        {children}
      </Paper>
    </ElevationScroll>
  );
}
