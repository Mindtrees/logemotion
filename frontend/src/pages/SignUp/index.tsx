import { Person as Name, Email, Lock as Password, Google } from '@mui/icons-material';
import { Box, Button, InputAdornment, styled, TextField, Typography, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGoogleLogin, useSignup } from '../../hooks/UseLogin';

const SignUpContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
});

const SignUpBox = styled(Box)(({ theme }) => ({
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

const SignUp = () => {
    const navigate = useNavigate();
    const {
        signup,
        isLoading: signupLoading,
        error: signupError,
        isSuccess: signupSuccess,
        reset: resetSignup,
    } = useSignup();
    const {
        loginWithGoogle,
        isLoading: googleLoading,
        error: googleError,
        isSuccess: googleSuccess,
        reset: resetGoogle,
    } = useGoogleLogin();

    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [userNameErrorText, setUserNameErrorText] = useState<string>('');
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('');

    const isLoading = signupLoading || googleLoading;
    const error = signupError || googleError;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (signupSuccess || googleSuccess) {
            navigate('/');
        }
    }, [signupSuccess, googleSuccess, navigate]);

    const handleSignUp = () => {
        setUserNameErrorText('');
        setEmailErrorText('');
        setPasswordErrorText('');
        setConfirmPasswordErrorText('');
        resetSignup();
        resetGoogle();

        let hasError = false;

        if (!userName.trim()) {
            setUserNameErrorText('Please enter your name.');
            hasError = true;
        }

        if (!email.trim()) {
            setEmailErrorText('Please enter your email.');
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordErrorText('Please enter your password.');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordErrorText('Password must be at least 6 characters long.');
            hasError = true;
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordErrorText('Please confirm your password.');
            hasError = true;
        } else if (password !== confirmPassword) {
            setConfirmPasswordErrorText('Passwords do not match.');
            hasError = true;
        }

        if (!hasError) {
            signup({
                email,
                password,
                displayName: userName,
            });
        }
    };

    const handleGoogleSignUp = () => {
        resetSignup();
        resetGoogle();
        loginWithGoogle();
    };

    const handleGoBack = () => {
        navigate('/login');
    };

    const isEmailAlreadyInUse = error?.message?.includes('already registered');

    return (
        <SignUpContainer sx={{ pb: 14, pt: 8 }}>
            <SignUpBox>
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography
                        variant="h2"
                        sx={{
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
                            color: 'text.secondary',
                            mt: 2,
                            textAlign: 'center',
                            fontSize: '1.1rem',
                        }}
                    >
                        Start your emotional journey!
                    </Typography>
                </Box>

                {/* 에러 메시지 표시 */}
                {error && (
                    <Box sx={{ mb: 3 }}>
                        <Alert
                            severity={isEmailAlreadyInUse ? 'warning' : 'error'}
                            action={
                                isEmailAlreadyInUse ? (
                                    <Button color="inherit" size="small" onClick={handleGoBack}>
                                        Go to Login
                                    </Button>
                                ) : null
                            }
                        >
                            {error.message}
                        </Alert>
                    </Box>
                )}

                <Box sx={{ mb: 4 }}>
                    <TextField
                        label="Name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={!!userNameErrorText}
                        helperText={userNameErrorText}
                        disabled={isLoading}
                        fullWidth
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Name />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailErrorText}
                        helperText={emailErrorText}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordErrorText}
                        helperText={passwordErrorText}
                        disabled={isLoading}
                        fullWidth
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Password />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordErrorText}
                        helperText={confirmPasswordErrorText}
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
                        onClick={handleSignUp}
                        disabled={isLoading}
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                        }}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <Divider sx={{ my: 1 }}>OR</Divider>

                    <Button
                        variant="outlined"
                        onClick={handleGoogleSignUp}
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
                        onClick={handleGoBack}
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
                        Already have an account? Sign In
                    </Button>
                </Box>
            </SignUpBox>
        </SignUpContainer>
    );
};

export default SignUp;
