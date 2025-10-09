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
          "text-primary/80 hover:text-accent focus-visible:outline-ring/50",
        primary:
          "text-primary/80 hover:text-primary focus-visible:outline-primary/50",
        destructive:
          "text-destructive/80 hover:text-destructive focus-visible:outline-destructive/50",
        accent:
          "text-accent/80 hover:text-accent focus-visible:outline-accent/50",
        secondary:
          "text-secondary/80 hover:text-secondary focus-visible:outline-secondary/50",
        muted:
          "text-muted-foreground/80 hover:text-muted-foreground focus-visible:outline-muted-foreground/50",
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
