import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function GridPlane() {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.05
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[12, 12, 24, 24]} />
      <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <GridPlane />
      </Canvas>
    </div>
  )
}
