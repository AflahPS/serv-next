import React, { useState } from "react";
import {
  ExitToAppOutlined,
  HomeOutlined,
  Mail,
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
  Typography,
  styled,
} from "@mui/material";
import { COLOR } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth.slice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "black",
  color: COLOR["H1d-ui-primary"],
});

const SearchContainer = styled("div")(({ theme }) => ({
  backgroundColor: COLOR["H1d-ui-secondary"],
  color: COLOR["H1d-font-primary"],
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
  height: "36px",
}));
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
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
          HireOne
        </Typography>
        <Tag sx={{ display: { xs: "block", md: "none" } }} />
        <SearchContainer>
          <InputBase sx={{ color: "inherit" }} placeholder="search..." />
        </SearchContainer>
        <IconsContainer>
          <HomeOutlined />
          <PersonAddAlt1Outlined />
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          {isAuth && (
            <IconButton
              onClick={handleSignout}
              sx={{ color: COLOR["H1d-ui-primary"] }}
            >
              <ExitToAppOutlined />
            </IconButton>
          )}
          <Avatar
            sx={{ width: "32px", height: "32px" }}
            src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </IconsContainer>

        <UserBox onClick={(e) => setOpenAnchor(true)}>
          <Avatar
            sx={{ width: "32px", height: "32px" }}
            src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </UserBox>
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
        {isAuth && (
          <MenuItem
            onClick={handleSignout}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ExitToAppOutlined />
            <Typography variant="h6">Sign Out</Typography>
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
};
