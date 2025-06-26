import { Box, Button, InputAdornment, TextField, Typography, styled } from '@mui/material';
import { Email, Lock as Password } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean>(false);

    // 이메일
    // const handleEmailChange = (e: string) => {
    //     setEmailValue(e);
    // };

    // 로그인
    const handleSignIn = () => {
        if (!emailValue.trim()) {
            setIsEmailError(true);
        } else {
            setIsEmailError(false);
        }
    };

    // 회원가입
    const handleSignUp = () => {
        navigate('/signup');
    };

    const LoginContainer = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: '50px',
        // [theme.breakpoints.down('md')]: {
        //     width: '90%',
        // },
    }));

    return (
        <LoginContainer>
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
                            ccolor: 'text.secondary',
                            mt: '10px',
                            textAlign: 'center',
                        }}
                    >
                        Sign in to your account to start your emotion journal!
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 5 }}>
                    <TextField
                        label="Email"
                        // placeholder="emotion@blog.com"
                        value={emailValue}
                        // onChange={(e) => handleEmailChange(e.target.value)}
                        error={isEmailError}
                        helperText={isEmailError ? 'Please enter your email address.' : ''}
                        sx={{
                            mb: '20px',
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '50%',
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '50%',
                            color: 'primary.main',
                            fontWeight: '600',
                            textTransform: 'none',
                            fontSize: '1.25rem',
                            px: 2,
                            py: 1,
                            mb: 1,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Button
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '50%',
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
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </LoginContainer>
    );
};

export default Login;
