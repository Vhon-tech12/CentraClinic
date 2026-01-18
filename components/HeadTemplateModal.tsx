"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";

/* ================= MODAL ================= */
const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
    <div className="bg-gray-900 p-4 rounded relative w-full max-w-5xl shadow-lg text-white">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-xl font-bold hover:text-red-500"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

/* ================= TYPES ================= */
type DrawingPoint = { x: number; y: number; z: number; text?: string };

type HeadTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  patientId: string;
  onSaveFinding?: (findingText: string) => void;
  onExport?: () => void;
};

/* ================= TEMPLATES ================= */
const templates = {
  Nose: [{ name: "Septum", position: [0, 1.6, 1.2] }],
  Ear: [{ name: "Outer Ear", position: [1.2, 1.5, 0] }],
  Throat: [
    { name: "Tonsils", position: [0, 1.2, 0.8] },
    { name: "Larynx", position: [0, 0.6, 0.5] },
    { name: "Epiglottis", position: [0, 0.9, 0.6] },
  ],
  Aesthetics: [{ name: "Cheeks", position: [1, 1.5, 1.5] }],
};

/* ================= MODELS ================= */
const EarModel: React.FC = () => {
  const { scene } = useGLTF("/models/ear-anatomy/source/ear.glb");
  return <primitive object={scene} scale={2.5} position={[0, 0, 0]} />;
};

const ThroatModel: React.FC = () => {
  const { scene } = useGLTF("/models/ear-anatomy/throat/larynx_with_muscles_and_ligaments.glb");
  return (
    <primitive
      object={scene}
      scale={2.2}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

useGLTF.preload("/models/ear-anatomy/source/ear.glb");
useGLTF.preload("/models/throat/Throat.glb");

/* ================= MAIN ================= */
const HeadTemplateModal: React.FC<HeadTemplateModalProps> = ({
  open,
  onClose,
  patientId,
  onSaveFinding,
  onExport,
}) => {
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof templates>("Ear");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [finding, setFinding] = useState("");
  const [drawingData, setDrawingData] = useState<DrawingPoint[]>([]);
  const [pastFindings, setPastFindings] = useState<DrawingPoint[][]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  /* ===== Resize overlay canvas ===== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ===== Drawing ===== */
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!selectedArea) return;
    drawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current || !canvasRef.current) return;
    e.preventDefault();

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x =
      "touches" in e
        ? e.touches[0].clientX - rect.left
        : e.clientX - rect.left;
    const y =
      "touches" in e
        ? e.touches[0].clientY - rect.top
        : e.clientY - rect.top;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    const normX = (x / rect.width - 0.5) * 0.4;
    const normY = (0.5 - y / rect.height) * 0.4;

    const hotspot =
      templates[selectedTab].find((h) => h.name === selectedArea)?.position ??
      [0, 0, 0];

    setDrawingData((prev) => [
      ...prev,
      {
        x: hotspot[0] + normX,
        y: hotspot[1] + normY,
        z: hotspot[2],
        text: finding,
      },
    ]);
  };

  const handleSaveFinding = () => {
    if (!selectedArea) return;

    onSaveFinding?.(finding);
    setPastFindings((prev) => [...prev, drawingData]);
    setDrawingData([]);
    setFinding("");

    const ctx = canvasRef.current?.getContext("2d");
    ctx?.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* ================= 3D VIEW ================= */}
        <div className="relative md:w-2/3 w-full h-96 bg-gray-900 rounded-lg">
          <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls enablePan enableZoom />

            {selectedTab === "Ear" && <EarModel />}
            {selectedTab === "Throat" && <ThroatModel />}

            {selectedTab !== "Ear" && selectedTab !== "Throat" && (
              <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="#555" />
              </mesh>
            )}

            {/* Hotspots */}
            {templates[selectedTab].map((h) => (
              <mesh
                key={h.name}
                position={h.position}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setSelectedArea(h.name);
                }}
              >
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={selectedArea === h.name ? "orange" : "red"}
                />
                {selectedArea === h.name && (
                  <Html position={[0, 0.3, 0]}>
                    <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                      {h.name}
                    </div>
                  </Html>
                )}
              </mesh>
            ))}

            {/* Drawing points */}
            {drawingData.map((p, i) => (
              <mesh key={i} position={[p.x, p.y, p.z]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}

            {pastFindings.flat().map((p, i) => (
              <mesh key={`past-${i}`} position={[p.x, p.y, p.z]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="blue" />
              </mesh>
            ))}
          </Canvas>

          {selectedArea && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
            />
          )}
        </div>

        {/* ================= SIDE PANEL ================= */}
        <div className="md:w-1/3 w-full space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(templates) as Array<
              keyof typeof templates
            >).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedTab(tab);
                  setSelectedArea(null);
                }}
                className={`px-3 py-1 rounded ${
                  selectedTab === tab
                    ? "bg-blue-600"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {selectedArea && (
            <>
              <textarea
                value={finding}
                onChange={(e) => setFinding(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 h-24"
                placeholder={`Notes for ${selectedArea}`}
              />
              <button
                onClick={handleSaveFinding}
                className="bg-green-600 hover:bg-green-500 p-2 rounded w-full"
              >
                Save Finding
              </button>
            </>
          )}

          <button
            onClick={onExport}
            className="bg-yellow-600 hover:bg-yellow-500 p-2 rounded w-full"
          >
            Export PDF Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HeadTemplateModal;
