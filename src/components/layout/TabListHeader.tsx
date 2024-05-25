import BarChartIcon from "@mui/icons-material/BarChart";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import Paper from "@mui/material/Paper";
import MuiTab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import ElevationScroll from "src/components/ElevationScroll";

const TabList = styled(MuiTabList)(() => ({
  ".MuiTabs-flexContainer": {
    borderRadius: 40,
    backgroundColor: "var(--md3-sys-color-surface)",
  },
}));

const Tab = styled(MuiTab)(({ theme }) => {
  return {
    display: "inline-flex",
    alignContent: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(2, 3),
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: 40,
    minHeight: "initial",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  };
});

export default function TabListHeader(props: TabListProps) {
  return (
    <ElevationScroll>
      <Paper
        sx={{
          p: 1,
          bgcolor: "background.default",
          zIndex: "appBar",
          position: "sticky",
          top: 0,
          borderRadius: 0,
        }}
      >
        <TabList
          {...props}
          centered
          TabIndicatorProps={{
            style: { display: "none" },
          }}
        >
          <Tab label="Windows" value="windows" icon={<WebAssetIcon />} iconPosition="start" />
          <Tab
            label="Charts"
            value="charts"
            icon={<BarChartIcon />}
            iconPosition="start"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          />
          <Tab label="Snoozed" value="snoozed" icon={<NightsStayIcon />} iconPosition="start" />
        </TabList>
      </Paper>
    </ElevationScroll>
  );
}
