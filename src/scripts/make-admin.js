require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const User = require('../models/User');

const email = process.argv[2];

const run = async () => {
  try {
    if (!email) {
      throw new Error('Please provide an email. Example: node src/scripts/make-admin.js user@example.com');
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      throw new Error(`User not found: ${email}`);
    }

    console.log(`Updated role to admin for ${user.email}`);
  } catch (error) {
    console.error('make-admin error:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
