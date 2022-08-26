import AccountCircle from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Container, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import LanguageSelect from "components/forms/LanguageSelect";
import useTranslate from "hooks/useTranslate";
import * as React from "react";

export default function MainContainer({ children }: any) {
  const t = useTranslate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ bgcolor: "transparent" }}>
          <ListAltIcon />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textTransform: "uppercase", ml: "2rem"}}
          >
            {t("TO DO LIST")}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <LanguageSelect />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          width: "90%",
          margin: "10rem auto",
          maxWidth: "calc(100vw - 240px)",
        }}
        className="w-full"
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ height: "calc(100vh - 64px)", bgColor: "#185583" }}
        >
          <Container
            className="h-full w-full"
            sx={{ maxWidth: "100% !important" }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
