import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageDefination from './MessageDefinitions';
import { Box, TextField, Typography, Button, Grid, Paper } from '@mui/material';
import Menu from "./Menu";

export const socket = io.connect("http://localhost:4000", {
    secure: true,
    path: "/twentyonesocket",
});

function Chat() {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // New state to control the Paper popup visibility
    const messageEndRef = useRef(null);
    const [quantity, setQuantity] = useState(0); // Initialize with a default value of 1


  function handleOrderButtor(){
    setQuantity(0)
    setShowPopup(!showPopup)
    sendMessage()
  }
  // Function to increment the quantity
  const handleAdd = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrement the quantity (with a lower bound of 1)
  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

    // Function to send messages
    const sendMessage = () => {
        if (message !== "") {
          const orderdetails = {
            food:message,
            quantity
          }
            const messageData = {
                type: "text",
                from: "human",
                orderdetails,
                message,
                time: new Date(Date.now()).toLocaleTimeString(),
            };
            socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setMessage(""); // Clear the input field
        }
    };

    // Initial message setup
    useEffect(() => {
        const initialMessageData = {
            type: "text",
            from: "bot",
            message: "Hello, welcome to 21 Bites. Please order food.",
            time: new Date(Date.now()).toLocaleTimeString(),
        };
        setMessageList((list) => [...list, initialMessageData]);

        // Request menu data on component mount
        socket.emit('getfoodinfo', { message: "getmenu" });

        // Event listener for receiving messages
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        // Attach the listener
        socket.on('receive_message', handleReceiveMessage);

        // Cleanup function to remove listener
        // return () => {
        //     socket.off('receive_message', handleReceiveMessage);
        // };
    }, []);

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList]);

    // Function to toggle the drawer
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    // Function to handle menu item click
    const handleMenuItemClick = (item) => {
        setMessage(item); // Set the selected menu item as the message
        setDrawerOpen(false); // Close the drawer
     
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
            {/* Chat body */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {messageList.map((messageContent, index) => (
                    <Box key={index}>
                        {MessageDefination(messageContent)}
                    </Box>
                ))}
                <div ref={messageEndRef}></div>
            </Box>

            {/* Chat footer with input and send button */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderTop: '1px solid #ddd',
                    backgroundColor: '#fff',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    Send
                </Button>
            </Box>

            {/* Paper popup in the center */}
            {showPopup && (
                <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '20%',
                  padding: '20px',
                  textAlign: 'center',
                  zIndex: 1300, // Ensure the Paper is above all other elements
                  backgroundColor: 'white',
                  overflow: 'hidden', // Optional, to avoid content overflow
                }}
              >
                {/* Close button positioned at top-left */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowPopup(false)
                    setQuantity(0)
                  }}
                  sx={{
                    position: 'absolute',
                    top: '10px',    // Positioning at the top
                    left: '10px',   // Positioning to the left
                  }}
                >
                  Close
                </Button>
              
                <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                  <Button variant="contained" sx={{ alignItems: "flex-start" }} onClick={handleSubtract} disabled={quantity === 0}>
                    -
                  </Button>
                  <Typography variant="h6" mx={2}>
                    {quantity}
                  </Typography>
                  <Button variant="contained" onClick={handleAdd}>
                    +
                  </Button>
                </Box>
                <Typography>{message}</Typography>
                <Box>
                  <Button onClick={handleOrderButtor}>Order</Button>
                </Box>
              </Paper>              
            )}

            {/* Food Menu Grid at the bottom */}
            <Grid container sx={{ height: '51%', backgroundColor: '#f0f0f0' }}>
                <Menu buttonPress={setMessage} popupAlert = {setShowPopup} />
            </Grid>
        </Box>
    );
}

export default Chat;
