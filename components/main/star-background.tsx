"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import { useState, useRef, Suspense, type ElementRef } from "react";

/**
 * Gera pontos distribuídos uniformemente dentro de uma esfera.
 * Substitui `maath/random.inSphere` (dependência que não estava no package.json).
 */
const inSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Direção aleatória uniforme
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    // Raio com raiz cúbica para densidade uniforme no volume
    const r = radius * Math.cbrt(Math.random());
    points[i * 3] = r * s * Math.cos(theta);
    points[i * 3 + 1] = r * s * Math.sin(theta);
    points[i * 3 + 2] = r * u;
  }
  return points;
};

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<ElementRef<typeof Points>>(null);
  const [sphere] = useState(() => inSphere(1666, 1.2));

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
