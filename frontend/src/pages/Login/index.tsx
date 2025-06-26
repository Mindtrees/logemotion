import { Box, Button, InputAdornment, TextField, Typography, styled, Alert, Divider } from '@mui/material';
import { Email, Lock as Password, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const LoginContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginTop: '50px',
});

const Login = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle, loading, error } = useAuthContext();

    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    const handleSignIn = async () => {
        setIsEmailError(false);
        setIsPasswordError(false);

        if (!emailValue.trim()) {
            setIsEmailError(true);
            return;
        }

        if (!passwordValue.trim()) {
            setIsPasswordError(true);
            return;
        }

        try {
            await login({ email: emailValue, password: passwordValue });
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleGoogleSignIn = async () => {
    try {
        await loginWithGoogle();
    } catch (err) {
        console.error('Google login failed:', err);
    }
};

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <LoginContainer>
            <Box
                sx={{
                    width: '30%',
                    minWidth: '400px',
                    height: 'auto',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '10px',
                    boxShadow: 3,
                    p: 4,
                }}
            >
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography
                        variant="h2"
                        sx={{ 
                            width: '100%', 
                            color: 'primary.main', 
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Emotion Blog
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            width: '100%',
                            color: 'text.secondary',
                            mt: 2,
                            textAlign: 'center',
                            fontSize: '1.1rem'
                        }}
                    >
                        Sign in to your account to start your emotion journal!
                    </Typography>
                </Box>

                {error && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                <Box sx={{ mb: 4 }}>
                    <TextField
                        label="Email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        error={isEmailError}
                        helperText={isEmailError ? 'Please enter your email address.' : ''}
                        disabled={loading}
                        fullWidth
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        error={isPasswordError}
                        helperText={isPasswordError ? 'Please enter your password.' : ''}
                        disabled={loading}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Password />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSignIn}
                        disabled={loading}
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Divider sx={{ my: 1 }}>OR</Divider>

                    <Button
                        variant="outlined"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        fullWidth
                        startIcon={<Google />}
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                        }}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        variant="text"
                        onClick={handleSignUp}
                        disabled={loading}
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                            mt: 1
                        }}
                    >
                        Create New Account
                    </Button>
                </Box>
            </Box>
        </LoginContainer>
    );
};

export default Login;