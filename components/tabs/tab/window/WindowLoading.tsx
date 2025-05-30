import { ListItemText, Skeleton, Typography } from "@mui/material";
import ListGroupCard from "@/components/list/ListGroupCard";
import { StyledListItem } from "@/components/list/ListItem";
import { Loading as IconLoading } from "@/components/list/ListItemFavicon";

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
