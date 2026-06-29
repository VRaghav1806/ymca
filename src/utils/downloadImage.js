import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.png') => {
  const element = document.getElementById(elementId);
  if (!element) return { success: false };

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Generate a raw Blob directly (bypasses massive Base64 memory overhead that crashes Android)
    const blob = await toBlob(element, {
      quality: 1.0,
      pixelRatio: isMobile ? 1 : 2, 
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      }
    });

    if (!blob) {
       throw new Error('Blob generation failed');
    }

    // Force a direct download identical to desktop
    saveAs(blob, filename);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false };
  }
};
