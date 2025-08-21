import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  Search as SearchIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { productsAPI, apiUtils } from '../../services/api';

const placeholderImage = '/placeholder.svg?height=120&width=120';

function normalizeProductFromApi(apiProduct) {
  if (!apiProduct) return null;
  const firstImage = Array.isArray(apiProduct.images) && apiProduct.images.length > 0
    ? apiProduct.images[0]
    : apiProduct.image || placeholderImage;
  return {
    id: apiProduct._id || apiProduct.id,
    name: apiProduct.name || '',
    price: String(apiProduct.price ?? ''),
    originalPrice: apiProduct.originalPrice ? String(apiProduct.originalPrice) : '',
    description: apiProduct.description || '',
    category: apiProduct.category || '',
    images: Array.isArray(apiProduct.images) ? apiProduct.images : (apiProduct.image ? [apiProduct.image] : []),
    image: firstImage,
    stockQuantity: apiProduct.stockQuantity ?? 0,
    inStock: apiProduct.inStock ?? (apiProduct.stockQuantity > 0),
    isFeatured: apiProduct.isFeatured ?? false,
    rating: apiProduct.rating ?? 4.8,
    reviews: apiProduct.reviews ?? '0+',
  };
}

function ProductForm({ initialValue, onSubmit, onCancel, isSubmitting }) {
  const [form, setForm] = useState(() => initialValue);

  useEffect(() => {
    setForm(initialValue);
  }, [initialValue]);

  const handleChange = (field) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [uploadingImages, setUploadingImages] = useState([]);

  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const images = Array.isArray(prev.images) ? [...prev.images] : [];
      images[index] = value;
      return { ...prev, images };
    });
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    
    // Set uploading state
    setUploadingImages(prev => ({ ...prev, [index]: true }));
    
    try {
      const result = await productsAPI.uploadImage(file);
      const imageUrl = result.data?.url || result.url;
      
      if (imageUrl) {
        handleImageChange(index, imageUrl);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [index]: false }));
    }
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), ''] }));
  };

  const removeImageField = (index) => {
    setForm((prev) => {
      const images = [...(prev.images || [])];
      images.splice(index, 1);
      return { ...prev, images };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Price" value={form.price} onChange={handleChange('price')} fullWidth required type="number" inputProps={{ step: '0.01' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Original Price" value={form.originalPrice} onChange={handleChange('originalPrice')} fullWidth type="number" inputProps={{ step: '0.01' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Category" value={form.category} onChange={handleChange('category')} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Stock Quantity" value={form.stockQuantity} onChange={handleChange('stockQuantity')} fullWidth type="number" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline minRows={3} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Product Images</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Upload images directly or provide URLs. Images will be stored in Cloudinary.
          </Typography>
                     <Grid container spacing={{ xs: 1, sm: 2 }}>
             {(form.images || []).map((url, idx) => (
               <Grid item xs={12} sm={6} key={idx}>
                <Box sx={{ border: '2px dashed #ddd', borderRadius: 2, p: 2, textAlign: 'center' }}>
                  {/* Image Preview */}
                  {url && (
                    <Box sx={{ mb: 2 }}>
                      <img 
                        src={url} 
                        alt={`Product ${idx + 1}`} 
                        style={{ 
                          width: '100%', 
                          height: '150px', 
                          objectFit: 'cover', 
                          borderRadius: 8 
                        }} 
                      />
                    </Box>
                  )}
                  
                  {/* File Upload Input */}
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`image-upload-${idx}`}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(idx, file);
                      }
                    }}
                  />
                  <label htmlFor={`image-upload-${idx}`}>
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={uploadingImages[idx] ? <ImageIcon /> : <CloudUploadIcon />}
                      disabled={uploadingImages[idx]}
                      sx={{ mb: 1 }}
                    >
                      {uploadingImages[idx] ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </label>
                  
                  {/* URL Input */}
                  <TextField
                    value={url}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="Or enter image URL..."
                    fullWidth
                    size="small"
                    sx={{ mt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  {/* Remove Button */}
                  <Button 
                    color="error" 
                    size="small" 
                    onClick={() => removeImageField(idx)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={addImageField} startIcon={<AddIcon />} variant="outlined">
                Add Another Image
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControlLabel control={<Switch checked={!!form.inStock} onChange={handleChange('inStock')} />} label="In Stock" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel control={<Switch checked={!!form.isFeatured} onChange={handleChange('isFeatured')} />} label="Featured" />
        </Grid>
      </Grid>

             <Box sx={{ 
         display: 'flex', 
         flexDirection: { xs: 'column', sm: 'row' },
         justifyContent: 'flex-end', 
         gap: { xs: 1, sm: 2 }, 
         mt: 3 
       }}>
         <Button 
           onClick={onCancel} 
           variant="outlined"
           fullWidth={{ xs: true, sm: false }}
           sx={{ order: { xs: 2, sm: 1 } }}
         >
           Cancel
         </Button>
         <Button 
           type="submit" 
           variant="contained" 
           disabled={isSubmitting}
           fullWidth={{ xs: true, sm: false }}
           sx={{ order: { xs: 1, sm: 2 } }}
         >
           Save
         </Button>
       </Box>
    </Box>
  );
}

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p => (p.name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q));
  }, [products, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getAllProducts();
      const list = res?.data?.products || res?.data || [];
      setProducts(list.map(normalizeProductFromApi).filter(Boolean));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreate = () => {
    setEditing({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      category: '',
      images: [''],
      stockQuantity: 0,
      inStock: true,
      isFeatured: false,
    });
    setDialogOpen(true);
  };

  const openEdit = (product) => {
    setEditing({ ...product, images: product.images || (product.image ? [product.image] : []) });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
        description: form.description,
        category: form.category,
        images: (form.images || []).filter(Boolean),
        stockQuantity: parseInt(form.stockQuantity || 0, 10),
        inStock: !!form.inStock,
        isFeatured: !!form.isFeatured,
      };

      if (editing && editing.id) {
        await productsAPI.update(editing.id, payload);
      } else {
        await productsAPI.create(payload);
      }

      await loadProducts();
      closeDialog();
    } catch (error) {
      const { message } = apiUtils.handleError(error);
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productsAPI.delete(id);
      await loadProducts();
    } catch (error) {
      const { message } = apiUtils.handleError(error);
      alert(message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' }, 
        justifyContent: 'space-between', 
        mb: 3,
        gap: { xs: 2, sm: 0 }
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>Products</Typography>
          <Typography variant="body2" color="text.secondary">Manage catalog, add, edit and delete products</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={openCreate}
          fullWidth={{ xs: true, sm: false }}
          sx={{ minWidth: { sm: 'auto' } }}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
      </Paper>

            {/* Mobile Card View */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {filtered.map((p) => (
          <Paper key={p.id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <img 
                src={p.image || placeholderImage} 
                alt={p.name} 
                style={{ 
                  width: 80, 
                  height: 80, 
                  objectFit: 'cover', 
                  borderRadius: 8,
                  flexShrink: 0
                }} 
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{p.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {p.description?.slice(0, 80)}...
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label={p.category} size="small" variant="outlined" />
                  <Chip 
                    label={p.inStock ? 'In Stock' : 'Out of Stock'} 
                    color={p.inStock ? 'success' : 'default'} 
                    size="small" 
                  />
                  {p.isFeatured && (
                    <Chip label="Featured" color="primary" size="small" />
                  )}
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {Number(p.price).toFixed(2)} DA
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => openEdit(p)}
                    sx={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(p.id)}
                    sx={{ flex: 1 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
        {filtered.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">No products found</Typography>
          </Paper>
        )}
      </Box>

      {/* Desktop Table View */}
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <img src={p.image || placeholderImage} alt={p.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{p.description?.slice(0, 60)}</Typography>
                </TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{Number(p.price).toFixed(2)} DA</TableCell>
                <TableCell>
                  {p.inStock ? <Chip label="In Stock" color="success" size="small" /> : <Chip label="Out" color="default" size="small" />}
                </TableCell>
                <TableCell>
                  {p.isFeatured ? <Chip label="Yes" color="primary" size="small" /> : <Chip label="No" size="small" />}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => openEdit(p)} size="small"><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(p.id)} size="small" color="error"><DeleteIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={dialogOpen} 
        onClose={closeDialog} 
        maxWidth="md" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 2, sm: 'auto' },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '600px' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2.5 }
        }}>
          {editing?.id ? 'Edit Product' : 'Add Product'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          {editing && (
            <ProductForm initialValue={editing} onSubmit={handleSubmit} onCancel={closeDialog} isSubmitting={submitting} />
          )}
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2.5 } }} />
      </Dialog>
    </Container>
  );
}


