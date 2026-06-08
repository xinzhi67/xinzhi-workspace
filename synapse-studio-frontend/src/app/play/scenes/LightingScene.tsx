"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LightOrbiter({ color, radius, speed, intensity }: { color: string; radius: number; speed: number; intensity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    if (ref.current) ref.current.position.set(x, 1, z);
    if (lightRef.current) lightRef.current.position.set(x, 1, z);
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={intensity} color={color} distance={6} />
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
}

export default function LightingScene() {
  return (
    <group>
      <ambientLight intensity={0.15} />

      <LightOrbiter color="#E53E3E" radius={2.5} speed={0.6} intensity={2} />
      <LightOrbiter color="#38A169" radius={2.8} speed={0.45} intensity={2} />
      <LightOrbiter color="#635BFF" radius={2.2} speed={0.75} intensity={2} />
      <LightOrbiter color="#D69E2E" radius={3.0} speed={0.35} intensity={1.5} />

      {/* Center shiny sphere */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial color="#F1F1F5" roughness={0.1} metalness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#2a2a30" roughness={0.8} />
      </mesh>
    </group>
  );
}
