import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import './style.css';
import {downloadAction} from './api/download.api.js';
import { saveAs } from "file-saver";

export default function PDFUploadLanding() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filename, setfilename] = useState("2026011417130.xlsx");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      addFiles(files);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadFile = () => {
    downloadFile()
  }

  const downloadFile = async () => {
    try {
        const blob = await downloadAction.downloads(filename);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        
        // Trigger click
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (error) {
      alert("Gagal download file!");
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <FileText className="logo-icon" />
            <h1 className="logo-text">Rekap Bukpot To Excel</h1>
          </div>
          {/* <button className="sign-in-btn">Sign In</button> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <div className="hero-section">
            <h2 className="hero-title">Upload Your Bukpot PDF Files</h2>
            <p className="hero-subtitle">
              website ini digunakan untuk convert bukti potong pajak menjadi report dengan ouput file excel
            </p>
          </div>

          {/* Upload Area */}
          <div className="upload-card">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            >
              <input
                type="file"
                id="fileInput"
                className="file-input"
                accept=".pdf"
                multiple
                onChange={handleFileInput}
              />
              
              <Upload className={`upload-icon ${isDragging ? 'bouncing' : ''}`} />
              
              <h3 className="drop-title">Drop your PDF files here</h3>
              <p className="drop-subtitle">or click the button below to browse</p>
              
              <label htmlFor="fileInput" className="choose-btn">
                Choose Files
              </label>
              
              <p className="file-limit">Maximum file size: 5MB per file</p>
            </div>
            {/* <button className="process-btn" onClick={uploadFile}>
                Download File
              </button> */}
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="files-section">
                <h4 className="files-header">
                  <CheckCircle className="check-icon" />
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <button className="process-btn" onClick={uploadFile}>
                  Process {uploadedFiles.length} File{uploadedFiles.length > 1 ? 's' : ''}
                </button>
                <div className="files-list">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="file-item">
                      <div className="file-info">
                        <FileText className="file-icon" />
                        <div>
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{file.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="remove-btn"
                      >
                        <X className="remove-icon" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          {/* <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Upload className="feature-icon" />
              </div>
              <h3 className="feature-title">Fast Upload</h3>
              <p className="feature-description">
                Lightning-fast upload speeds with optimized performance
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CheckCircle className="feature-icon" />
              </div>
              <h3 className="feature-title">Secure</h3>
              <p className="feature-description">
                Your files are encrypted and protected with enterprise-grade security
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FileText className="feature-icon" />
              </div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Simple drag and drop interface for seamless file management
              </p>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}