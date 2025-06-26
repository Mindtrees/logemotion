import { Person as Name, Email, Lock as Password, ArrowBack as Back, Google } from '@mui/icons-material';
import { Box, Button, InputAdornment, styled, TextField, Typography, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { signup, loginWithGoogle, loading, error } = useAuthContext();

    const [nameValue, setNameValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
    
    const [nameError, setNameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

    const handleSignUp = async () => {
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        let hasError = false;

        if (!nameValue.trim()) {
            setNameError(true);
            hasError = true;
        }

        if (!emailValue.trim()) {
            setEmailError(true);
            hasError = true;
        }

        if (!passwordValue.trim()) {
            setPasswordError(true);
            hasError = true;
        }

        if (!confirmPasswordValue.trim() || passwordValue !== confirmPasswordValue) {
            setConfirmPasswordError(true);
            hasError = true;
        }

        if (hasError) return;

        try {
            await signup({
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                confirmPassword: confirmPasswordValue
            });
            navigate('/');
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            console.error('Google signup failed:', err);
        }
    };

    const handleGoBack = () => {
        navigate('/login');
    };

    const SignUpContainer = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: '50px',
    }));

    return (
        <SignUpContainer>
            <Box
                sx={{
                    width: '30%',
                    minWidth: '30%',
                    height: 'auto',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '10px',
                    boxShadow: 3,
                    p: 2,
                }}
            >
                <Box sx={{ mt: '20px' }}>
                    <Typography
                        variant="h2"
                        sx={{ width: '100%', minWidth: '30%', color: 'primary.main', textAlign: 'center' }}
                    >
                        Emotion Blog
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            width: '100%',
                            minWidth: '30%',
                            color: 'text.secondary',
                            mt: '10px',
                            textAlign: 'center',
                        }}
                    >
                        Create an account to save your journal entries and track your emotional journey.
                    </Typography>
                </Box>

                {error && (
                    <Box sx={{ m: 2 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 5 }}>
                    <TextField
                        label="Name"
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        error={nameError}
                        helperText={nameError ? 'Please enter your name.' : ''}
                        disabled={loading}
                        sx={{ width: '100%', maxWidth: '100%', minWidth: '50%', mb: 2 }}
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
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        error={emailError}
                        helperText={emailError ? 'Please enter your email address.' : ''}
                        disabled={loading}
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '50%',
                            mb: 2,
                        }}
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
                        error={passwordError}
                        helperText={passwordError ? 'Please enter your password.' : ''}
                        disabled={loading}
                        sx={{ width: '100%', maxWidth: '100%', minWidth: '50%', mb: 2 }}
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
                        value={confirmPasswordValue}
                        onChange={(e) => setConfirmPasswordValue(e.target.value)}
                        error={confirmPasswordError}
                        helperText={confirmPasswordError ? 'Passwords do not match.' : ''}
                        disabled={loading}
                        sx={{ width: '100%', maxWidth: '100%', minWidth: '50%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Password />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Button
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.25rem',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <Divider sx={{ width: '100%', my: 1 }}>OR</Divider>

                    <Button
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.25rem',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        startIcon={<Google />}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        sx={{
                            flex: 1,
                            minWidth: 'auto',
                            color: 'primary.main',
                            px: 1,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                        onClick={handleGoBack}
                        disabled={loading}
                        startIcon={<Back />}
                    >
                        Back to Login
                    </Button>
                </Box>
            </Box>
        </SignUpContainer>
    );
};

export default SignUp;