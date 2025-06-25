import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";

import Link from "next/link";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { logout } from "@/Toolkit/authSlice";
import { profile_pic } from "@/Api/Axios/Axios";
const pages = ["list", "Create"];

const settings = ["login", "Register", "profile"];

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  // const [mount, setMount] = useState(false);

  const cookie = new Cookies();
  useEffect(() => {
    setToken(cookie.get("token"));
    setImage(cookie.get("profile_pic"));
    setFirstName(cookie.get("first_name"));
    // router.reload()
    // setMount(true)
  }, [cookie]);

  // const token = cookie.get("token");
  // const firstName = cookie.get("first_name");
  // const image = cookie.get("profile_pic");

  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //React.MouseEvent<HTMLInputElement>
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const HandleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };
  console.log(token);
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#E6B9A6", elevation: 1, color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { lg: "flex", md: "flex", xs: "none" },
            }}
          >
            <Typography
              variant="h4"
              noWrap
              style={{
                // mr: 2,
                // fontFamily: "monospace",
                fontWeight: 300,
                letterSpacing: ".3rem",
                textDecoration: "none",
                // marginTop:"30px"
              }}
            >
              <Link style={{color:"white"}} href={`/`}>BookOholics</Link>
            </Typography>
          </Box>

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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" style={{ color: "black" }} >
                    <Link
                      href={`/cms/${page.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black", display: "block", marginRight: 5 }}
            >
              <Link
                href={`/cms/create`}
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Your Booklist
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black", display: "block", marginLeft: 5 }}
            >
              <Link
                href={`/cms/list`}
                style={{ textDecoration: "none", color: "black" }}
              >
                Your Booklist
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {token ? (
                  <>
                    <div>
                      <span style={{ marginRight: "20px" }}>
                        <b>{firstName}</b>
                      </span>
                    </div>
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "100%",
                      }}
                      src={profile_pic(image)}
                    />
                  </>
                ) : (
                  <>
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "100%",
                      }}
                      src="data:image/jpeg;base64,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"
                    />
                  </>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings?.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      href={`/auth/${setting.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "Red" }}
                    >
                      {setting === "login" ? (
                        token ? (
                          <Button onClick={HandleLogout}>Logout</Button>
                        ) : (
                          <Button>Login</Button>
                        )
                      ) : (
                        <Button>{setting}</Button>
                      )}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
