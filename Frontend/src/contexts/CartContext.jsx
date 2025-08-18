import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate totals whenever items change
  useEffect(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update state with calculated totals
    if (totalItems !== state.totalItems || totalPrice !== state.totalPrice) {
      dispatch({
        type: 'UPDATE_TOTALS',
        payload: { totalItems, totalPrice }
      });
    }
  }, [state.items]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('titoubarz-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('titoubarz-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Get cart totals
  const getTotalItems = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
