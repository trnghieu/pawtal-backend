const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const getMe = catchAsync(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Get profile successfully',
    data: req.user
  });
});

const updateMe = catchAsync(async (req, res) => {
  const { name, phone, address } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  if (typeof name !== 'undefined') user.name = name;
  if (typeof phone !== 'undefined') user.phone = phone;
  if (typeof address !== 'undefined') user.address = address;

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file, 'pawtal/users');
    if (user.avatar && user.avatar.publicId) {
      await deleteFromCloudinary(user.avatar.publicId);
    }
    user.avatar = uploaded;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Update profile successfully',
    data: user
  });
});

module.exports = {
  getMe,
  updateMe
};
