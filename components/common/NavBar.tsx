import React, { useState } from "react";
import {
  ExitToAppOutlined,
  HomeOutlined,
  LoginOutlined,
  Mail,
  MenuOpenOutlined,
  MenuOutlined,
  Notifications,
  PersonAddAlt1Outlined,
  Tag,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { COLOR } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth.slice";
import Link from "next/link";
import { roleActions } from "../../store/role.slice";
import { jwtActions } from "../../store/jwt.slice";
import { SearchContainer } from "../../ui";
import { userDataActions } from "../../store/user-data.slice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "black",
  color: COLOR["H1d-ui-primary"],
  width: "100%",
});

const IconsContainer = styled("div")(({ theme }) => ({
  display: "none",
  cursor: "pointer",
  gap: "32px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  cursor: "pointer",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const NavBar = () => {
  const [openAnchor, setOpenAnchor] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector((state: any) => state?.auth?.isAuth);

  const handleMenuClick = () => {
    setOpenAnchor(false);
  };

  const handleSignout = () => {
    setOpenAnchor(false);
    dispatch(authActions.logout());
    dispatch(roleActions.guest());
    dispatch(jwtActions.setToken(null));
    dispatch(userDataActions.removeUserData());
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
          <Link href={"/"}>HireOne</Link>
        </Typography>
        <Tag sx={{ display: { xs: "block", md: "none" } }} />
        <SearchContainer>
          <InputBase
            fullWidth
            sx={{ color: "inherit" }}
            placeholder="search..."
          />
        </SearchContainer>
        <IconsContainer>
          {isAuth && (
            <>
              <Tooltip title="Home" placement="bottom">
                <HomeOutlined />
              </Tooltip>
              <Tooltip title="Requests" placement="bottom">
                <PersonAddAlt1Outlined />
              </Tooltip>
              <Tooltip title="Notifications" placement="bottom">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </Tooltip>
              <Tooltip title="Messages" placement="bottom">
                <Badge badgeContent={4} color="error">
                  <Mail />
                </Badge>
              </Tooltip>
              <Tooltip title="Sign Out" placement="bottom">
                <IconButton
                  onClick={handleSignout}
                  sx={{ color: COLOR["H1d-ui-primary"] }}
                >
                  <ExitToAppOutlined />
                </IconButton>
              </Tooltip>

              <Avatar
                sx={{ width: "32px", height: "32px" }}
                // src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </>
          )}
          {!isAuth && (
            <Tooltip title="Sign In" placement="bottom">
              <Link href={"/auth/signin"}>
                <LoginOutlined />
              </Link>
            </Tooltip>
          )}
        </IconsContainer>

        {!isAuth && (
          <UserBox>
            <Tooltip title="Sign In" placement="bottom">
              <Link href={"/auth/signin"}>
                <LoginOutlined />
              </Link>
            </Tooltip>
          </UserBox>
        )}

        {isAuth && (
          <UserBox onClick={(e) => setOpenAnchor(true)}>
            <Avatar
              sx={{ width: "32px", height: "32px" }}
              // src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </UserBox>
        )}
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={openAnchor}
        onClose={(e) => setOpenAnchor(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleMenuClick}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <HomeOutlined />
          <Typography variant="h6">Home</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClick}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <VerifiedUserOutlined />
          <Typography variant="h6">Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClick}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <PersonAddAlt1Outlined />
          <Typography variant="h6">Requests</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClick}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Notifications />
          <Typography variant="h6">Notifications</Typography>
        </MenuItem>

        <MenuItem
          onClick={handleSignout}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ExitToAppOutlined />
          <Typography variant="h6">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
