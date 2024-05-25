import Box from "@mui/material/Box";
import ThemeWrap from "src/components/ThemeWrap";
import Settings from "./Settings";
import Header from "./layout/Header";

export default function App() {
  return (
    <ThemeWrap>
      <Box>
        <Header />
        <Settings />
      </Box>
    </ThemeWrap>
  );
}
