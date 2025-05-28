import {
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChartData } from "chart.js";
import { ChangeEvent, useMemo, useState } from "react";
import { useAllTabs } from "@/utils/dataStore";
import { getChartData } from "@/utils/charts/chartjs";
import { groupTabs } from "@/utils/chrome";
import ChartPane, { type ChartViewType } from "./ChartPane";

const BaseBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: "flex",
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Charts({ chartType }: { chartType: ChartViewType }) {
  const [urlDepth, setUrlDepth] = useState<number>(0);
  const [minDupes, setMinDupes] = useState(3);
  const [open, setOpen] = useState(false);
  const allTabs = useAllTabs();

  const toggleOpen = () => setOpen(!open);

  const onChartClick = (origin: string) => {
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
    () => getChartData(allTabs, { minDupes, urlDepth }),
    [allTabs, minDupes, urlDepth],
  );

  return (
    <BaseBox>
      <Stack spacing={1}>
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
