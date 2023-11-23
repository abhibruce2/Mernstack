const mongoose = require('mongoose');

// Define a Mongoose schema for the image
const imageSchema = new mongoose.Schema({
  imageData: Buffer, // Field to store image binary data
  contentType: String, // Field to store image MIME type
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Read image file and convert it to Buffer (example)
const fs = require('fs');
const imagePath = 'path_to_your_image.jpg'; // Replace with your image file path
const imageBuffer = fs.readFileSync(imagePath);

// Create a new image document and save it to MongoDB
const newImage = new Image({
  imageData: imageBuffer,
  contentType: 'image/jpeg', // Set the appropriate MIME type
});

// Save the image document to the MongoDB collection
newImage.save((err, savedImage) => {
  if (err) {
    console.error('Error saving image:', err);
  } else {
    console.log('Image saved successfully:', savedImage);
  }
});
