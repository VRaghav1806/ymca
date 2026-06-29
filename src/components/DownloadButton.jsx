import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { downloadImage } from '../utils/downloadImage';

export const DownloadButton = ({ className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    const toastId = toast.loading('Generating high quality image...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = await downloadImage('scoreboard-preview-area');
    
    setIsExporting(false);
    
    if (result && result.success) {
      toast.success('Downloaded Successfully', { id: toastId });
    } else {
      toast.error('Failed to download image', { id: toastId });
    }
  };

  return (
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
  );
};
