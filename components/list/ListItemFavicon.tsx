import TabIcon from "@mui/icons-material/Tab";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Skeleton from "@mui/material/Skeleton";

const FAVICON_SIZE = 24;

function FavIcon({
  url,
  faded,
}: {
  readonly url: Browser.tabs.Tab["url"];
  readonly faded: boolean;
}) {
  // const favicon = new URL(browser.runtime.getURL("/_favicon/"));
  // if (url) {
  //   favicon.searchParams.set("pageUrl", url);
  // }
  // favicon.searchParams.set("size", "32");

  return (
    <Avatar
      // src={favicon.toString()}
      title={url}
      variant="square"
      sx={{
        opacity: faded ? 0.25 : undefined,
        bgcolor: "transparent",
        color: "var(--mui-palette-divider)",
        height: FAVICON_SIZE,
        width: FAVICON_SIZE,
      }}
      role="none"
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
        role="none"
      />
    </Skeleton>
  );
}

export default function ListItemFavicon({
  url,
  faded = false,
}: {
  readonly url: Browser.tabs.Tab["url"];
  readonly faded: boolean;
}) {
  if (!url) {
    return null;
  }

  return (
    <ListItemIcon sx={{ minWidth: FAVICON_SIZE }} role="none">
      <FavIcon url={url} faded={faded} />
    </ListItemIcon>
  );
}
