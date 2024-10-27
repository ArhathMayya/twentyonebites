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

export const DisplayIndividualOrder = ({ index, food, quantity }) => {
    const [displayPrepareButton, setDisplayButton] = useState(false);
    const [foodPrepareButton, setFoodPrepareButton] = useState(false);

    const handleStartCookingButton = (index, food, quantity) => {
        setDisplayButton(true);
        console.log(`${food} of quantity ${quantity} started to prepare`);
    };

    const handlePrepareButton = (index, food, quantity) => {
        console.log(`${food} of quantity ${quantity} prepared`);
        setFoodPrepareButton(true); // Disable the button after clicking
    };

    return (
        <Box display="flex">
            <BotMessage>
                <Typography variant="body2">{food}</Typography>
                <Typography variant="body2">Quantity: {quantity}</Typography>
            </BotMessage>

            {/* Display "Start Cooking" initially, and switch to "Food Prepared" once cooking starts */}
            {!displayPrepareButton ? (
                <Button variant="contained" onClick={() => handleStartCookingButton(index, food, quantity)}>
                    Start Cooking
                </Button>
            ) : (
                <Button
                    variant="contained"
                    disabled={foodPrepareButton} // Disables button if foodPrepareButton is true
                    onClick={() => handlePrepareButton(index, food, quantity)}
                >
                    Food Prepared
                </Button>
            )}
            {foodPrepareButton && (<Button>Close</Button>)}
        </Box>
    );
};
