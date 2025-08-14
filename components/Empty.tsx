import { Air } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Empty({ children, message }: PropsWithChildren<{ message?: string }>) {
  return (
    <div className="flex size-full grow items-center justify-center gap-4 p-4">
      <div className="flex flex-row items-center gap-2 p-4">
        <Air color="disabled" />
        <Typography color="textSecondary"> {message}</Typography>
      </div>
      {children}
    </div>
  );
}
