
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Wave geometry for the water surface
function WaveSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useRef<THREE.PlaneGeometry | null>(null);
  
  useEffect(() => {
    geometry.current = new THREE.PlaneGeometry(20, 20, 40, 40);
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current && geometry.current) {
      const position = geometry.current.attributes.position;
      const time = clock.getElapsedTime() * 0.4;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Create wave effect
        const anim = time + (x * 0.5) + (y * 0.2);
        const amp = 0.15;
        position.setZ(i, Math.sin(anim) * amp);
      }
      
      position.needsUpdate = true;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      {geometry.current && <primitive object={geometry.current} attach="geometry" />}
      <meshPhongMaterial 
        color="#3399ff" 
        shininess={80} 
        transparent
        opacity={0.7} 
        side={THREE.DoubleSide} 
        flatShading
      />
    </mesh>
  );
}

// Droplet particles floating around
function WaterDroplets() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<{ position: THREE.Vector3; speed: number }[]>([]);
  const count = 40;
  
  useEffect(() => {
    // Initialize particles in random positions
    particles.current = [];
    for (let i = 0; i < count; i++) {
      particles.current.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 5,
          (Math.random() - 0.5) * 15
        ),
        speed: 0.02 + Math.random() * 0.03
      });
    }
  }, []);
  
  useFrame(() => {
    if (group.current && group.current.children.length > 0) {
      // Animate each droplet
      group.current.children.forEach((droplet, i) => {
        if (i < particles.current.length) {
          // Move droplets up and reset when they reach the top
          particles.current[i].position.y -= particles.current[i].speed;
          
          if (particles.current[i].position.y < -2) {
            particles.current[i].position.y = 5;
            particles.current[i].position.x = (Math.random() - 0.5) * 15;
            particles.current[i].position.z = (Math.random() - 0.5) * 15;
          }
          
          droplet.position.set(
            particles.current[i].position.x,
            particles.current[i].position.y,
            particles.current[i].position.z
          );
        }
      });
    }
  });
  
  return (
    <group ref={group}>
      {Array(count).fill(null).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshPhongMaterial color="#a0d8ef" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller that slowly rotates
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 2, 5);
  }, [camera]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.05;
    const radius = 6;
    camera.position.x = Math.sin(t) * radius;
    camera.position.z = Math.cos(t) * radius;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Scene setup with nice lighting
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3399ff" />
      <WaveSurface />
      <WaterDroplets />
      <CameraController />
    </>
  );
}

interface WaterBackgroundProps {
  className?: string;
}

export default function WaterBackground({ className = "" }: WaterBackgroundProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-[-1] opacity-50 ${className}`}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
