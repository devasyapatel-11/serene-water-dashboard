
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function WaterDrop(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
    }
  });
  
  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#33C3F0" 
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={1}
      />
    </mesh>
  );
}

interface WaterLogoProps {
  className?: string;
}

export function Water3DLogo({ className = "" }: WaterLogoProps) {
  return (
    <div className={`w-10 h-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <WaterDrop scale={0.7} position={[0, 0, 0]} />
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default Water3DLogo;
