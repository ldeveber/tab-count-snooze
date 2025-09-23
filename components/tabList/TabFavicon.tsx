import { Extension, ExtensionOutlined, TabOutlined } from "@mui/icons-material";
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
  Skeleton,
  styled,
} from "@mui/material";

export const FAVICON_SIZE = 24;

interface AvatarProps extends MuiAvatarProps {
  readonly faded?: boolean;
}
const Avatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "faded",
})<AvatarProps>(({ faded, theme }) => ({
  opacity: faded ? 0.25 : undefined,
  backgroundColor: "transparent",
  color: theme.palette.divider,
  height: FAVICON_SIZE,
  width: FAVICON_SIZE,
}));

export function Loading() {
  return (
    <Skeleton variant="rectangular">
      <Avatar variant="square" role="none" />
    </Skeleton>
  );
}

function FallbackIcon({ url }: { url: Browser.tabs.Tab["url"] }) {
  if (url) {
    if (url.startsWith("chrome-extension://")) {
      return <ExtensionOutlined />;
    }
    if (url.startsWith("chrome://extensions")) {
      return <Extension />;
    }
  }
  return <TabOutlined />;
}

export default function TabFavicon({
  tab,
}: {
  readonly tab: Browser.tabs.Tab;
}) {
  const faded = tab.discarded || tab.status === "unloaded";
  const favIconUrl =
    tab.favIconUrl && tab.favIconUrl.length > 0 ? tab.favIconUrl : undefined;
  return (
    <Avatar src={favIconUrl} variant="square" faded={faded} role="none">
      <FallbackIcon url={tab.url ?? tab.pendingUrl} />
    </Avatar>
  );
}
