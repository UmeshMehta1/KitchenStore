// Utility function to handle product image URLs
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }
  
  // If it's already a full URL (starts with http), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative path starting with /uploads/, construct full URL
  if (imageUrl.startsWith('/uploads/')) {
    return `http://localhost:5000${imageUrl}`;
  }
  
  // If it's just a filename, construct full URL with /uploads/
  if (!imageUrl.includes('/')) {
    return `http://localhost:5000/uploads/${imageUrl}`;
  }
  
  // Default fallback
  return imageUrl;
};

// Default placeholder image as base64 SVG
export const getPlaceholderImage = (width = 600, height = 400, text = "Product Image") => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F3F4F6"/>
      <path d="M${width * 0.33} ${height * 0.375}H${width * 0.67}V${height * 0.625}H${width * 0.33}V${height * 0.375}Z" fill="#D1D5DB"/>
      <path d="M${width * 0.42} ${height * 0.5}H${width * 0.58}V${height * 0.5}H${width * 0.42}V${height * 0.5}Z" fill="#9CA3AF"/>
      <text x="${width * 0.5}" y="${height * 0.5}" font-family="Arial, sans-serif" font-size="18" fill="#6B7280" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `)}`;
};
