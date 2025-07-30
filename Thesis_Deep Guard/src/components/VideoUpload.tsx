import React, { useRef, useState } from 'react';
import { Upload, Video, X } from 'lucide-react';

interface VideoUploadProps {
  onVideoUpload: (file: File) => void;
  uploadedVideo: File | null;
}

export default function VideoUpload({ onVideoUpload, uploadedVideo }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

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
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      processFile(videoFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    onVideoUpload(file);
    
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  };

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
    onVideoUpload(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Video className="w-6 h-6 text-blue-400" />
        <span>Upload Video</span>
      </h3>
      
      {!uploadedVideo ? (
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
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">
            Drag and drop your video file here
          </p>
          <p className="text-slate-400 text-sm mb-4">
            Supports MP4, AVI, MOV, WMV (Max: 500MB)
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
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">{uploadedVideo.name}</p>
                  <p className="text-slate-400 text-sm">
                    {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <button
                onClick={removeVideo}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg bg-slate-900"
                style={{ maxHeight: '300px' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}