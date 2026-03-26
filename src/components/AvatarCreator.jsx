import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Link2, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function AvatarCreator({ onSuccess }) {
  const [pastedUrl, setPastedUrl] = useState('');
  const [error, setError] = useState('');
  const iframeRef = useRef(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      let data = event.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (e) {}
      }

      // Handle RPM iframe export
      if (data?.source === 'readyplayerme' && data?.eventName === 'v1.avatar.exported') {
        const url = data.data?.url || data.url;
        if (url) {
          onSuccess({ modelUrl: url, previewUrl: url.replace('.glb', '.png') });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess]);

  const handleIframeLoad = () => {
    setIframeLoading(false);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ target: 'readyplayerme', type: 'subscribe', eventName: 'v1.**' }), '*');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pastedUrl.includes('.glb') && !pastedUrl.includes('readyplayer.me')) {
      setError('Please provide a valid 3D model URL ending in .glb');
      return;
    }
    
    let finalUrl = pastedUrl.trim();
    if (finalUrl.includes('readyplayer.me') && !finalUrl.endsWith('.glb') && !finalUrl.includes('?')) {
        finalUrl = finalUrl + '.glb';
    }

    onSuccess({
      modelUrl: finalUrl,
      previewUrl: finalUrl.replace('.glb', '.png')
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      className="w-full max-w-7xl h-[90vh] glass-panel relative z-10 p-4 overflow-hidden border-2 border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col md:flex-row gap-6"
    >
      {/* LEFT SIDE: EXTERNAL / MANUAL FALLBACK */}
      <div className="w-full md:w-1/3 flex flex-col justify-center bg-slate-900/50 p-6 rounded-[1.25rem] border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-xl font-black text-white tracking-wide">
            Ultimate Creator
          </h2>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Design your human avatar with <strong className="text-white">full facial features, eyes, hair, gender, and dresses!</strong>
        </p>

        <div className="space-y-6">
          <div className="bg-slate-800/80 p-5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors shadow-inner">
            <h3 className="text-md font-bold text-white mb-2">Option A: Embedded View</h3>
            <p className="text-slate-400 text-xs mb-0">Use the interactive creator running on the right side of the screen.</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-900 text-[10px] text-slate-500 uppercase font-extrabold tracking-widest rounded-full border border-slate-800">OR IF BLOCKED</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors shadow-inner">
            <h3 className="text-md font-bold text-white mb-2">Option B: External Tab</h3>
            <p className="text-slate-400 text-xs mb-4">If the window on the right is failing to load meshes (due to browser ad-blockers), create it externally and paste your link.</p>
            
            <button 
              onClick={() => window.open('https://readyplayer.me/avatar', '_blank')}
              className="flex items-center justify-center w-full gap-2 bg-slate-700 hover:bg-indigo-600 text-white px-4 py-3 border border-white/10 rounded-xl text-sm font-bold transition-colors mb-4"
            >
              <ExternalLink className="w-4 h-4" />
              Open In New Tab
            </button>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="url"
                  value={pastedUrl}
                  onChange={(e) => { setPastedUrl(e.target.value); setError(''); }}
                  placeholder="Paste URL (.glb)..."
                  className="block w-full pl-9 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-2 rounded-lg">
                  <AlertTriangle className="w-3 h-3" /> {error}
                </div>
              )}
              <button
                type="submit"
                disabled={!pastedUrl}
                className="w-full gamified-button justify-center gap-2 !py-3 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Import Avatar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: IFRAME */}
      <div className="w-full md:w-2/3 relative rounded-[1.25rem] overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center shadow-inner">
        {iframeLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-10">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-indigo-200 text-sm animate-pulse tracking-wide font-medium">Loading Ultimate Customizer...</p>
            <p className="text-slate-500 text-xs mt-4 max-w-xs text-center">If this takes longer than 10 seconds, your browser is blocking the elements. Use Option B on the left.</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title="Ready Player Me"
          src="https://demo.readyplayer.me/avatar?frameApi&clearCache&bodyType=fullbody"
          className={`w-full h-full border-none transition-opacity duration-1000 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`}
          allow="camera *; microphone *; clipboard-write"
          onLoad={handleIframeLoad}
        />
      </div>
    </motion.div>
  );
}
