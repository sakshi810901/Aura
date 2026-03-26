import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';

const AvatarSetup = () => {
    const [loadingModels, setLoadingModels] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadModels = async () => {
            try {
                // Models need to be inside public/models
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                setLoadingModels(false);
            } catch (err) {
                console.error("Error loading face-api models", err);
                setError("Failed to load face detection models. Please try again.");
                setLoadingModels(false);
            }
        };
        loadModels();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');
        setProcessing(true);
        
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // We will process the image after it loads in the DOM
    };

    const processImage = async () => {
        if (!imageRef.current) return;

        try {
            const img = imageRef.current;
            
            // Detect face
            const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions());
            
            if (!detection) {
                setError("Face not detected. Please upload a clear photo.");
                setProcessing(false);
                return;
            }

            // Extract bounding box
            const box = detection.box;
            
            // Create canvas and crop
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Add some padding to the crop
            const padding = box.width * 0.2;
            const cropX = Math.max(0, box.x - padding);
            const cropY = Math.max(0, box.y - padding);
            const cropW = Math.min(img.width - cropX, box.width + padding * 2);
            const cropH = Math.min(img.height - cropY, box.height + padding * 2);

            // Using powers of two might be better for WebGL but Three.js handles NPOT textures now
            canvas.width = 512;
            canvas.height = 512;

            // Draw cropped face to canvas stretching to 512x512
            ctx.drawImage(
                img, 
                cropX, cropY, cropW, cropH, 
                0, 0, canvas.width, canvas.height
            );

            // Convert to base64
            const faceBase64 = canvas.toDataURL('image/png');
            
            // Save to localStorage
            localStorage.setItem('faceTexture', faceBase64);
            
            // Navigate to Dashboard
            navigate('/dashboard');

        } catch (err) {
            console.error("Error processing image:", err);
            setError("An error occurred while processing the image.");
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-zinc-950 overflow-hidden text-white font-sans">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full point-events-none"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full point-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg p-8 sm:p-10 mx-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.15)]"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                        Create Your Avatar
                    </h1>
                    <p className="text-zinc-400 text-sm">Upload a clear photo of your face to generate your 3D persona.</p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {loadingModels ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-4" />
                        <p className="text-zinc-400 font-medium">Initializing AI Core...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-2xl hover:border-pink-500/50 hover:bg-white/5 transition-all cursor-pointer overflow-hidden group">
                            {previewUrl ? (
                                <img 
                                    ref={imageRef} 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity"
                                    onLoad={processImage}
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-pink-400 group-hover:text-pink-300 group-hover:bg-pink-500/30 transition-all"
                                    >
                                        <Upload className="w-8 h-8" />
                                    </motion.div>
                                    <p className="mb-2 text-sm text-zinc-300 font-medium"><span className="font-semibold text-pink-400">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-zinc-500">PNG, JPG or JPEG (Max 10MB)</p>
                                </div>
                            )}
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/jpeg, image/png, image/jpg" 
                                onChange={handleImageUpload}
                                disabled={processing}
                            />
                            
                            {processing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
                                    <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-4" />
                                    <p className="text-white font-medium drop-shadow-md">Extracting Neural Patterns...</p>
                                </div>
                            )}
                        </label>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AvatarSetup;
