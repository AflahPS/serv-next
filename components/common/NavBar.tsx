import React, { useContext, useEffect, useState } from "react";
import {
  ExitToAppOutlined,
  HomeOutlined,
  LoginOutlined,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { ANCHOR_MENU, COLOR, USERS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth.slice";
import Link from "next/link";
import { roleActions } from "../../store/role.slice";
import { jwtActions } from "../../store/jwt.slice";
import { SearchContainer, SearchList } from "../../ui";
import { userDataActions } from "../../store/user-data.slice";
import { StoreState } from "../../store/store";
import { useRouter } from "next/router";
import { doSearch } from "../../APIs";
import { notifierActions } from "../../store/notifier.slice";
import { socketActions } from "../../store/socket.slice";
import { SocketContext } from "../../utils";

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
  const isAuth: boolean = useSelector(
    (state: StoreState) => state.auth?.isAuth
  );
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const { socket } = useContext(SocketContext);

  const handleMenuClick = (route: string) => {
    setOpenAnchor(false);
    router.push(route);
  };

  const handleSignout = () => {
    setOpenAnchor(false);
    dispatch(authActions.logout());
    dispatch(roleActions.guest());
    dispatch(jwtActions.setToken(null));
    dispatch(userDataActions.removeUserData());
    dispatch(notifierActions.info("Logged out successfully !"));
    socket?.disconnect();
    localStorage.removeItem("token");
    dispatch(socketActions.removeSocket());
    if (["admin", "super-admin"].some((r) => r === role)) {
      return router.push("/admin/auth/signin");
    }
    router.push("/auth/signin");
  };

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await doSearch(searchText);
      if (!results) {
        setShowList(false);
        return;
      }
      setSearchResults(results?.users);
      setShowList(true);
    } catch (err: any) {
      setShowList(false);
      console.error(err.message);
      return;
    }
  };

  const router = useRouter();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
          <Link href={"/"}>HireOne</Link>
        </Typography>
        <Tag sx={{ display: { xs: "block", md: "none" } }} />

        <SearchContainer
          onClick={() => {
            setShowList(false);
          }}
          // onBlur={() => {
          //   setShowList(false);
          // }}
        >
          <InputBase
            fullWidth
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
            sx={{ color: "inherit" }}
            placeholder="Search..."
          />
          {showList && (
            <SearchList
              Positions={{ top: "36px", left: "0" }}
              results={searchResults}
            />
          )}
        </SearchContainer>

        <IconsContainer>
          {isAuth && (
            <>
              <Tooltip title="Home" placement="bottom">
                <HomeOutlined />
              </Tooltip>
              {/* <Tooltip title="Requests" placement="bottom">
                <PersonAddAlt1Outlined />
              </Tooltip> */}
              {/* <Tooltip title="Notifications" placement="bottom">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </Tooltip>
              <Tooltip title="Messages" placement="bottom">
                <Badge badgeContent={4} color="error">
                  <Mail />
                </Badge>
              </Tooltip> */}
              <Tooltip title="Sign Out" placement="bottom">
                <IconButton
                  onClick={handleSignout}
                  sx={{ color: COLOR["H1d-ui-primary"] }}
                >
                  <ExitToAppOutlined />
                </IconButton>
              </Tooltip>

              <IconButton
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <Avatar
                  sx={{ width: "32px", height: "32px" }}
                  src={currentUser?.image}
                />
              </IconButton>
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
              src={currentUser?.image || currentUser.name}
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
        {ANCHOR_MENU.map((item) => {
          const Icon = item.icon;
          return (
            <MenuItem
              key={item.title}
              onClick={() => {
                item.route ? handleMenuClick(item.route) : handleSignout();
              }}
              sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
            >
              <Typography variant="subtitle1">{item.title}</Typography>
              <Icon />
            </MenuItem>
          );
        })}
      </Menu>
    </AppBar>
  );
};
