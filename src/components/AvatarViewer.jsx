import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { LoopOnce, LoopRepeat } from 'three';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error loading 3D model:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ 
            color: '#ff6b6b', 
            background: 'rgba(20, 20, 30, 0.9)', 
            padding: '24px', 
            borderRadius: '12px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            whiteSpace: 'nowrap',
            border: '1px solid #ff6b6b44'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Failed to load avatar.</h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Ensure model exists at /models/avatar/girl.glb</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

const Loader = () => {
  return (
    <Html center>
      <div style={{ 
        color: '#ffffff', 
        fontFamily: 'sans-serif', 
        fontSize: '16px', 
        letterSpacing: '2px',
        animation: 'pulse 1.5s infinite ease-in-out' 
      }}>
        LOADING MODEL...
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </div>
    </Html>
  );
};

const AvatarModel = ({ onModelLoaded, config, transforms, readOnlyMode = false, playWave = false }) => {
  const groupRef = useRef();

  // Animation refs
  const mixerRef = useRef(null);
  const idleActionRef = useRef(null);
  const waveActionRef = useRef(null);

  // Load the specified GLB model
  const { scene } = useGLTF('/models/avatar/girl.glb');

  // Load animation files
  const { animations: idleAnims } = useGLTF('/models/avatar/animations/idle.glb');
  const { animations: waveAnims } = useGLTF('/models/avatar/animations/wave.glb');

  // Load external hair models
  const hair1 = useGLTF("/models/avatar/hair/hair01.glb");
  const hair2 = useGLTF("/models/avatar/hair/hair02.glb");
  const hair3 = useGLTF("/models/avatar/hair/hair03.glb");

  // Load clothing models
  const top1 = useGLTF("/models/avatar/tops/top01.glb");
  const top2 = useGLTF("/models/avatar/tops/top02.glb");
  const bottom1 = useGLTF("/models/avatar/bottoms/bottom01.glb");
  const bottom2 = useGLTF("/models/avatar/bottoms/bottom02.glb");
  const dress1 = useGLTF("/models/avatar/dresses/dress01.glb");
  const shoe1 = useGLTF("/models/avatar/shoes/shoe01.glb");
  const shoe2 = useGLTF("/models/avatar/shoes/shoe02.glb");

  // Apply skin color directly to base avatar materials
  useEffect(() => {
    if (!scene) return;
    const skinMaterials = ['Std_Skin_Head', 'Std_Skin_Body', 'Std_Skin_Arm', 'Std_Skin_Leg'];
    scene.traverse((child) => {
      if (child.isMesh && child.material && skinMaterials.includes(child.material.name)) {
        if (!child.userData.originalColorSet) {
          child.userData.originalColor = child.material.color.clone();
          child.userData.originalColorSet = true;
          child.material = child.material.clone();
        }
        
        if (config.skinColor === '#ffffff') {
           child.material.color.copy(child.userData.originalColor);
        } else {
           let brightness = 1.0;
           if (config.skinColor === '#fffaee') brightness = 2.0; // Porcelain
           if (config.skinColor === '#fff0f5') brightness = 1.6; // Fair Blush
           if (config.skinColor === '#fffae6') brightness = 1.4; // Ivory
           
           child.material.color.copy(child.userData.originalColor)
             .multiply(new THREE.Color(config.skinColor))
             .multiplyScalar(brightness);
        }
      }
    });
  }, [scene, config.skinColor]);

  // Apply dark brown material to external hairstyles
  useEffect(() => {
    const applyHairColor = (hair) => {
      if (!hair || !hair.scene) return;
      hair.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: config.hairColor || "#3b2a1a",
            roughness: 0.5,
            metalness: 0.1
          });
        }
      });
    };

    applyHairColor(hair1);
    applyHairColor(hair2);
    applyHairColor(hair3);
  }, [hair1, hair2, hair3, config.hairColor]);

  useEffect(() => {
    if (scene && onModelLoaded) {
      onModelLoaded(scene);
    }
  }, [scene, onModelLoaded]);

  // ── Hardcoded Mixamo → CC4 bone name map (built from console output) ──
  const MIXAMO_TO_CC = {
    // Core / spine
    mixamorigHips:               'CC_Base_Hip_02',
    mixamorigSpine:              'CC_Base_Waist_033',
    mixamorigSpine1:             'CC_Base_Spine01_034',
    mixamorigSpine2:             'CC_Base_Spine02_035',
    mixamorigNeck:               'CC_Base_NeckTwist01_036',
    mixamorigHead:               'CC_Base_Head_038',
    // Left leg
    mixamorigLeftUpLeg:          'CC_Base_L_Thigh_04',
    mixamorigLeftLeg:            'CC_Base_L_Calf_05',
    mixamorigLeftFoot:           'CC_Base_L_Foot_06',
    mixamorigLeftToeBase:        'CC_Base_L_ToeBase_08',
    // Right leg
    mixamorigRightUpLeg:         'CC_Base_R_Thigh_019',
    mixamorigRightLeg:           'CC_Base_R_Calf_020',
    mixamorigRightFoot:          'CC_Base_R_Foot_022',
    mixamorigRightToeBase:       'CC_Base_R_ToeBase_023',
    // Left arm
    mixamorigLeftShoulder:       'CC_Base_L_Clavicle_049',
    mixamorigLeftArm:            'CC_Base_L_Upperarm_050',
    mixamorigLeftForeArm:        'CC_Base_L_Forearm_051',
    mixamorigLeftHand:           'CC_Base_L_Hand_055',
    // Left hand fingers
    mixamorigLeftHandIndex1:     'CC_Base_L_Index1_065',
    mixamorigLeftHandIndex2:     'CC_Base_L_Index2_066',
    mixamorigLeftHandIndex3:     'CC_Base_L_Index3_067',
    mixamorigLeftHandMiddle1:    'CC_Base_L_Mid1_062',
    mixamorigLeftHandMiddle2:    'CC_Base_L_Mid2_063',
    mixamorigLeftHandMiddle3:    'CC_Base_L_Mid3_064',
    mixamorigLeftHandPinky1:     'CC_Base_L_Pinky1_056',
    mixamorigLeftHandPinky2:     'CC_Base_L_Pinky2_057',
    mixamorigLeftHandPinky3:     'CC_Base_L_Pinky3_058',
    mixamorigLeftHandRing1:      'CC_Base_L_Ring1_059',
    mixamorigLeftHandRing2:      'CC_Base_L_Ring2_060',
    mixamorigLeftHandRing3:      'CC_Base_L_Ring3_061',
    mixamorigLeftHandThumb1:     'CC_Base_L_Thumb1_068',
    mixamorigLeftHandThumb2:     'CC_Base_L_Thumb2_069',
    mixamorigLeftHandThumb3:     'CC_Base_L_Thumb3_070',
    // Right arm
    mixamorigRightShoulder:      'CC_Base_R_Clavicle_077',
    mixamorigRightArm:           'CC_Base_R_Upperarm_078',
    mixamorigRightForeArm:       'CC_Base_R_Forearm_079',
    mixamorigRightHand:          'CC_Base_R_Hand_083',
    // Right hand fingers
    mixamorigRightHandIndex1:    'CC_Base_R_Index1_093',
    mixamorigRightHandIndex2:    'CC_Base_R_Index2_094',
    mixamorigRightHandIndex3:    'CC_Base_R_Index3_095',
    mixamorigRightHandMiddle1:   'CC_Base_R_Mid1_087',
    mixamorigRightHandMiddle2:   'CC_Base_R_Mid2_088',
    mixamorigRightHandMiddle3:   'CC_Base_R_Mid3_089',
    mixamorigRightHandPinky1:    'CC_Base_R_Pinky1_096',
    mixamorigRightHandPinky2:    'CC_Base_R_Pinky2_097',
    mixamorigRightHandPinky3:    'CC_Base_R_Pinky3_098',
    mixamorigRightHandRing1:     'CC_Base_R_Ring1_084',
    mixamorigRightHandRing2:     'CC_Base_R_Ring2_085',
    mixamorigRightHandRing3:     'CC_Base_R_Ring3_086',
    mixamorigRightHandThumb1:    'CC_Base_R_Thumb1_090',
    mixamorigRightHandThumb2:    'CC_Base_R_Thumb2_091',
    mixamorigRightHandThumb3:    'CC_Base_R_Thumb3_092',
  };

  // Set up AnimationMixer and play wave → idle sequence
  useEffect(() => {
    if (!scene || !idleAnims?.length || !waveAnims?.length) return;

    // Retarget a Mixamo clip to the CC4 skeleton
    const retargetClip = (clip) => {
      const retargetedTracks = [];
      for (const track of clip.tracks) {
        const dotIdx = track.name.indexOf('.');
        if (dotIdx === -1) continue;
        const mixBone = track.name.substring(0, dotIdx);
        const property = track.name.substring(dotIdx);

        // Discard any tracks for the hips, as CC4 and Mixamo have a 180-degree root mismatch
        if (mixBone === 'mixamorigHips') {
          continue;
        }

        // Keep the legs still so unrigged static shoes and clothes remain aligned
        if (mixBone.includes('UpLeg') || mixBone.includes('LeftLeg') || mixBone.includes('RightLeg') || mixBone.includes('Foot') || mixBone.includes('ToeBase')) {
          continue;
        }

        // Strip position tracks for all other bones
        if (property === '.position') {
          continue;
        }

        const ccBone = MIXAMO_TO_CC[mixBone];
        if (ccBone) {
          const newTrack = track.clone();
          newTrack.name = ccBone + property;
          retargetedTracks.push(newTrack);
        }
      }
      return new THREE.AnimationClip(clip.name, clip.duration, retargetedTracks);
    };

    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;

    const idleAction = mixer.clipAction(retargetClip(idleAnims[0]));
    idleAction.setLoop(LoopRepeat, Infinity);
    idleActionRef.current = idleAction;

    const waveAction = mixer.clipAction(retargetClip(waveAnims[0]));
    waveAction.setLoop(LoopOnce, 1);
    waveAction.clampWhenFinished = true;
    waveActionRef.current = waveAction;

    if (playWave) {
      waveAction.play();
    } else {
      idleAction.play();
    }

    const onFinished = (e) => {
      if (e.action === waveAction) {
        waveAction.fadeOut(0.5);
        idleAction.reset().fadeIn(0.5).play();
      }
    };
    mixer.addEventListener('finished', onFinished);

    return () => {
      mixer.removeEventListener('finished', onFinished);
      mixer.stopAllAction();
      mixerRef.current = null;
      idleActionRef.current = null;
      waveActionRef.current = null;
    };
  }, [scene, idleAnims, waveAnims]);

  // Handle playWave prop changes dynamically after mount
  useEffect(() => {
    if (playWave && waveActionRef.current && idleActionRef.current) {
      if (!waveActionRef.current.isRunning()) {
         idleActionRef.current.fadeOut(0.5);
         waveActionRef.current.reset().fadeIn(0.5).play();
      }
    }
  }, [playWave]);


  // Drive the AnimationMixer every frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
      
      {/* Conditionally render external hairs with correct offset to sit on avatar head */}
      {config.hairStyle === 'Style 1' && <primitive object={hair1.scene} position={[0.60, 1.25, -0.11]} scale={1.2} />}
      {config.hairStyle === 'Style 2' && <primitive object={hair2.scene} position={[0.48, 1.58, 0.00]} scale={1.2} />}
      {config.hairStyle === 'Style 3' && <primitive object={hair3.scene} position={[0.00, 1.58, 0.14]} scale={1.2} />}

      {/* Conditionally render custom clothes with tweakable offsets */}
      {config.dressStyle === 'none' && config.topStyle === 'top01' && <primitive object={top1.scene} position={[-1.92, -0.05, -0.03]} scale={0.84} rotation={[0, 0, 0]} />}
      {config.dressStyle === 'none' && config.topStyle === 'top02' && <primitive object={top2.scene} position={[0.00, -0.03, -0.02]} scale={0.01} rotation={[0, 0, 0]} />}
      
      {config.dressStyle === 'none' && config.bottomStyle === 'bottom01' && <primitive object={bottom1.scene} position={[transforms.bottom.x, transforms.bottom.y, transforms.bottom.z]} scale={transforms.bottom.scale} rotation={[transforms.bottom.rx, transforms.bottom.ry, transforms.bottom.rz]} />}
      {config.dressStyle === 'none' && config.bottomStyle === 'bottom02' && <primitive object={bottom2.scene} position={[0.01, -0.01, 0.00]} scale={0.01} rotation={[0, 0, 0]} />}
      
      {config.dressStyle === 'dress01' && <primitive object={dress1.scene} position={[-0.05, -0.44, 0.65]} scale={1.00} rotation={[0, 0, 0]} />}
      
      {config.shoeStyle === 'shoe01' && <primitive object={shoe1.scene} position={[-0.03, 0.13, -0.01]} scale={0.76} rotation={[0, 0, 0]} />}
      {config.shoeStyle === 'shoe02' && <primitive object={shoe2.scene} position={[0.00, 0.14, 0.04]} scale={0.80} rotation={[0, 0, 0]} />}
    </group>
  );
};

// Preload the model for faster consecutive loads
useGLTF.preload('/models/avatar/girl.glb');
useGLTF.preload('/models/avatar/hair/hair01.glb');
useGLTF.preload('/models/avatar/hair/hair02.glb');
useGLTF.preload('/models/avatar/hair/hair03.glb');
useGLTF.preload('/models/avatar/tops/top01.glb');
useGLTF.preload('/models/avatar/tops/top02.glb');
useGLTF.preload('/models/avatar/bottoms/bottom01.glb');
useGLTF.preload('/models/avatar/bottoms/bottom02.glb');
useGLTF.preload('/models/avatar/dresses/dress01.glb');
useGLTF.preload('/models/avatar/shoes/shoe01.glb');
useGLTF.preload('/models/avatar/shoes/shoe02.glb');
useGLTF.preload('/models/avatar/animations/idle.glb');
useGLTF.preload('/models/avatar/animations/wave.glb');

const AvatarViewer = ({ readOnlyMode = false, playWave = false }) => {
  const [modelScene, setModelScene] = useState(null);
  
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('avatarConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hairStyle === undefined || parsed.hairStyle === null) parsed.hairStyle = 'default';
        if (parsed.hairColor === undefined) parsed.hairColor = '#3b2a1a';
        if (parsed.topStyle === undefined) parsed.topStyle = 'default';
        if (parsed.bottomStyle === undefined) parsed.bottomStyle = 'default';
        if (parsed.skinColor === undefined) parsed.skinColor = '#ffffff';
        if (parsed.dressStyle === undefined) parsed.dressStyle = 'none';
        if (parsed.shoes === false && parsed.shoeStyle === undefined) parsed.shoeStyle = 'none';
        if (parsed.shoeStyle === undefined) parsed.shoeStyle = 'default';
        return parsed;
      }
    } catch(e) {
      console.error('Error parsing avatarConfig:', e);
    }
    return {
      shoes: true,
      hairStyle: 'default',
      hairColor: '#3b2a1a',
      topStyle: 'default',
      bottomStyle: 'default',
      skinColor: '#ffffff',
      dressStyle: 'none',
      shoeStyle: 'default'
    };
  });

  // Transform states for unrigged clothing
  const [dressTransform, setDressTransform] = useState({ x: 0, y: 0.8, z: 0, scale: 1, rx: 0, ry: 0, rz: 0 });
  const [topTransform, setTopTransform] = useState({ x: 0, y: 1.1, z: 0, scale: 1, rx: 0, ry: 0, rz: 0 });
  const [bottomTransform, setBottomTransform] = useState({ x: 1.32, y: 0.13, z: -0.06, scale: 0.88, rx: 0, ry: 0, rz: 0 });
  const [shoeTransform, setShoeTransform] = useState({ x: 0, y: 0.02, z: 0.01, scale: 0.81, rx: 0, ry: 0, rz: 0 });

  useEffect(() => {
    localStorage.setItem('avatarConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    if (modelScene) {
      const partsMap = {
        top: ['Object_31'],
        bottom: ['Object_39'],
        shoes: ['Object_33', 'Object_37'],
      };

      modelScene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'Object_35') {
            child.visible = config.hairStyle === 'default';
          }
          if (partsMap.top.includes(child.name)) {
            child.visible = config.dressStyle === 'none' && config.topStyle === 'default';
          }
          if (partsMap.bottom.includes(child.name)) {
            child.visible = config.dressStyle === 'none' && config.bottomStyle === 'default';
          }
          if (partsMap.shoes.includes(child.name)) {
            child.visible = config.shoeStyle === 'default';
          }
        }
      });
    }
  }, [modelScene, config]);

  const togglePart = (part) => {
    setConfig(prev => ({ ...prev, [part]: !prev[part] }));
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'transparent', 
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      zIndex: 0
    }}>
      {/* Canvas Container on the left */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              {/* Soft lighting setup */}
              <ambientLight intensity={0.6} color="#ffffff" />
              <directionalLight position={[2, 5, 3]} intensity={1.2} />
              <directionalLight position={[-2, 1, 2]} intensity={0.4} color="#aaccff" />
              
              <group position={[0, -1, 0]} scale={1.3}>
                <AvatarModel onModelLoaded={setModelScene} config={config} transforms={{ dress: dressTransform, top: topTransform, bottom: bottomTransform, shoe: shoeTransform }} readOnlyMode={readOnlyMode} playWave={playWave} />
              </group>
              <OrbitControls 
                enableZoom={true} 
                enableRotate={true} 
                enablePan={true}
                minDistance={1.5}
                maxDistance={6}
                target={[0, 0, 0]} // Fix camera directly at the chest level of the manually offset avatar
              />
            </ErrorBoundary>
          </Suspense>
        </Canvas>
      </div>

      {/* Futuristic Customization Panel on the right */}
      {!readOnlyMode && (
      <div style={{
        width: '320px',
        background: 'rgba(15, 15, 25, 0.85)',
        backdropFilter: 'blur(12px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '30px 24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#fff', 
            margin: '0 0 8px 0', 
            fontSize: '22px', 
            fontFamily: 'sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #bb86fc, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AURA Studio
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0, fontFamily: 'sans-serif' }}>
            Customize avatar components
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '4px' }}>
          
          {/* Tops Selection */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Tops</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Original', value: 'default' },
                { label: 'Top 1', value: 'top01' },
                { label: 'Top 2', value: 'top02' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setConfig(prev => ({ ...prev, topStyle: opt.value }))}
                  style={{
                    padding: '8px 0', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s',
                    background: config.topStyle === opt.value ? '#bb86fc' : 'rgba(255, 255, 255, 0.1)',
                    color: config.topStyle === opt.value ? '#000' : '#fff',
                    fontWeight: config.topStyle === opt.value ? 'bold' : 'normal',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottoms Selection */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Bottoms</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Original', value: 'default' },
                { label: 'Bottom 1', value: 'bottom01' },
                { label: 'Bottom 2', value: 'bottom02' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setConfig(prev => ({ ...prev, bottomStyle: opt.value }))}
                  style={{
                    padding: '8px 0', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s',
                    background: config.bottomStyle === opt.value ? '#bb86fc' : 'rgba(255, 255, 255, 0.1)',
                    color: config.bottomStyle === opt.value ? '#000' : '#fff',
                    fontWeight: config.bottomStyle === opt.value ? 'bold' : 'normal',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dresses Selection */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Dresses</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'None', value: 'none' },
                { label: 'Dress 1', value: 'dress01' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setConfig(prev => ({ ...prev, dressStyle: opt.value }))}
                  style={{
                    padding: '8px 0', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s',
                    background: config.dressStyle === opt.value ? '#bb86fc' : 'rgba(255, 255, 255, 0.1)',
                    color: config.dressStyle === opt.value ? '#000' : '#fff',
                    fontWeight: config.dressStyle === opt.value ? 'bold' : 'normal',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shoes Selection */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>Shoes</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Original', value: 'default' },
                { label: 'Shoe 1', value: 'shoe01' },
                { label: 'Shoe 2', value: 'shoe02' },
                { label: 'None', value: 'none' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setConfig(prev => ({ ...prev, shoeStyle: opt.value }))}
                  style={{
                    padding: '8px 0', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s',
                    background: config.shoeStyle === opt.value ? '#bb86fc' : 'rgba(255, 255, 255, 0.1)',
                    color: config.shoeStyle === opt.value ? '#000' : '#fff',
                    fontWeight: config.shoeStyle === opt.value ? 'bold' : 'normal',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Tone Selection */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>
              Skin Tone
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { hex: '#ffffff', name: 'Default' },
                { hex: '#fffaee', name: 'Porcelain' },
                { hex: '#fff0f5', name: 'Fair Blush' },
                { hex: '#fffae6', name: 'Ivory' },
                { hex: '#ffdfd2', name: 'Warm Peach' },
                { hex: '#e6c1b3', name: 'Light Tan' },
                { hex: '#c29a8a', name: 'Medium Brown' },
                { hex: '#8c6050', name: 'Dark Brown' },
                { hex: '#a1b3db', name: 'Ice Blue' },
                { hex: '#b3dbbb', name: 'Orc Green' }
              ].map(color => (
                <button
                  key={color.hex}
                  onClick={() => setConfig(prev => ({ ...prev, skinColor: color.hex }))}
                  title={color.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: config.skinColor === color.hex ? '3px solid #bb86fc' : '2px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, border 0.2s',
                    transform: config.skinColor === color.hex ? 'scale(1.15)' : 'scale(1)',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '500', display: 'block', marginBottom: '12px' }}>
              Hairstyle
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Original', value: 'default' },
                { label: 'Style 1', value: 'Style 1' },
                { label: 'Style 2', value: 'Style 2' },
                { label: 'Style 3', value: 'Style 3' }
              ].map(style => (
                <button
                  key={style.value}
                  onClick={() => setConfig(prev => ({ ...prev, hairStyle: style.value }))}
                  style={{
                    padding: '8px 0',
                    borderRadius: '8px',
                    background: config.hairStyle === style.value ? '#bb86fc' : 'rgba(255, 255, 255, 0.1)',
                    color: config.hairStyle === style.value ? '#000' : '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: config.hairStyle === style.value ? 'bold' : 'normal',
                    transition: 'all 0.2s',
                  }}
                >
                  {style.label}
                </button>
              ))}
            </div>

            {/* Hair Color Selection */}
            {config.hairStyle !== 'default' && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ color: '#ececec', fontFamily: 'sans-serif', fontSize: '13px', display: 'block', marginBottom: '12px' }}>
                  Hair Color
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { hex: '#111111', name: 'Black' },
                    { hex: '#3b2a1a', name: 'Brown' },
                    { hex: '#e6cea8', name: 'Blonde' },
                    { hex: '#7a1c1c', name: 'Red' },
                    { hex: '#8a9bb4', name: 'Silver' },
                    { hex: '#c97fa4', name: 'Pink' }
                  ].map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setConfig(prev => ({ ...prev, hairColor: color.hex }))}
                      title={color.name}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: color.hex,
                        border: config.hairColor === color.hex ? '3px solid #bb86fc' : '2px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, border 0.2s',
                        transform: config.hairColor === color.hex ? 'scale(1.15)' : 'scale(1)',
                        padding: 0
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* Clothing Tweak Controls (Visible only if a custom clothing is selected) */}
          {(config.dressStyle !== 'none' || config.topStyle !== 'default' || config.bottomStyle !== 'default') && (
            <div style={{ background: 'rgba(255, 100, 100, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 100, 100, 0.3)' }}>
              <span style={{ color: '#ffb3b3', fontFamily: 'sans-serif', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Tool: Adjust Position (Current values can be copied)
              </span>
              
              {config.dressStyle !== 'none' && config.dressStyle !== 'dress01' && (
                  <div style={{ fontSize: '11px', color: '#fff' }}>
                    <b>Dress:</b><br />
                    X: {dressTransform.x.toFixed(2)} Y: {dressTransform.y.toFixed(2)} Z: {dressTransform.z.toFixed(2)} S: {dressTransform.scale.toFixed(2)}
                    <div>
                      X <input type="range" min="-10" max="10" step="0.01" value={dressTransform.x} onChange={e => setDressTransform({...dressTransform, x: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Y <input type="range" min="-10" max="10" step="0.01" value={dressTransform.y} onChange={e => setDressTransform({...dressTransform, y: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Z <input type="range" min="-10" max="10" step="0.01" value={dressTransform.z} onChange={e => setDressTransform({...dressTransform, z: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      S <input type="range" min="0.01" max="3" step="0.01" value={dressTransform.scale} onChange={e => setDressTransform({...dressTransform, scale: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rX <input type="range" min="-3.14" max="3.14" step="0.01" value={dressTransform.rx} onChange={e => setDressTransform({...dressTransform, rx: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rY <input type="range" min="-3.14" max="3.14" step="0.01" value={dressTransform.ry} onChange={e => setDressTransform({...dressTransform, ry: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rZ <input type="range" min="-3.14" max="3.14" step="0.01" value={dressTransform.rz} onChange={e => setDressTransform({...dressTransform, rz: parseFloat(e.target.value)})} />
                    </div>
                  </div>
              )}

              {config.dressStyle === 'none' && config.topStyle === 'adjustableTop' && (
                  <div style={{ fontSize: '11px', color: '#fff', marginTop: '10px' }}>
                    <b>Top:</b><br />
                    X: {topTransform.x.toFixed(2)} Y: {topTransform.y.toFixed(2)} Z: {topTransform.z.toFixed(2)} S: {topTransform.scale.toFixed(2)}
                    <div>
                      X <input type="range" min="-10" max="10" step="0.01" value={topTransform.x} onChange={e => setTopTransform({...topTransform, x: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Y <input type="range" min="-10" max="10" step="0.01" value={topTransform.y} onChange={e => setTopTransform({...topTransform, y: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Z <input type="range" min="-10" max="10" step="0.01" value={topTransform.z} onChange={e => setTopTransform({...topTransform, z: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      S <input type="range" min="0.01" max="3" step="0.01" value={topTransform.scale} onChange={e => setTopTransform({...topTransform, scale: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rX <input type="range" min="-3.14" max="3.14" step="0.01" value={topTransform.rx} onChange={e => setTopTransform({...topTransform, rx: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rY <input type="range" min="-3.14" max="3.14" step="0.01" value={topTransform.ry} onChange={e => setTopTransform({...topTransform, ry: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rZ <input type="range" min="-3.14" max="3.14" step="0.01" value={topTransform.rz} onChange={e => setTopTransform({...topTransform, rz: parseFloat(e.target.value)})} />
                    </div>
                  </div>
              )}

              {config.dressStyle === 'none' && config.bottomStyle === 'bottom01' && (
                  <div style={{ fontSize: '11px', color: '#fff', marginTop: '10px' }}>
                    <b>Bottom:</b><br />
                    X: {bottomTransform.x.toFixed(2)} Y: {bottomTransform.y.toFixed(2)} Z: {bottomTransform.z.toFixed(2)} S: {bottomTransform.scale.toFixed(2)}
                    <div>
                      X <input type="range" min="-10" max="10" step="0.01" value={bottomTransform.x} onChange={e => setBottomTransform({...bottomTransform, x: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Y <input type="range" min="-10" max="10" step="0.01" value={bottomTransform.y} onChange={e => setBottomTransform({...bottomTransform, y: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      Z <input type="range" min="-10" max="10" step="0.01" value={bottomTransform.z} onChange={e => setBottomTransform({...bottomTransform, z: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      S <input type="range" min="0.01" max="3" step="0.01" value={bottomTransform.scale} onChange={e => setBottomTransform({...bottomTransform, scale: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rX <input type="range" min="-3.14" max="3.14" step="0.01" value={bottomTransform.rx} onChange={e => setBottomTransform({...bottomTransform, rx: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rY <input type="range" min="-3.14" max="3.14" step="0.01" value={bottomTransform.ry} onChange={e => setBottomTransform({...bottomTransform, ry: parseFloat(e.target.value)})} />
                    </div>
                    <div>
                      rZ <input type="range" min="-3.14" max="3.14" step="0.01" value={bottomTransform.rz} onChange={e => setBottomTransform({...bottomTransform, rz: parseFloat(e.target.value)})} />
                    </div>
                  </div>
              )}


            </div>
          )}

        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
          <button style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(187, 134, 252, 0.15)',
            color: '#bb86fc',
            border: '1px solid rgba(187, 134, 252, 0.3)',
            borderRadius: '8px',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(187, 134, 252, 0.25)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(187, 134, 252, 0.15)';
          }}
          >
            Save Configuration
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default AvatarViewer;
