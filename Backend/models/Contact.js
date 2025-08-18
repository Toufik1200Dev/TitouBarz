const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  source: {
    type: String,
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isSpam: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ priority: 1, status: 1 });

// Pre-save middleware to clean data
contactSchema.pre('save', function(next) {
  // Trim whitespace
  if (this.name) this.name = this.name.trim();
  if (this.subject) this.subject = this.subject.trim();
  if (this.message) this.message = this.message.trim();
  
  // Convert email to lowercase
  if (this.email) this.email = this.email.toLowerCase();
  
  next();
});

// Virtual for time since creation
contactSchema.virtual('timeSinceCreation').get(function() {
  const now = new Date();
  const created = this.createdAt;
  const diffInHours = Math.floor((now - created) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day(s) ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} week(s) ago`;
});

module.exports = mongoose.model('Contact', contactSchema); 