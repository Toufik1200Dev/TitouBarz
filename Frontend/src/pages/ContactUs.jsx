import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Send,
  ContactSupport,
} from '@mui/icons-material';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Phone',
      details: ['+213782442033'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Email sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Email',
      details: ['titoubarz@gmail.com', 'rahmanitoufik1200@gmail.com'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: 'white' }} />,
      title: 'Address',
      details: ['Algiers', ' Bab Ezzouar Douzi'],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook', url: '#', color: '#1877f2' },
    { icon: <Instagram />, name: 'Instagram', url: 'https://www.instagram.com/toufik_titouu/', color: '#e4405f' },
    { icon: <Tiktok />, name: 'Tiktok', url: 'https://www.tiktok.com/@toufiktitou911', color: '#1da1f2' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'var(--primary-gradient)',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              zIndex: 1,
              animation: 'fadeInUp 0.8s ease-out',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <ContactSupport sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: '900',
                mb: 3,
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Get In Touch / تواصل معنا
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Have questions about our sports equipment? We're here to help!
              Reach out to us and we'll get back to you as soon as possible.
              <br />
              هل لديك أسئلة حول معداتنا الرياضية؟ نحن هنا للمساعدة!
              تواصل معنا وسنرد عليك في أقرب وقت ممكن.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                animation: 'slideInLeft 0.8s ease-out',
                '@keyframes slideInLeft': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateX(-30px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 5,
                  fontWeight: '800',
                  background: 'var(--primary-gradient)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Contact Information / معلومات الاتصال
              </Typography>

              <Box sx={{ mb: 5 }}>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: 4,
                      background: info.color,
                      borderRadius: 3,
                      border: 'none',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                      },
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes slideInUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(30px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, color: 'white' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.2)',
                            mr: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: '700', color: 'white' }}>
                          {info.title}
                        </Typography>
                      </Box>
                      {info.details.map((detail, detailIndex) => (
                        <Typography
                          key={detailIndex}
                          variant="body1"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: detailIndex < info.details.length - 1 ? 1 : 0,
                            fontSize: '1.1rem',
                            fontWeight: 500,
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Social Links */}
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  fontWeight: '700',
                  color: 'text.primary',
                }}
              >
                Follow Us / تابعنا
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      p: 2.5,
                      background: 'white',
                      border: '2px solid rgba(0,0,0,0.05)',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px) scale(1.1)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        background: social.color,
                        color: 'white',
                        borderColor: social.color,
                      },
                      animation: `bounceIn 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes bounceIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'scale(0.3)',
                        },
                        '50%': {
                          opacity: 1,
                          transform: 'scale(1.05)',
                        },
                        '70%': {
                          transform: 'scale(0.9)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'scale(1)',
                        },
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                animation: 'slideInRight 0.8s ease-out',
                '@keyframes slideInRight': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateX(30px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 5,
                  fontWeight: '800',
                  background: 'var(--primary-gradient)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Send Us a Message / أرسل لنا رسالة
              </Typography>

              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 5,
                  background: 'white',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  animation: 'slideInUp 0.8s ease-out 0.2s both',
                  '@keyframes slideInUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name / الاسم الكامل"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email / البريد الإلكتروني"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject / الموضوع"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message / الرسالة"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        background: 'var(--primary-gradient)',
                        borderRadius: '50px',
                        px: 6,
                        py: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                          background: 'var(--secondary-gradient)',
                        },
                        '&:active': {
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      Send Message / إرسال الرسالة
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 6,
              fontWeight: '800',
              textAlign: 'center',
              background: 'var(--primary-gradient)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Find Us / اعثر علينا
          </Typography>
          <Card
            sx={{
              background: 'white',
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              animation: 'fadeIn 1s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                height: 450,
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                },
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                <LocationOn sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
                <Typography variant="h4" sx={{ fontWeight: '700', mb: 2 }}>
                  TitouBarz Store
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  123 Sports Street, Algiers, Algeria 16000
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  Open: Monday - Saturday, 9:00 AM - 8:00 PM
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
