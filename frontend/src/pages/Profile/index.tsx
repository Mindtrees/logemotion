import { Box, Avatar, Typography, TextField, Button, IconButton } from '@mui/material';
import { FavoriteBorder as Like } from '@mui/icons-material';
import { BookmarkBorder as Bookmark } from '@mui/icons-material';

const Profile = () => {
    return (
        <Box sx={{ backgroundColor: 'background.section', p: 4, maxWidth: 800, mx: 'auto' }}>
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
                    <TextField label="Name" value="Jenny" InputProps={{ readOnly: true }} />
                    <TextField label="Email" value="jenny@blog.com" InputProps={{ readOnly: true }} />
                    <TextField label="Password" type="password" value="********" InputProps={{ readOnly: true }} />
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        <Button variant="contained">Edit</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
