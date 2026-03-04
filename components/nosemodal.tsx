"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function NoseModel() {
  const { scene } = useGLTF(
    "/models/ear-anatomy/nose/anatomi_hidung_nose_anatomy/Nose.glb"
  );

  const { camera } = useThree();
  const modelRef = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center model
    scene.position.sub(center);

    // Get max dimension
    const maxDim = Math.max(size.x, size.y, size.z);

    // Fit camera based on model size
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    cameraZ *= 1.8; // distance multiplier (adjust this for more space)

    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload(
  "/models/ear-anatomy/nose/anatomi_hidung_nose_anatomy/Nose.glb"
);

export default function NoseViewer() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={2}
          maxDistance={20}
        />

        <Suspense fallback={null}>
          <NoseModel />
        </Suspense>
      </Canvas>
    </div>
  );
}