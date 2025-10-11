import { cva, type VariantProps } from "class-variance-authority";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "shrink-0 underline-offset-4 transition-all hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-1 [&_svg:not([class*='align-'])]:align-baseline [&_svg:not([class*='size-'])]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-primary hover:text-primary/80 focus-visible:outline-ring/50",
        destructive:
          "text-destructive hover:text-destructive/80 focus-visible:outline-destructive/50",
        accent:
          "text-accent hover:text-accent/80 focus-visible:outline-accent/50",
        secondary:
          "text-secondary hover:text-secondary/80 focus-visible:outline-secondary/50",
        muted:
          "text-muted-foreground hover:text-muted-foreground/80 focus-visible:outline-muted-foreground/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Link({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof linkVariants>) {
  return (
    <a className={cn(linkVariants({ variant, className }))} {...props}>
      {children}
      {props.target === "_blank" && (
        <span
          className="ml-1 inline-flex items-center"
          aria-label="Opens in a new tab"
          role="img"
        >
          <SquareArrowOutUpRightIcon className="size-[0.75em]" />
          <span className="sr-only">Opens in a new tab</span>
        </span>
      )}
    </a>
  );
}

export { Link, linkVariants };
