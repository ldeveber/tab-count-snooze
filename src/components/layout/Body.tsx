import TabContext from "@mui/lab/TabContext";
import MuiTabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";
import ChartsTab from "src/tabViews/ChartsTab";
import SnoozeTab from "src/tabViews/SnoozeTab";
import WindowsTab from "src/tabViews/WindowsTab";
import Content from "./Content";
import TabListHeader from "./TabListHeader";

const TabPanel = styled(MuiTabPanel)(() => ({
  padding: 0,
}));

export default function Body() {
  const [tab, setTab] = useState("windows");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabListHeader onChange={handleChange} />
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