import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function UploadDownload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 1000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["This is a sample text file for testing download automation."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "sample-download.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Upload & Download</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Practice automating file uploads and downloads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Upload size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">File Upload</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
              Select a file to upload. Automation scripts typically interact with the hidden input element directly.
            </p>
            
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-slate-400 mb-3" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  Click to browse
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Any file type supported
                </span>
              </label>
            </div>

            {file && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
                
                <button
                  id="file-submit"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg font-medium transition-colors"
                >
                  {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded Successfully' : 'Upload File'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Download size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">File Download</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
              Click the button below to download a sample text file. Automation scripts can verify the file was downloaded successfully.
            </p>
            
            <button
              id="file-download"
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
            >
              <Download size={20} />
              Download Sample File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
