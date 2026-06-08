"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleScene() {
  const count = 300;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const c = new THREE.Color().setHSL(Math.random() * 0.3 + 0.55, 0.8, 0.6);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#635BFF" />
      <pointLight position={[-3, -1, -2]} intensity={0.8} color="#ffb457" />

      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}
