import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconChevronLeft, IconPencilPlus } from "@tabler/icons-react";
import { Box, Typography } from "@mui/material";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const Sidebar = ({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        margin: "10px",
        "& .MuiDrawer-paper": {
          height: "calc(100vh - 30px) !important",
          width: drawerWidth,
          margin: "10px",
          borderRadius: "10px",
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
          top: "0",
          backdropFilter: "blur(3px)",
          // backgroundColor: "#ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9,
        }}
      >
        <Box />
        <Box />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 1, ...(!open && { display: "none" }), fontWeight: 600 }}
        >
          Madical Chatbot
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <IconChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["New chat"].map((text, index) => (
          <ListItem key={text} sx={{ padding: "5px 8px", borderRadius: "8px" }}>
            <ListItemButton>
              <ListItemIcon>
                <IconPencilPlus />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
