import { Box, Button, Checkbox, FormControlLabel, InputAdornment, TextField, Typography, styled } from '@mui/material';
import { Email, Lock as Password } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UseLogin } from '../../hooks/UseLogin';

type LoginProps = {
    setIsLoggedIn: (val: boolean) => void;
};

const LoginContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    // [theme.breakpoints.down('md')]: {
    //     width: '90%',
    // },
}));

const Login = ({ setIsLoggedIn }: LoginProps) => {
    const navigate = useNavigate();
    const { login } = UseLogin(setIsLoggedIn);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    // 로그인
    const handleSignIn = () => {
        setEmailErrorText('');
        setPasswordErrorText('');

        const loginResult = login(email, password);

        if (loginResult) {
            switch (loginResult.field) {
                case 'email':
                    setEmailErrorText(loginResult.message);
                    break;
                case 'password':
                    setPasswordErrorText(loginResult.message);
                    break;
            }
        }
    };

    // 회원가입
    const handleSignUp = () => {
        navigate('/sign-up');
    };

    const [rememberUser, setRememberUser] = useState<boolean>(false);

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberUser(e.target.checked);
    };

    return (
        <LoginContainer sx={{ mb: 4 }}>
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
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mt: '10px',
                            textAlign: 'center',
                        }}
                    >
                        Sign in to your account to start your emotion journal!
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailErrorText}
                        helperText={emailErrorText}
                        sx={{
                            mb: '20px',
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Password />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <FormControlLabel
                        control={<Checkbox checked={rememberUser} onChange={handleRememberMeChange} />}
                        label="Remember Me"
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
                        onClick={handleSignIn}
                    >
                        Sign In
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
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: 'text.secondary',
                            mt: 2,
                            '&:hover': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        Forgot Password
                    </Typography>
                </Box>
            </Box>
        </LoginContainer>
    );
};

export default Login;
