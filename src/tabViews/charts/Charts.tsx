import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MuiPaper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ChartData } from "chart.js";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import { useAllTabs, useFilters } from "src/contexts";
import { getChartData } from "src/utils/chartjs";
import { groupTabs } from "src/utils/chrome";
import ChartPane, { type ChartViewType } from "./ChartPane";
import SectionBy from "./SectionBy";

const BaseBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: "flex",
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Charts() {
  const [chartType, setChartType] = useState<ChartViewType>("bar");
  const [urlDepth, setUrlDepth] = useState<number>(0);
  const [minDupes, setMinDupes] = useState(3);
  const [open, setOpen] = useState(false);
  const allTabs = useAllTabs();
  const filters = useFilters();

  const toggleOpen = () => setOpen(!open);

  const handleToggleChartType = (_e: MouseEvent<HTMLElement>, newChartType: ChartViewType) => {
    setChartType(newChartType);
  };

  const onChartClick = (origin) => {
    const tabIds: number[] = [];
    allTabs
      .filter((t) => t.url?.includes(origin))
      .forEach(({ id }) => {
        if (!id) {
          return;
        }
        tabIds.push(id);
      });
    const title = origin.replace(/https?:\/\//, "");
    // TODO FIXME: prompt name for group
    void groupTabs(tabIds as [number, ...number[]], title);
  };

  const handleChange = (_e: Event, newValue: number | number[]) => {
    setUrlDepth(newValue as number);
  };

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinDupes(parseInt(event.target.value));
  };

  const data: ChartData = useMemo(
    () => getChartData(allTabs, { minDupes, urlDepth, filters }),
    [allTabs, minDupes, urlDepth, filters],
  );

  return (
    <BaseBox>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={handleToggleChartType}
              aria-label="chart type"
            >
              <ToggleButton value="bar" aria-label="bar chart">
                <BarChartIcon />
              </ToggleButton>
              <ToggleButton value="doughnut" aria-label="pie chart">
                <PieChartIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <SectionBy />
        </Stack>

        <ChartPane chartType={chartType} data={data} onClick={onChartClick} />

        <Stack direction="row" spacing={2} alignItems="center" sx={{ display: "none" }}>
          <Tooltip title="Advanced Settings">
            <IconButton size="small" onClick={toggleOpen}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {open && (
            <Paper elevation={0}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  id="min-match"
                  label="Minimum Matches"
                  type="number"
                  size="small"
                  variant="standard"
                  value={minDupes}
                  onChange={handleMinChange}
                  inputProps={{ min: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>

              <Box sx={{ width: 250 }}>
                <Typography id="input-slider" gutterBottom>
                  Match Depth
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <AutoAwesomeMotionIcon />
                  </Grid>
                  <Grid size={{ xs: 1 }}>
                    <Slider
                      value={urlDepth}
                      min={0}
                      max={2}
                      onChange={handleChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          )}
        </Stack>
      </Stack>
    </BaseBox>
  );
}
