import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.png') => {
  const element = document.getElementById(elementId);
  if (!element) return { success: false };

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Generate canvas
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: isMobile ? 1 : 2, 
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      }
    });

    if (isMobile) {
      // On mobile, return the image data directly to the UI
      // so we can show a bulletproof "Long Press to Save" modal
      return { success: true, dataUrl, isMobile: true };
    }

    // On Desktop, standard downloading works flawlessly
    const blob = await (await fetch(dataUrl)).blob();
    saveAs(blob, filename);
    
    return { success: true, isMobile: false };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false };
  }
};
