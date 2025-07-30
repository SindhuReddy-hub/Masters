import React from 'react';
import { Shield, BarChart3, Upload, User } from 'lucide-react';

interface HeaderProps {
  currentView: 'upload' | 'dashboard';
  onViewChange: (view: 'upload' | 'dashboard') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-blue-800/50 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">DeepGuard</h1>
              <p className="text-sm text-blue-200">AI-Powered Detection</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => onViewChange('upload')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'upload'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800/50'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>Detection</span>
              </button>
              
              <button
                onClick={() => onViewChange('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-blue-800/50'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </nav>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white font-medium">Sindhu Reddy</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}