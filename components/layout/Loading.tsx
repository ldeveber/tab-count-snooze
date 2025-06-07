import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <CircularProgress />
    </div>
  );
}
