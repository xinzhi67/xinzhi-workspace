"use client";

import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const SOLDIER_URL = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r184/examples/models/gltf/Soldier.glb";

export default function SkeletonScene() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(SOLDIER_URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const names = Object.keys(actions);
    const pick = names.find((n) => /idle|stand|walk/i.test(n)) ?? names[0] ?? null;
    if (pick) {
      actions[pick]?.reset().fadeIn(0.5).play();
    }
    return () => {
      if (pick) actions[pick]?.fadeOut(0.3);
    };
  }, [actions]);

  return (
    <group ref={group} dispose={null}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 10, 5]} intensity={1.15} castShadow />
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
}
