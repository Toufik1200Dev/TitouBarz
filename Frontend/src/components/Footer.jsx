import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Send,
  FitnessCenter,
  LocalShipping,
  Security,
  Support,
} from '@mui/icons-material';

const footerLinks = {
  products: [
    { label: 'Pull-Up Bars', href: '/products/pull-up-bars' },
    { label: 'Parallel Bars', href: '/products/parallel-bars' },
    { label: 'Gymnastic Rings', href: '/products/rings' },
    { label: 'Resistance Bands', href: '/products/bands' },
    { label: 'Training Mats', href: '/products/mats' },
    { label: 'Weighted Vests', href: '/products/vests' },
  ],
  training: [
    { label: 'Workout Plans', href: '/training/plans' },
    { label: 'Video Tutorials', href: '/training/videos' },
    { label: 'Exercise Library', href: '/training/exercises' },
    { label: 'Training Programs', href: '/training/programs' },
    { label: 'Nutrition Guide', href: '/training/nutrition' },
    { label: 'Progress Tracking', href: '/training/progress' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Installation Guide', href: '/installation' },
    { label: 'FAQ', href: '/faq' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: <Facebook />, href: '#', label: 'Facebook' },
  { icon: <Twitter />, href: '#', label: 'Twitter' },
  { icon: <Instagram />, href: '#', label: 'Instagram' },
  { icon: <YouTube />, href: '#', label: 'YouTube' },
  { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
];

const features = [
  {
    icon: <FitnessCenter />,
    title: 'Premium Quality',
    description: 'Built to last with high-grade materials',
  },
  {
    icon: <LocalShipping />,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: <Security />,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: <Support />,
    title: '24/7 Support',
    description: 'Expert help when you need it',
  },
];

export default function Footer() {
  return (
    <Box sx={{ background: 'var(--dark-gradient)', color: 'white' }}>
      {/* Newsletter Section */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '900',
                  mb: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Stay Updated
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                Get the latest training tips, new products, and exclusive offers delivered to your inbox.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  size="large"
                  sx={{
                    flex: 1,
                    minWidth: '250px',
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--accent-color)',
                      },
                      '& input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  sx={{
                    background: 'var(--accent-gradient)',
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    transition: 'var(--transition)',
                    '&:hover': {
                      background: 'var(--secondary-gradient)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '900',
                  mb: 2,
                  background: 'var(--primary-gradient)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                TitouBarz
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 3, lineHeight: 1.7 }}>
                Your trusted partner in calisthenics equipment. We provide premium quality training gear 
                for athletes and fitness enthusiasts who demand excellence.
              </Typography>
              
              {/* Contact Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: 'var(--accent-color)' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    123 Fitness Street, Sports City, SC 12345
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2, color: 'var(--accent-color)' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 2, color: 'var(--accent-color)' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    info@titoubarz.com
                  </Typography>
                </Box>
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    sx={{
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'var(--transition)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>
                  Products
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.products.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'var(--transition)',
                        '&:hover': {
                          color: 'var(--accent-color)',
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>
                  Training
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.training.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'var(--transition)',
                        '&:hover': {
                          color: 'var(--accent-color)',
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>
                  Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.support.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'var(--transition)',
                        '&:hover': {
                          color: 'var(--accent-color)',
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.company.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'var(--transition)',
                        '&:hover': {
                          color: 'var(--accent-color)',
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ background: 'rgba(255, 255, 255, 0.05)', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 'var(--border-radius)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'var(--transition)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'var(--accent-gradient)',
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: '600', mb: 0.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 Shoppy-Barz. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="/privacy"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'var(--transition)',
                  '&:hover': {
                    color: 'var(--accent-color)',
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'var(--transition)',
                  '&:hover': {
                    color: 'var(--accent-color)',
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'var(--transition)',
                  '&:hover': {
                    color: 'var(--accent-color)',
                  },
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
