import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CheckOutlined, ClearOutlined } from "@mui/icons-material";
import { LinkButton, SearchContainer, TabHeader } from "../../ui";
import { USERS } from "../../constants";

export const Friends = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ boxShadow: 8, borderRadius: 3 }}>
      <TabHeader header="Friends" />
      <SearchContainer marginBottom={3}>
        <InputBase fullWidth placeholder="Search friends.." />
      </SearchContainer>
      <Grid color={"white"} container spacing={{ xs: 1, md: 2, lg: 3 }}>
        {USERS.map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            height={200}
            justifyContent={"center"}
            key={index}
          >
            <Card sx={{ display: "flex", height: "100%", borderRadius: 3 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "35%",
                  objectFit: "cover",
                }}
                image={_.image}
                alt="Live from space album cover"
              />
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="div" variant="h6">
                  {_.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  95 Friends
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  12 Mutual Friends
                </Typography>
                <LinkButton
                  variant="outlined"
                  id={`follow-button-${index}`}
                  startIcon={<CheckOutlined color="success" />}
                  onClick={handleMenuClick}
                >
                  Following
                </LinkButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": `follow-button-${index}`,
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ClearOutlined color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Unfollow</ListItemText>
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
