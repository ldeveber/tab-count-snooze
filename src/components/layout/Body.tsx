import BarChartIcon from "@mui/icons-material/BarChart";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import TabContext from "@mui/lab/TabContext";
import MuiTabList from "@mui/lab/TabList";
import MuiTabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import MuiTab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";
import ElevationScroll from "src/components/ElevationScroll";
import ChartsTab from "src/tabViews/ChartsTab";
import SnoozeTab from "src/tabViews/SnoozeTab";
import WindowsTab from "src/tabViews/WindowsTab";
import Content from "./Content";

const TabList = styled(MuiTabList)(() => ({
  ".MuiTabs-flexContainer": {
    borderRadius: 40,
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

const TabPanel = styled(MuiTabPanel)(() => ({
  padding: 0,
}));

export default function Body() {
  const [tab, setTab] = useState("windows");
  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
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
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <Tab label="Tab" value="windows" icon={<WebAssetIcon />} iconPosition="start" />
            <Tab
              label="Count"
              value="charts"
              icon={<BarChartIcon />}
              iconPosition="start"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            />
            <Tab label="Snooze" value="snoozed" icon={<NightsStayIcon />} iconPosition="start" />
          </TabList>
        </Paper>
      </ElevationScroll>
      <TabPanel value="windows">
        <Content>
          <WindowsTab />
        </Content>
      </TabPanel>
      <TabPanel value="charts">
        <Content>
          <ChartsTab />
        </Content>
      </TabPanel>
      <TabPanel value="snoozed">
        <Content>
          <SnoozeTab />
        </Content>
      </TabPanel>
    </TabContext>
  );
}
