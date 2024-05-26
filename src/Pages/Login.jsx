import { Container, Box, Paper, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

import { useState } from "react";
import { FormatAlignJustify } from "@mui/icons-material";

export default function LoginPage() {
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        setIsError(true);
    }

    return (
        <>
            <Box sx={{ display:'flex', justifyContent: 'center', alignItems:'center', height: '100vh', }}>
                <Container maxWidth="xs" component={Paper} sx={{ p: 1 ,
                position:'absolute',
                top:'50%',
                left: '50%',
                width: '27%', 
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',}}>
                    <Typography variant="h6" textAlign={'center'} sx={{ p: 1 }}> LOGIN </Typography>
                    <Box sx={{ p: 1 }}>
                        <TextField error={isError} helperText={isError ? "Invalid Email" : ""} fullWidth label="Email" variant="outlined" />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            error={isError}
                            helperText={isError ? "Invalid Password" : ""}
                            fullWidth
                            label="Password"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button component={Link} to="/" size="large" fullWidth onClick={validate} variant="contained" endIcon={<LoginIcon />}>Login</Button>
                    </Box>
                    <Typography align="center">or</Typography>
                    <Box sx={{ p: 1 }}>
                        <Button component={Link} to= "/signup" size="large" fullWidth variant="contained" endIcon={<PersonAddAltRoundedIcon />}>Sign up</Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
