import React, { useState, useEffect } from 'react';
import { socket } from './../services/socketServices';
import { Box } from '@mui/material';
import { DisplayIndividualOrder } from './subcomponents/displayOrders';

export default function KitchenOperator() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        socket.emit('kitchen', { message: 'kitchen joined' });

        socket.on('preparefood', (data) => {
            // const newFoodItem = { ...data, id: Date.now() + Math.random() }; // Unique ID
            setFoods((list) => [...list, data]);
        });

        return () => {
            socket.off('preparefood');
        };
    }, []);

    const removeFoodItem = (id) => {
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
    };

    return (
        <>
            {foods.map((food) => (
                <Box key={food.id}>
                    <DisplayIndividualOrder 
                        id={food.id} 
                        food={food.food} 
                        quantity={food.quantity} 
                        removeFoodItem={removeFoodItem} 
                        socket={socket}
                    />
                </Box>
            ))}
        </>
    );
}
