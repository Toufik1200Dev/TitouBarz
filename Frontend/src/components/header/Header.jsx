import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  Container,
} from "@mui/material";
import { Menu as MenuIcon, Store as StoreIcon, ShoppingCart, FitnessCenter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import logo from "../../assets/logo/logo.jpg";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (href) => {
    navigate(href);
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        color: "text.primary",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        transition: "var(--transition)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1, px: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              transition: "var(--transition)",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => handleNavClick("/")}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <img src={logo} alt="TitouBarz Logo" style={{ width: 50, height: 45, borderRadius: '8px' }} />
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "900",
                background: "var(--primary-gradient)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                fontSize: "22px",
              }}
            >
              TitouBarz
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    position: "relative",
                    color: "text.primary",
                    fontSize: "16px",
                    fontWeight: "600",
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    borderRadius: "50px",
                    overflow: "hidden",
                    transition: "var(--transition)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "var(--primary-gradient)",
                      opacity: 0,
                      transition: "var(--transition)",
                      zIndex: -1,
                    },
                    "&:hover": {
                      color: "white",
                      transform: "translateY(-2px)",
                      boxShadow: "var(--shadow-medium)",
                      "&::before": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Cart Icon */}
              <IconButton
                onClick={() => handleNavClick("/cart")}
                sx={{
                  color: "text.primary",
                  position: "relative",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  transition: "var(--transition)",
                  "&:hover": {
                    background: "var(--primary-gradient)",
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-medium)",
                  },
                }}
              >
                <Badge 
                  badgeContent={totalItems > 0 ? totalItems : null}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "var(--secondary-color)",
                      color: "var(--primary-color)",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                      minWidth: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ 
                  color: "text.primary",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  transition: "var(--transition)",
                  "&:hover": {
                    background: "var(--primary-gradient)",
                    color: "white",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--shadow-medium)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  },
                }}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      py: 2,
                      px: 3,
                      fontSize: "16px",
                      fontWeight: 500,
                      transition: "var(--transition)",
                      "&:hover": {
                        background: "var(--primary-gradient)",
                        color: "white",
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => handleNavClick("/cart")}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: "16px",
                    fontWeight: 500,
                    transition: "var(--transition)",
                    "&:hover": {
                      background: "var(--primary-gradient)",
                      color: "white",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Badge 
                      badgeContent={totalItems > 0 ? totalItems : null}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          background: "var(--secondary-color)",
                          color: "var(--primary-color)",
                          fontWeight: "bolder",
                          fontSize: "0.75rem",
                          minWidth: "20px",
                          height: "20px",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <ShoppingCart />
                    </Badge>
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Box>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
