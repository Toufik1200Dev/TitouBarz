const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic spam detection
    const spamIndicators = [
      message.toLowerCase().includes('buy now'),
      message.toLowerCase().includes('click here'),
      message.toLowerCase().includes('make money'),
      subject.toLowerCase().includes('urgent'),
      subject.toLowerCase().includes('limited time')
    ];

    const isSpam = spamIndicators.filter(Boolean).length >= 2;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      isSpam,
      priority: isSpam ? 'low' : 'medium'
    });

    // TODO: Send email notification to admin
    // TODO: Send auto-reply to customer

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(400).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'firstName lastName email');

    // Get total count for pagination
    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private (Admin)
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'firstName lastName email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateContact = async (req, res) => {
  try {
    const { status, priority, assignedTo, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo) updateData.assignedTo = assignedTo;

    // Add note if provided
    if (notes) {
      updateData.$push = {
        notes: {
          content: notes,
          createdBy: req.user.id
        }
      };
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('assignedTo', 'firstName lastName email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Admin)
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          newContacts: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          },
          readContacts: {
            $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] }
          },
          repliedContacts: {
            $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] }
          },
          closedContacts: {
            $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
          },
          spamContacts: {
            $sum: { $cond: [{ $eq: ['$isSpam', true] }, 1, 0] }
          }
        }
      }
    ]);

    const priorityStats = await Contact.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    res.json({
      success: true,
      data: {
        ...stats[0],
        priorityBreakdown: priorityStats,
        recentContacts
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact stats',
      error: error.message
    });
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/contact/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking contact as read',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats,
  markAsRead
}; 