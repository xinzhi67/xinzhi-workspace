"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MaterialBall({ position, roughness, metalness, color, name }: {
  position: [number, number, number];
  roughness: number;
  metalness: number;
  color: string;
  name: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.45, 48, 48]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>
    </group>
  );
}

export default function MaterialScene() {
  const materials: { pos: [number, number, number]; roughness: number; metalness: number; color: string; name: string }[] = [
    { pos: [-2.5, 0.3, 0], roughness: 0.1, metalness: 0.9, color: "#635BFF", name: "金属" },
    { pos: [-1.2, 0.3, 0.5], roughness: 0.9, metalness: 0.0, color: "#E53E3E", name: "粗糙" },
    { pos: [0, 0.3, -0.2], roughness: 0.3, metalness: 0.6, color: "#D69E2E", name: "半金属" },
    { pos: [1.2, 0.3, 0.5], roughness: 0.2, metalness: 0.1, color: "#38A169", name: "光滑" },
    { pos: [2.5, 0.3, 0], roughness: 0.5, metalness: 0.3, color: "#7B75FF", name: "默认" },
  ];

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <pointLight position={[0, 3, -3]} intensity={1} color="#ffffff" />

      {materials.map((m, i) => (
        <MaterialBall key={i} position={m.pos} roughness={m.roughness} metalness={m.metalness} color={m.color} name={m.name} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#E8E8ED" />
      </mesh>
    </group>
  );
}
