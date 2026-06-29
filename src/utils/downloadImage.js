import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export const downloadImage = async (elementId, filename = 'YMCA_SCOREBOARD.png') => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // Detect mobile devices to prevent canvas Out of Memory crashes
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Generate a high-resolution canvas using html-to-image
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: isMobile ? 1 : 2, // 1080p is enough for mobile, 2 for desktop
      style: {
        transform: 'none', // Prevent any parent scaling issues
        transformOrigin: 'top left',
      }
    });
    
    // Convert data URL to Blob for reliable downloading and sharing
    const blob = await (await fetch(dataUrl)).blob();

    // Attempt native Web Share API for mobile devices
    if (isMobile && navigator.canShare) {
      try {
        const file = new File([blob], filename, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'YMCA Scoreboard',
          });
          return true; // Successfully shared/saved natively!
        }
      } catch (shareError) {
        console.log('Web Share API failed or cancelled, falling back to standard download', shareError);
      }
    }

    // Ultimate fallback standard download using file-saver (Handles Android/iOS quirks automatically)
    saveAs(blob, filename);
    
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
};
