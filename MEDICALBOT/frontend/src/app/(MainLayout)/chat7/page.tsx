"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

interface Message {
  sender: "user" | "chatbot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const simulateChatbotResponse = (userMessage: string) => {
    setLoading(true);
    setTimeout(() => {
      const chatbotResponse = generateChatbotResponse(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
        { sender: "chatbot", text: chatbotResponse },
      ]);
      setLoading(false);
    }, 1000);
  };

  const generateChatbotResponse = (userMessage: string) => {
    return `Lorem ipsum dolor, sit amet consectetur adipisicing elit.\n\nLaborum, asperiores? Obcaecati quas assumenda maxime optio voluptas fuga deserunt voluptatibus sapiente voluptates.\nFacilis ea a repellat magni.\n\nEaque tenetur quibusdam adipisci nisi.\nConsequuntur quos soluta, vero repellendus officiis, eius hic similique magnam asperiores dicta est! Accusantium sunt sapiente,\nadipisci quod, totam minima dolores atque error nobis nostrum, ex eos aspernatur non eligendi asperiores sint voluptas facere ipsum numquam nulla reprehenderit nam aperiam.\nAd illum ut cum ipsam non temporibus pariatur amet dignissimos voluptatum.\n\nPorro molestias esse facere asperiores rem numquam! Rem velit recusandae eaque facilis nesciunt consectetur tempore sequi repellendus dolore! Consequuntur,\n1. ratione vitae! Neque assumenda facilis exercitationem quod,\n2. eveniet sit praesentium,\n3. **omnis**,\n4. quam architecto quos voluptate illum cupiditate aspernatur laudantium eius natus rerum.\n\`\`\`Magnam quis autem voluptatum fuga temporibus nulla voluptate totam, accusamus praesentium maxime, assumenda ipsum tempore culpa facere.\`\`\`\nSit vitae rerum repudiandae nemo accusamus veniam.\n### Blanditiis natus\n- ducimus laboriosam saepe\n- molestias commodi necessitatibus molestiae,\n- veniam nihil qui culpa dolores assumenda minus?\nAccusamus ipsum quia pariatur animi optio quisquam minus assumenda voluptate id, unde inventore esse, nulla quas fugiat doloribus eaque illum numquam aspernatur iure doloremque autem.\n\nVero ea, sint facere repellat itaque odio veniam nisi consectetur eos iusto dolorem quis ex voluptatum! Neque velit deleniti doloremque.\n\nNesciunt aut qui aperiam voluptates laborum sapiente illo accusamus eveniet repellat, ea rem excepturi aliquam nemo! Ratione, aliquam.\nOmnis a at, architecto culpa ipsam modi quam nostrum sapiente atque eum ex voluptatum eligendi, odit velit aliquid! Natus distinctio sunt a?\nVeniam consequuntur voluptas minima libero aperiam earum adipisci, doloribus maxime odit explicabo? Nulla, eos voluptatem architecto labore eaque necessitatibus mollitia asperiores, neque sed quam deleniti cumque adipisci ratione, recusandae temporibus eius natus doloribus aut.\nEst quaerat esse quidem animi at, pariatur neque iure quasi libero ullam odio velit in eum voluptatum ex dolorem cumque sequi dolore accusantium quam.\nEveniet provident maxime deserunt iusto illo pariatur at nostrum autem ipsum, recusandae, laudantium minus eaque.\n\nQuaerat quisquam, molestias ipsa inventore commodi exercitationem sunt doloremque mollitia?\nCulpa impedit iusto aut fuga, vitae iure minus beatae voluptates eligendi! Alias sequi, delectus modi dolorem vel veritatis, aliquam assumenda ratione commodi officiis numquam fuga reiciendis similique qui officia?\nQuos rerum est corporis repudiandae vel dolor quis iure, possimus et quasi consectetur?\nCorporis, eos perspiciatis accusamus omnis dicta amet! Doloribus, laborum totam ea aliquam enim, reprehenderit maiores recusandae omnis consequuntur natus obcaecati neque possimus repellat rerum suscipit molestiae nobis cumque excepturi.\nCupiditate, ex voluptas! Quisquam, obcaecati aut.\n\nMollitia, vitae? Dicta totam numquam facere porro culpa? Cumque expedita autem et accusantium eius sed ipsa quisquam voluptates deleniti iste.\nConsectetur magni repellat fugiat ipsa sunt facilis quibusdam officia minus earum nisi, doloribus explicabo molestias odit iure, voluptates quos, nihil velit dolores blanditiis expedita! Aperiam numquam aut, et iste ducimus eligendi illum cum quisquam, assumenda voluptatum esse animi dignissimos sunt quaerat.\nVitae dolorum esse tempora nesciunt iure cumque, animi, consectetur velit nobis deserunt dolorem quos blanditiis inventore magni tenetur! Reiciendis maiores dolore explicabo aliquam, officia eius laborum recusandae voluptatem culpa provident eveniet!`;
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
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
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
                backgroundColor: "#FFFFFF66",
                boxShadow: 0,
                padding: "0px 15px",
                borderRadius: "14px",
                marginLeft: msg.sender === "user" ? 2 : 0,
                marginRight: msg.sender === "chatbot" ? 2 : 0,
              }}
            >
              <CardContent>{renderTextMessage(msg.text)}</CardContent>
            </Card>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Box sx={{ padding: 2 }}>
        <UserInput simulateChatbotResponse={simulateChatbotResponse} />
      </Box>
    </Box>
  );
};

interface UserInputProps {
  simulateChatbotResponse: (message: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ simulateChatbotResponse }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      simulateChatbotResponse(input);
      setInput("");
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        sx={{ marginRight: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        disabled={!input.trim()}
      >
        Send
      </Button>
    </Box>
  );
};

export default Chatbot;
