const catchAsync = require('../utils/catchAsync');
const { uploadBufferToCloudinary } = require('../utils/uploadToCloudinary');

const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'image file is required'
    });
  }

  const folder = req.body.folder || 'pawtal/uploads';
  const result = await uploadBufferToCloudinary(req.file, folder);

  return res.status(200).json({
    success: true,
    message: 'Upload image successfully',
    data: result
  });
});

module.exports = {
  uploadImage
};
