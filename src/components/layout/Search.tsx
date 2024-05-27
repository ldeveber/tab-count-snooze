import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import MuiFilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { ChangeEventHandler } from "react";

const FilledInput = styled(MuiFilledInput)(({ theme }) => ({
  borderRadius: 28,
  "& .MuiFilledInput-input": {
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      flexGrow: 1,
    },
  },
  "&::before": {
    border: "none",
  },
  "&::after": {
    border: "none",
  },
  "&:hover:not(.Mui-disabled, .Mui-error)": {
    "&::before": {
      border: "none",
    },
    "&::after": {
      border: "none",
    },
  },
  "&.MuiFocused": {
    "&::before": {
      border: "none",
    },
    "&::after": {
      border: "none",
    },
  },
}));

export default function Search({
  value: search,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    onChange(value);
  };
  const clearSearch = () => onChange("");

  return (
    <FilledInput
      hiddenLabel
      size="small"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      }
      endAdornment={
        search.length > 0 ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={clearSearch} aria-label="Clear">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      inputProps={{ "aria-label": "Search" }}
    />
  );
}
