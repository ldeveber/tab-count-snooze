import { ExpandMore } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

const BoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  ".MuiSvgIcon-root": {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.standard,
    }),
    "&.Mui-expanded": {
      transform: "rotate(180deg)",
    },
  },
}));

export default function ExpandMoreIcon({ expanded }: { readonly expanded: boolean }) {
  return (
    <BoxWrap>
      <ExpandMore className={expanded ? "Mui-expanded" : ""} />
    </BoxWrap>
  );
}
