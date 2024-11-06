import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
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

export const DisplayIndividualOrder = ({ id, food, quantity, removeFoodItem, socket }) => {
    const [displayPrepareButton, setDisplayButton] = useState(false);
    const [foodPrepareButton, setFoodPrepareButton] = useState(false);

    const handleStartCookingButton = () => {
        setDisplayButton(true);
        console.log(`${food} of quantity ${quantity} started to prepare`);
        socket.emit("startcooking", {id, food, quantity})
    };

    const handlePrepareButton = () => {
        console.log(`${food} of quantity ${quantity} prepared`);
        socket.emit("foodprepared", {id, food, quantity})
        setFoodPrepareButton(true);
    };

    return (
        <Box display="flex">
            <BotMessage>
                <Typography variant="body2">{food}</Typography>
                <Typography variant="body2">Quantity: {quantity}</Typography>
            </BotMessage>

            {!displayPrepareButton ? (
                <Button variant="contained" onClick={handleStartCookingButton}>
                    Start Cooking
                </Button>
            ) : (
                <Button
                    variant="contained"
                    disabled={foodPrepareButton}
                    onClick={handlePrepareButton}
                >
                    Food Prepared
                </Button>
            )}
            {foodPrepareButton && <Button onClick={() => removeFoodItem(id)}>Close</Button>}
        </Box>
    );
};
