'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Image, FileText, Upload, Loader2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'generating' | 'success' | 'error';

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setState('uploading');
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 100));
      setProgress(i);
    }

    setState('processing');
    await new Promise((r) => setTimeout(r, 1000));

    setState('generating');
    await new Promise((r) => setTimeout(r, 2000));

    setState('success');
  };

  const handleClose = () => {
    setState('idle');
    setProgress(0);
    onClose();
  };

  const handleSourceClick = (source: 'camera' | 'gallery' | 'files') => {
    if (source === 'files') {
      fileInputRef.current?.click();
    } else {
      // For camera/gallery, would need actual implementation
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2D3436]">Upload Content</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                <X className="w-5 h-5 text-[#636E72]" />
              </button>
            </div>

            {/* Content based on state */}
            {state === 'idle' && (
              <>
                <p className="text-[#636E72] mb-6">
                  Turn any photo, document, or sheet into exercises
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSourceClick('camera')}
                    className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-[#6C5CE7]/10 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[#6C5CE7]" />
                    </div>
                    <span className="text-sm font-medium text-[#2D3436]">Camera</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSourceClick('gallery')}
                    className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-[#00CEC9]/10 rounded-xl flex items-center justify-center">
                      <Image className="w-6 h-6 text-[#00CEC9]" />
                    </div>
                    <span className="text-sm font-medium text-[#2D3436]">Gallery</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSourceClick('files')}
                    className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-[#FDCB6E]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#FDCB6E]" />
                    </div>
                    <span className="text-sm font-medium text-[#2D3436]">Files</span>
                  </motion.button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,.txt,.csv,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}

            {(state === 'uploading' || state === 'processing' || state === 'generating') && (
              <div className="flex flex-col items-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mb-4"
                >
                  <Loader2 className="w-16 h-16 text-[#6C5CE7]" />
                </motion.div>

                <p className="text-lg font-medium text-[#2D3436] mb-2">
                  {state === 'uploading' && 'Uploading...'}
                  {state === 'processing' && 'Processing image...'}
                  {state === 'generating' && 'Generating exercises...'}
                </p>

                {state === 'uploading' && (
                  <div className="w-full max-w-xs h-2 bg-[#DFE6E9] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#6C5CE7]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                )}

                {state === 'processing' && (
                  <p className="text-sm text-[#636E72]">Extracting text with OCR...</p>
                )}

                {state === 'generating' && (
                  <p className="text-sm text-[#636E72]">Creating questions from your content...</p>
                )}
              </div>
            )}

            {state === 'success' && (
              <div className="flex flex-col items-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="w-16 h-16 mb-4 bg-[#00B894] rounded-full flex items-center justify-center"
                >
                  <Upload className="w-8 h-8 text-white" />
                </motion.div>

                <p className="text-lg font-medium text-[#2D3436] mb-2">
                  Exercises Ready!
                </p>
                <p className="text-sm text-[#636E72] mb-6 text-center">
                  5 exercises generated from your content
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
                >
                  Start Practice
                </motion.button>
              </div>
            )}

            {state === 'error' && (
              <div className="flex flex-col items-center py-8">
                <div className="w-16 h-16 mb-4 bg-[#E17055] rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 text-white" />
                </div>

                <p className="text-lg font-medium text-[#2D3436] mb-2">
                  Something went wrong
                </p>
                <p className="text-sm text-[#636E72] mb-6">
                  Please try again with a different file
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState('idle')}
                  className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
                >
                  Try Again
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
