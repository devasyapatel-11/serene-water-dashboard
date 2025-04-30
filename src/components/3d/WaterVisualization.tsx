
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface WaterCylinderProps {
  position: [number, number, number];
  height: number;
  color: string;
  waterLevel: number;
}

function WaterCylinder({ position, height, color, waterLevel }: WaterCylinderProps) {
  const containerRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  
  // Animate water level
  useFrame(({ clock }) => {
    if (waterRef.current) {
      const wave = Math.sin(clock.getElapsedTime() * 2) * 0.03;
      const targetScale = [1, waterLevel / height, 1];
      waterRef.current.scale.set(targetScale[0], targetScale[1] + wave, targetScale[2]);
      waterRef.current.position.y = -height / 2 + (waterLevel / 2) * waterRef.current.scale.y;
    }
  });
  
  return (
    <group position={position}>
      {/* Container cylinder (transparent) */}
      <mesh ref={containerRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, height, 32]} />
        <meshPhongMaterial color="#d4f1f9" transparent opacity={0.2} />
      </mesh>
      
      {/* Water inside cylinder */}
      <mesh ref={waterRef} position={[0, -height / 2 + waterLevel / 2, 0]}>
        <cylinderGeometry args={[0.9, 0.9, height, 32]} />
        <meshPhongMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

interface WaterVisualizationProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  maxValue?: number;
}

export default function WaterVisualization({ data, maxValue = 100 }: WaterVisualizationProps) {
  const containerHeight = 5;
  
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden bg-blue-50/30">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <group rotation={[0, 0, 0]}>
          {data.map((item, index) => {
            const x = index * 3 - (data.length - 1) * 1.5;
            return (
              <WaterCylinder
                key={item.name}
                position={[x, 0, 0]}
                height={containerHeight}
                waterLevel={(item.value / maxValue) * containerHeight}
                color={item.color || "#33C3F0"}
              />
            );
          })}
        </group>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="flex justify-around mt-2 px-2">
        {data.map((item) => (
          <div key={item.name} className="text-xs text-center font-medium">
            <p>{item.name}</p>
            <p className="text-sm font-bold">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
