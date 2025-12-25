import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // Load textures from stable Three.js examples source
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  // Handle cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame((state, delta) => {
    if (earthRef.current) {
      // Base rotation - spin faster when hovered for feedback
      earthRef.current.rotation.y += delta * (hovered ? 0.2 : 0.05);

      // Mouse interaction: Tilt and rotate towards cursor
      // state.pointer.x/y are normalized coordinates (-1 to 1)
      const targetX = -state.pointer.y * 0.5; // Tilt up/down
      
      // Smoothly interpolate current rotation to target mouse influence
      // Damp creates a smoother, spring-like follow compared to linear lerp
      earthRef.current.rotation.x = THREE.MathUtils.damp(
        earthRef.current.rotation.x,
        targetX,
        2, 
        delta
      );
      
      // Add extra rotation speed based on mouse X (joystick-like feel)
      earthRef.current.rotation.y += state.pointer.x * delta * 0.5;
    }

    if (cloudsRef.current && earthRef.current) {
      // Clouds rotate slightly faster than earth for depth effect
      cloudsRef.current.rotation.y += delta * (hovered ? 0.22 : 0.07);
      cloudsRef.current.rotation.x = earthRef.current.rotation.x;
      // Add extra cloud rotation from mouse
      cloudsRef.current.rotation.y += state.pointer.x * delta * 0.2;
    }

    // Refined Bounce & Pulsate Effect
    if (groupRef.current) {
        // Base scale targets
        let targetScale = hovered ? 2.75 : 2.5; 
        
        // Add a subtle "breathing" sine wave modulation when hovered
        if (hovered) {
            // Frequency: 3, Amplitude: 0.05
            targetScale += Math.sin(state.clock.elapsedTime * 3) * 0.05;
        }

        // Apply smooth damping to scale transition
        // Using damp() ensures frame-rate independent smoothness
        const currentScale = groupRef.current.scale.x;
        const smoothedScale = THREE.MathUtils.damp(currentScale, targetScale, 4, delta);
        
        groupRef.current.scale.set(smoothedScale, smoothedScale, smoothedScale);
    }
  });

  return (
    <group 
        ref={groupRef}
        scale={2.5} 
        position-y={-0.5}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    > 
      {/* Earth Sphere */}
      <Sphere ref={earthRef} args={[1, 32, 32]}>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
      </Sphere>
      
      {/* Atmosphere/Clouds Sphere */}
      <Sphere ref={cloudsRef} args={[1.01, 32, 32]}>
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

const LoadingFallback = () => {
  return (
    <mesh scale={2.5}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#1e1e2e" wireframe />
    </mesh>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} color="#404040" />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#6366f1" />
        
        <Suspense fallback={<LoadingFallback />}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};