import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { socket } from "./Chat";
import axios from "axios";

function Menu(props) {
  const [items, setItems] = useState([]);
  const [subMenu, setSubMenu] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    // Listen for the 'menu' event from the server
    socket.on("menu", (data) => {
      console.log(data);
      setItems(data.response); // Assuming data.response contains the menu items
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("menu"); // Remove the listener to prevent memory leaks
    };
  }, []);

  return (
    <>
      {subMenu ? (
        <SubMenu
          props={props}
          option={option}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
        />
      ) : (
        <Menu1 items={items} setOption={setOption} setSubMenu={setSubMenu} />
      )}
    </>
  );
}

// Menu1 component to display the initial menu items as cards
function Menu1({ items, setOption, setSubMenu }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        maxHeight: '400px', // Set a maximum height for scrolling
        overflowY: 'auto' // Enable vertical scrolling
      }}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: 300,
            margin: 2,
            backgroundColor: "#333",
            color: "white",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={item.image} // Assuming each item has an image property
            alt={item.title} // Assuming each item has a title property
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {item} {/* Title */}
            </Typography>
            <Typography variant="body2">
              {item.description} {/* Description */}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOption(item); // Set the selected option
                setSubMenu(true); // Switch to the submenu on button press
              }}
              sx={{
                marginTop: 1,
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Select
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

// SubMenu component to display submenu items as cards
function SubMenu({ props, option, subMenu, setSubMenu }) {
  const [submenuItems, setSubmenuItems] = useState([]);

  useEffect(() => {
    const fetchSubmenuItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/21bites/getfooditem",
          {
            category: option,
          }
        );

        console.log("Axios response:", response.data);
        setSubmenuItems(response.data.message); // Assuming the data contains submenu items
      } catch (error) {
        console.error("Error fetching submenu items:", error);
      }
    };

    fetchSubmenuItems();
  }, [option]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        maxHeight: '400px', // Set a maximum height for scrolling
        overflowY: 'auto' // Enable vertical scrolling
      }}
    >
      {/* <IconButton
        onClick={() => console.log("Delete icon clicked")}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "white",
        }}
      >
        <DeleteIcon />
      </IconButton> */}
      <Button
        onClick={() => {
          setSubMenu(false);
        }}
      >
        Close
      </Button>
      {submenuItems.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: 300,
            margin: 2,
            backgroundColor: "#333",
            color: "white",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={item.image} // Assuming each submenu item has an image property
            alt={item.title} // Assuming each submenu item has a title property
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {item} {/* Title */}
            </Typography>
            <Typography variant="body2">
              {item.description} {/* Description */}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.popupAlert(true);
                props.buttonPress(item);
              }}
              sx={{
                marginTop: 1,
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Select
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Menu;
