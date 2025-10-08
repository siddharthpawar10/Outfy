import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Favorite,
  Close,
  Store,
  Category,
  LocalOffer,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const categories = [
    { name: 'Men', path: '/products/men', icon: <Person /> },
    { name: 'Women', path: '/products/women', icon: <Person /> },
    { name: 'Kids', path: '/products/kids', icon: <Person /> },
    { name: 'Accessories', path: '/products/accessories', icon: <LocalOffer /> },
    { name: 'Footwear', path: '/products/footwear', icon: <Store /> },
  ];

  const mobileDrawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          OUTFY
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.name}
            onClick={() => {
              navigate(category.path);
              handleDrawerToggle();
            }}
            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {category.icon}
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem
          onClick={() => {
            navigate('/cart');
            handleDrawerToggle();
          }}
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ListItemIcon sx={{ color: 'primary.main' }}>
            <Badge badgeContent={state.items.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Shopping Cart" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          boxShadow: '0px 4px 20px rgba(26, 35, 126, 0.3)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ 
              flexGrow: 0, 
              fontWeight: 'bold',
              cursor: 'pointer',
              color: 'white',
              letterSpacing: '0.1em',
              fontSize: { xs: '1.5rem', md: '1.75rem' }
            }}
            onClick={() => navigate('/')}
          >
            OUTFY
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 6 }}>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  color="inherit"
                  sx={{ 
                    mx: 1, 
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.1),
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => navigate(category.path)}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Search sx={{ mr: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.1),
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Favorite />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Person />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => navigate('/cart')}
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Badge 
                  badgeContent={state.items.length} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff6f00',
                      color: 'white',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
};

export default Header;