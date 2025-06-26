import { Box, Avatar, Typography, TextField, Button, IconButton, Alert } from '@mui/material';
import { FavoriteBorder as Like } from '@mui/icons-material';
import { BookmarkBorder as Bookmark } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useAuthState } from '../../hooks/UseLogin';

const Profile = () => {
    const { user, isAuthenticated } = useAuthState();
    const navigate = useNavigate();
    
    const [editUser, setEditUser] = useState({
        userName: '',
        email: '',
        password: ''
    }); 
    const [isEditMode, setIsEditMode] = useState<boolean>(false); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        if (user) {
            setEditUser({
                userName: user.displayName || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    if (!isAuthenticated || !user) {
        return (
            <Box sx={{ maxWidth: 800, p: 4, mx: 'auto', textAlign: 'center' }}>
                <Alert severity="info">Please login to view your profile</Alert>
            </Box>
        );
    }

    const handleEditChange = () => {
        setIsEditMode(true);
        setSuccessMessage('');
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setEditUser({
            userName: user.displayName || '',
            email: user.email || '',
            password: ''
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setEditUser({ ...editUser, [field]: value });
    };

    const handleSave = async () => {
        if (!editUser.userName.trim()) {
            alert('Please enter a name');
            return;
        }

        setIsLoading(true);
        try {
            await updateProfile(auth.currentUser!, {
                displayName: editUser.userName.trim()
            });

            setIsEditMode(false);
            setSuccessMessage('Profile updated successfully!');
            
            setTimeout(() => {
                navigate('/');
            }, 1000);
            
        } catch (error: any) {
            alert('Failed to update profile: ' + error.message);
        }
        setIsLoading(false);
    };

    return (
        <Box sx={{ maxWidth: 800, px: 4, mx: 'auto', py:14 }}>
            {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {successMessage} Redirecting to home...
                </Alert>
            )}
            
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                    <IconButton>
                        <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main' }}>
                            {editUser.userName?.charAt(0) || editUser.email?.charAt(0) || 'U'}
                        </Avatar>
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Like sx={{ mr: 1 }} />
                        <Typography variant="body2">123 Likes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Bookmark sx={{ mr: 1 }} />
                        <Typography variant="body2">45 Bookmarks</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                    <TextField
                        label="Name"
                        value={editUser?.userName || ''}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        InputProps={{ readOnly: !isEditMode }}
                        sx={{
                            input: {
                                backgroundColor: isEditMode ? 'white' : '#f0f0f0',
                            },
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={editUser?.email || ''}
                        InputProps={{ readOnly: true }}
                        sx={{
                            input: {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value="******"
                        InputProps={{ readOnly: true }}
                        sx={{
                            input: {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    />
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        {isEditMode ? (
                            <>
                                <Button 
                                    variant="outlined" 
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    sx={{ mr: 1 }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={handleSave}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" onClick={handleEditChange}>
                                Edit
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;