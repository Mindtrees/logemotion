import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Stack,
  Divider,
  Chip,
} from "@mui/material";

const Footer = () => {
  const quickLinks = [
    "Get Started",
    "Features",
    "How it Works",
    "Pricing",
    "About Us",
  ];
  const resources = [
    "Blog",
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
    "Contact",
  ];
  const socials = [
    { icon: "📧", label: "Email" },
    { icon: "📱", label: "Twitter" },
    { icon: "📘", label: "Facebook" },
    { icon: "📸", label: "Instagram" },
  ];

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
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography sx={{ fontSize: "1.75rem" }}>💭</Typography>
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

            <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
              {socials.map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#8b5cf6",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Typography>{social.icon}</Typography>
                </IconButton>
              ))}
            </Stack>
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
            © 2024 EmotionBlog. We value your emotions ❤️
          </Typography>

          <Stack direction="row" spacing={3}>
            <Chip
              icon={<span style={{ fontSize: "0.75rem" }}>🔒</span>}
              label="Your data is secure"
              size="small"
              sx={{
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.6)",
                border: "none",
                fontSize: "0.75rem",
              }}
            />
            <Chip
              icon={<span style={{ fontSize: "0.75rem" }}>🌍</span>}
              label="Available worldwide"
              size="small"
              sx={{
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.6)",
                border: "none",
                fontSize: "0.75rem",
              }}
            />
            <Chip
              icon={<span style={{ fontSize: "0.75rem" }}>🤖</span>}
              label="AI-Powered"
              size="small"
              sx={{
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.6)",
                border: "none",
                fontSize: "0.75rem",
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
