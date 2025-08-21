// Utility function to get proper image URLs
export const getImageUrl = (imagePath, backendUrl) => {
  console.log('getImageUrl called with:', { imagePath, backendUrl });
  
  if (!imagePath || !Array.isArray(imagePath) || imagePath.length === 0) {
    console.log('No valid image path, using placeholder');
    return getPlaceholderImage();
  }
  
  // If it's already a full URL, return as is
  if (imagePath[0].startsWith('http')) {
    console.log('Image is already a full URL:', imagePath[0]);
    return imagePath[0];
  }
  
  // Clean the image path - remove any leading slashes or uploads/ prefixes
  let cleanPath = imagePath[0];
  
  // Remove leading slashes
  cleanPath = cleanPath.replace(/^[\/\\]+/, '');
  
  // If it already starts with 'uploads/', remove it to avoid double prefixing
  if (cleanPath.toLowerCase().startsWith('uploads/') || cleanPath.toLowerCase().startsWith('uploads\\')) {
    cleanPath = cleanPath.replace(/^uploads[\/\\]/i, '');
    console.log('Removed existing uploads/ prefix, clean path:', cleanPath);
  }
  
  // Construct the full URL - backend now stores only filenames
  const fullUrl = `${backendUrl}/uploads/${cleanPath}`;
  console.log('Constructed final image URL:', fullUrl);
  return fullUrl;
};

// Function to handle image loading errors
export const handleImageError = (e) => {
  console.log('Image failed to load:', e.target.src);
  console.log('Setting fallback image');
  e.target.src = getPlaceholderImage();
};

// Generate a simple placeholder image using data URI
const getPlaceholderImage = () => {
  // Create a simple SVG placeholder image
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#f3f4f6"/>
      <text x="50" y="50" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">No Image</text>
    </svg>
  `;
  
  // Convert SVG to data URI
  const dataUri = `data:image/svg+xml;base64,${btoa(svg)}`;
  console.log('Generated placeholder image data URI');
  return dataUri;
};
