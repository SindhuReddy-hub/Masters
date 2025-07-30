import React, { useState } from 'react';
import Header from './components/Header';
import MediaUpload from './components/MediaUpload';
import ModelSelector from './components/ModelSelector';
import AnalysisProgress from './components/AnalysisProgress';
import ResultsPanel from './components/ResultsPanel';
import Dashboard from './components/Dashboard';
import Credits from './components/Credits';

export interface AnalysisResult {
  confidence: number;
  isDeepfake: boolean;
  model: string;
  processingTime: number;
  mediaType: 'video' | 'image';
  frameAnalysis?: Array<{
    frame: number;
    confidence: number;
    anomalies: string[];
  }>;
  imageAnalysis?: {
    faceRegions: number;
    artifactScore: number;
    compressionAnomalies: string[];
    pixelInconsistencies: string[];
  };
  technicalDetails: {
    resolution: string;
    frameRate?: number;
    duration?: number;
    codec?: string;
    fileSize: string;
    colorSpace?: string;
    bitDepth?: number;
  };
}

function App() {
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState('cnn-advanced');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [currentView, setCurrentView] = useState<'upload' | 'dashboard'>('upload');

  const handleMediaUpload = (file: File) => {
    setUploadedMedia(file);
    setResults(null);
  };

  const getMediaType = (file: File): 'video' | 'image' => {
    return file.type.startsWith('image/') ? 'image' : 'video';
  };

  const handleStartAnalysis = async () => {
    if (!uploadedMedia) return;
    
    const mediaType = getMediaType(uploadedMedia);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          
          // Generate mock results based on media type
          const baseResult = {
            confidence: Math.random() > 0.5 ? 85 + Math.random() * 10 : 20 + Math.random() * 30,
            isDeepfake: Math.random() > 0.3,
            model: selectedModel,
            processingTime: mediaType === 'image' ? 3.2 : 12.5,
            mediaType,
            technicalDetails: {
              resolution: mediaType === 'image' ? '2048x1536' : '1920x1080',
              fileSize: `${(uploadedMedia.size / (1024 * 1024)).toFixed(2)} MB`,
              ...(mediaType === 'video' ? {
                frameRate: 30,
                duration: 45.2,
                codec: 'H.264'
              } : {
                colorSpace: 'sRGB',
                bitDepth: 8
              })
            }
          };

          const mockResult: AnalysisResult = mediaType === 'image' 
            ? {
                ...baseResult,
                imageAnalysis: {
                  faceRegions: Math.floor(Math.random() * 3) + 1,
                  artifactScore: Math.random() * 100,
                  compressionAnomalies: [
                    'JPEG compression artifacts',
                    'Unusual noise patterns',
                    'Edge enhancement artifacts'
                  ].slice(0, Math.floor(Math.random() * 3) + 1),
                  pixelInconsistencies: [
                    'Facial boundary inconsistency',
                    'Lighting direction mismatch',
                    'Skin texture anomaly',
                    'Eye reflection inconsistency'
                  ].slice(0, Math.floor(Math.random() * 4) + 1)
                }
              }
            : {
                ...baseResult,
                frameAnalysis: Array.from({ length: 10 }, (_, i) => ({
                  frame: i * 30,
                  confidence: 70 + Math.random() * 25,
                  anomalies: [
                    'Facial boundary inconsistency',
                    'Temporal flickering detected',
                    'Lighting anomaly'
                  ].slice(0, Math.floor(Math.random() * 3) + 1)
                }))
              };
          
          setResults(mockResult);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234f46e520%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        
        {currentView === 'upload' ? (
          <main className="container mx-auto px-6 py-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Advanced Deepfake Detection
                </h1>
                <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                  Leverage cutting-edge CNN models to detect manipulated images and videos with industry-leading accuracy
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <MediaUpload 
                    onMediaUpload={handleMediaUpload}
                    uploadedMedia={uploadedMedia}
                  />
                  
                  {uploadedMedia && (
                    <ModelSelector
                      selectedModel={selectedModel}
                      onModelChange={setSelectedModel}
                      onStartAnalysis={handleStartAnalysis}
                      disabled={isAnalyzing}
                      mediaType={getMediaType(uploadedMedia)}
                    />
                  )}
                </div>

                <div className="space-y-6">
                  {isAnalyzing && (
                    <AnalysisProgress 
                      progress={analysisProgress}
                      model={selectedModel}
                      mediaType={uploadedMedia ? getMediaType(uploadedMedia) : 'video'}
                    />
                  )}
                  
                  {results && (
                    <ResultsPanel results={results} />
                  )}
                </div>
              </div>

              <Credits />
            </div>
          </main>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default App;