import TabIcon from "@mui/icons-material/Tab";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Skeleton from "@mui/material/Skeleton";

export const FAVICON_SIZE = 24;

function FavIcon({
  url,
  faded,
}: {
  readonly url: chrome.tabs.Tab["url"];
  readonly faded: boolean;
}) {
  const favicon = new URL(chrome.runtime.getURL("/_favicon/"));
  if (url) {
    favicon.searchParams.set("pageUrl", url);
  }
  favicon.searchParams.set("size", "32");

  return (
    <Avatar
      src={favicon.toString()}
      variant="square"
      sx={{
        opacity: faded ? 0.25 : undefined,
        bgcolor: "transparent",
        color: "var(--mui-palette-divider)",
        height: FAVICON_SIZE,
        width: FAVICON_SIZE,
      }}
    >
      <TabIcon />
    </Avatar>
  );
}

export function Loading() {
  return (
    <Skeleton variant="rectangular">
      <Avatar
        variant="square"
        sx={{
          height: FAVICON_SIZE,
          width: FAVICON_SIZE,
        }}
      />
    </Skeleton>
  );
}

export default function ListItemFavicon({
  url,
  faded = false,
}: {
  readonly url: chrome.tabs.Tab["url"];
  readonly faded: boolean;
}) {
  if (!url) {
    return null;
  }

  return (
    <ListItemIcon sx={{ minWidth: FAVICON_SIZE }}>
      <FavIcon url={url} faded={faded} />
    </ListItemIcon>
  );
}
