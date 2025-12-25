import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Instances, Instance, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing R3F types in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshPhongMaterial: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      sphereGeometry: any;
      octahedronGeometry: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshPhongMaterial: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      sphereGeometry: any;
      octahedronGeometry: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}

// ------------------------------------------------------------------
// CONFIGURATION: DRACO COMPRESSION
// ------------------------------------------------------------------
// Pre-configuring the Draco decoder for any GLTF models loaded in the app.
// This reduces bandwidth for 3D assets by up to 90%.
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// ------------------------------------------------------------------
// COMPONENT: EARTH
// ------------------------------------------------------------------
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // Load textures
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
      earthRef.current.rotation.y += delta * (hovered ? 0.2 : 0.05);
      
      const targetX = -state.pointer.y * 0.5;
      earthRef.current.rotation.x = THREE.MathUtils.damp(
        earthRef.current.rotation.x,
        targetX,
        2, 
        delta
      );
      earthRef.current.rotation.y += state.pointer.x * delta * 0.5;
    }

    if (cloudsRef.current && earthRef.current) {
      cloudsRef.current.rotation.y += delta * (hovered ? 0.22 : 0.07);
      cloudsRef.current.rotation.x = earthRef.current.rotation.x;
      cloudsRef.current.rotation.y += state.pointer.x * delta * 0.2;
    }

    if (groupRef.current) {
        let targetScale = hovered ? 2.75 : 2.5; 
        if (hovered) {
            targetScale += Math.sin(state.clock.elapsedTime * 3) * 0.05;
        }
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
      <Sphere ref={earthRef} args={[1, 64, 64]}> 
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
      </Sphere>
      
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]}> 
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

// ------------------------------------------------------------------
// COMPONENT: SATELLITE (Procedural Mesh)
// ------------------------------------------------------------------
const Satellite = () => {
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (satelliteRef.current) {
      // Orbit logic
      const t = state.clock.getElapsedTime() * 0.2; // Slower, more majestic orbit
      satelliteRef.current.position.x = Math.sin(t) * 3.2;
      satelliteRef.current.position.z = Math.cos(t) * 3.2;
      satelliteRef.current.position.y = Math.sin(t * 0.5) * 0.5;
      
      // Face the earth (0,0,0)
      satelliteRef.current.lookAt(0, 0, 0);
      
      // Add a slight self-rotation for dynamic feel
      satelliteRef.current.rotateZ(Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <group ref={satelliteRef} scale={0.15}>
      {/* Main Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial 
            color="#e2e8f0" 
            metalness={0.8} 
            roughness={0.2} 
        />
      </mesh>
      
      {/* Gold Foil / Instrument section */}
      <mesh position={[0, 0, 1.01]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial 
            color="#fbbf24" 
            metalness={1} 
            roughness={0.1}
        />
      </mesh>

      {/* Solar Panel Array Connectors */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 5]} />
          <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Solar Panel Left */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[3, 0.05, 1.5]} />
        <meshStandardMaterial 
            color="#1d4ed8" 
            metalness={0.5} 
            roughness={0.1} 
            emissive="#1e3a8a" 
            emissiveIntensity={0.5}
        />
      </mesh>
      
       {/* Solar Panel Right */}
       <mesh position={[3, 0, 0]}>
        <boxGeometry args={[3, 0.05, 1.5]} />
        <meshStandardMaterial 
            color="#1d4ed8" 
            metalness={0.5} 
            roughness={0.1}
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
        />
      </mesh>

      {/* Communication Dish */}
      <group position={[0, 0.6, 0.5]} rotation={[0.5, 0, 0]}>
        <mesh>
            <cylinderGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
             <sphereGeometry args={[0.1]} />
             <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
};

// ------------------------------------------------------------------
// MAIN HERO COMPONENT
// ------------------------------------------------------------------
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
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Performance: Cap DPR at 1.5 for high-density screens
      >
        <ambientLight intensity={0.5} color="#404040" />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#6366f1" />
        
        <Suspense fallback={<LoadingFallback />}>
          <Earth />
          <Satellite />
        </Suspense>
        
      </Canvas>
    </div>
  );
};