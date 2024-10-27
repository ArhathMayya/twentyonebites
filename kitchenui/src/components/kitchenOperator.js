import React, { useState, useEffect } from 'react';
import { socket } from './../services/socketServices';
import { Box } from '@mui/material';
import { DisplayIndividualOrder } from './subcomponents/displayOrders';

export default function KitchenOperator() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        // Notify server that kitchen has joined
        socket.emit('kitchen', { message: 'kitchen joined' });

        // Listen for 'preparefood' event to receive food items
        socket.on('preparefood', (data) => {
            console.log("data: ", data);
            setFoods((list) => [...list, data]);
        });

        // Cleanup the socket listener on component unmount
        return () => {
            socket.off('preparefood');
        };
    }, []);

    return (
        <>
            {foods.map((food, index) => (
                <Box key={index}>
                    <DisplayIndividualOrder food={food.food} Quantity={food.quantity} />
                </Box>
            ))}
        </>
    );
}
