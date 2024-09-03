import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

interface TooltipButtonProps extends IconButtonProps {
  tooltip: TooltipProps["title"];
}
export default function TooltipButton({ tooltip, ...props }: TooltipButtonProps) {
  if (props.disabled) {
    return <IconButton color="inherit" size="small" {...props} />;
  }
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" size="small" {...props} />
    </Tooltip>
  );
}
