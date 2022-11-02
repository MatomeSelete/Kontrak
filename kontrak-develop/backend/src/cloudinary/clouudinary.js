const cloudinary= require('cloudinary').v2
cloudinary.config({ 
    // cloud_name: process.env.cloud_name,
    // api_key: process.env.api_key,
    // api_secret: process.env.api_secret
    cloud_name: 'dz6spwzrw', 
    api_key: '176935551823674', 
    api_secret: 'Mqlze1wunfobVLMDzePD6WdwVlk' 
  });

module.exports =cloudinary
