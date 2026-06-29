import { toPng } from 'html-to-image';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.png') => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // Generate a high-resolution canvas using html-to-image
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 3, // Similar to scale: 3
      style: {
        transform: 'none', // Prevent any parent scaling issues
        transformOrigin: 'top left',
      }
    });
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
};
