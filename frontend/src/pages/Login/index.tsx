import { Box, Button, InputAdornment, TextField, Typography, styled, Alert, Divider } from '@mui/material';
import { Email, Lock as Password, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGoogleLogin, useLogin } from '../../hooks/UseLogin';
import { useLocationContext } from '../../contexts/LocationContextProvider';

const LoginContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
});

const LoginBox = styled(Box)(({ theme }) => ({
    width: '30%',
    minWidth: '400px',
    height: 'auto',
    borderRadius: '10px',
    padding: theme.spacing(4),
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        border: 'none',
    },
}));

const Login = () => {
    const navigate = useNavigate();
    const { redirectAfterLogin } = useLocationContext();
    const {
        login,
        isLoading: loginLoading,
        error: loginError,
        isSuccess: loginSuccess,
        reset: resetLogin,
    } = useLogin();
    const {
        loginWithGoogle,
        isLoading: googleLoading,
        error: googleError,
        isSuccess: googleSuccess,
        reset: resetGoogle,
    } = useGoogleLogin();

    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    const isLoading = loginLoading || googleLoading;
    const error = loginError || googleError;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (loginSuccess || googleSuccess) {
            const redirectTo = redirectAfterLogin();
            navigate(redirectTo, { replace: true });
        }
    }, [loginSuccess, googleSuccess, navigate, redirectAfterLogin]);

    const handleSignIn = async () => {
        setIsEmailError(false);
        setIsPasswordError(false);
        resetLogin();
        resetGoogle();

        if (!emailValue.trim()) {
            setIsEmailError(true);
            return;
        }

        if (!passwordValue.trim()) {
            setIsPasswordError(true);
            return;
        }

        login({ email: emailValue, password: passwordValue });
    };

    const handleGoogleSignIn = async () => {
        resetLogin();
        resetGoogle();
        loginWithGoogle();
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <LoginContainer sx={{ pt: 8, pb: 14 }}>
            <LoginBox>
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
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
                            fontSize: '1.1rem',
                        }}
                    >
                        Sign in to your account to start your emotion journal!
                    </Typography>
                </Box>

                {error && (
                    <Box sx={{ mb: 3 }}>
                        <Alert severity="error">{error?.message || 'An error occurred'}</Alert>
                    </Box>
                )}

                <Box sx={{ mb: 4 }}>
                    <TextField
                        label="Email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        error={isEmailError}
                        helperText={isEmailError ? 'Please enter your email address.' : ''}
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                        }}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Divider sx={{ my: 1 }}>OR</Divider>

                    <Button
                        variant="outlined"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
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
                        disabled={isLoading}
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                            mt: 1,
                        }}
                    >
                        Create New Account
                    </Button>
                </Box>
            </LoginBox>
        </LoginContainer>
    );
};

export default Login;
