"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
    <div className="bg-gray-900 p-4 rounded relative w-full max-w-5xl shadow-lg text-white">
      <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold hover:text-red-500">
        ✕
      </button>
      {children}
    </div>
  </div>
);

type DrawingPoint = { x: number; y: number; z: number; text?: string };
type HeadTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  patientId: string;
  onSaveFinding?: (findingText: string) => void;
  onExport?: () => void;
};

const templates = {
  Nose: [{ name: "Septum", position: [0, 1.6, 1.2] }],
  Ear: [{ name: "Outer Ear", position: [1.2, 1.5, 0] }],
  Throat: [{ name: "Tonsils", position: [0, 1, 1] }],
  Aesthetics: [{ name: "Cheeks", position: [1, 1.5, 1.5] }],
};

const HeadTemplateModal: React.FC<HeadTemplateModalProps> = ({
  open,
  onClose,
  patientId,
  onSaveFinding,
  onExport,
}) => {
  const [selectedTab, setSelectedTab] = useState<keyof typeof templates>("Ear");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [finding, setFinding] = useState("");
  const [drawingData, setDrawingData] = useState<DrawingPoint[]>([]);
  const [pastFindings, setPastFindings] = useState<DrawingPoint[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  // Resize canvas to fit container
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
  }, [canvasRef]);

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!selectedArea) return;
    drawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !canvasRef.current) return;
    e.preventDefault();

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    // Draw dot on overlay
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Map to 3D coordinates
    const normX = (x / rect.width - 0.5) * 0.4;
    const normY = (0.5 - y / rect.height) * 0.4;
    const hotspotPos = templates[selectedTab].find(h => h.name === selectedArea)?.position || [0, 0, 0];
    const point3D = { x: hotspotPos[0] + normX, y: hotspotPos[1] + normY, z: hotspotPos[2], text: finding };
    setDrawingData(prev => [...prev, point3D]);
  };

  const handleSaveFinding = () => {
    if (!selectedArea) return;
    if (onSaveFinding) onSaveFinding(finding);
    setPastFindings(prev => [...prev, drawingData]);

    // Reset
    setFinding("");
    setDrawingData([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* 3D + Drawing Canvas */}
        <div className="relative md:w-2/3 w-full h-96 bg-gray-900 rounded-lg">
          <Canvas camera={{ position: [0, 1.5, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls enablePan enableZoom />

            {/* Head Sphere */}
            <mesh>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial color="#555" />
            </mesh>

            {/* Hotspots */}
            {templates[selectedTab].map(h => (
              <mesh
                key={h.name}
                position={h.position}
                scale={selectedArea === h.name ? 1.3 : 1}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setSelectedArea(h.name);
                }}
              >
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color={selectedArea === h.name ? "orange" : "red"} />
                {selectedArea === h.name && (
                  <Html position={[0, 0.3, 0]}>
                    <div className="bg-gray-800 text-white p-2 rounded shadow">{h.name}</div>
                  </Html>
                )}
              </mesh>
            ))}

            {/* Current Drawing */}
            {drawingData.map((p, idx) => (
              <mesh key={idx} position={[p.x, p.y, p.z]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}

            {/* Past Findings */}
            {pastFindings.map((drawingSet, i) =>
              drawingSet.map((p, j) => (
                <mesh key={`${i}-${j}`} position={[p.x, p.y, p.z]}>
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshStandardMaterial color="blue" />
                </mesh>
              ))
            )}
          </Canvas>

          {/* Overlay Canvas */}
          {selectedArea && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
            />
          )}
        </div>

        {/* Side Panel */}
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(templates) as Array<keyof typeof templates>).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 rounded ${
                  selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Areas */}
          <div className="flex flex-col gap-2 mt-2">
            {templates[selectedTab].map(area => (
              <button
                key={area.name}
                onClick={() => setSelectedArea(area.name)}
                className={`px-3 py-1 rounded ${
                  selectedArea === area.name ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-200"
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>

          {/* Findings Input */}
          {selectedArea && (
            <div className="mt-4 flex flex-col gap-2">
              <label className="font-medium">Notes for {selectedArea}</label>
              <textarea
                value={finding}
                onChange={(e) => setFinding(e.target.value)}
                placeholder="Type findings here..."
                className="bg-gray-800 text-white p-2 rounded h-24 resize-none border border-gray-600"
              />
              <button
                onClick={handleSaveFinding}
                className="mt-2 bg-green-600 hover:bg-green-500 p-2 rounded text-white"
              >
                Save Finding
              </button>
            </div>
          )}

          {/* Export */}
          <button
            onClick={onExport}
            className="mt-4 bg-yellow-600 hover:bg-yellow-500 p-2 rounded text-white"
          >
            Export PDF Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HeadTemplateModal;
