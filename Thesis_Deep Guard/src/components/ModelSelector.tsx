import React from 'react';
import { Brain, Zap, Settings, Play, Image, Video } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onStartAnalysis: () => void;
  disabled: boolean;
  mediaType: 'video' | 'image';
}

const models = [
  {
    id: 'cnn-basic',
    name: 'CNN Basic',
    description: 'Fast detection for common deepfakes',
    accuracy: { image: '85%', video: '87%' },
    speed: 'Fast',
    icon: Zap,
    features: {
      image: ['Real-time processing', 'Basic artifact detection', 'Face region analysis'],
      video: ['Real-time processing', 'Low resource usage', 'Basic anomaly detection']
    }
  },
  {
    id: 'cnn-advanced',
    name: 'CNN Advanced',
    description: 'High-accuracy detection with advanced analysis',
    accuracy: { image: '92%', video: '94%' },
    speed: 'Medium',
    icon: Brain,
    features: {
      image: ['Pixel-level analysis', 'Compression artifact detection', 'Multi-scale feature extraction'],
      video: ['Temporal consistency analysis', 'Advanced facial recognition', 'Multi-frame correlation']
    }
  },
  {
    id: 'cnn-research',
    name: 'CNN Research',
    description: 'Cutting-edge model with latest techniques',
    accuracy: { image: '96%', video: '97%' },
    speed: 'Slow',
    icon: Settings,
    features: {
      image: ['State-of-the-art architecture', 'Adversarial training', 'Fine-grained texture analysis'],
      video: ['State-of-the-art architecture', 'Adversarial training', 'Fine-grained analysis']
    }
  }
];

export default function ModelSelector({ selectedModel, onModelChange, onStartAnalysis, disabled, mediaType }: ModelSelectorProps) {
  const MediaIcon = mediaType === 'image' ? Image : Video;
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Brain className="w-6 h-6 text-purple-400" />
        <span>Select CNN Model</span>
        <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
          mediaType === 'image' 
            ? 'bg-blue-500/20 text-blue-300' 
            : 'bg-purple-500/20 text-purple-300'
        }`}>
          <MediaIcon className="w-3 h-3 inline mr-1" />
          {mediaType.toUpperCase()} MODE
        </div>
      </h3>
      
      <div className="space-y-3 mb-6">
        {models.map((model) => {
          const Icon = model.icon;
          const currentFeatures = model.features[mediaType];
          const currentAccuracy = model.accuracy[mediaType];
          
          return (
            <button
              key={model.id}
              onClick={() => onModelChange(model.id)}
              disabled={disabled}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedModel === model.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-slate-600 hover:border-purple-400 hover:bg-purple-500/5'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-6 h-6 text-purple-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{model.name}</h4>
                    <div className="flex space-x-3 text-sm">
                      <span className="text-green-400">⚡ {currentAccuracy}</span>
                      <span className="text-blue-400">🕒 {model.speed}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <button
        onClick={onStartAnalysis}
        disabled={disabled}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Play className="w-6 h-6" />
        <span>{disabled ? 'Analyzing...' : `Analyze ${mediaType === 'image' ? 'Image' : 'Video'}`}</span>
      </button>
    </div>
  );
}