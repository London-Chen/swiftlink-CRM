import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Bot, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Customer } from '../types';
import { MOCK_RPA_DATA, MOCK_DRIVERS } from '../constants';

interface RpaImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (customers: Customer[]) => void;
}

type Step = 'upload' | 'processing' | 'review';

export const RpaImportModal: React.FC<RpaImportModalProps> = ({ isOpen, onClose, onImportComplete }) => {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      startProcessing();
    }
  };

  const startProcessing = () => {
    setStep('processing');
    setProgress(0);
    setLog([]);
    
    // Simulate RPA Steps
    const steps = [
      { msg: 'RPA Agent initialized...', delay: 500 },
      { msg: 'Opening Excel spreadsheet...', delay: 1000 },
      { msg: 'Reading 6 rows of data...', delay: 1500 },
      { msg: 'Connecting to Map Service...', delay: 2000 },
      { msg: 'Analyzing address "100 Financial Dist"... Coordinates found.', delay: 2500 },
      { msg: 'Checking driver availability...', delay: 3000 },
      { msg: 'Optimizing route assignments...', delay: 3500 },
      { msg: 'Import validation successful.', delay: 4000 },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setStep('review');
      } else {
        const s = steps[currentStep];
        setLog(prev => [...prev, s.msg]);
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100));
        currentStep++;
      }
    }, 600);
  };

  const handleConfirm = () => {
    // Convert Mock RPA Data to Customer objects
    const newCustomers: Customer[] = MOCK_RPA_DATA.map((d, i) => ({
      id: `rpa-${Date.now()}-${i}`,
      name: d.name,
      company: d.company,
      addressName: d.address,
      location: { x: d.x, y: d.y },
      assignedDriverId: d.driver,
      status: 'assigned',
      addedVia: 'rpa',
      timestamp: new Date().toISOString(),
    }));

    onImportComplete(newCustomers);
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setStep('upload');
      setFile(null);
      setLog([]);
      setProgress(0);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">RPA Batch Import</h3>
              <p className="text-xs text-indigo-600 font-medium">Powered by Automation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          
          {/* STEP 1: UPLOAD */}
          {step === 'upload' && (
            <div className="text-center space-y-6">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-8 h-8 text-gray-400 group-hover:text-indigo-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-700">Upload Customer Excel File</h4>
                <p className="text-sm text-gray-500 mt-2">Drag and drop or click to browse</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".xlsx, .xls, .csv" 
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <span>Supports: .xlsx, .csv</span>
              </div>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="space-y-6">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">RPA Agent Working...</h3>
                <p className="text-gray-500">Please wait while we process the file.</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 relative" 
                  style={{ width: `${progress}%` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/30 w-full animate-pulse"></div>
                </div>
              </div>

              {/* Terminal Log */}
              <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm border border-gray-700 shadow-inner">
                {log.map((entry, idx) => (
                  <div key={idx} className="text-green-400 mb-1 flex items-center gap-2">
                    <span className="opacity-50">&gt;</span> {entry}
                  </div>
                ))}
                <div className="animate-pulse text-green-400">_</div>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 'review' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Import Ready!</h3>
                <p className="text-gray-500">We successfully extracted 6 customers and auto-assigned drivers.</p>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Preview Data</h4>
                <div className="space-y-2">
                  {MOCK_RPA_DATA.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-2 bg-white rounded border border-gray-100 shadow-sm">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">{item.address}</span>
                        <ArrowRight className="w-3 h-3 text-gray-300" />
                        <span className="text-indigo-600 font-medium text-xs">
                          {MOCK_DRIVERS.find(d => d.id === item.driver)?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-xs text-gray-400 mt-2 italic">+3 more records</div>
                </div>
              </div>

              <button 
                onClick={handleConfirm}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                Complete Import
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};