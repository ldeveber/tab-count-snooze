import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";

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
