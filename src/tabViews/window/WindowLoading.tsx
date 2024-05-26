import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ListGroupCard from "src/components/list/ListGroupCard";
import { Loading as ListItemLoading } from "src/components/list/ListItem";
import { Loading as FaviconLoading } from "src/components/list/ListItemFavicon";

function TabLoading() {
  return (
    <>
      <ListItemLoading>
        <FaviconLoading />
        <ListItemText
          primary={
            <Skeleton width="20%">
              <Typography>.</Typography>
            </Skeleton>
          }
          secondary={
            <Skeleton width="80%">
              <Typography fontSize="0.75rem">.</Typography>
            </Skeleton>
          }
        />
      </ListItemLoading>
    </>
  );
}

export default function WindowLoading() {
  return (
    <ListGroupCard
      initOpen
      cardTitle={
        <Skeleton width="100%">
          <Typography variant="subtitle1">.</Typography>
        </Skeleton>
      }
    >
      <TabLoading />
      <TabLoading />
      <TabLoading />
      <TabLoading />
      <TabLoading />
      <TabLoading />
    </ListGroupCard>
  );
}
