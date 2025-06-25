import { Person as Name, Email, Lock as Password, ArrowBack as Back } from '@mui/icons-material';
import { Box, Button, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        // navigate('/login');
        console.log('회원가입');
    };

    const handleGoBack = () => {
        navigate('/login');
        console.log('뒤로가기');
    };

    const SignUpContainer = styled('div')(({ theme }) => ({
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
                            ccolor: 'text.secondary',
                            mt: '10px',
                            textAlign: 'center',
                        }}
                    >
                        Create an account to save your journal entries and track your emotional journey.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 5 }}>
                    <TextField
                        label="Name"
                        type="text"
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        mt: 2,
                    }}
                >
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
                    >
                        <Back />
                    </Button>
                    <Button
                        sx={{
                            flex: 4,
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
                        Create Account
                    </Button>
                </Box>
            </Box>
        </SignUpContainer>
    );
};

export default SignUp;
