import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const BotMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--bot-text-background-color)",
  color:'var(--bot-text-color)',
  borderRadius: "10px 10px 10px 0",
  padding: "10px",
  maxWidth: "60%",
  margin: "10px 0",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
}));

const HumanMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--bot-human-background-color)",
  color: "var(--bot-human-text-color)",
  borderRadius: "10px 10px 0 10px",
  padding: "10px",
  maxWidth: "60%",
  margin: "10px 0",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "var(--text-color)",
  textAlign: "right",
  marginTop: "5px",
}));

const TextComponent = ({ message, time, from }) => {
  return (
    <Box
      display="flex"
      justifyContent={from === "bot" ? "flex-start" : "flex-end"} // Align messages left for bot, right for human
    >
      {from === "bot" ? (
        <BotMessage>
          <Typography variant="body2">{message}</Typography>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MessageTime variant="caption">{time}</MessageTime>
            </Box>
          </Box>
        </BotMessage>
      ) : (
        <HumanMessage>
          <Typography variant="body2">{message}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MessageTime variant="caption" sx={{color:'#111 !important'}}>{time}</MessageTime>
          </Box>
        </HumanMessage>
      )}
    </Box>
  );
};

export default TextComponent;
