import {
  BarChart as BarChartIcon,
  NightsStay as NightsStayIcon,
  WebAsset as WebAssetIcon,
} from "@mui/icons-material";
import { TabContext, TabList as MuiTabList, TabPanel as MuiTabPanel } from "@mui/lab";
import { Paper, Tab as MuiTab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";
import DataHandler from "@/utils/dataStore/DataHandler";
import ElevationScroll from "./ElevationScroll";
import DataProvider from "@/utils/dataStore/DataProvider";
import ChartsTab from "@/components/tabs/count/ChartsTab";
import SnoozeTab from "@/components/tabs/snooze/SnoozeTab";
import WindowsTab from "@/components/tabs/tab/WindowsTab";
import Content from "./layout/Content";
import "@/utils/charts/initializeCharts";

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
    <DataProvider>
      <DataHandler />
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
              slotProps={{
                indicator: { style: { display: "none" } },
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
    </DataProvider>
  );
}
