import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface TooltipButtonProps extends React.ComponentProps<typeof Button> {
  tooltip: string;
}

export function TooltipButton({
  children,
  tooltip,
  variant,
  size,
  className,
  ...props
}: TooltipButtonProps) {
  if (props.disabled) {
    return (
      <Button
        disabled
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
