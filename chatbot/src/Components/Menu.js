import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { socket } from './Chat';
import axios from 'axios';


function Menu(props) {
    const [items, setItems] = useState([]);
    const [subMenu, setSubMenu] = useState(false);
    const [option, setOption] = useState('');

    useEffect(() => {
        // Listen for the 'menu' event from the server
        socket.on('menu', (data) => {
            console.log(data);
            setItems(data.response); // Assuming data.response contains the menu items
        });

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('menu'); // Remove the listener to prevent memory leaks
        };
    }, []);

    // Menu1 component to display the initial menu items
    function Menu1({ items, setOption, setSubMenu }) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Paper sx={{ padding: 2, width: '300px', backgroundColor: '#333', color: 'white' }}>
                    <Stack direction="column" spacing={2} sx ={{overFlow:'auto'}}>
                        {items.map((item, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setOption(item); // Set the selected option
                                    setSubMenu(true); // Switch to the submenu on button press
                                }}
                                sx={{
                                    padding: '10px 20px',
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#115293',
                                    },
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Paper>
            </Box>
        );
    }

    // SubMenu component to display submenu items
    function SubMenu({ option }) {
        const [submenuItems, setSubmenuItems] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchSubmenuItems = async () => {
                try {
                    const response = await axios.post('http://localhost:4000/21bites/getfooditem', {
                        category: option, // Send category in the body if it's a POST request
                    });
                    
                    console.log('Axios response:', response.data);
                    setSubmenuItems(response.data.message); // Assuming the data contains submenu items
                    // setLoading(false);
                } catch (error) {
                    console.error('Error fetching submenu items:', error);
                    // setLoading(false);
                }
            };

            fetchSubmenuItems();
        }, []);

        // useEffect(() => {

        // }, [submenuItems])

        // if (loading) {
        //     return <div>Loading...</div>;
        // }

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <IconButton
                    onClick={() => console.log("Delete icon clicked")}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: 'white',
                    }}
                >
                    <DeleteIcon />
                </IconButton>
                <Paper sx={{ padding: 2, width: '300px', backgroundColor: '#333', color: 'white' }}>
                
                    <Stack direction="column" spacing={2}>
                        {submenuItems.map((item, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    props.popupAlert(true)
                                    // props.buttonPress(item)
                                }}
                                sx={{
                                    padding: '10px 20px',
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#115293',
                                    },
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Paper>
            </Box>
        );
    }

    return (
        <>
            {subMenu ? (
                <SubMenu option={option} /> // Pass selected option to SubMenu
            ) : (
                <Menu1 items={items} setOption={setOption} setSubMenu={setSubMenu} />
            )}
        </>
    );
}

export default Menu;
