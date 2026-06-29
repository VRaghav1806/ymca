import { toJpeg } from 'html-to-image';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.jpg') => {
  const element = document.getElementById(elementId);
  if (!element) return { success: false };

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Use JPEG instead of PNG. JPEGs are 10x smaller, which means the resulting
    // Data URL is short enough that Android's Download Manager won't crash when parsing it.
    const dataUrl = await toJpeg(element, {
      quality: 0.85,
      pixelRatio: isMobile ? 1 : 2, 
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      }
    });

    if (!dataUrl) {
       throw new Error('Image generation failed');
    }

    // Standard download - now safe for Android because it's a highly compressed JPEG Data URL
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false };
  }
};
