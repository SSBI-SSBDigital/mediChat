// import styles from "./page.module.css";
// export default function Home() {
//   return <main className={styles.main}>page 11</main>;
// }
"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  IconButton,
  Chip,
  FormControl,
  MenuItem,
} from "@mui/material";
import { IconPaperclip, IconSend } from "@tabler/icons-react";
import shortenFileName from "@/hooks/shortenFileName";
import axios from "axios";
import PDFPreview from "./PdfView";

interface Message {
  sender: "user" | "chatbot";
  text: string;
  report?: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const simulateChatbotResponse = async (
    userMessage: string,
    reportFile: File | null,
    language: string
  ) => {
    setLoading(true);

    if (!userMessage || !reportFile || !language) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (reportFile) {
      formData.append("file", reportFile);
    }
    formData.append("question", userMessage);
    formData.append("language", language);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        formData
      );
      // const response = await axios.post(
      //   `http://127.0.0.1:5000/analyze`,
      //   formData
      // );

      const chatbotResponse = response.data.response;
      const fileLink = response.data.download_link;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
        { sender: "chatbot", text: chatbotResponse, report: fileLink },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTextMessage = (text: string) => {
    const parts = text.split(/\n\n(?=\s*[-*\d])/);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 1,
              borderRadius: 1,
              marginTop: 1,
            }}
          >
            <Typography component="pre" style={{ whiteSpace: "pre-wrap" }}>
              {part.slice(3, -3)}
            </Typography>
          </Box>
        );
      } else if (part.startsWith("### ")) {
        return (
          <Typography
            key={index}
            variant="h5"
            style={{ marginTop: index > 0 ? 1 : 0 }}
          >
            {part.slice(4)}
          </Typography>
        );
      } else if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <Typography
            key={index}
            style={{ fontWeight: "bold", marginTop: index > 0 ? 1 : 0 }}
          >
            {part.slice(2, -2)}
          </Typography>
        );
      } else if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <Typography
            key={index}
            style={{ fontStyle: "italic", marginTop: index > 0 ? 1 : 0 }}
          >
            {part.slice(1, -1)}
          </Typography>
        );
      } else if (part.startsWith("__") && part.endsWith("__")) {
        return (
          <Typography
            key={index}
            style={{
              textDecoration: "underline",
              marginTop: index > 0 ? 1 : 0,
            }}
          >
            {part.slice(2, -2)}
          </Typography>
        );
      } else if (part.startsWith("1. ") || part.startsWith("- ")) {
        return (
          <ul key={index} style={{ marginTop: index > 0 ? 1 : 0 }}>
            {part.split(/\n(?=\s*[-*\d])/).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      } else if (part.startsWith("\t")) {
        return (
          <Typography
            key={index}
            style={{ marginLeft: 20, marginTop: index > 0 ? 1 : 0 }}
          >
            {part.trim()}
          </Typography>
        );
      } else {
        return (
          <Typography
            key={index}
            style={{ whiteSpace: "pre-wrap", marginTop: index > 0 ? 1 : 0 }}
          >
            {part}
          </Typography>
        );
      }
    });
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        marginTop: "55px",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              marginBottom: 2,
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.sender === "chatbot" && (
              <Avatar sx={{ marginRight: 1 }}>🤖</Avatar>
            )}
            <Card
              sx={{
                maxWidth: "80%",
                width: "fit-content",
                minWidth: "200px",
                backgroundColor: "#EEEEEE55",
                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 1px 0px inset",
                padding: "0px 15px",
                borderRadius: "14px",
                marginLeft: msg.sender === "user" ? 2 : 0,
                marginRight: msg.sender === "chatbot" ? 2 : 0,
              }}
            >
              <CardContent>{renderTextMessage(msg.text)}</CardContent>
              {!!msg.report && <PDFPreview url={msg?.report || ""} />}
            </Card>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Box sx={{ padding: 1 }}>
        <UserInput simulateChatbotResponse={simulateChatbotResponse} />
      </Box>
    </Box>
  );
};

interface UserInputProps {
  simulateChatbotResponse: (
    message: string,
    file: File | null,
    lang: string
  ) => void;
}

const UserInput: React.FC<UserInputProps> = ({ simulateChatbotResponse }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = () => {
    if (!file) {
      alert("Please select a file");
    }

    if (input.trim()) {
      simulateChatbotResponse(input, file, language);
      setInput("");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      width="100%"
    >
      <label htmlFor="report_file">
        <IconButton
          sx={{
            marginRight: 1,
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.2)" },
            "&:disabled": { backgroundColor: "rgba(0, 0, 255, 0.1)" },
          }}
          onClick={() => fileInputRef.current?.click()}
          disabled={!!fileName}
        >
          <IconPaperclip color={!fileName ? "#252525" : "#BBBBBB"} />
        </IconButton>
        <input
          disabled={!!fileName}
          id="report_file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      <Box sx={{ maxWidth: 600, width: "100%", marginRight: 1 }}>
        <Box display="flex" alignItems="center">
          {!!fileName && (
            <Chip
              label={shortenFileName(fileName) || ""}
              onDelete={handleRemoveFile}
            />
          )}
          <FormControl
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "15px",
            }}
          >
            <label htmlFor="language-select-label">Language :</label>
            <TextField
              fullWidth
              select
              variant="outlined"
              value={language}
              size="small"
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                marginTop: "6px",
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "35px",
                },
              }}
            >
              <MenuItem value="gu">Gujarati</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </TextField>
          </FormControl>
        </Box>
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          value={input}
          size="small"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          multiline
          minRows={1}
          sx={{
            marginTop: 1,
            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
          }}
        />
      </Box>
      <IconButton
        sx={{
          marginLeft: 1,
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.2)" },
          "&:disabled": { backgroundColor: "rgba(0, 0, 255, 0.1)" },
        }}
        onClick={handleSendMessage}
        disabled={!input.trim()}
      >
        <IconSend color="#252525" />
      </IconButton>
    </Box>
  );
};

export default Chatbot;
