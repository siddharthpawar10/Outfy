import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Looks like you haven't added any items to your cart yet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{
            backgroundColor: '#ff6b35',
            '&:hover': {
              backgroundColor: '#e55a2b',
            },
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {state.items.map((item) => (
            <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip label={`Size: ${item.selectedSize}`} size="small" />
                      <Chip label={`Color: ${item.selectedColor}`} size="small" />
                    </Box>
                    <Typography variant="h6" color="primary">
                      ₹{item.price.toLocaleString()}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        size="small"
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <IconButton
                        onClick={() => removeItem(item.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{state.total.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax:</Typography>
                <Typography>₹{Math.round(state.total * 0.18).toLocaleString()}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ₹{Math.round(state.total * 1.18).toLocaleString()}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ 
                mb: 2,
                backgroundColor: '#ff6b35',
                '&:hover': {
                  backgroundColor: '#e55a2b',
                },
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
              onClick={() => {
                // Add checkout functionality here
                alert('Checkout functionality will be implemented soon!');
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/products')}
              sx={{
                borderColor: '#ff6b35',
                color: '#ff6b35',
                '&:hover': {
                  borderColor: '#e55a2b',
                  backgroundColor: 'rgba(255, 107, 53, 0.04)',
                },
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;