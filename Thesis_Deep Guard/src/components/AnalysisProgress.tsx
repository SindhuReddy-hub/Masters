import React from 'react';
import { Brain, Activity, Loader2, Image, Video } from 'lucide-react';

interface AnalysisProgressProps {
  progress: number;
  model: string;
  mediaType: 'video' | 'image';
}

export default function AnalysisProgress({ progress, model, mediaType }: AnalysisProgressProps) {
  const stages = mediaType === 'image' 
    ? [
        { name: 'Image Processing', range: [0, 30] },
        { name: 'Feature Extraction', range: [30, 70] },
        { name: 'CNN Analysis', range: [70, 90] },
        { name: 'Generating Report', range: [90, 100] }
      ]
    : [
        { name: 'Video Processing', range: [0, 25] },
        { name: 'Feature Extraction', range: [25, 60] },
        { name: 'CNN Analysis', range: [60, 85] },
        { name: 'Generating Report', range: [85, 100] }
      ];

  const currentStage = stages.find(stage => 
    progress >= stage.range[0] && progress < stage.range[1]
  ) || stages[stages.length - 1];

  const MediaIcon = mediaType === 'image' ? Image : Video;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Activity className="w-6 h-6 text-green-400" />
        <span>Analysis in Progress</span>
        <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
          mediaType === 'image' 
            ? 'bg-blue-500/20 text-blue-300' 
            : 'bg-purple-500/20 text-purple-300'
        }`}>
          <MediaIcon className="w-3 h-3 inline mr-1" />
          {mediaType.toUpperCase()}
        </div>
      </h3>
      
      <div className="space-y-6">
        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Model: {model.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-slate-300">{currentStage.name}</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                progress > stage.range[1] 
                  ? 'bg-green-500/10 text-green-400' 
                  : progress >= stage.range[0]
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-slate-500'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                progress > stage.range[1] 
                  ? 'bg-green-400' 
                  : progress >= stage.range[0]
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-slate-600'
              }`} />
              <span>{stage.name}</span>
            </div>
          ))}
        </div>

        {mediaType === 'image' && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-blue-300 text-sm">
              <Image className="w-4 h-4" />
              <span>Analyzing pixel-level artifacts and compression patterns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}