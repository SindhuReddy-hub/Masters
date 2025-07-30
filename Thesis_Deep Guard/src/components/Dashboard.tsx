import React from 'react';
import { BarChart3, TrendingUp, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Analyses',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Deepfakes Detected',
      value: '342',
      change: '+8%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Authentic Videos',
      value: '905',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg. Processing Time',
      value: '12.3s',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'purple'
    }
  ];

  const recentAnalyses = [
    { id: 1, filename: 'video_001.mp4', result: 'Authentic', confidence: 94.2, time: '2 hours ago' },
    { id: 2, filename: 'suspicious_clip.avi', result: 'Deepfake', confidence: 87.5, time: '3 hours ago' },
    { id: 3, filename: 'interview_footage.mov', result: 'Authentic', confidence: 91.8, time: '5 hours ago' },
    { id: 4, filename: 'social_media_video.mp4', result: 'Deepfake', confidence: 89.3, time: '1 day ago' },
    { id: 5, filename: 'news_segment.mp4', result: 'Authentic', confidence: 96.1, time: '1 day ago' }
  ];

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-blue-200">Monitor your deepfake detection performance and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              red: 'from-red-500 to-red-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600'
            };

            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span>Detection Accuracy</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Overall Accuracy</span>
                <span className="text-green-400 font-bold">94.7%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '94.7%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">97.2%</p>
                <p className="text-slate-400 text-sm">True Positives</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">92.1%</p>
                <p className="text-slate-400 text-sm">True Negatives</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Analyses</h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium truncate flex-1 mr-2">
                      {analysis.filename}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      analysis.result === 'Authentic' 
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {analysis.result}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      Confidence: <span className="text-white">{analysis.confidence}%</span>
                    </span>
                    <span className="text-slate-500">{analysis.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}