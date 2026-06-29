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

    // Vercel Serverless Form Submission (Bypasses all mobile blockers)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/download';
    form.style.display = 'none';

    const imageInput = document.createElement('input');
    imageInput.type = 'hidden';
    imageInput.name = 'image';
    imageInput.value = dataUrl;

    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'filename';
    nameInput.value = filename;

    form.appendChild(imageInput);
    form.appendChild(nameInput);
    document.body.appendChild(form);
    
    form.submit();
    
    // Cleanup
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 1000);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating image:', error);
    return { success: false };
  }
};
