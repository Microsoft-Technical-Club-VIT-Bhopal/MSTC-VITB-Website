import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';

const Orb = ({ position, color, speed = 1, distort = 0.4 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(t * speed) * 0.002;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1.2, 64, 64]} position={position} ref={meshRef}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          metalness={0.1}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none fade-in">
            <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                
                {/* Main Orb - Blue */}
                <Orb position={[-3, 1, -2]} color="#00A4EF" speed={1.5} distort={0.5} />
                
                {/* Secondary Orb - Violet */}
                <Orb position={[3, -1, -3]} color="#7F00FF" speed={2} distort={0.4} />
                
                {/* Background Accent Orb - Neon */}
                <Orb position={[0, 3, -6]} color="#00eaff" speed={1} distort={0.6} />

                <Environment preset="city" />
            </Canvas>
            <div className="absolute inset-0 bg-ms-obsidian/40 backdrop-blur-[1px]" />
        </div>
    );
};

export default Hero3D;
