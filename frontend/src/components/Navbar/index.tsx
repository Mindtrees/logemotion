import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme as useMuiTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Edit as EditIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomTheme } from '../../contexts/ThemeContext';
import { colors } from '../../styles/colors';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { path: '/write', label: 'Write', icon: <EditIcon /> },
    { path: '/my-posts', label: 'My Posts', icon: <ArticleIcon /> },
    { path: '/all-posts', label: 'All Posts', icon: <ArticleIcon /> },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogin = () => {
    navigate('/login');
    handleUserMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleUserMenuClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleUserMenuClose();
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: currentColors.background.navbar,
        borderBottom: `1px solid ${currentColors.border}`,
        color: currentColors.text.primary
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              cursor: 'pointer',
              fontWeight: 700,
              color: colors.primary.main,
              fontSize: '1.5rem'
            }}
            onClick={() => navigate('/')}
          >
            EmotionBlog
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: location.pathname === item.path ? colors.primary.main : currentColors.text.secondary,
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    minWidth: 'auto',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: currentColors.hover,
                      color: colors.primary.main,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={toggleTheme}
              sx={{ 
                color: currentColors.text.secondary,
                '&:hover': { 
                  backgroundColor: currentColors.hover
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: colors.primary.main }}>
                    U
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LoginIcon sx={{ mr: 1, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                startIcon={<PersonIcon />}
                onClick={handleLogin}
                sx={{
                  color: currentColors.text.secondary,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: currentColors.hover,
                  },
                }}
              >
                User
              </Button>
            )}

            {isMobile && (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ 
                    color: currentColors.text.secondary,
                    '&:hover': { 
                      backgroundColor: currentColors.hover
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {navItems.map((item) => (
                    <MenuItem 
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      selected={location.pathname === item.path}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.icon}
                        {item.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;