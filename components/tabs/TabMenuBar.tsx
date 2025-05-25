import {
  BarChart as BarChartIcon,
  NightsStay as NightsStayIcon,
  WebAsset as WebAssetIcon,
} from "@mui/icons-material";
import { TabList as MuiTabList, TabListProps } from "@mui/lab";
import { Paper as MuiPaper, Tab as MuiTab, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TabValue } from "./types";

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

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

export function Loading() {
  return (
    <Paper
      square
      elevation={0}
      className="flex flex-none items-center justify-center"
      sx={{ zIndex: "appBar", position: "sticky", top: 0 }}
    >
      <Skeleton variant="rounded" animation="wave" width={354} height={56} />
    </Paper>
  );
}

interface TabMenuBarProps {
  onChange: TabListProps["onChange"];
}

export default function TabMenuBar({ onChange }: TabMenuBarProps) {
  return (
    <ElevationScroll>
      <Paper
        square
        elevation={0}
        className="flex-none"
        sx={{ zIndex: "appBar", position: "sticky", top: 0 }}
      >
        <TabList
          onChange={onChange}
          centered
          slotProps={{
            indicator: { style: { display: "none" } },
          }}
        >
          <Tab label="Tab" value={TabValue.Tab} icon={<WebAssetIcon />} iconPosition="start" />
          <Tab
            label="Count"
            value={TabValue.Count}
            icon={<BarChartIcon />}
            iconPosition="start"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          />
          <Tab
            label="Snooze"
            value={TabValue.Snooze}
            icon={<NightsStayIcon />}
            iconPosition="start"
          />
        </TabList>
      </Paper>
    </ElevationScroll>
  );
}
