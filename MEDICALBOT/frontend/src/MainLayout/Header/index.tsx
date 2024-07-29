import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IconMenu } from "@/SvgIcon";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import { Box } from "@mui/material";
import Profile from "./Profile";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // borderRadius: "10px",
  // margin: "10px",
  right: "initial",
  width: `calc(100% - 0px)`,
  height: "50px",
  //   background: "tran !important",
  background: "transparent !important",
  color: "#FFFFFF !important",
  //   color: "#000000 !important",
  boxShadow: "none",
  ...(open && {
    width: `calc(100% - ${drawerWidth + 20}px)`,
    marginLeft: `${drawerWidth + 20}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({
  open,
  handleDrawerOpen,
}: {
  open: boolean;
  handleDrawerOpen: () => void;
}) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ minHeight: "50px" }} variant="dense">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          <IconMenu />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          Madical Chatbot
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <SearchBar /> */}
        {/* <Notification /> */}
        <Profile />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
