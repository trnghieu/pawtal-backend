const cloudinary = require('../config/cloudinary');

const uploadBufferToCloudinary = async (file, folder = 'pawtal/general') => {
  if (!file) return null;

  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image'
  });

  return {
    url: result.secure_url,
    publicId: result.public_id
  };
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadBufferToCloudinary,
  deleteFromCloudinary
};
