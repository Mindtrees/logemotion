import React, { useState, useEffect } from 'react';
import { AppBar,  Toolbar,  Typography,  Button,  Box,  IconButton,  Menu,  MenuItem,  Avatar,  useTheme as useMuiTheme,  useMediaQuery,  Container,  Drawer,  List,  ListItem,  ListItemIcon,  ListItemText,  ListItemButton} from '@mui/material';
import { Edit as EditIcon,  Article as ArticleIcon, Person as PersonIcon, Menu as MenuIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, Close as CloseIcon, Logout as LogoutIcon} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '/write', label: 'Write', icon: <EditIcon /> },
    { path: '/my-posts', label: 'My Posts', icon: <ArticleIcon /> },
    { path: '/all-posts', label: 'All Posts', icon: <ArticleIcon /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    handleUserMenuClose();
    setMobileMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    handleUserMenuClose();
    setMobileMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleUserMenuClose();
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleUserMenuClose();
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const mobileMenuContent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          py: 1,
          px: 2,
          height: 64,
        }}
      >
        <IconButton
          onClick={handleMobileMenuToggle}
          sx={{ 
            color: 'text.secondary',
            backgroundColor: 'action.hover',
            '&:hover': {
              backgroundColor: 'action.selected',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, px: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontWeight: 600,
              mb: 2,
              fontSize: '0.75rem',
            }}
          >
            Navigation
          </Typography>
          <List sx={{ p: 0 }}>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontWeight: 600,
              mb: 2,
              fontSize: '0.75rem',
            }}
          >
            Account
          </Typography>
          <List sx={{ p: 0 }}>
            {isLoggedIn ? (
              <>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={handleProfile}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        U
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Profile"
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '1rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'error.contrastText',
                        '& .MuiListItemIcon-root': {
                          color: 'error.contrastText',
                        },
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Logout"
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '1rem',
                      }}
                    />
                  </ListItemButton>
                  </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={handleLogin}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      px: 2,
                      backgroundColor: 'transparent',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                      transition: 'all 0.2s ease-in-out',
                      justifyContent: 'center',
                    }}
                  >
                    <ListItemText 
                      primary="Login"
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '1rem',
                        textAlign: 'center',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleSignup}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      px: 2,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      transition: 'all 0.2s ease-in-out',
                      justifyContent: 'center',
                    }}
                  >
                    <ListItemText 
                      primary="Start for free"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        textAlign: 'center',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        elevation={isScrolled ? 1 : 0}
        sx={{ 
          backgroundColor: isScrolled 
            ? (isDarkMode ? 'rgba(18, 18, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)')
            : 'background.default',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          borderBottom: '1px solid',
          borderBottomColor: isScrolled ? 'rgba(0, 0, 0, 0.06)' : 'divider',
          color: 'text.primary',
          transition: 'all 0.4s ease-out',
          zIndex: (theme) => theme.zIndex.appBar,
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between', 
              py: isScrolled ? 0.8 : 1,
              transition: 'padding 0.4s ease-out',
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                cursor: 'pointer',
                fontWeight: 700,
                color: 'primary.main',
                fontSize: isScrolled ? '1.4rem' : '1.5rem',
                transition: 'font-size 0.4s ease-out',
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
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      minWidth: 'auto',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isMobile && (
                <IconButton
                  onClick={handleThemeToggle}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { 
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              )}

              {!isMobile && (
                isLoggedIn ? (
                  <>
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{ ml: 1 }}
                    >
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
                        <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      onClick={handleLogin}
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={handleSignup}
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      Start for free
                    </Button>
                  </Box>
                )
              )}

              {isMobile && (
                <IconButton
                  onClick={handleThemeToggle}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { 
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              )}

              {isMobile && (
                <IconButton
                  onClick={handleMobileMenuToggle}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { 
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box 
        sx={{ 
          height: isScrolled ? 80 : 96, 
          transition: 'height 0.4s ease-out',
          paddingTop: 'env(safe-area-inset-top)',
        }} 
      />

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '80%', sm: '70%' },
            maxWidth: '400px',
            backgroundColor: 'background.default',
            border: 'none',
            boxShadow: (theme) => theme.shadows[24],
          },
        }}
      >
        {mobileMenuContent}
      </Drawer>
    </>
  );
};

export default NavBar;