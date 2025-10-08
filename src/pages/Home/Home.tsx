import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  LocalShipping, 
  Security, 
  Support, 
  TrendingUp,
  Verified,
  FlashOn,
  ArrowForward,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const featuredCategories = [
    {
      id: 1,
      name: 'Men\'s Fashion',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop&auto=format',
      discount: '50% OFF',
      path: '/products/men',
      description: 'Trendy shirts, pants & accessories'
    },
    {
      id: 2,
      name: 'Women\'s Fashion',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop&auto=format',
      discount: '40% OFF',
      path: '/products/women',
      description: 'Elegant dresses, tops & more'
    },
    {
      id: 3,
      name: 'Kids Collection',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=300&fit=crop&auto=format',
      discount: '30% OFF',
      path: '/products/kids',
      description: 'Comfortable & colorful outfits'
    },
    {
      id: 4,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&auto=format',
      discount: '25% OFF',
      path: '/products/accessories',
      description: 'Bags, watches & jewelry'
    },
    {
      id: 5,
      name: 'Footwear',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format',
      discount: '35% OFF',
      path: '/products/footwear',
      description: 'Sneakers, boots & sandals'
    },
    {
      id: 6,
      name: 'Sports & Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
      discount: '45% OFF',
      path: '/products/sports',
      description: 'Athletic wear & equipment'
    },
  ];

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders above ₹999',
      color: '#e3f2fd'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: 'success.main' }} />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: '#e8f5e8'
    },
    {
      icon: <Support sx={{ fontSize: 48, color: 'warning.main' }} />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: '#fff3e0'
    },
    {
      icon: <Verified sx={{ fontSize: 48, color: 'info.main' }} />,
      title: 'Quality Assured',
      description: 'Premium quality products guaranteed',
      color: '#e1f5fe'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality and fast delivery! Love shopping here.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Great variety and excellent customer service.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'
    },
    {
      name: 'Emily Davis',
      rating: 4,
      comment: 'Stylish clothes at affordable prices. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
            }}
          >
            Fashion That Speaks You
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Discover the latest trends in fashion with unbeatable prices and premium quality
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: 'secondary.main',
                '&:hover': { 
                  backgroundColor: 'secondary.dark',
                  transform: 'translateY(-2px)',
                },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<TrendingUp />}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { 
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/products')}
            >
              Trending Now
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            Featured Categories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Explore our curated collection of fashion essentials for every style and occasion
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {featuredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0px 12px 32px rgba(0,0,0,0.15)',
                  },
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
                onClick={() => navigate(category.path)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={category.image}
                    alt={category.name}
                    sx={{ 
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <Chip
                    label={category.discount}
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    size="medium" 
                    color="primary"
                    endIcon={<ArrowForward />}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Explore Collection
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
              }}
            >
              Why Choose OUTFY?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Experience the best in fashion retail with our premium services
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: feature.color,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Customer Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join thousands of satisfied customers who love shopping with us
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={testimonial.avatar} 
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "{testimonial.comment}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FlashOn sx={{ fontSize: 64, mb: 2, color: 'secondary.main' }} />
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Stay Updated
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe to our newsletter and get 20% off on your first order plus exclusive deals
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'secondary.main',
                '&:hover': { 
                  backgroundColor: 'secondary.dark',
                  transform: 'translateY(-2px)',
                },
                px: 4,
                py: 1.5,
                borderRadius: 3,
                transition: 'all 0.3s ease',
              }}
              onClick={() => {
                // Add newsletter subscription functionality
                alert('Newsletter subscription feature coming soon!');
              }}
            >
              Subscribe Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { 
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                px: 4,
                py: 1.5,
                borderRadius: 3,
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;