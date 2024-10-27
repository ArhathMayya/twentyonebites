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


export const DisplayIndividualOrder = ({food, Quantity}) => {
    return (
        <Box
            display="flex"
            // justifyContent={from === 'bot' ? 'flex-start' : 'flex-end'}  // Align messages left for bot, right for human
        >
           
                <BotMessage>
                    <Typography variant="body2">{food}</Typography>
                    <Typography variant="body2">Qunatity: {Quantity}</Typography>
                    {/* <MessageTime variant="caption">{time}</MessageTime> */}
                </BotMessage>
           
        </Box>
    );
};