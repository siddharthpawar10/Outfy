import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  CardActions,
  Stack,
  Divider,
} from '@mui/material';
import { FilterList, Close, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../context/CartContext';

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Enhanced mock products with diverse images for all categories
  const mockProducts: Product[] = [
    // Men's Fashion
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 799,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
      category: 'men',
      description: 'Premium cotton t-shirt with perfect fit',
      rating: 4.5,
      reviews: 128,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
      brand: 'ComfortWear'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format',
      category: 'men',
      description: 'Modern slim fit jeans with stretch comfort',
      rating: 4.3,
      reviews: 89,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Dark Blue', 'Light Blue', 'Black', 'Gray'],
      brand: 'DenimCraft'
    },
    {
      id: 3,
      name: 'Formal Dress Shirt',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&auto=format',
      category: 'men',
      description: 'Crisp formal shirt for professional look',
      rating: 4.7,
      reviews: 156,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Light Blue', 'Pink', 'Gray'],
      brand: 'FormalFit'
    },
    {
      id: 4,
      name: 'Casual Polo Shirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&auto=format',
      category: 'men',
      description: 'Comfortable polo shirt for casual occasions',
      rating: 4.2,
      reviews: 203,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Navy', 'White', 'Red', 'Green', 'Black'],
      brand: 'PoloStyle'
    },
    {
      id: 5,
      name: 'Chino Pants',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&auto=format',
      category: 'men',
      description: 'Stylish chino pants for smart casual look',
      rating: 4.5,
      reviews: 134,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Khaki', 'Navy', 'Black', 'Olive', 'Brown'],
      brand: 'ChiStyle'
    },

    // Women's Fashion
    {
      id: 13,
      name: 'Floral Summer Dress',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&auto=format',
      category: 'women',
      description: 'Beautiful floral dress perfect for summer',
      rating: 4.6,
      reviews: 187,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue', 'Yellow', 'White', 'Green'],
      brand: 'FloralFashion'
    },
    {
      id: 14,
      name: 'Elegant Blouse',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&auto=format',
      category: 'women',
      description: 'Sophisticated blouse for office wear',
      rating: 4.4,
      reviews: 142,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy', 'Cream', 'Pink'],
      brand: 'OfficeChic'
    },
    {
      id: 15,
      name: 'High-Waist Jeans',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&auto=format',
      category: 'women',
      description: 'Trendy high-waist jeans with perfect fit',
      rating: 4.7,
      reviews: 298,
      sizes: ['24', '26', '28', '30', '32', '34'],
      colors: ['Dark Blue', 'Light Blue', 'Black', 'White'],
      brand: 'TrendyDenim'
    },
    {
      id: 16,
      name: 'Knit Cardigan',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&auto=format',
      category: 'women',
      description: 'Cozy knit cardigan for layering',
      rating: 4.3,
      reviews: 156,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Beige', 'Gray', 'Pink', 'Navy', 'Cream'],
      brand: 'CozyKnits'
    },
    {
      id: 17,
      name: 'Maxi Skirt',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=400&fit=crop&auto=format',
      category: 'women',
      description: 'Flowing maxi skirt for elegant look',
      rating: 4.5,
      reviews: 203,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy', 'Olive', 'Brown'],
      brand: 'ElegantFlow'
    },

    // Kids Collection
    {
      id: 18,
      name: 'Colorful T-Shirt',
      price: 599,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&auto=format',
      category: 'kids',
      description: 'Fun and colorful t-shirt for kids',
      rating: 4.8,
      reviews: 234,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: ['Red', 'Blue', 'Yellow', 'Green', 'Pink'],
      brand: 'KidsJoy'
    },
    {
      id: 19,
      name: 'Denim Overalls',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop&auto=format',
      category: 'kids',
      description: 'Adorable denim overalls for playtime',
      rating: 4.6,
      reviews: 178,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: ['Light Blue', 'Dark Blue', 'Black'],
      brand: 'PlayDenim'
    },
    {
      id: 20,
      name: 'Princess Dress',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop&auto=format',
      category: 'kids',
      description: 'Beautiful princess dress for special occasions',
      rating: 4.9,
      reviews: 312,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: ['Pink', 'Purple', 'Blue', 'White', 'Yellow'],
      brand: 'PrincessWear'
    },

    // Accessories
    {
      id: 21,
      name: 'Leather Handbag',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&auto=format',
      category: 'accessories',
      description: 'Premium leather handbag with elegant design',
      rating: 4.7,
      reviews: 145,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Tan', 'Navy', 'Red'],
      brand: 'LuxuryBags'
    },
    {
      id: 22,
      name: 'Classic Watch',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&auto=format',
      category: 'accessories',
      description: 'Elegant timepiece for any occasion',
      rating: 4.8,
      reviews: 89,
      sizes: ['One Size'],
      colors: ['Silver', 'Gold', 'Black', 'Rose Gold'],
      brand: 'TimeClassic'
    },
    {
      id: 23,
      name: 'Designer Sunglasses',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
      category: 'accessories',
      description: 'Stylish sunglasses with UV protection',
      rating: 4.5,
      reviews: 167,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Gold', 'Silver'],
      brand: 'SunStyle'
    },

    // Footwear
    {
      id: 24,
      name: 'Running Sneakers',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format',
      category: 'footwear',
      description: 'Comfortable running shoes with advanced cushioning',
      rating: 4.6,
      reviews: 234,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Gray', 'Blue', 'Red'],
      brand: 'RunFast'
    },
    {
      id: 25,
      name: 'Leather Boots',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop&auto=format',
      category: 'footwear',
      description: 'Durable leather boots for all seasons',
      rating: 4.7,
      reviews: 156,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['Brown', 'Black', 'Tan'],
      brand: 'BootCraft'
    },
    {
      id: 26,
      name: 'Casual Sandals',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop&auto=format',
      category: 'footwear',
      description: 'Comfortable sandals for summer wear',
      rating: 4.3,
      reviews: 198,
      sizes: ['6', '7', '8', '9', '10', '11'],
      colors: ['Brown', 'Black', 'Tan', 'White'],
      brand: 'SummerStep'
    },

    // Sports & Fitness
    {
      id: 27,
      name: 'Athletic Shorts',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format',
      category: 'sports',
      description: 'Breathable shorts for workout sessions',
      rating: 4.4,
      reviews: 187,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Gray', 'Red', 'Blue'],
      brand: 'FitGear'
    },
    {
      id: 28,
      name: 'Sports Bra',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400&h=400&fit=crop&auto=format',
      category: 'sports',
      description: 'Supportive sports bra for active lifestyle',
      rating: 4.6,
      reviews: 234,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Pink', 'Purple', 'Gray', 'White'],
      brand: 'ActiveFit'
    },
    {
      id: 29,
      name: 'Yoga Leggings',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400&h=400&fit=crop&auto=format',
      category: 'sports',
      description: 'Flexible leggings perfect for yoga and fitness',
      rating: 4.8,
      reviews: 312,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Purple', 'Gray', 'Pink'],
      brand: 'YogaFlex'
    },
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-1000':
          filtered = filtered.filter(product => product.price < 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price <= 2000);
          break;
        case '2000-5000':
          filtered = filtered.filter(product => product.price > 2000 && product.price <= 5000);
          break;
        case 'above-5000':
          filtered = filtered.filter(product => product.price > 5000);
          break;
      }
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, category, searchQuery, priceRange, selectedBrand, sortBy]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (product: Product) => {
    // Add to cart functionality would be implemented here
    console.log('Adding to cart:', product);
    // You can integrate with your cart context here
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'men': return 'Men\'s Fashion';
      case 'women': return 'Women\'s Fashion';
      case 'kids': return 'Kids Collection';
      case 'accessories': return 'Accessories';
      case 'footwear': return 'Footwear';
      case 'sports': return 'Sports & Fitness';
      default: return 'All Products';
    }
  };

  const brands = Array.from(new Set(products.map(product => product.brand)));

  const FilterContent = () => (
    <Box sx={{ p: 3, minWidth: 280 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Filters
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Search */}
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Price Range */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Price Range</InputLabel>
        <Select
          value={priceRange}
          label="Price Range"
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="under-1000">Under ₹1,000</MenuItem>
          <MenuItem value="1000-2000">₹1,000 - ₹2,000</MenuItem>
          <MenuItem value="2000-5000">₹2,000 - ₹5,000</MenuItem>
          <MenuItem value="above-5000">Above ₹5,000</MenuItem>
        </Select>
      </FormControl>

      {/* Brand */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Brand</InputLabel>
        <Select
          value={selectedBrand}
          label="Brand"
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <MenuItem value="all">All Brands</MenuItem>
          {brands.map(brand => (
            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort By */}
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="name">Name (A-Z)</MenuItem>
          <MenuItem value="price-low">Price (Low to High)</MenuItem>
          <MenuItem value="price-high">Price (High to Low)</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 2,
          }}
        >
          {getCategoryTitle()}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover {filteredProducts.length} amazing products in our collection
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Desktop Filters */}
        {!isMobile && (
          <Grid item md={3}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <FilterContent />
            </Box>
          </Grid>
        )}

        {/* Products Grid */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          {/* Mobile Filter Button */}
          {isMobile && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilterDrawerOpen(true)}
              >
                Filters & Sort
              </Button>
              <Typography variant="body2" color="text.secondary">
                {filteredProducts.length} products
              </Typography>
            </Box>
          )}

          {/* Products Grid */}
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} lg={4} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 12px 32px rgba(0,0,0,0.15)',
                    },
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="280"
                      image={product.image}
                      alt={product.name}
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                      }}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favorites.has(product.id) ? (
                        <Favorite sx={{ color: 'red' }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <Chip
                      label={`₹${product.price}`}
                      color="primary"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' }
                      }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Brand: <strong>{product.brand}</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {product.colors.slice(0, 3).map((color, index) => (
                        <Chip
                          key={index}
                          label={color}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <Chip
                          label={`+${product.colors.length - 3}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => handleAddToCart(product)}
                        sx={{ 
                          flexGrow: 1,
                          borderRadius: 2,
                          fontWeight: 'bold',
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{ 
                          borderRadius: 2,
                          fontWeight: 'bold',
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your filters or search terms
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Filters & Sort
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <FilterContent />
      </Drawer>
    </Container>
  );
};

export default Products;