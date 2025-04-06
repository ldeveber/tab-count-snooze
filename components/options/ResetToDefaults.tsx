import Button from "@mui/material/Button";

export default function ResetToDefaults() {
  const handleClick = () => {
    void browser.storage.sync.clear();
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Reset to Defaults
    </Button>
  );
}
