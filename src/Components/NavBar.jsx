import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "../ComponentStyle/AppBar.css";
import UserOptions from "./common/UserOptions";

import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  const pages = [
    { label: "Movies", to: "/movies" },
    { label: "Users", to: "/users" },
    { label: "Rentals", to: "/rentals" },
    { label: "Genres", to: "/genres" },
    { label: "Register", to: "/register-form",},
  ];

  const settings = [
    { label: user ? user.name : "", to: "/me", condition: user },
    { label: "Logout", to: "/logout", condition: user },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="myAppBar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VIDLY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => {
                const shouldRender =
                  page.condition === undefined || page.condition;

                if (shouldRender) {
                  return (
                    <NavLink
                      key={`nav-link-${index}`}
                      className="nav-page"
                      aria-current="page"
                      to={page.to}
                    >
                      <MenuItem
                        key={`menu-item-${index}`}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page.label}</Typography>
                      </MenuItem>
                    </NavLink>
                  );
                }

                return null;
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VIDLY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((link, index) =>
              link?.condition === undefined || link.condition ? (
                <NavLink
                  key={index}
                  className="nav-link"
                  aria-current="page"
                  to={link.to}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {link.label}
                  </Button>
                </NavLink>
              ) : null
            )}
          </Box>

          {user && <UserOptions user={user} settings={settings} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
