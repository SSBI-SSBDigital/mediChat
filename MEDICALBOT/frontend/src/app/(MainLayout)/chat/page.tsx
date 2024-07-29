import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { IconPaperclip, IconSend } from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          overflow: "auto",
          height: "calc(100vh - 140px)",
          padding: "10px",
          position: "relative",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        dolorum deleniti officiis adipisci veritatis! Molestiae quia vero
        soluta, praesentium a vel assumenda ipsa ullam distinctio sunt unde
        aliquam doloremque suscipit. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Praesentium dolorum deleniti officiis adipisci
        veritatis! Molestiae quia vero soluta, praesentium a vel assumenda ipsa
        ullam distinctio sunt unde aliquam doloremque suscipit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Praesentium dolorum
        deleniti officiis adipisci veritatis! Molestiae quia vero soluta,
        praesentium a vel assumenda ipsa ullam distinctio sunt unde aliquam
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "30px",
          width: "min(800px, 95%)",
          margin: "auto",
        }}
      >
        <TextField
          placeholder="Enter your message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <IconPaperclip />
                </IconButton>
                <IconButton>
                  <IconSend />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: "100%", height: "40px", borderRadius: "20px" }}
        />
      </Box>
    </>
  );
}
