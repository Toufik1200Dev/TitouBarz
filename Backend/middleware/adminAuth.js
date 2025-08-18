const adminAuth = (req, res, next) => {
  const { adminPassword } = req.headers;
  
  if (!adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Admin password required'
    });
  }
  
  if (adminPassword !== 'toUfik99T@') {
    return res.status(403).json({
      success: false,
      message: 'Invalid admin password'
    });
  }
  
  next();
};

module.exports = adminAuth;
