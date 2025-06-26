import { Person as Name, Email, Lock as Password } from '@mui/icons-material';
import { Box, Button, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UseCreateAccount } from '../../hooks/UseCreateAccount';
import React, { useState } from 'react';

const SignUpContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    // [theme.breakpoints.down('md')]: {
    //     width: '90%',
    // },
}));

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp } = UseCreateAccount();

    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [userNameErrorText, setUserNameErrorText] = useState<string>('');
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('');

    const handleSignUp = () => {
        setUserNameErrorText('');
        setEmailErrorText('');
        setPasswordErrorText('');
        setConfirmPasswordErrorText('');

        const signUpResult = signUp(userName, email, password, confirmPassword);

        // 유효성검사
        if (signUpResult) {
            switch (signUpResult.field) {
                case 'userName':
                    setUserNameErrorText(signUpResult.message);
                    break;
                case 'email':
                    setEmailErrorText(signUpResult.message);
                    break;
                case 'password':
                    setPasswordErrorText(signUpResult.message);
                    break;
                case 'confirmPassword':
                    setConfirmPasswordErrorText(signUpResult.message);
                    break;
            }
        }
    };

    const handleGoBack = () => {
        navigate('/login');
    };

    return (
        <SignUpContainer sx={{ mb: 4 }}>
            <Box
                sx={{
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '10px',
                    boxShadow: 3,
                    p: 2,
                }}
            >
                <Box sx={{ mt: '20px' }}>
                    <Typography variant="h2" sx={{ color: 'primary.main', textAlign: 'center' }}>
                        Emotion Blog
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: '10px', textAlign: 'center' }}>
                        Start your emotional journey!
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 5 }}>
                    <TextField
                        label="Name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={!!userNameErrorText}
                        helperText={userNameErrorText ? 'Please enter your name.' : ''}
                        sx={{ mb: 2 }}
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
                        sx={{
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordErrorText}
                        helperText={passwordErrorText}
                        sx={{ mb: 2 }}
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Password />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: '90%',
                            minWidth: '50%',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.25rem',
                            px: 2,
                            py: 1,
                            mb: 1,
                            borderRadius: 2,
                        }}
                        onClick={handleSignUp}
                    >
                        Create Account
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            width: '90%',
                            minWidth: '50%',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.25rem',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                        }}
                        onClick={handleGoBack}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </SignUpContainer>
    );
};

export default SignUp;
