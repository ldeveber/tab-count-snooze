import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ListGroupCard from "src/components/list/ListGroupCard";
import { StyledListItem } from "src/components/list/ListItem";
import { Loading as IconLoading } from "src/components/list/ListItemFavicon";

function TabLoading() {
  return (
    <StyledListItem data-testid="tab-loading">
      <IconLoading />
      <ListItemText
        primary={
          <Skeleton width="20%">
            <Typography component="span">.</Typography>
          </Skeleton>
        }
        secondary={
          <Skeleton width="80%">
            <Typography component="span" fontSize="0.75rem">
              .
            </Typography>
          </Skeleton>
        }
      />
    </StyledListItem>
  );
}

export default function WindowLoading() {
  return (
    <ListGroupCard
      initOpen
      cardTitle={
        <Skeleton width="100%">
          <Typography variant="subtitle1" component="span">
            .
          </Typography>
        </Skeleton>
      }
      data-testid="window-loading"
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
