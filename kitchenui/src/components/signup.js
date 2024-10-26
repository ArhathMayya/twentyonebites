import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Typography} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUpComponent() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        visible: false
    });
    const [error, setError] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVisible = () => {
        setFormData(prevState => ({
            ...prevState,
            visible: !prevState.visible
        }));
    };
    const handleSubmit = () => {
        if (formData.name && formData.password){
            console.log(formData)
            return 
        }
        setError(!error)
        setTimeout(() =>{
            setError(false)
        }, 2000)
        
    }

    return (
        <div>
            <Typography>Sigup Page</Typography>
            <TextField
                label="Enter Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Enter Password"
                variant="outlined"
                name="password"
                type={formData.visible ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleVisible} edge="end">
                                {formData.visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Button 
                variant="contained" 
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                Submit
            </Button>
            {error && (<div>Please Enter All the details</div>)}
        </div>
    );
}
