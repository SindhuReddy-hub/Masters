import React, { useRef, useState } from 'react';
import { Upload, Video, Image, X, FileImage } from 'lucide-react';

interface MediaUploadProps {
  onMediaUpload: (file: File) => void;
  uploadedMedia: File | null;
}

export default function MediaUpload({ onMediaUpload, uploadedMedia }: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const mediaFile = files.find(file => 
      file.type.startsWith('video/') || file.type.startsWith('image/')
    );
    
    if (mediaFile) {
      processFile(mediaFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    onMediaUpload(file);
    
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  };

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
      setMediaPreview(null);
    }
    onMediaUpload(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isImage = uploadedMedia?.type.startsWith('image/');
  const isVideo = uploadedMedia?.type.startsWith('video/');

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <FileImage className="w-6 h-6 text-blue-400" />
        <span>Upload Media</span>
      </h3>
      
      {!uploadedMedia ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-slate-600 hover:border-blue-500 hover:bg-blue-500/5'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex justify-center space-x-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Image className="w-8 h-8 text-blue-400" />
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Video className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">
            Drag and drop your image or video file here
          </p>
          <p className="text-slate-400 text-sm mb-4">
            <span className="text-blue-400">Images:</span> JPG, PNG, WEBP, GIF (Max: 50MB)<br/>
            <span className="text-purple-400">Videos:</span> MP4, AVI, MOV, WMV (Max: 500MB)
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Choose File
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {isImage ? (
                  <Image className="w-5 h-5 text-blue-400" />
                ) : (
                  <Video className="w-5 h-5 text-purple-400" />
                )}
                <div>
                  <p className="text-white font-medium">{uploadedMedia.name}</p>
                  <div className="flex items-center space-x-4 text-slate-400 text-sm">
                    <span>{(uploadedMedia.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isImage 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {isImage ? 'IMAGE' : 'VIDEO'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={removeMedia}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {mediaPreview && (
              <div className="rounded-lg overflow-hidden bg-slate-900">
                {isImage ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-full max-h-80 object-contain"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="w-full max-h-80"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}