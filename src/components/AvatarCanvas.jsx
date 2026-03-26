import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Html } from '@react-three/drei';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

// Component to handle the actual loading so it can be suspended
const VRMAvatar = ({ url }) => {
  const vrmRef = useRef();

  const handleRegister = (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  };

  const gltf = useGLTF(url, false, false, handleRegister);
  const vrm = gltf.userData?.vrm;

  useEffect(() => {
    if (vrm) {
      // Setup default pose or adjust as needed
      vrm.scene.rotation.y = Math.PI; // Face the camera
    }
  }, [vrm]);

  useFrame((state, delta) => {
    if (vrm) {
      vrm.update?.(delta);
    }
    // Idle rotation animation
    if (vrmRef.current) {
        vrmRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (!vrm) return null;

  return (
    <primitive object={vrm.scene} ref={vrmRef} position={[0, -1.5, 0]} />
  );
};

// Loader fallback
const Loader = () => {
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center p-4 bg-black/50 rounded-xl backdrop-blur-md">
                <div className="w-8 h-8 border-4 border-t-[#c084fc] border-r-[#818cf8] border-b-[#f472b6] border-l-transparent rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-semibold tracking-wider">Loading Avatar...</p>
            </div>
        </Html>
    );
};

const AvatarCanvas = ({ avatarUrl }) => {
  // If no avatar URL is provided, show the placeholder
  if (!avatarUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-2xl overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-blue-900/40 to-pink-900/40"></div>
        <div className="z-10 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center mb-4 border-4 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)] overflow-hidden">
                <span className="text-purple-400 text-6xl">?</span>
            </div>
            <p className="text-white/70 font-medium">No Avatar Set</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black shadow-2xl relative border border-gray-800">
      <Canvas camera={{ position: [0, 1.0, 3], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 5, -10]} intensity={0.5} color="#c084fc" />
        <React.Suspense fallback={<Loader />}>
            <VRMAvatar url={avatarUrl} />
            <Environment preset="city" />
        </React.Suspense>
        <OrbitControls 
            enablePan={false}
            minDistance={1.5}
            maxDistance={5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
