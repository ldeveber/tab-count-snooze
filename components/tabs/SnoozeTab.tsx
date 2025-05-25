import { CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default function SnoozeTab() {
  return <div className="grow">Snooze Functionality Coming Soon</div>;
}
