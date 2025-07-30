"""
API Server for DeepFake Detection
Provides REST endpoints for the frontend application.
In production, this would handle file uploads and coordinate with the detection engine.
"""

import json
import os
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from deepfake_detector import DeepfakeDetector

class DeepfakeAPIHandler(BaseHTTPRequestHandler):
    """
    HTTP request handler for deepfake detection API.
    """
    
    def __init__(self, *args, **kwargs):
        self.detector = DeepfakeDetector()
        super().__init__(*args, **kwargs)
    
    def _set_cors_headers(self):
        """Set CORS headers for browser compatibility."""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        """Handle preflight requests."""
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests."""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/analyze':
            self._handle_analyze_request()
        else:
            self._send_error(404, "Endpoint not found")
    
    def do_GET(self):
        """Handle GET requests."""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/status':
            self._handle_status_request()
        elif parsed_path.path == '/api/models':
            self._handle_models_request()
        else:
            self._send_error(404, "Endpoint not found")
    
    def _handle_analyze_request(self):
        """
        Handle video analysis requests.
        In production, this would process uploaded video files.
        """
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))
            
            video_path = request_data.get('video_path', '/tmp/uploaded_video.mp4')
            model_id = request_data.get('model_id', 'cnn-advanced')
            
            # Simulate file upload processing
            print(f"Processing video analysis request...")
            print(f"Video: {video_path}")
            print(f"Model: {model_id}")
            
            # Run analysis
            result = self.detector.analyze_video(video_path, model_id)
            
            response_data = {
                'success': True,
                'result': {
                    'confidence': result.confidence,
                    'is_deepfake': result.is_deepfake,
                    'model_used': result.model_used,
                    'processing_time': result.processing_time,
                    'frame_analysis': result.frame_analysis,
                    'technical_details': result.technical_details
                }
            }
            
            self._send_json_response(response_data)
            
        except Exception as e:
            self._send_error(500, f"Analysis failed: {str(e)}")
    
    def _handle_status_request(self):
        """Handle system status requests."""
        status_data = {
            'status': 'online',
            'version': '1.0.0',
            'available_models': list(self.detector.model_manager.models.keys()),
            'system_health': 'healthy'
        }
        self._send_json_response(status_data)
    
    def _handle_models_request(self):
        """Handle model information requests."""
        models_data = {
            'models': self.detector.model_manager.models
        }
        self._send_json_response(models_data)
    
    def _send_json_response(self, data):
        """Send JSON response."""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self._set_cors_headers()
        self.end_headers()
        
        response_json = json.dumps(data, indent=2)
        self.wfile.write(response_json.encode('utf-8'))
    
    def _send_error(self, code, message):
        """Send error response."""
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self._set_cors_headers()
        self.end_headers()
        
        error_data = {
            'success': False,
            'error': message,
            'code': code
        }
        
        response_json = json.dumps(error_data, indent=2)
        self.wfile.write(response_json.encode('utf-8'))

def run_server(port=8000):
    """
    Run the API server.
    """
    server_address = ('', port)
    httpd = HTTPServer(server_address, DeepfakeAPIHandler)
    
    print(f"DeepFake Detection API Server running on port {port}")
    print(f"Access the API at: http://localhost:{port}")
    print("\nAvailable endpoints:")
    print("  GET  /api/status   - System status")
    print("  GET  /api/models   - Available models")
    print("  POST /api/analyze  - Analyze video")
    print("\nPress Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()