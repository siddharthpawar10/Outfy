import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c3e50',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              OUTFY
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Your one-stop destination for trendy and affordable fashion. 
              Discover the latest styles and express your unique personality.
            </Typography>
            <Box>
              <IconButton sx={{ color: 'white', p: 0.5 }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', p: 0.5 }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', p: 0.5 }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white', p: 0.5 }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Home
              </Link>
              <Link href="/products" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                All Products
              </Link>
              <Link href="/products/men" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Men's Fashion
              </Link>
              <Link href="/products/women" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Women's Fashion
              </Link>
              <Link href="/products/kids" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Kids Collection
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Size Guide
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Shipping Info
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                Returns & Exchanges
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1, textDecoration: 'none', opacity: 0.8 }}>
                FAQ
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                support@outfy.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                123 Fashion Street, NY 10001
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 OUTFY. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: 'none', opacity: 0.8 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: 'none', opacity: 0.8 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;