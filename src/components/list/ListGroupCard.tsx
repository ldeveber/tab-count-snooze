import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import MuiCard, { type CardProps } from "@mui/material/Card";
import MuiCardActionArea, { type CardActionAreaProps } from "@mui/material/CardActionArea";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardHeader, {
  type CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { ListItemTextProps } from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { ReactNode, useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
}));

const CardActionArea = styled(MuiCardActionArea)(() => ({
  borderRadius: 22,
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
  action?: ReactNode;
  onAction?: CardActionAreaProps["onClick"];
};
function CardHeader({ action, onAction, ...props }: CardHeaderProps) {
  if (onAction) {
    return (
      <CardActionArea onClick={onAction}>
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
};
export default function ListGroupCard({
  children,
  collapsible = false,
  initOpen = false,
  elevation = 2,
  cardTitle,
  titleTypographyProps,
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
        title={cardTitle}
        titleTypographyProps={titleTypographyProps}
      />
      <CardContent sx={{ p: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense sx={{ p: 0.5 }}>
            {children}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
}
