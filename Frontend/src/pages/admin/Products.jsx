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

  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const images = Array.isArray(prev.images) ? [...prev.images] : [];
      images[index] = value;
      return { ...prev, images };
    });
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth required />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Price" value={form.price} onChange={handleChange('price')} fullWidth required type="number" inputProps={{ step: '0.01' }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Original Price" value={form.originalPrice} onChange={handleChange('originalPrice')} fullWidth type="number" inputProps={{ step: '0.01' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Category" value={form.category} onChange={handleChange('category')} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Stock Quantity" value={form.stockQuantity} onChange={handleChange('stockQuantity')} fullWidth type="number" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline minRows={3} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Images (URLs)</Typography>
          <Grid container spacing={1}>
            {(form.images || []).map((url, idx) => (
              <Grid item xs={12} key={idx}>
                <TextField
                  value={url}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  placeholder="https://..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button color="error" onClick={() => removeImageField(idx)}>Remove</Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={addImageField} startIcon={<AddIcon />}>Add Image</Button>
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={onCancel} variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
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
      const res = await productsAPI.getAll();
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
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Products</Typography>
          <Typography variant="body2" color="text.secondary">Manage catalog, add, edit and delete products</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>Add Product</Button>
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

      <TableContainer component={Paper}>
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

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editing?.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          {editing && (
            <ProductForm initialValue={editing} onSubmit={handleSubmit} onCancel={closeDialog} isSubmitting={submitting} />
          )}
        </DialogContent>
        <DialogActions />
      </Dialog>
    </Container>
  );
}


