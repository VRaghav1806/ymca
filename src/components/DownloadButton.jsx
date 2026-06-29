import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { downloadImage } from '../utils/downloadImage';

export const DownloadButton = ({ className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState(null);

  const handleDownload = async () => {
    setIsExporting(true);
    const toastId = toast.loading('Generating high quality image...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = await downloadImage('scoreboard-preview-area');
    
    setIsExporting(false);
    
    if (result && result.success) {
      toast.success('Image Generated Successfully', { id: toastId });
      if (result.isMobile && result.dataUrl) {
        setMobilePreviewUrl(result.dataUrl);
      }
    } else {
      toast.error('Failed to download image', { id: toastId });
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isExporting}
        className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${className}`}
      >
        {isExporting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Download size={20} />
        )}
        {isExporting ? 'Exporting...' : 'Download Scoreboard'}
      </button>

      {/* Mobile Bulletproof Download Modal */}
      {mobilePreviewUrl && (
        <div className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center w-full max-w-sm">
            <h3 className="text-white text-xl font-bold mb-2">Image Ready!</h3>
            <p className="text-yellow-500 font-bold bg-yellow-500/10 px-4 py-2 rounded-full text-sm mb-6 animate-pulse">
              Long press the image below and select "Save" or "Share"
            </p>
            
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
              <img src={mobilePreviewUrl} alt="Scoreboard Preview" className="w-full h-auto object-contain" />
            </div>

            <button 
              onClick={() => setMobilePreviewUrl(null)}
              className="mt-8 bg-gray-800 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-700 active:scale-95 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
