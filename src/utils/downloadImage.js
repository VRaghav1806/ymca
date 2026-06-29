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
      // Convert the massive Base64 string to a lightweight Blob URL.
      // Mobile browsers frequently crash or render broken images when trying
      // to display massive Base64 strings directly in the DOM.
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], {type:mime});
      const blobUrl = URL.createObjectURL(blob);

      // Securely return the lightweight blobUrl back to the UI
      return { success: true, dataUrl: blobUrl, isMobile: true };
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
