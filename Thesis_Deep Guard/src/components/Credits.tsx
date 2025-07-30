import React from 'react';
import { Award, Brain, Code, Sparkles } from 'lucide-react';

export default function Credits() {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mt-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Developed & Researched by
          </h3>
          <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            <h2 className="text-4xl font-bold mb-2">Sindhu Reddy</h2>
          </div>
          <p className="text-blue-200 text-lg font-medium">
            Senior AI Researcher & Machine Learning Engineer
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h4 className="text-white font-semibold mb-2">AI Research</h4>
            <p className="text-slate-300 text-sm">
              Specialized in deep learning architectures for computer vision and deepfake detection algorithms
            </p>
          </div>

          <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h4 className="text-white font-semibold mb-2">Full-Stack Development</h4>
            <p className="text-slate-300 text-sm">
              Expert in React, TypeScript, Python, and modern web technologies for AI applications
            </p>
          </div>

          <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h4 className="text-white font-semibold mb-2">Innovation</h4>
            <p className="text-slate-300 text-sm">
              Pioneering advanced CNN models and neural network architectures for media authenticity verification
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            © 2024 DeepGuard AI Detection System. Developed with passion for AI safety and media integrity.
          </p>
        </div>
      </div>
    </div>
  );
}