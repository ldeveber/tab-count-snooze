import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  type CardProps,
  Collapse,
  List,
  type ListItemTextProps,
  type ListProps,
  CardActionArea as MuiCardActionArea,
  type CardActionAreaProps as MuiCardActionAreaProps,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  type CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type ReactNode, useState } from "react";

interface CardActionAreaProps extends MuiCardActionAreaProps {
  selected?: boolean;
}
const CardActionArea = styled(MuiCardActionArea, {
  shouldForwardProp: (prop) => prop !== "selected",
})<CardActionAreaProps>(({ selected }) => ({
  backgroundColor: selected
    ? "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))"
    : undefined,
  ".MuiCardHeader-action": {
    alignSelf: "auto",
    margin: 0,
  },
}));

const ExpandIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  ".MuiSvgIcon-root": {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.standard,
    }),
    "&.Mui-expanded": {
      transform: "rotate(180deg)",
    },
  },
}));

type CardHeaderProps = MuiCardHeaderProps & {
  selected?: boolean;
  action?: ReactNode;
  onAction?: CardActionAreaProps["onClick"];
};
function CardHeader({ selected, action, onAction, ...props }: CardHeaderProps) {
  if (onAction) {
    return (
      <CardActionArea onClick={onAction} selected={selected}>
        <MuiCardHeader {...props} sx={{ py: 1 }} action={action} />
      </CardActionArea>
    );
  }

  return <MuiCardHeader {...props} sx={{ pb: 0, pt: 1 }} />;
}

const CardContent = styled(MuiCardContent)(() => ({
  padding: 0,
  "&:last-child": {
    padding: 0,
  },
}));

type ListGroupCardProps = CardProps & {
  children: ReactNode;
  collapsible?: boolean;
  initOpen?: boolean;
  primaryText?: ListItemTextProps["primary"];
  onAction?: CardHeaderProps["onAction"];
  cardTitle?: ReactNode;
  titleTypographyProps?: CardHeaderProps["titleTypographyProps"];
  selected?: boolean;
  "list-aria-label"?: ListProps["aria-label"];
};
export default function ListGroupCard({
  children,
  collapsible = false,
  initOpen = false,
  elevation = 2,
  cardTitle,
  selected,
  titleTypographyProps,
  "list-aria-label": listAriaLabel,
  ...props
}: ListGroupCardProps) {
  const [open, setOpen] = useState(collapsible ? initOpen : true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card elevation={elevation} {...props}>
      <CardHeader
        onAction={collapsible ? handleClick : undefined}
        action={
          collapsible ? (
            <ExpandIcon>
              <ExpandMore className={open ? "Mui-expanded" : ""} />
            </ExpandIcon>
          ) : null
        }
        selected={selected}
        title={cardTitle}
        titleTypographyProps={titleTypographyProps}
      />
      <CardContent sx={{ p: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense aria-label={listAriaLabel}>
            {children}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
}
