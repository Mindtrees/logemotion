import { 
  Box, 
  Typography, 
  Grid, 
  Link,
  Stack,
  Divider,
  Chip
} from '@mui/material';

const Footer = () => {
  const quickLinks = ['Get Started', 'Features', 'How it Works', 'Pricing', 'About Us'];
  const resources = ['Blog', 'Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        color: 'white',
        pt: 8,
        pb: 3,
        mt: 10
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        {/* Main Footer Content */}
        <Grid container spacing={5} sx={{ mb: 5 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '1.75rem' }}>💭</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                EmotionBlog
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: '#d1d5db',
                lineHeight: 1.6
              }}
            >
              AI-powered emotion analysis platform that helps you understand your mind and improve your emotional well-being through personalized insights.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#f9fafb'
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((linkText, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#8b5cf6'
                    }
                  }}
                >
                  {linkText}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#f9fafb'
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              {resources.map((linkText, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#8b5cf6'
                    }
                  }}
                >
                  {linkText}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Connect */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#f9fafb'
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#d1d5db',
                mb: 2,
                lineHeight: 1.5
              }}
            >
              Stay updated with our latest features and emotional wellness tips.
            </Typography>
            
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ borderColor: '#374151', mb: 3 }} />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'center' }}
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#9ca3af'
            }}
          >
            © 2024 EmotionBlog. We value your emotions ❤️
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <Chip
              icon={<span style={{ fontSize: '0.75rem' }}>🔒</span>}
              label="Your data is secure"
              size="small"
              sx={{
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: 'none',
                fontSize: '0.75rem'
              }}
            />
            <Chip
              icon={<span style={{ fontSize: '0.75rem' }}>🌍</span>}
              label="Available worldwide"
              size="small"
              sx={{
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: 'none',
                fontSize: '0.75rem'
              }}
            />
            <Chip
              icon={<span style={{ fontSize: '0.75rem' }}>🤖</span>}
              label="AI-Powered"
              size="small"
              sx={{
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: 'none',
                fontSize: '0.75rem'
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;