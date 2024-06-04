import { Container, Box, Paper, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from '../Services/Supabase';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wrong");

    const navigate = useNavigate();

    const validate = () => {
        if (email.trim() === "" || password.trim() === "") {
            setIsError(true);
            setErrorMessage("All fields required");
            return false;
        }
        return true;
    }

    const login = async () => {
        if (!validate()) return;

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error !== null) {
            setIsError(true);
            setErrorMessage(error.message);
            return
        }

        if (data !== null) {
            navigate("/dashboard");
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="xs" component={Paper} sx={{
                p: 1,
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '27%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
                    <Typography variant="h6" sx={{ p: 1 }}> LOGIN </Typography>
                    {
                        isError &&
                        <Box>
                            <Typography color="error" align="center">{errorMessage}</Typography>
                        </Box>
                    }
                    <Box sx={{ p: 1 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            error={isError}
                            helperText={isError ? "All fields required" : ""}
                            required
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            error={isError}
                            helperText={isError ? "All fields required" : ""}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            endIcon={<LoginIcon />}
                            onClick={login}
                            sx={{ backgroundColor: 'black' }}
                        >
                            Login
                        </Button>
                    </Box>
                    <Typography align="right">
                        <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'black', fontSize: 15 }}>Forgot Password?</Link>
                    </Typography>
                    <Typography align="center">or</Typography>
                    <Box sx={{ p: 1 }}>
                        <Button
                            component={Link}
                            to="/signup"
                            fullWidth
                            variant="contained"
                            endIcon={<PersonAddAltRoundedIcon />}
                            sx={{ backgroundColor: 'black' }}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
