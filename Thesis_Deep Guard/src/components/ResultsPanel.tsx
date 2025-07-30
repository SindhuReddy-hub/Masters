import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Download, Eye, BarChart3, FileText, Image, Video } from 'lucide-react';
import { AnalysisResult } from '../App';
import jsPDF from 'jspdf';

interface ResultsPanelProps {
  results: AnalysisResult;
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'technical'>('overview');

  const confidenceColor = results.confidence > 80 
    ? 'text-green-400' 
    : results.confidence > 60 
    ? 'text-yellow-400' 
    : 'text-red-400';

  const statusIcon = results.isDeepfake ? AlertTriangle : CheckCircle;
  const statusColor = results.isDeepfake ? 'text-red-400' : 'text-green-400';
  const statusBg = results.isDeepfake ? 'bg-red-500/10' : 'bg-green-500/10';
  const MediaIcon = results.mediaType === 'image' ? Image : Video;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Professional Letterhead
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // Company logo area
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 17.5, 8, 'F');
    doc.setFillColor(30, 58, 138);
    doc.circle(25, 17.5, 6, 'F');
    doc.setFillColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DG', 25, 20, { align: 'center' });

    // Company name and tagline
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('DeepGuard', 40, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Deepfake Detection', 40, 27);

    // Author information
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Analyzed by: Sindhu Reddy', pageWidth - 20, 20, { align: 'right' });
    doc.text('Senior AI Researcher', pageWidth - 20, 25, { align: 'right' });

    yPosition = 50;

    // Document title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const titleText = results.mediaType === 'image' ? 'IMAGE DEEPFAKE ANALYSIS REPORT' : 'VIDEO DEEPFAKE ANALYSIS REPORT';
    doc.text(titleText, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Report metadata
    doc.setFillColor(248, 250, 252);
    doc.rect(20, yPosition - 5, pageWidth - 40, 25, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, yPosition - 5, pageWidth - 40, 25, 'S');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Report ID: DG-${Date.now().toString().slice(-8)}`, 25, yPosition + 3);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 25, yPosition + 10);
    doc.text(`Analysis Model: ${results.model.toUpperCase()}`, 25, yPosition + 17);
    
    doc.text(`Processing Time: ${results.processingTime}s`, pageWidth - 25, yPosition + 3, { align: 'right' });
    doc.text(`Media Type: ${results.mediaType.toUpperCase()}`, pageWidth - 25, yPosition + 10, { align: 'right' });
    doc.text(`File Size: ${results.technicalDetails.fileSize}`, pageWidth - 25, yPosition + 17, { align: 'right' });

    yPosition += 35;

    // Executive Summary Box
    doc.setFillColor(results.isDeepfake ? 254 : 240, results.isDeepfake ? 242 : 253, results.isDeepfake ? 242 : 244);
    doc.rect(20, yPosition - 5, pageWidth - 40, 35, 'F');
    doc.setDrawColor(results.isDeepfake ? 239 : 34, results.isDeepfake ? 68 : 197, results.isDeepfake ? 68 : 94);
    doc.setLineWidth(2);
    doc.rect(20, yPosition - 5, pageWidth - 40, 35, 'S');

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('EXECUTIVE SUMMARY', 25, yPosition + 5);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const resultText = results.isDeepfake ? 'DEEPFAKE DETECTED' : `AUTHENTIC ${results.mediaType.toUpperCase()}`;
    doc.setTextColor(results.isDeepfake ? 220 : 34, results.isDeepfake ? 38 : 197, results.isDeepfake ? 38 : 94);
    doc.text(`Status: ${resultText}`, 25, yPosition + 15);

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Confidence Level: ${results.confidence.toFixed(1)}%`, 25, yPosition + 25);

    yPosition += 45;

    // Analysis Results Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text('DETAILED ANALYSIS RESULTS', 20, yPosition);
    yPosition += 15;

    // Results grid
    const leftCol = 25;
    const rightCol = pageWidth / 2 + 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Detection Metrics:', leftCol, yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`• Overall Confidence: ${results.confidence.toFixed(1)}%`, leftCol + 5, yPosition);
    yPosition += 6;
    doc.text(`• Model Accuracy: ${results.model === 'cnn-basic' ? '85%' : results.model === 'cnn-advanced' ? '92%' : '96%'}`, leftCol + 5, yPosition);
    yPosition += 6;
    doc.text(`• Processing Speed: ${results.processingTime}s`, leftCol + 5, yPosition);
    yPosition += 6;
    
    if (results.mediaType === 'image' && results.imageAnalysis) {
      doc.text(`• Face Regions: ${results.imageAnalysis.faceRegions}`, leftCol + 5, yPosition);
      yPosition += 6;
      doc.text(`• Artifact Score: ${results.imageAnalysis.artifactScore.toFixed(1)}%`, leftCol + 5, yPosition);
    } else if (results.frameAnalysis) {
      doc.text(`• Frames Analyzed: ${results.frameAnalysis.length}`, leftCol + 5, yPosition);
    }

    // Technical specifications (right column)
    yPosition -= results.mediaType === 'image' ? 30 : 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Technical Specifications:', rightCol, yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`• Resolution: ${results.technicalDetails.resolution}`, rightCol + 5, yPosition);
    yPosition += 6;
    
    if (results.mediaType === 'image') {
      if (results.technicalDetails.colorSpace) {
        doc.text(`• Color Space: ${results.technicalDetails.colorSpace}`, rightCol + 5, yPosition);
        yPosition += 6;
      }
      if (results.technicalDetails.bitDepth) {
        doc.text(`• Bit Depth: ${results.technicalDetails.bitDepth}-bit`, rightCol + 5, yPosition);
        yPosition += 6;
      }
    } else {
      if (results.technicalDetails.frameRate) {
        doc.text(`• Frame Rate: ${results.technicalDetails.frameRate} fps`, rightCol + 5, yPosition);
        yPosition += 6;
      }
      if (results.technicalDetails.duration) {
        doc.text(`• Duration: ${results.technicalDetails.duration}s`, rightCol + 5, yPosition);
        yPosition += 6;
      }
      if (results.technicalDetails.codec) {
        doc.text(`• Codec: ${results.technicalDetails.codec}`, rightCol + 5, yPosition);
      }
    }

    yPosition += 20;

    // Media-specific analysis section
    if (results.mediaType === 'image' && results.imageAnalysis) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text('IMAGE ANALYSIS DETAILS', 20, yPosition);
      yPosition += 15;

      // Compression anomalies
      if (results.imageAnalysis.compressionAnomalies.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Compression Anomalies:', 25, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        results.imageAnalysis.compressionAnomalies.forEach(anomaly => {
          doc.text(`• ${anomaly}`, 30, yPosition);
          yPosition += 6;
        });
        yPosition += 5;
      }

      // Pixel inconsistencies
      if (results.imageAnalysis.pixelInconsistencies.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Pixel Inconsistencies:', 25, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        results.imageAnalysis.pixelInconsistencies.forEach(inconsistency => {
          doc.text(`• ${inconsistency}`, 30, yPosition);
          yPosition += 6;
        });
      }
    } else if (results.frameAnalysis) {
      // Frame analysis for videos (existing code)
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 30;
      }

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text('FRAME-BY-FRAME ANALYSIS', 20, yPosition);
      yPosition += 15;

      // Analysis table header
      doc.setFillColor(30, 58, 138);
      doc.rect(20, yPosition - 5, pageWidth - 40, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Frame #', 25, yPosition + 3);
      doc.text('Confidence', 60, yPosition + 3);
      doc.text('Status', 100, yPosition + 3);
      doc.text('Anomalies', 130, yPosition + 3);
      yPosition += 15;

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);

      results.frameAnalysis.forEach((frame, index) => {
        if (yPosition > pageHeight - 25) {
          doc.addPage();
          yPosition = 30;
        }

        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(20, yPosition - 3, pageWidth - 40, 8, 'F');
        }

        doc.text(frame.frame.toString(), 25, yPosition + 2);
        doc.text(`${frame.confidence.toFixed(1)}%`, 60, yPosition + 2);
        
        const status = frame.confidence > 80 ? 'CLEAN' : frame.confidence > 60 ? 'SUSPECT' : 'FLAGGED';
        const statusColor = frame.confidence > 80 ? [34, 197, 94] : frame.confidence > 60 ? [245, 158, 11] : [220, 38, 38];
        doc.setTextColor(...statusColor);
        doc.text(status, 100, yPosition + 2);
        
        doc.setTextColor(0, 0, 0);
        const anomaliesText = frame.anomalies.length > 0 ? frame.anomalies.join(', ') : 'None';
        const maxWidth = pageWidth - 135;
        const lines = doc.splitTextToSize(anomaliesText, maxWidth);
        doc.text(lines[0] || '', 130, yPosition + 2);
        
        yPosition += 8;
      });
    }

    // Professional Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text('DeepGuard AI-Powered Deepfake Detection System', 20, pageHeight - 12);
      doc.text('Confidential Report - For Authorized Use Only', 20, pageHeight - 7);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 12, { align: 'right' });
      doc.text(`Analyzed by: Sindhu Reddy`, pageWidth - 20, pageHeight - 7, { align: 'right' });
    }

    const fileName = `DeepGuard-${results.mediaType}-Analysis-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <span>Detection Results</span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            results.mediaType === 'image' 
              ? 'bg-blue-500/20 text-blue-300' 
              : 'bg-purple-500/20 text-purple-300'
          }`}>
            <MediaIcon className="w-3 h-3 inline mr-1" />
            {results.mediaType.toUpperCase()}
          </div>
        </h3>
        
        <button 
          onClick={handleExportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF Report</span>
        </button>
      </div>

      <div className={`p-4 rounded-xl mb-6 ${statusBg} border-l-4 ${results.isDeepfake ? 'border-red-400' : 'border-green-400'}`}>
        <div className="flex items-center space-x-3">
          {React.createElement(statusIcon, { className: `w-8 h-8 ${statusColor}` })}
          <div>
            <h4 className={`text-lg font-semibold ${statusColor}`}>
              {results.isDeepfake ? 'Deepfake Detected' : `Authentic ${results.mediaType === 'image' ? 'Image' : 'Video'}`}
            </h4>
            <p className="text-slate-300">
              Confidence: <span className={`font-bold ${confidenceColor}`}>
                {results.confidence.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-1 mb-4 bg-slate-700/30 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'analysis', label: results.mediaType === 'image' ? 'Image Analysis' : 'Frame Analysis', icon: BarChart3 },
          { id: 'technical', label: 'Technical Details', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'analysis' | 'technical')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <p className="text-slate-400 text-sm font-medium">Model Used</p>
                </div>
                <p className="text-white font-bold text-lg">{results.model.toUpperCase()}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Accuracy: {results.model === 'cnn-basic' ? (results.mediaType === 'image' ? '85%' : '87%') : 
                            results.model === 'cnn-advanced' ? (results.mediaType === 'image' ? '92%' : '94%') : 
                            (results.mediaType === 'image' ? '96%' : '97%')}
                </p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-slate-400 text-sm font-medium">Processing Time</p>
                </div>
                <p className="text-white font-bold text-lg">{results.processingTime}s</p>
                <p className="text-slate-400 text-xs mt-1">
                  {results.mediaType === 'image' 
                    ? `${results.imageAnalysis?.faceRegions || 1} face region${(results.imageAnalysis?.faceRegions || 1) > 1 ? 's' : ''} analyzed`
                    : `${results.frameAnalysis?.length || 0} frames analyzed`
                  }
                </p>
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Confidence Distribution</p>
                <span className={`text-sm font-bold ${confidenceColor}`}>
                  {results.confidence.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${
                    results.isDeepfake 
                      ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700' 
                      : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
                  }`}
                  style={{ width: `${results.confidence}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {results.mediaType === 'video' && results.frameAnalysis && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                  <p className="text-2xl font-bold text-green-400">
                    {results.frameAnalysis.filter(f => f.confidence > 80).length}
                  </p>
                  <p className="text-slate-400 text-xs">Clean Frames</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                  <p className="text-2xl font-bold text-yellow-400">
                    {results.frameAnalysis.filter(f => f.confidence > 60 && f.confidence <= 80).length}
                  </p>
                  <p className="text-slate-400 text-xs">Suspect Frames</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                  <p className="text-2xl font-bold text-red-400">
                    {results.frameAnalysis.filter(f => f.confidence <= 60).length}
                  </p>
                  <p className="text-slate-400 text-xs">Flagged Frames</p>
                </div>
              </div>
            )}

            {results.mediaType === 'image' && results.imageAnalysis && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                  <p className="text-2xl font-bold text-blue-400">
                    {results.imageAnalysis.faceRegions}
                  </p>
                  <p className="text-slate-400 text-xs">Face Regions</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600/50">
                  <p className="text-2xl font-bold text-purple-400">
                    {results.imageAnalysis.artifactScore.toFixed(1)}%
                  </p>
                  <p className="text-slate-400 text-xs">Artifact Score</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-4">
            {results.mediaType === 'image' && results.imageAnalysis ? (
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Compression Anomalies</span>
                  </h4>
                  <div className="space-y-2">
                    {results.imageAnalysis.compressionAnomalies.map((anomaly, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{anomaly}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Pixel Inconsistencies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.imageAnalysis.pixelInconsistencies.map((inconsistency, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-md border border-yellow-500/30">
                        {inconsistency}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              results.frameAnalysis && (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {results.frameAnalysis.map((frame, index) => (
                    <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700/70 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Frame {frame.frame}</span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            frame.confidence > 80 ? 'bg-green-400' : 
                            frame.confidence > 60 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}></div>
                          <span className={`font-bold ${
                            frame.confidence > 80 ? 'text-green-400' : 
                            frame.confidence > 60 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {frame.confidence.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      {frame.anomalies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {frame.anomalies.map((anomaly, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-md border border-red-500/30">
                              {anomaly}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <p className="text-slate-400 text-sm font-medium">Resolution</p>
                </div>
                <p className="text-white font-bold">{results.technicalDetails.resolution}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <p className="text-slate-400 text-sm font-medium">File Size</p>
                </div>
                <p className="text-white font-bold">{results.technicalDetails.fileSize}</p>
              </div>
              
              {results.mediaType === 'image' ? (
                <>
                  {results.technicalDetails.colorSpace && (
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <p className="text-slate-400 text-sm font-medium">Color Space</p>
                      </div>
                      <p className="text-white font-bold">{results.technicalDetails.colorSpace}</p>
                    </div>
                  )}
                  {results.technicalDetails.bitDepth && (
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                        <p className="text-slate-400 text-sm font-medium">Bit Depth</p>
                      </div>
                      <p className="text-white font-bold">{results.technicalDetails.bitDepth}-bit</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {results.technicalDetails.frameRate && (
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <p className="text-slate-400 text-sm font-medium">Frame Rate</p>
                      </div>
                      <p className="text-white font-bold">{results.technicalDetails.frameRate} fps</p>
                    </div>
                  )}
                  {results.technicalDetails.duration && (
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <p className="text-slate-400 text-sm font-medium">Duration</p>
                      </div>
                      <p className="text-white font-bold">{results.technicalDetails.duration}s</p>
                    </div>
                  )}
                  {results.technicalDetails.codec && (
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <p className="text-slate-400 text-sm font-medium">Codec</p>
                      </div>
                      <p className="text-white font-bold">{results.technicalDetails.codec}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}