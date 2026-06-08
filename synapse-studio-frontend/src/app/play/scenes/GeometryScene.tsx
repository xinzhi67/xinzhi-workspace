"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SpinningShape({ children, position, color, speed }: {
  children: React.ReactNode;
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.7;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function GeometryScene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color="#ff8f51" />

      <SpinningShape position={[-2, 0.5, 0]} color="#635BFF" speed={0.6}><boxGeometry args={[0.8, 0.8, 0.8]} /></SpinningShape>
      <SpinningShape position={[0, 0.8, -0.5]} color="#E53E3E" speed={0.4}><sphereGeometry args={[0.5, 32, 32]} /></SpinningShape>
      <SpinningShape position={[2, 0.3, 0.3]} color="#38A169" speed={0.5}><torusGeometry args={[0.55, 0.2, 16, 32]} /></SpinningShape>
      <SpinningShape position={[-1, -0.6, 1]} color="#D69E2E" speed={0.7}><coneGeometry args={[0.45, 0.9, 6]} /></SpinningShape>
      <SpinningShape position={[1.2, -0.4, -0.8]} color="#7B75FF" speed={0.55}><dodecahedronGeometry args={[0.4]} /></SpinningShape>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#E8E8ED" />
      </mesh>
    </group>
  );
}
