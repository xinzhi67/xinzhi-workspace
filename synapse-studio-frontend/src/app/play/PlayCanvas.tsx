"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

/** three.js 官方示例资源（CDN）；可替换为 `public/models/` 自有 glTF */
const SOLDIER_URL =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r184/examples/models/gltf/Soldier.glb";

function SoldierCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(SOLDIER_URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const names = Object.keys(actions);
    const pick =
      names.find((n) => /idle|stand|walk/i.test(n)) ?? names[0] ?? null;
    if (pick) {
      actions[pick]?.reset().fadeIn(0.35).play();
    }
    return () => {
      if (pick) actions[pick]?.fadeOut(0.35);
    };
  }, [actions]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
}

export default function PlayCanvas() {
  useEffect(() => {
    void useGLTF.preload(SOLDIER_URL);
  }, []);

  return (
    <div
      style={{
        height: 480,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-glow)",
      }}
    >
      <Canvas
        camera={{ position: [3, 1.8, 5], fov: 45 }}
        dpr={[1, 1.75]}
        frameloop="always"
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#1a120c");
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 10, 5]} intensity={1.15} castShadow />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#ff8f51" />
            </mesh>
          }
        >
          <SoldierCharacter />
        </Suspense>
        <OrbitControls makeDefault enableDamping dampingFactor={0.06} />
      </Canvas>
    </div>
  );
}
