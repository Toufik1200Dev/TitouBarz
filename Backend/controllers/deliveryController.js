const { wilayas } = require('../data/wilayas');

// @desc    Get all wilayas
// @route   GET /api/delivery/wilayas
// @access  Public
const getWilayas = async (req, res) => {
  try {
    res.json({
      success: true,
      data: wilayas
    });
  } catch (error) {
    console.error('Error fetching wilayas:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wilayas',
      error: error.message
    });
  }
};

// @desc    Get wilaya by ID
// @route   GET /api/delivery/wilayas/:id
// @access  Public
const getWilayaById = async (req, res) => {
  try {
    const wilaya = wilayas.find(w => w.id === req.params.id);
    
    if (!wilaya) {
      return res.status(404).json({
        success: false,
        message: 'Wilaya not found'
      });
    }

    res.json({
      success: true,
      data: wilaya
    });
  } catch (error) {
    console.error('Error fetching wilaya:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wilaya',
      error: error.message
    });
  }
};

// @desc    Get communes by wilaya ID
// @route   GET /api/delivery/wilayas/:id/communes
// @access  Public
const getCommunesByWilaya = async (req, res) => {
  try {
    const wilaya = wilayas.find(w => w.id === req.params.id);
    
    if (!wilaya) {
      return res.status(404).json({
        success: false,
        message: 'Wilaya not found'
      });
    }

    res.json({
      success: true,
      data: {
        wilaya: wilaya.name,
        communes: wilaya.communes,
        deliveryPrice: wilaya.deliveryPrice
      }
    });
  } catch (error) {
    console.error('Error fetching communes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching communes',
      error: error.message
    });
  }
};

// @desc    Calculate delivery price
// @route   POST /api/delivery/calculate
// @access  Public
const calculateDeliveryPrice = async (req, res) => {
  try {
    const { wilayaId, commune, orderValue = 0 } = req.body;

    if (!wilayaId || !commune) {
      return res.status(400).json({
        success: false,
        message: 'Wilaya ID and commune are required'
      });
    }

    const wilaya = wilayas.find(w => w.id === wilayaId);
    
    if (!wilaya) {
      return res.status(404).json({
        success: false,
        message: 'Wilaya not found'
      });
    }

    // Check if commune exists in the wilaya
    if (!wilaya.communes.includes(commune)) {
      return res.status(400).json({
        success: false,
        message: 'Commune not found in the specified wilaya'
      });
    }

    let deliveryPrice = wilaya.deliveryPrice;
    let estimatedDays = 3; // Default estimation

    // Free delivery for orders over 5000 DZD
    if (orderValue >= 5000) {
      deliveryPrice = 0;
    }

    // Adjust delivery time based on wilaya
    if (wilaya.id === '16') { // Alger
      estimatedDays = 1;
    } else if (['9', '35', '42'].includes(wilaya.id)) { // Blida, Boumerdès, Tipaza
      estimatedDays = 2;
    } else if (['1', '11', '33', '37', '49', '50', '52', '53', '54', '56'].includes(wilaya.id)) {
      // Remote wilayas
      estimatedDays = 5;
    }

    res.json({
      success: true,
      data: {
        wilaya: wilaya.name,
        commune,
        deliveryPrice,
        estimatedDays,
        freeDelivery: orderValue >= 5000,
        orderValue,
        totalWithDelivery: orderValue + deliveryPrice
      }
    });
  } catch (error) {
    console.error('Error calculating delivery price:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating delivery price',
      error: error.message
    });
  }
};

// @desc    Get delivery zones
// @route   GET /api/delivery/zones
// @access  Public
const getDeliveryZones = async (req, res) => {
  try {
    const zones = {
      immediate: {
        name: 'Immediate Delivery (1-2 days)',
        wilayas: wilayas.filter(w => ['16', '9', '35', '42'].includes(w.id)),
        description: 'Fastest delivery for nearby areas'
      },
      standard: {
        name: 'Standard Delivery (3-4 days)',
        wilayas: wilayas.filter(w => !['16', '9', '35', '42', '1', '11', '33', '37', '49', '50', '52', '53', '54', '56'].includes(w.id)),
        description: 'Standard delivery for most areas'
      },
      remote: {
        name: 'Extended Delivery (5-7 days)',
        wilayas: wilayas.filter(w => ['1', '11', '33', '37', '49', '50', '52', '53', '54', '56'].includes(w.id)),
        description: 'Extended delivery for remote areas'
      }
    };

    res.json({
      success: true,
      data: zones
    });
  } catch (error) {
    console.error('Error fetching delivery zones:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery zones',
      error: error.message
    });
  }
};

// @desc    Get delivery statistics
// @route   GET /api/delivery/stats
// @access  Private (Admin)
const getDeliveryStats = async (req, res) => {
  try {
    const totalWilayas = wilayas.length;
    const totalCommunes = wilayas.reduce((total, wilaya) => total + wilaya.communes.length, 0);
    
    const averageDeliveryPrice = wilayas.reduce((total, wilaya) => total + wilaya.deliveryPrice, 0) / totalWilayas;
    
    const priceRanges = {
      low: wilayas.filter(w => w.deliveryPrice <= 600).length,
      medium: wilayas.filter(w => w.deliveryPrice > 600 && w.deliveryPrice <= 1000).length,
      high: wilayas.filter(w => w.deliveryPrice > 1000).length
    };

    res.json({
      success: true,
      data: {
        totalWilayas,
        totalCommunes,
        averageDeliveryPrice: Math.round(averageDeliveryPrice),
        priceRanges,
        coverage: {
          percentage: Math.round((totalWilayas / 58) * 100),
          totalAlgerianWilayas: 58
        }
      }
    });
  } catch (error) {
    console.error('Error fetching delivery stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery stats',
      error: error.message
    });
  }
};

// @desc    Search wilayas
// @route   GET /api/delivery/search
// @access  Public
const searchWilayas = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchTerm = q.toLowerCase();
    const results = wilayas.filter(wilaya => 
      wilaya.name.toLowerCase().includes(searchTerm) ||
      wilaya.communes.some(commune => 
        commune.toLowerCase().includes(searchTerm)
      )
    );

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error searching wilayas:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching wilayas',
      error: error.message
    });
  }
};

module.exports = {
  getWilayas,
  getWilayaById,
  getCommunesByWilaya,
  calculateDeliveryPrice,
  getDeliveryZones,
  getDeliveryStats,
  searchWilayas
}; 