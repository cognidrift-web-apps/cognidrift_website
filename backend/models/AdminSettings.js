import mongoose from 'mongoose';
import crypto from 'crypto';

const adminSettingsSchema = new mongoose.Schema({
    settingKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Static method to get or create default password
adminSettingsSchema.statics.getAdminPassword = async function() {
    let setting = await this.findOne({ settingKey: 'admin_password' });

    if (!setting) {
        // Create default password: 'cognidrift2024'
        const defaultPassword = 'cognidrift2024';
        const hashedPassword = crypto.createHash('sha256').update(defaultPassword).digest('hex');

        setting = await this.create({
            settingKey: 'admin_password',
            value: hashedPassword
        });

        console.log('Default admin password created: cognidrift2024');
    }

    return setting.value;
};

// Static method to verify password
adminSettingsSchema.statics.verifyPassword = async function(password) {
    const storedHash = await this.getAdminPassword();
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');
    return storedHash === inputHash;
};

// Static method to update password
adminSettingsSchema.statics.updatePassword = async function(currentPassword, newPassword) {
    const isValid = await this.verifyPassword(currentPassword);

    if (!isValid) {
        throw new Error('Current password is incorrect');
    }

    const newHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    await this.findOneAndUpdate(
        { settingKey: 'admin_password' },
        { value: newHash, updatedAt: new Date() },
        { upsert: true }
    );

    return true;
};

// Static method to generate session token
adminSettingsSchema.statics.generateToken = function() {
    return crypto.randomBytes(32).toString('hex');
};

const AdminSettings = mongoose.model('AdminSettings', adminSettingsSchema);

export default AdminSettings;
