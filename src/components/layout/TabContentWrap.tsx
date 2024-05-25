import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const TabContentWrap = styled(MuiBox)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

export default TabContentWrap;
