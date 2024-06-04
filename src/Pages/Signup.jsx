import { Container, Paper, TextField, Button, Typography, InputAdornment, IconButton, Box, Snackbar, Slide } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link } from "react-router-dom";
import supabase from '../Services/Supabase';
import { Alert } from "@mui/material";

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add validation logic here
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName 
            });
        
            if (error) {
                setErrorMessage(error.message);
                setOpen(true);
            } else {
                setSuccessMessage('Account successfully created!');
                setOpen(true);
                // Optionally, you can navigate to another page or show a success message
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
            setErrorMessage("Something went wrong");
            setOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Container maxWidth="xs" component={Paper} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '27%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}> Sign Up </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                sx={{ flexGrow: 1 }}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            variant="outlined"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Slide direction="up" in={open}>
                            <Alert onClose={handleClose} severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%' }}>
                                {errorMessage || successMessage}
                            </Alert>
                        </Slide>
                    </Snackbar>
                    <Button type="submit" variant="contained" endIcon={<PersonAddAltRoundedIcon />} fullWidth sx={{ mt: 2 , backgroundColor: 'black' }}>
                        Sign up
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/" underline="hover">Login</Link>
                </Typography>
            </Container>
        </Box>
    );
}
