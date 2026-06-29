import { toPng } from 'html-to-image';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.png') => {
  const element = document.getElementById(elementId);
  if (!element) return { success: false };

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Generate a high-resolution PNG canvas
    const dataUrl = await toPng(element, {
      pixelRatio: isMobile ? 1 : 2, 
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      }
    });

    if (isMobile) {
      // On mobile, securely return the raw image data back to the UI
      // so it can be rendered safely inside the bulletproof Long-Press Modal
      return { success: true, dataUrl, isMobile: true };
    }

    // On Desktop, force a direct native download using the Data URL
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, isMobile: false };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false };
  }
};
