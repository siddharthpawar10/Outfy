import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Favorite, LocalShipping, Verified, Autorenew, Star } from '@mui/icons-material';
import { Product, useCart } from '../../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Complete product data matching Products.tsx
  const mockProducts: Product[] = [
    // Men's Fashion (15 products)
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 899,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Comfortable cotton t-shirt perfect for everyday wear',
      rating: 4.5,
      reviews: 128,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Navy', 'Gray', 'Maroon'],
      brand: 'StyleCraft'
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Classic denim jacket for a timeless look',
      rating: 4.4,
      reviews: 92,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blue', 'Black', 'Light Blue', 'Dark Blue'],
      brand: 'DenimCo'
    },
    {
      id: 3,
      name: 'Formal Shirt',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Professional formal shirt for office wear',
      rating: 4.6,
      reviews: 156,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Light Blue', 'Pink', 'Gray', 'Navy'],
      brand: 'FormalWear'
    },
    {
      id: 4,
      name: 'Casual Polo',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Comfortable polo shirt for casual occasions',
      rating: 4.3,
      reviews: 89,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Green', 'Blue', 'Black', 'White'],
      brand: 'PoloMax'
    },
    {
      id: 5,
      name: 'Chino Pants',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Stylish chino pants for smart casual look',
      rating: 4.5,
      reviews: 134,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Khaki', 'Navy', 'Black', 'Olive', 'Brown'],
      brand: 'ChiStyle'
    },
    {
      id: 6,
      name: 'Hoodie Sweatshirt',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Warm and comfortable hoodie for winter',
      rating: 4.7,
      reviews: 201,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Gray', 'Black', 'Navy', 'Maroon', 'Green'],
      brand: 'WarmWear'
    },
    {
      id: 7,
      name: 'Leather Jacket',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Premium leather jacket for style statement',
      rating: 4.8,
      reviews: 78,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Brown', 'Dark Brown'],
      brand: 'LeatherLux'
    },
    {
      id: 8,
      name: 'Track Pants',
      price: 999,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Comfortable track pants for sports and leisure',
      rating: 4.2,
      reviews: 167,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Navy', 'Blue', 'Green'],
      brand: 'SportFit'
    },
    {
      id: 9,
      name: 'Blazer',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Elegant blazer for formal occasions',
      rating: 4.6,
      reviews: 95,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Gray', 'Charcoal'],
      brand: 'EliteWear'
    },
    {
      id: 10,
      name: 'Cargo Shorts',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Practical cargo shorts with multiple pockets',
      rating: 4.1,
      reviews: 112,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Khaki', 'Olive', 'Black', 'Gray', 'Brown'],
      brand: 'CargoMax'
    },
    {
      id: 11,
      name: 'V-Neck Sweater',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Warm v-neck sweater for winter fashion',
      rating: 4.4,
      reviews: 87,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Navy', 'Gray', 'Maroon', 'Black', 'Cream'],
      brand: 'KnitWear'
    },
    {
      id: 12,
      name: 'Joggers',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Comfortable joggers for workout and casual wear',
      rating: 4.3,
      reviews: 143,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Navy', 'Charcoal', 'Blue'],
      brand: 'ActiveWear'
    },
    {
      id: 13,
      name: 'Henley T-Shirt',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Stylish henley t-shirt with button placket',
      rating: 4.5,
      reviews: 76,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Gray', 'Navy', 'Black', 'Olive'],
      brand: 'CasualFit'
    },
    {
      id: 14,
      name: 'Bomber Jacket',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Trendy bomber jacket for modern style',
      rating: 4.6,
      reviews: 104,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Olive', 'Maroon'],
      brand: 'TrendWear'
    },
    {
      id: 15,
      name: 'Linen Shirt',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      category: 'men',
      description: 'Breathable linen shirt for summer comfort',
      rating: 4.2,
      reviews: 91,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Light Blue', 'Beige', 'Pink', 'Mint'],
      brand: 'LinenLux'
    },

    // Women's Fashion (15 products)
    {
      id: 16,
      name: 'Elegant Summer Dress',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Beautiful summer dress for special occasions',
      rating: 4.8,
      reviews: 189,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Pink', 'White', 'Yellow', 'Lavender'],
      brand: 'ElegantWear'
    },
    {
      id: 17,
      name: 'Floral Maxi Dress',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Flowing maxi dress with beautiful floral print',
      rating: 4.6,
      reviews: 156,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Floral Blue', 'Floral Pink', 'Floral Green', 'Floral Red'],
      brand: 'FloralFashion'
    },
    {
      id: 18,
      name: 'Crop Top',
      price: 799,
      image: 'https://images.unsplash.com/photo-1564257577-2d5d8b3c9e8b?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Trendy crop top for casual styling',
      rating: 4.3,
      reviews: 234,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Pink', 'Red', 'Navy', 'Gray'],
      brand: 'TrendyTops'
    },
    {
      id: 19,
      name: 'High-Waist Jeans',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Stylish high-waist jeans with perfect fit',
      rating: 4.7,
      reviews: 298,
      sizes: ['26', '28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black', 'Light Blue', 'Dark Blue', 'Gray'],
      brand: 'DenimQueen'
    },
    {
      id: 20,
      name: 'Silk Blouse',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Elegant silk blouse for professional wear',
      rating: 4.5,
      reviews: 167,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Cream', 'Pink', 'Light Blue', 'Lavender'],
      brand: 'SilkStyle'
    },
    {
      id: 21,
      name: 'A-Line Skirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Classic A-line skirt for versatile styling',
      rating: 4.4,
      reviews: 145,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Gray', 'Burgundy', 'Khaki'],
      brand: 'ClassicWear'
    },
    {
      id: 22,
      name: 'Cardigan Sweater',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Cozy cardigan sweater for layering',
      rating: 4.6,
      reviews: 123,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Beige', 'Gray', 'Navy', 'Pink', 'Cream'],
      brand: 'CozyKnits'
    },
    {
      id: 23,
      name: 'Palazzo Pants',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Comfortable palazzo pants for relaxed fit',
      rating: 4.2,
      reviews: 187,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Maroon', 'Olive', 'Gray'],
      brand: 'ComfortWear'
    },
    {
      id: 24,
      name: 'Wrap Dress',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Flattering wrap dress for all occasions',
      rating: 4.7,
      reviews: 201,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Red', 'Blue', 'Green', 'Black', 'Purple'],
      brand: 'WrapStyle'
    },
    {
      id: 25,
      name: 'Denim Jacket',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Classic denim jacket for casual layering',
      rating: 4.5,
      reviews: 176,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Light Blue', 'Black', 'White'],
      brand: 'DenimChic'
    },
    {
      id: 26,
      name: 'Bodycon Dress',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Figure-hugging bodycon dress for parties',
      rating: 4.4,
      reviews: 143,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Red', 'Navy', 'Burgundy', 'Emerald'],
      brand: 'PartyWear'
    },
    {
      id: 27,
      name: 'Tunic Top',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1564257577-2d5d8b3c9e8b?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Comfortable tunic top for everyday wear',
      rating: 4.3,
      reviews: 198,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy', 'Pink', 'Mint', 'Coral'],
      brand: 'EverydayWear'
    },
    {
      id: 28,
      name: 'Leggings',
      price: 899,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Stretchy leggings for comfort and style',
      rating: 4.1,
      reviews: 267,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'Navy', 'Brown', 'Olive'],
      brand: 'FlexWear'
    },
    {
      id: 29,
      name: 'Blazer',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Professional blazer for office wear',
      rating: 4.6,
      reviews: 134,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Gray', 'Beige'],
      brand: 'ProfessionalWear'
    },
    {
      id: 30,
      name: 'Midi Skirt',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=400&h=400&fit=crop',
      category: 'women',
      description: 'Elegant midi skirt for sophisticated look',
      rating: 4.5,
      reviews: 156,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy', 'Gray', 'Olive'],
      brand: 'SophisticatedStyle'
    },

    // Kids Collection (12 products)
    {
      id: 31,
      name: 'Colorful Hoodie',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Warm and colorful hoodie for kids',
      rating: 4.3,
      reviews: 145,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Pink'],
      brand: 'KidsFun'
    },
    {
      id: 32,
      name: 'Cartoon T-Shirt',
      price: 699,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Fun cartoon printed t-shirt for children',
      rating: 4.5,
      reviews: 198,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'White'],
      brand: 'ToyWorld'
    },
    {
      id: 33,
      name: 'Denim Overalls',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Cute denim overalls for playful style',
      rating: 4.4,
      reviews: 87,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Blue', 'Light Blue', 'Black'],
      brand: 'AquaPlay'
    },
    {
      id: 34,
      name: 'Princess Dress',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Beautiful princess dress for special occasions',
      rating: 4.7,
      reviews: 156,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Pink', 'Purple', 'Blue', 'White'],
      brand: 'PrincessWear'
    },
    {
      id: 35,
      name: 'Sports Shorts',
      price: 799,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Comfortable sports shorts for active kids',
      rating: 4.2,
      reviews: 123,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Blue', 'Red', 'Green', 'Black'],
      brand: 'ActiveKids'
    },
    {
      id: 36,
      name: 'Winter Jacket',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Warm winter jacket to keep kids cozy',
      rating: 4.6,
      reviews: 134,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Navy', 'Red', 'Green', 'Purple'],
      brand: 'WarmKids'
    },
    {
      id: 37,
      name: 'Pajama Set',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Soft and comfortable pajama set for bedtime',
      rating: 4.4,
      reviews: 167,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Blue', 'Pink', 'Green', 'Yellow'],
      brand: 'SleepyTime'
    },
    {
      id: 38,
      name: 'School Uniform Shirt',
      price: 899,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Crisp white shirt for school uniform',
      rating: 4.3,
      reviews: 189,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['White', 'Light Blue'],
      brand: 'SchoolWear'
    },
    {
      id: 39,
      name: 'Tutu Skirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Adorable tutu skirt for little dancers',
      rating: 4.5,
      reviews: 98,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Pink', 'Purple', 'White', 'Blue'],
      brand: 'DanceWear'
    },
    {
      id: 40,
      name: 'Cargo Pants',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Practical cargo pants with multiple pockets',
      rating: 4.1,
      reviews: 112,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Khaki', 'Navy', 'Black', 'Olive'],
      brand: 'AdventureKids'
    },
    {
      id: 41,
      name: 'Graphic Sweatshirt',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Cool graphic sweatshirt for casual wear',
      rating: 4.4,
      reviews: 145,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Gray', 'Navy', 'Red', 'Green'],
      brand: 'CoolKids'
    },
    {
      id: 42,
      name: 'Summer Romper',
      price: 999,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      category: 'kids',
      description: 'Cute summer romper for hot days',
      rating: 4.3,
      reviews: 134,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Pink', 'Blue', 'Yellow', 'Green'],
      brand: 'SummerKids'
    },

    // Accessories (10 products)
    {
      id: 43,
      name: 'Leather Handbag',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Premium leather handbag with multiple compartments',
      rating: 4.7,
      reviews: 167,
      sizes: ['One Size'],
      colors: ['Brown', 'Black', 'Tan', 'Burgundy'],
      brand: 'LuxuryBags'
    },
    {
      id: 44,
      name: 'Designer Sunglasses',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Stylish designer sunglasses with UV protection',
      rating: 4.5,
      reviews: 234,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Gold', 'Silver'],
      brand: 'SunStyle'
    },
    {
      id: 45,
      name: 'Silk Scarf',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Elegant silk scarf for sophisticated styling',
      rating: 4.4,
      reviews: 89,
      sizes: ['One Size'],
      colors: ['Blue', 'Red', 'Green', 'Purple'],
      brand: 'SilkLux'
    },
    {
      id: 46,
      name: 'Leather Belt',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Classic leather belt with metal buckle',
      rating: 4.6,
      reviews: 156,
      sizes: ['28', '30', '32', '34', '36', '38', '40'],
      colors: ['Black', 'Brown', 'Tan'],
      brand: 'BeltCraft'
    },
    {
      id: 47,
      name: 'Crossbody Bag',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Compact crossbody bag for hands-free convenience',
      rating: 4.3,
      reviews: 198,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Navy', 'Red'],
      brand: 'HandsFree'
    },
    {
      id: 48,
      name: 'Baseball Cap',
      price: 899,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Classic baseball cap for casual style',
      rating: 4.2,
      reviews: 267,
      sizes: ['One Size'],
      colors: ['Black', 'Navy', 'Red', 'White'],
      brand: 'CapStyle'
    },
    {
      id: 49,
      name: 'Watch',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Elegant watch with leather strap',
      rating: 4.8,
      reviews: 123,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Silver', 'Gold'],
      brand: 'TimeStyle'
    },
    {
      id: 50,
      name: 'Wallet',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Genuine leather wallet with card slots',
      rating: 4.5,
      reviews: 189,
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Navy'],
      brand: 'WalletCraft'
    },
    {
      id: 51,
      name: 'Backpack',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Spacious backpack for daily use',
      rating: 4.4,
      reviews: 145,
      sizes: ['One Size'],
      colors: ['Black', 'Navy', 'Gray', 'Green'],
      brand: 'BackpackPro'
    },
    {
      id: 52,
      name: 'Jewelry Set',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      category: 'accessories',
      description: 'Beautiful jewelry set with necklace and earrings',
      rating: 4.6,
      reviews: 167,
      sizes: ['One Size'],
      colors: ['Gold', 'Silver', 'Rose Gold'],
      brand: 'JewelryLux'
    },

    // Footwear (10 products)
    {
      id: 53,
      name: 'Running Sneakers',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Comfortable running sneakers with excellent support',
      rating: 4.6,
      reviews: 256,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Blue', 'Red', 'Gray'],
      brand: 'RunnerPro'
    },
    {
      id: 54,
      name: 'Formal Shoes',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Elegant formal shoes for professional occasions',
      rating: 4.7,
      reviews: 189,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'Brown', 'Tan'],
      brand: 'FormalStep'
    },
    {
      id: 55,
      name: 'Casual Loafers',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Comfortable loafers for everyday wear',
      rating: 4.4,
      reviews: 167,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['Brown', 'Black', 'Navy', 'Tan'],
      brand: 'LoaferLux'
    },
    {
      id: 56,
      name: 'High Heels',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Elegant high heels for special occasions',
      rating: 4.5,
      reviews: 134,
      sizes: ['5', '6', '7', '8', '9', '10'],
      colors: ['Black', 'Red', 'Navy', 'Nude'],
      brand: 'HeelStyle'
    },
    {
      id: 57,
      name: 'Canvas Shoes',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Classic canvas shoes for casual style',
      rating: 4.3,
      reviews: 298,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Red', 'Blue'],
      brand: 'CanvasClassic'
    },
    {
      id: 58,
      name: 'Boots',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Sturdy boots for outdoor activities',
      rating: 4.6,
      reviews: 145,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['Brown', 'Black', 'Tan'],
      brand: 'BootCraft'
    },
    {
      id: 59,
      name: 'Sandals',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Comfortable sandals for summer wear',
      rating: 4.2,
      reviews: 234,
      sizes: ['5', '6', '7', '8', '9', '10', '11'],
      colors: ['Brown', 'Black', 'Tan', 'White'],
      brand: 'SummerStep'
    },
    {
      id: 60,
      name: 'Ballet Flats',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Comfortable ballet flats for everyday elegance',
      rating: 4.4,
      reviews: 178,
      sizes: ['5', '6', '7', '8', '9', '10'],
      colors: ['Black', 'Nude', 'Navy', 'Red'],
      brand: 'BalletStyle'
    },
    {
      id: 61,
      name: 'Sports Shoes',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Versatile sports shoes for gym and outdoor activities',
      rating: 4.5,
      reviews: 267,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Blue', 'Gray', 'Red'],
      brand: 'SportFlex'
    },
    {
      id: 62,
      name: 'Slip-on Shoes',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      category: 'footwear',
      description: 'Easy slip-on shoes for convenience and comfort',
      rating: 4.3,
      reviews: 156,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'Brown', 'Navy', 'Gray'],
      brand: 'ComfortStep'
    }
  ];

  // Size charts for different categories
  const getSizeChart = (category: string) => {
    switch (category) {
      case 'men':
      case 'women':
        return [
          { size: 'XS', chest: '32-34', waist: '26-28', hip: '34-36' },
          { size: 'S', chest: '34-36', waist: '28-30', hip: '36-38' },
          { size: 'M', chest: '36-38', waist: '30-32', hip: '38-40' },
          { size: 'L', chest: '38-40', waist: '32-34', hip: '40-42' },
          { size: 'XL', chest: '40-42', waist: '34-36', hip: '42-44' },
          { size: 'XXL', chest: '42-44', waist: '36-38', hip: '44-46' },
        ];
      case 'kids':
        return [
          { size: '2-3Y', height: '92-98cm', chest: '52-54cm', waist: '50-52cm' },
          { size: '4-5Y', height: '104-110cm', chest: '56-58cm', waist: '52-54cm' },
          { size: '6-7Y', height: '116-122cm', chest: '60-62cm', waist: '54-56cm' },
          { size: '8-9Y', height: '128-134cm', chest: '64-66cm', waist: '56-58cm' },
          { size: '10-11Y', height: '140-146cm', chest: '68-70cm', waist: '58-60cm' },
          { size: '12-13Y', height: '152-158cm', chest: '72-74cm', waist: '60-62cm' },
        ];
      case 'footwear':
        return [
          { size: '6', us: '6', uk: '5.5', eu: '39', cm: '24' },
          { size: '7', us: '7', uk: '6.5', eu: '40', cm: '25' },
          { size: '8', us: '8', uk: '7.5', eu: '41', cm: '26' },
          { size: '9', us: '9', uk: '8.5', eu: '42', cm: '27' },
          { size: '10', us: '10', uk: '9.5', eu: '43', cm: '28' },
          { size: '11', us: '11', uk: '10.5', eu: '44', cm: '29' },
          { size: '12', us: '12', uk: '11.5', eu: '45', cm: '30' },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    // Use loose equality to match string and number IDs
    const foundProduct = mockProducts.find(p => p.id === Number(id));
    console.log("Looking for product ID:", id, "Found:", foundProduct ? foundProduct.name : "No");
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    } else {
      // If product not found by exact ID, show the first product as fallback
      setProduct(mockProducts[0]);
      setSelectedSize(mockProducts[0].sizes[0]);
      setSelectedColor(mockProducts[0].colors[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          quantity,
          selectedSize,
          selectedColor,
        },
      });
      navigate('/cart');
    }
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Loading Product...
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{
              mt: 2,
              backgroundColor: '#ff6b35',
              '&:hover': {
                backgroundColor: '#e55a2b',
              },
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            Browse All Products
          </Button>
        </Box>
      </Container>
    );
  }

  const originalPrice = Math.round(product.price * 1.3);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Bestseller Badge */}
              {product.rating >= 4.5 && (
                <Chip
                  label="BESTSELLER"
                  sx={{
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                />
              )}

              {/* Brand */}
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {product.brand}
              </Typography>

              {/* Product Name */}
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                {product.name}
              </Typography>

              {/* Rating */}
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  {product.rating} ({product.reviews} reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h4" component="span" fontWeight="bold" color="primary">
                  ₹{product.price.toLocaleString()}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: 'line-through', ml: 2, color: 'text.secondary' }}
                >
                  ₹{originalPrice.toLocaleString()}
                </Typography>
                <Chip
                  label={`${discount}% OFF`}
                  color="success"
                  size="small"
                  sx={{ ml: 2, fontWeight: 'bold' }}
                />
              </Box>

              {/* Description */}
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              {/* Size Selection */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Size
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {product.sizes.map((size) => (
                    <Chip
                      key={size}
                      label={size}
                      clickable
                      variant={selectedSize === size ? 'filled' : 'outlined'}
                      color={selectedSize === size ? 'primary' : 'default'}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        fontWeight: selectedSize === size ? 'bold' : 'normal',
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  sx={{ mt: 1, textTransform: 'none' }}
                >
                  Size Chart
                </Button>
              </Box>

              {/* Color Selection */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Color
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {product.colors.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      clickable
                      variant={selectedColor === color ? 'filled' : 'outlined'}
                      color={selectedColor === color ? 'primary' : 'default'}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        fontWeight: selectedColor === color ? 'bold' : 'normal',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Quantity */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Quantity
                </Typography>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <Select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={2} mb={3}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{
                    backgroundColor: '#ff6b35',
                    '&:hover': {
                      backgroundColor: '#e55a2b',
                    },
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    px: 4,
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Favorite />}
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
                  Wishlist
                </Button>
              </Box>

              {/* Delivery Options */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  DELIVERY OPTIONS
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Free delivery on orders above ₹999
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Cash on delivery available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Easy 30-day returns and exchanges
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Size Chart */}
        {showSizeChart && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Size Chart
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {product.category === 'footwear' ? (
                      <>
                        <TableCell>Size</TableCell>
                        <TableCell>US</TableCell>
                        <TableCell>UK</TableCell>
                        <TableCell>EU</TableCell>
                        <TableCell>CM</TableCell>
                      </>
                    ) : product.category === 'kids' ? (
                      <>
                        <TableCell>Size</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>Chest</TableCell>
                        <TableCell>Waist</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Size</TableCell>
                        <TableCell>Chest</TableCell>
                        <TableCell>Waist</TableCell>
                        <TableCell>Hip</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSizeChart(product.category).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.size}</TableCell>
                      {product.category === 'footwear' ? (
                        <>
                          {'us' in row && <TableCell>{row.us}</TableCell>}
                          <TableCell>{(row as { size: string; us: string; uk: string; eu: string; cm: string; }).uk}</TableCell>
                          <TableCell>{(row as { size: string; us: string; uk: string; eu: string; cm: string }).eu}</TableCell>
                          <TableCell>{'cm' in row ? row.cm : ''}</TableCell>
                        </>
                      ) : product.category === 'kids' ? (
                        <>
                          <TableCell>{'height' in row ? row.height : '-'}</TableCell>
                          <TableCell>{'chest' in row ? row.chest : ''}</TableCell>
                          <TableCell>{'waist' in row ? row.waist : ''}</TableCell>
                        </>
                      ) : (
                        <>
                          {'chest' in row && <TableCell>{row.chest}</TableCell>}
                          {'waist' in row && <TableCell>{row.waist}</TableCell>}
                          {'hip' in row && <TableCell>{row.hip}</TableCell>}
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <Divider sx={{ my: 4 }} />

        {/* Product Specifications */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Product Specifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Brand
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.brand}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                {product.category}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Available Sizes
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.sizes.join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Available Colors
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {product.colors.join(', ')}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Highlights */}
        <Box>
          <Typography variant="h6" gutterBottom>
            HIGHLIGHTS
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocalShipping color="primary" />
                <Typography variant="body2">Free Shipping</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Verified color="primary" />
                <Typography variant="body2">Authentic Products</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Autorenew color="primary" />
                <Typography variant="body2">Replacement Policy</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Star color="primary" />
                <Typography variant="body2">Top Rated Product</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail;