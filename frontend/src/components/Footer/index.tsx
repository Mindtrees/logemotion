
import { 
  Box, 
  Typography, 
  Grid, 
  Link,
  Stack,
  Divider,
} from '@mui/material';
import {
  Psychology,
} from '@mui/icons-material';

const Footer = () => {
  const quickLinks = ['Get Started', 'Features', 'How it Works', 'Pricing', 'About Us'];
  const resources = ['Blog', 'Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'];
    
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        color: "white",
        pt: 8,
        pb: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <Grid container spacing={5} sx={{ mb: 5 }}>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Psychology 
                sx={{ 
                  fontSize: '2rem',
                  color: '#8b5cf6'
                }} 
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                EmotionBlog
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
              }}
            >
              AI-powered emotion analysis platform that helps you understand
              your mind and improve your emotional well-being through
              personalized insights.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
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
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "#8b5cf6",
                    },
                  }}
                >
                  {linkText}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
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
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "#8b5cf6",
                    },
                  }}
                >
                  {linkText}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Connect With Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 2,
                lineHeight: 1.5,
              }}
            >
              Stay updated with our latest features and emotional wellness tips.
            </Typography>
            
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "center" }}
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
             © {new Date().getFullYear()} EmotionBlog. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
