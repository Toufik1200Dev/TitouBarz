import React from "react"
import { Box, Typography, Button, Container, useTheme, useMediaQuery, Chip } from "@mui/material"
import { ChevronLeft, ChevronRight, FitnessCenter, PlayArrow, Star } from "@mui/icons-material"
import pic1 from "../assets/imgs/pic1.jpg" 
import pic2 from "../assets/imgs/pic2.jpg" 
import pic3 from "../assets/imgs/pic3.jpg" 

const slides = [
  {
    id: 1,
    title: "Master Your Body Weight",
    subtitle: "Professional Calisthenics Equipment",
    description:
      "Transform your fitness journey with our premium pull-up bars, parallel bars, and training accessories designed for serious athletes.",
    image: pic1,
    buttonText: "Shop Now",
    badge: "Best Seller",
    rating: 4.9,
    reviews: "2.5k+ reviews"
  },
  {
    id: 2,
    title: "Build Strength Naturally",
    subtitle: "No Weights, No Limits",
    description: "Discover the power of bodyweight training with our expertly designed calisthenics gear for ultimate strength building.",
    image: pic3,
    buttonText: "Explore Products",
    badge: "New Arrival",
    rating: 4.8,
    reviews: "1.8k+ reviews"
  },
  {
    id: 3,
    title: "Train Like a Pro",
    subtitle: "Premium Quality Equipment",
    description: "Join thousands of athletes who trust our equipment for their calisthenics training and achieve your fitness goals.",
    image: pic2,
    buttonText: "Get Started",
    badge: "Premium",
    rating: 4.9,
    reviews: "3.2k+ reviews"
  },
]

export default function HeroSlider() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "85vh", md: "90vh" },
        overflow: "hidden",
        background: "var(--dark-gradient)",
        borderRadius: { xs: "0 0 24px 24px", md: "0 0 32px 32px" },
        boxShadow: "var(--shadow-heavy)",
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                color: "white",
                maxWidth: { xs: "100%", md: "60%" },
                textAlign: { xs: "center", md: "left" },
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Badge */}
              <Chip
                label={slide.badge}
                size="small"
                sx={{
                  mb: 2,
                  background: "var(--accent-gradient)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  height: "24px",
                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />

              {/* Rating */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      sx={{
                        fontSize: "1rem",
                        color: i < Math.floor(slide.rating) ? "#FFD700" : "rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {slide.rating} ({slide.reviews})
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: "var(--accent-color)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                {slide.subtitle}
              </Typography>
              
              <Typography
                variant={isMobile ? "h3" : "h1"}
                sx={{
                  mb: 3,
                  fontWeight: "900",
                  lineHeight: 1.1,
                  background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
                }}
              >
                {slide.title}
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: "600px",
                }}
              >
                {slide.description}
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FitnessCenter />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: "bold",
                    background: "var(--primary-gradient)",
                    boxShadow: "var(--shadow-medium)",
                    transition: "var(--transition)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "var(--shadow-heavy)",
                      background: "var(--secondary-gradient)",
                    },
                  }}
                >
                  {slide.buttonText}
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    transition: "var(--transition)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      ))}

      {/* Navigation Arrows */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 10, md: 30 },
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        <Button
          onClick={prevSlide}
          sx={{
            minWidth: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "var(--transition)",
            "&:hover": {
              background: "rgba(255,255,255,0.25)",
              transform: "scale(1.1)",
            },
          }}
        >
          <ChevronLeft />
        </Button>
      </Box>
      
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 10, md: 30 },
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        <Button
          onClick={nextSlide}
          sx={{
            minWidth: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "var(--transition)",
            "&:hover": {
              background: "rgba(255,255,255,0.25)",
              transform: "scale(1.1)",
            },
          }}
        >
          <ChevronRight />
        </Button>
      </Box>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, md: 40 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.5,
          zIndex: 3,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: index === currentSlide ? 40 : 12,
              height: 12,
              borderRadius: "6px",
              background: index === currentSlide 
                ? "var(--accent-gradient)" 
                : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "var(--transition)",
              "&:hover": {
                background: index === currentSlide 
                  ? "var(--accent-gradient)" 
                  : "rgba(255,255,255,0.7)",
              },
            }}
          />
        ))}
      </Box>

      {/* Floating elements for visual appeal */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 100,
          height: 100,
          background: "var(--accent-gradient)",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 6s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          right: "5%",
          width: 60,
          height: 60,
          background: "var(--success-gradient)",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 4s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />
    </Box>
  )
}