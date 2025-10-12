import {
  Loader2Icon,
  LoaderCircleIcon,
  LoaderIcon,
  LoaderPinwheelIcon,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<"svg"> &
  LucideProps & {
    variant?:
      | "default"
      | "circle"
      | "pinwheel"
      | "circle-loader"
      | "ellipsis"
      | "ring"
      | "bars";
  };

type SpinnerVariantProps = Omit<SpinnerProps, "variant">;

function Ellipsis({ size = 24, ...props }: SpinnerVariantProps) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Loading...</title>
      <circle cx="4" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="0;ellipsis3.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis1"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="12" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="20" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis3"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
    </svg>
  );
}

function Ring({ size = 24, ...props }: SpinnerVariantProps) {
  return (
    <svg
      height={size}
      stroke="currentColor"
      viewBox="0 0 44 44"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Loading...</title>
      <g fill="none" fillRule="evenodd" strokeWidth="2">
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="0s"
            calcMode="spline"
            dur="1.8s"
            keySplines="0.165, 0.84, 0.44, 1"
            keyTimes="0; 1"
            repeatCount="indefinite"
            values="1; 20"
          />
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            calcMode="spline"
            dur="1.8s"
            keySplines="0.3, 0.61, 0.355, 1"
            keyTimes="0; 1"
            repeatCount="indefinite"
            values="1; 0"
          />
        </circle>
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="-0.9s"
            calcMode="spline"
            dur="1.8s"
            keySplines="0.165, 0.84, 0.44, 1"
            keyTimes="0; 1"
            repeatCount="indefinite"
            values="1; 20"
          />
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            calcMode="spline"
            dur="1.8s"
            keySplines="0.3, 0.61, 0.355, 1"
            keyTimes="0; 1"
            repeatCount="indefinite"
            values="1; 0"
          />
        </circle>
      </g>
    </svg>
  );
}

function Bars({ size = 24, ...props }: SpinnerVariantProps) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Loading...</title>
      <style>{`
      .spinner-bar {
        animation: spinner-bars-animation .8s linear infinite;
        animation-delay: -.8s;
      }
      .spinner-bars-2 {
        animation-delay: -.65s;
      }
      .spinner-bars-3 {
        animation-delay: -0.5s;
      }
      @keyframes spinner-bars-animation {
        0% {
          y: 1px;
          height: 22px;
        }
        93.75% {
          y: 5px;
          height: 14px;
          opacity: 0.2;
        }
      }
    `}</style>
      <rect
        className="spinner-bar"
        fill="currentColor"
        height="22"
        width="6"
        x="1"
        y="1"
      />
      <rect
        className="spinner-bar spinner-bars-2"
        fill="currentColor"
        height="22"
        width="6"
        x="9"
        y="1"
      />
      <rect
        className="spinner-bar spinner-bars-3"
        fill="currentColor"
        height="22"
        width="6"
        x="17"
        y="1"
      />
    </svg>
  );
}

function Spinner({ variant, className, ...props }: SpinnerProps) {
  switch (variant) {
    case "circle":
      return (
        <LoaderCircleIcon
          className={cn("animate-spin", className)}
          {...props}
        />
      );
    case "pinwheel":
      return (
        <LoaderPinwheelIcon
          className={cn("animate-spin", className)}
          {...props}
        />
      );
    case "circle-loader":
      return (
        <LoaderIcon className={cn("animate-spin", className)} {...props} />
      );
    case "ellipsis":
      return <Ellipsis {...props} />;
    case "ring":
      return <Ring {...props} />;
    case "bars":
      return <Bars {...props} />;
    default:
      return (
        <Loader2Icon
          role="status"
          aria-label="Loading"
          className={cn("size-4 animate-spin", className)}
          {...props}
        />
      );
  }
}

export { Spinner };
