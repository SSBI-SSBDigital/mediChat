"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  InputBase,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarLeftCollapseFilled,
  IconPencilPlus,
} from "@tabler/icons-react";
import { IconProfile, IconSearch } from "@/SvgIcon";

// Constants
const drawerWidth = 240;

// Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.black, 0.25) },
  marginLeft: 0,
  width: "100%",
  height: "35px",
  // color: "#FFFFFF",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "5px 3px",
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  top: "20px",
  right: "initial",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px !important",
  width: `calc(100% - 20px)`,
  height: "55px",
  background: "transparent !important",
  color: "#000000 !important",
  ...(open && {
    width: `calc(100% - ${drawerWidth + 20}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#fff",
  margin: "20px",
  marginLeft: `-${drawerWidth}px`,
  borderRadius: "14px",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Main Layout Component
const ChatLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        display: "flex",
        background: "#000000",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: "calc(100vh) !important",
            background: "#000000",
            color: "#ffffff",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            position: "sticky",
            top: "20px",
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#ffffff",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mx: 1, ...(!open && { display: "none" }), fontWeight: 600 }}
          >
            Medical Chatbot
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <IconLayoutSidebarLeftCollapseFilled color="#FFFFFF" />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ my: "10px" }} />
        <List>
          <ListItem sx={{ padding: "5px 8px", borderRadius: "8px" }}>
            <ListItemButton>
              <ListItemIcon>
                <IconPencilPlus color="#FFFFFF" />
              </ListItemIcon>
              <ListItemText primary="New chat" />
            </ListItemButton>
          </ListItem>
          {/* {["New chat"].map((text, index) => (
            <ListItem
              key={text + index}
              sx={{ padding: "5px 8px", borderRadius: "8px" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <IconPencilPlus color="#FFFFFF" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Main open={open}>
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ minHeight: "50px" }} variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 1, ...(open && { display: "none" }) }}
            >
              <IconLayoutSidebarLeftExpandFilled />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 1, ...(open && { display: "none" }) }}
            >
              Medical Chatbot
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <IconSearch size="18" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ display: "flex" }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ background: "#ffffff55 !important" }}
              >
                <IconProfile size="22" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <>{children}</>
      </Main>
      {renderMenu}
    </Box>
  );
};

export default ChatLayout;
