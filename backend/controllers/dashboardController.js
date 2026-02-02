import AdminSettings from '../models/AdminSettings.js';
import Customer from '../models/Customer.js';
import Callback from '../models/Callback.js';
import Conversation from '../models/Conversation.js';

// In-memory token store (in production, use Redis or similar)
const validTokens = new Map();

// Token expiry time (24 hours)
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

// Clean expired tokens periodically
setInterval(() => {
    const now = Date.now();
    for (const [token, expiry] of validTokens.entries()) {
        if (expiry < now) {
            validTokens.delete(token);
        }
    }
}, 60 * 60 * 1000); // Clean every hour

// Middleware to verify token
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const expiry = validTokens.get(token);

    if (!expiry || expiry < Date.now()) {
        validTokens.delete(token);
        return res.status(401).json({ success: false, message: 'Token expired' });
    }

    next();
};

// Login
export const login = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        const isValid = await AdminSettings.verifyPassword(password);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = AdminSettings.generateToken();
        const expiresAt = Date.now() + TOKEN_EXPIRY;
        validTokens.set(token, expiresAt);

        res.json({
            success: true,
            token,
            expiresAt: new Date(expiresAt).toISOString()
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get dashboard stats
export const getStats = async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;

        // Get counts
        const [totalConversations, totalCustomers, callbacks] = await Promise.all([
            Conversation.countDocuments(),
            Customer.countDocuments(),
            Callback.find()
        ]);

        // Active conversations (status = 'active')
        const activeConversations = await Conversation.countDocuments({ status: 'active' });

        // Scheduled callbacks
        const scheduledCallbacks = callbacks.filter(cb => cb.status === 'scheduled').length;

        // Callbacks by status
        const callbacksByStatus = {
            scheduled: callbacks.filter(cb => cb.status === 'scheduled').length,
            completed: callbacks.filter(cb => cb.status === 'completed').length,
            failed: callbacks.filter(cb => cb.status === 'failed').length,
            cancelled: callbacks.filter(cb => cb.status === 'cancelled').length
        };

        // Conversations by day (last N days)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const conversationsByDay = await Conversation.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Fill in missing days
        const dateLabels = [];
        const conversationCounts = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            dateLabels.push(label);

            const found = conversationsByDay.find(d => d._id === dateStr);
            conversationCounts.push(found ? found.count : 0);
        }

        res.json({
            success: true,
            stats: {
                totalConversations,
                activeConversations,
                scheduledCallbacks,
                totalCustomers,
                callbacksByStatus,
                conversationsByDay: dateLabels.map((date, i) => ({
                    date,
                    count: conversationCounts[i]
                }))
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get conversations
export const getConversations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || 'all';
        const skip = (page - 1) * limit;

        let query = {};
        if (filter !== 'all') {
            query.status = filter;
        }

        const [conversations, total] = await Promise.all([
            Conversation.find(query)
                .sort({ lastMessageAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Conversation.countDocuments(query)
        ]);

        res.json({
            success: true,
            conversations,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single conversation
export const getConversation = async (req, res) => {
    try {
        const { phoneNumber } = req.params;

        const conversation = await Conversation.findOne({ phoneNumber }).lean();

        if (!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        res.json({
            success: true,
            conversation
        });
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get customers
export const getCustomers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { phoneNumber: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const [customers, total] = await Promise.all([
            Customer.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Customer.countDocuments(query)
        ]);

        res.json({
            success: true,
            customers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get callbacks
export const getCallbacks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || 'all';
        const skip = (page - 1) * limit;

        let query = {};
        if (filter !== 'all') {
            query.status = filter;
        }

        const [callbacks, total] = await Promise.all([
            Callback.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Callback.countDocuments(query)
        ]);

        res.json({
            success: true,
            callbacks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get callbacks error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update password
export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both passwords are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
        }

        await AdminSettings.updatePassword(currentPassword, newPassword);

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(400).json({ success: false, message: error.message || 'Failed to update password' });
    }
};

export default {
    authMiddleware,
    login,
    getStats,
    getConversations,
    getConversation,
    getCustomers,
    getCallbacks,
    updatePassword
};
