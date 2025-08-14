import { Search as SearchIcon } from "@mui/icons-material";
import { InputAdornment, TextField as MuiTextField, TextFieldProps, styled } from "@mui/material";
import { ChangeEventHandler } from "react";

const TextField = styled(MuiTextField)(({ theme }) => ({
  width: "100%",
  ".MuiFormLabel-root": {
    display: "none",
  },
  ".MuiInputBase-root.MuiFilledInput-root": {
    borderRadius: 28,
    width: 250,
    transition: theme.transitions.create(["width"], {
      duration: theme.transitions.duration.standard,
    }),
    "&.Mui-focused": {
      width: "100%",
    },
  },
}));

interface SearchProps extends Omit<TextFieldProps, "onChange" | "value" | "sx"> {
  readonly value: string;
  onChange: (value: string) => void;
}

export default function Search({ onChange, label, ...props }: SearchProps) {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    onChange(value);
  };
  return (
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      placeholder="Search..."
      type="search"
      label={label}
      {...props}
      onChange={handleSearch}
      slotProps={{
        input: {
          "aria-label": typeof label === "string" ? label : "Search",
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
