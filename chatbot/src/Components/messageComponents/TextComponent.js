import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const BotMessage = styled(Box)(({ theme }) => ({
    backgroundColor: '#f1f0f0',
    color: '#333',
    borderRadius: '10px 10px 10px 0',
    padding: '10px',
    maxWidth: '60%',
    margin: '10px 0',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
}));

const HumanMessage = styled(Box)(({ theme }) => ({
    backgroundColor: '#dcf8c6',
    color: '#075e54',
    borderRadius: '10px 10px 0 10px',
    padding: '10px',
    maxWidth: '60%',
    margin: '10px 0',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
}));

const MessageTime = styled(Typography)(({ theme }) => ({
    fontSize: '11px',
    color: '#888',
    textAlign: 'right',
    marginTop: '5px',
}));

const TextComponent = ({ message, time, from }) => {
    return (
        <Box
            display="flex"
            justifyContent={from === 'bot' ? 'flex-start' : 'flex-end'}  // Align messages left for bot, right for human
        >
            {from === 'bot' ? (
                <BotMessage>
                    <Typography variant="body2">{message}</Typography>
                    <MessageTime variant="caption">{time}</MessageTime>
                </BotMessage>
            ) : (
                <HumanMessage>
                    <Typography variant="body2">{message}</Typography>
                    <MessageTime variant="caption">{time}</MessageTime>
                </HumanMessage>
            )}
        </Box>
    );
};

export default TextComponent;
