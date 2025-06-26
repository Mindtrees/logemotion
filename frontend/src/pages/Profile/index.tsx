import { Box, Avatar, Typography, TextField, Button, IconButton } from '@mui/material';
import { FavoriteBorder as Like } from '@mui/icons-material';
import { BookmarkBorder as Bookmark } from '@mui/icons-material';
import { User } from '../../models';
import { useEffect, useState } from 'react';
import { UseUpdateAccount } from '../../hooks/UseUpdateAccount';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null); //기존 데이터
    const [isEditMode, setIsEditMode] = useState<boolean>(false); // 수정모드
    const [editUser, setEditUser] = useState<User | null>(null); //수정중인 데이터

    const { updateUser } = UseUpdateAccount();

    // 현재 유저 정보 가져오기
    useEffect(() => {
        const currentUser = sessionStorage.getItem('currentUser');
        if (currentUser) {
            const userData: User = JSON.parse(currentUser);
            setEditUser(userData);
            setUser(userData);
        }
    }, []);

    // 수정 모드
    const handleEditChange = () => {
        setIsEditMode(true);
    };

    // 수정 취소
    const handleCancel = () => {
        setIsEditMode(false);
        setEditUser(user);
    };

    // 입력값
    const handleInputChange = (field: keyof User, value: string) => {
        if (!editUser) return;
        setEditUser({ ...editUser, [field]: value });
    };

    // 변경사항 저장
    const handleSave = () => {
        if (editUser) {
            updateUser(editUser); // 수정한 데이터 업데이트
            setUser(editUser);
            setIsEditMode(false);
            alert('User profile updated.');
        }
    };

    return (
        <Box sx={{ maxWidth: 800, p: 4, mx: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                    <IconButton>
                        <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main' }}>J</Avatar>
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
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        InputProps={{ readOnly: !isEditMode }}
                        sx={{
                            input: {
                                backgroundColor: isEditMode ? 'white' : '#f0f0f0',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={editUser?.password || ''}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        InputProps={{ readOnly: !isEditMode }}
                        sx={{
                            input: {
                                backgroundColor: isEditMode ? 'white' : '#f0f0f0',
                            },
                        }}
                    />
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        {isEditMode ? (
                            <>
                                <Button variant="contained" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={handleSave}>
                                    Save
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
