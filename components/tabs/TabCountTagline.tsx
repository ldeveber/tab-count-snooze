import { Tooltip, Typography } from "@mui/material";
import { useTabCount, useWindowCount } from "@/utils/dataStore";

export default function TabCountTagline() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  let title = `${tabCount} Tab${tabCount === 1 ? "" : "s"}`;
  if (windowCount > 1) {
    title += ` across ${windowCount} Windows`;
  }
  const shortTitle = `${tabCount}/${windowCount}`;

  return (
    <>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
      >
        {title}
      </Typography>
      <Tooltip title={title} sx={{ color: "text.secondary", display: { xs: "block", sm: "none" } }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {shortTitle}
        </Typography>
      </Tooltip>
    </>
  );
}
