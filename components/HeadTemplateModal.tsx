"use client";

import React, { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Line } from "@react-three/drei";
import * as THREE from "three";

/* ================= MODAL ================= */
const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center z-50 p-4">
    <div className="relative bg-white w-full max-w-7xl rounded-xl shadow-2xl text-gray-800 flex flex-col h-[90vh] border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 z-10 bg-white rounded-full p-2 shadow-md"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

/* ================= TYPES ================= */
type SOAPType = "S" | "O" | "A" | "P";
type TabKey = "Ear" | "Nose" | "Throat";
type Vec3 = [number, number, number];

type Stroke = {
  x: number;
  y: number;
  z?: number;
  soap: SOAPType;
  pressure: number;
  is3D: boolean;
};

type AreaData = { strokes: Stroke[][] };

/* ================= CONFIG ================= */
const MODEL_CONFIG: Record<TabKey, { scale: number; camera: Vec3 }> = {
  Ear: { scale: 2.5, camera: [0, 1.5, 5] },
  Nose: { scale: 2.2, camera: [0, 1.4, 4.5] },
  Throat: { scale: 2.0, camera: [0, 1.0, 4.0] },
};

const STROKE_WIDTH = 2;

const templates: Record<TabKey, { name: string; position: Vec3 }[]> = {
  Ear: [{ name: "Outer Ear", position: [1.2, 1.5, 0] }],
  Nose: [{ name: "Septum", position: [0, 1.6, 1.2] }],
  Throat: [
    { name: "Tonsils", position: [0, 1.2, 0.8] },
    { name: "Larynx", position: [0, 0.6, 0.5] },
  ],
};

/* ================= MODELS ================= */
const EarModel = () => {
  const { scene } = useGLTF("/models/ear-anatomy/source/ear.glb");
  return <primitive object={scene} />;
};

const NoseModel = () => {
  const { scene } = useGLTF(
    "/models/ear-anatomy/nose/anatomi_hidung_nose_anatomy/scene.gltf"
  );
  return <primitive object={scene} />;
};

const ThroatModel = () => {
  const { scene } = useGLTF(
    "/models/ear-anatomy/throat/larynx_with_muscles_and_ligaments.glb"
  );
  return <primitive object={scene} />;
};

/* ================= CAMERA RESET ================= */
const CameraReset = ({ position }: { position: Vec3 }) => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
  }, [position, camera]);
  return null;
};

/* ================= WEBGL CANVAS CAPTURE ================= */
const WebGLCanvasCapture = ({ webglRef }: { webglRef: React.RefObject<HTMLCanvasElement | null> }) => {
  const { gl } = useThree();
  useEffect(() => {
    if (webglRef.current !== gl.domElement) {
      webglRef.current = gl.domElement;
    }
  }, [gl.domElement, webglRef]);
  return null;
};

/* ================= HELPERS ================= */
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const smoothPointsRealtime = (points: Stroke[], smoothing = 0.25): Vec3[] => {
  if (points.length < 2) return points.map((p) => [p.x, p.y, p.z || 0] as Vec3);
  const smoothed: Vec3[] = [[points[0].x, points[0].y, points[0].z || 0]];
  for (let i = 1; i < points.length; i++) {
    const last = smoothed[smoothed.length - 1];
    const curr = points[i];
    smoothed.push([
      last[0] + (curr.x - last[0]) * smoothing,
      last[1] + (curr.y - last[1]) * smoothing,
      last[2] + ((curr.z || 0) - last[2]) * smoothing,
    ]);
  }
  return smoothed;
};

/* ================= MAIN COMPONENT ================= */
export default function HeadTemplateModal({
  open,
  onClose,
  onSaveDiagnostic,
}: {
  open: boolean;
  onClose: () => void;
  onSaveDiagnostic?: (diagnostic: { imageData: string; strokes: Record<string, Record<string, AreaData>> }) => void;
}) {
  const [tab, setTab] = useState<TabKey>("Ear");
  const [area, setArea] = useState<string | null>(null);
  const [soap, setSoap] = useState<SOAPType>("O");
  const [mode, setMode] = useState<"draw" | "view">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const overlayRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useRef<Stroke[]>([]);
  const orbitRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);

  // Persistent strokes for all modes
  const [data, setData] = useState<Record<TabKey, Record<string, AreaData>>>( {
    Ear: {},
    Nose: {},
    Throat: {},
  });

  // Temporary strokes for real-time drawing
  const [tempData, setTempData] = useState<Record<TabKey, Record<string, AreaData>>>( {
    Ear: {},
    Nose: {},
    Throat: {},
  });

  const soapColor: Record<SOAPType, string> = {
    S: "#3b82f6",
    O: "#22c55e",
    A: "#f97316",
    P: "#a855f7",
  };

  /* ================= 3D DRAW HANDLERS ================= */
  const start3DStroke = () => {
    if (mode !== "draw" || !area) return;
    setIsDrawing(true);
    currentStroke.current = [];
  };

  const draw3DStroke = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isDrawing || mode !== "draw" || !area) return;
      e.stopPropagation();
      const p = e.point;
      const pressure = e.pointerType === "pen" ? e.pressure || 0.5 : 0.5;
      currentStroke.current.push({ x: p.x, y: p.y, z: p.z, soap, pressure, is3D: true });

      setTempData((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [area]: {
            strokes: [...(prev[tab][area]?.strokes || []), [...currentStroke.current]],
          },
        },
      }));
    },
    [mode, isDrawing, area, soap, tab]
  );

  const end3DStroke = () => {
    if (area && currentStroke.current.length > 0) {
      setData((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [area]: {
            strokes: [...(prev[tab][area]?.strokes || []), [...currentStroke.current]],
          },
        },
      }));
      setTempData((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], [area]: { strokes: [] } },
      }));
    }
    currentStroke.current = [];
    setIsDrawing(false);
  };

  /* ================= 2D DRAW HANDLERS ================= */
  const start2DStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    setIsDrawing(true);
    const canvas = overlayRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    currentStroke.current = [{ x, y, soap, pressure: e.pressure || 0.5, is3D: false }];

    setTempData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [area || "default"]: {
          strokes: [...(prev[tab][area || "default"]?.strokes || []), [...currentStroke.current]],
        },
      },
    }));
  };

  const draw2DStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = overlayRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const last = currentStroke.current[currentStroke.current.length - 1];
    const newPoint = { x, y, soap, pressure: e.pressure || 0.5, is3D: false };
    currentStroke.current.push(newPoint);

    if (last) {
      ctx.strokeStyle = soapColor[soap];
      ctx.lineWidth = STROKE_WIDTH;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(last.x * canvas.width, last.y * canvas.height);
      ctx.lineTo(newPoint.x * canvas.width, newPoint.y * canvas.height);
      ctx.stroke();
    }

    setTempData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [area || "default"]: {
          strokes: [...(prev[tab][area || "default"]?.strokes || []), [...currentStroke.current]],
        },
      },
    }));
  };

  const end2DStroke = () => {
    if (area && currentStroke.current.length > 0) {
      setData((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [area || "default"]: {
            strokes: [...(prev[tab][area || "default"]?.strokes || []), [...currentStroke.current]],
          },
        },
      }));
      setTempData((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], [area || "default"]: { strokes: [] } },
      }));
    }
    currentStroke.current = [];
    setIsDrawing(false);
  };

  /* ================= MERGE CANVASES ================= */
  const mergeCanvases = () => {
    const webglCanvas = webglRef.current;
    const overlayCanvas = overlayRef.current;
    if (!webglCanvas || !overlayCanvas) return null;

    const mergedCanvas = document.createElement('canvas');
    mergedCanvas.width = webglCanvas.width;
    mergedCanvas.height = webglCanvas.height;
    const ctx = mergedCanvas.getContext('2d');
    if (!ctx) return null;

    // Draw WebGL canvas (3D model and 3D strokes)
    ctx.drawImage(webglCanvas, 0, 0);

    // Draw 2D overlay (2D strokes and notes)
    ctx.drawImage(overlayCanvas, 0, 0);

    return mergedCanvas.toDataURL('image/png');
  };

  /* ================= EFFECTS ================= */
  // Redraw all 2D strokes whenever mode/tab/data changes
  useEffect(() => {
    if (!overlayRef.current) return;
    const canvas = overlayRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tabData = data[tab];
    Object.values(tabData).forEach((areaData) => {
      areaData.strokes.forEach((stroke) => {
        if (!stroke[0]?.is3D) {
          ctx.beginPath();
          for (let i = 0; i < stroke.length; i++) {
            const p = stroke[i];
            const x = p.x * canvas.width;
            const y = p.y * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = soapColor[stroke[0]?.soap ?? "O"];
          ctx.lineWidth = STROKE_WIDTH;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      });
    });
  }, [mode, tab, data]);

  /* ================= RENDER ================= */
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      {/* HEADER */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <h2 className="text-xl font-bold">Medical Annotation Tool</h2>
        <p className="text-sm opacity-90">Interactive 3D Model Documentation</p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
        {/* Tabs */}
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 self-center mr-2">Anatomy:</span>
          {(["Ear", "Nose", "Throat"] as TabKey[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setArea(null); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tab === t
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* SOAP */}
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 self-center mr-2">SOAP:</span>
          {(["S", "O", "A", "P"] as SOAPType[]).map((s) => (
            <button
              key={s}
              onClick={() => setSoap(s)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                soap === s
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Mode */}
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700 self-center mr-2">Mode:</span>
          <button
            onClick={() => {
              if (isDrawing && area && currentStroke.current.length > 0) {
                setData((prev) => ({
                  ...prev,
                  [tab]: {
                    ...prev[tab],
                    [area]: {
                      strokes: [...(prev[tab][area]?.strokes || []), [...currentStroke.current]],
                    },
                  },
                }));
                setTempData((prev) => ({
                  ...prev,
                  [tab]: { ...prev[tab], [area]: { strokes: [] } },
                }));
                currentStroke.current = [];
                setIsDrawing(false);
              }
              setMode("draw");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "draw"
                ? "bg-yellow-500 text-black shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            ✍ Draw
          </button>
          <button
            onClick={() => {
              if (isDrawing && area && currentStroke.current.length > 0) {
                setData((prev) => ({
                  ...prev,
                  [tab]: {
                    ...prev[tab],
                    [area]: {
                      strokes: [...(prev[tab][area]?.strokes || []), [...currentStroke.current]],
                    },
                  },
                }));
                setTempData((prev) => ({
                  ...prev,
                  [tab]: { ...prev[tab], [area]: { strokes: [] } },
                }));
                currentStroke.current = [];
                setIsDrawing(false);
              }
              setMode("view");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === "view"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            👁 View
          </button>
        </div>

        {/* Undo / Clear / Save */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              const key = area || "default";
              setData((prev) => {
                const strokes = prev[tab][key]?.strokes || [];
                return { ...prev, [tab]: { ...prev[tab], [key]: { strokes: strokes.slice(0, -1) } } };
              });
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md"
          >
            ↶ Undo
          </button>
          <button
            onClick={() => {
              const key = area || "default";
              setData((prev) => ({ ...prev, [tab]: { ...prev[tab], [key]: { strokes: [] } } }));
            }}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors shadow-md"
          >
            🗑 Clear
          </button>
          <button
            onClick={() => {
              if (onSaveDiagnostic) {
                const imageData = mergeCanvases();
                if (imageData) {
                  onSaveDiagnostic({ imageData, strokes: data });
                  onClose(); // Close the modal after saving
                }
              }
            }}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-md"
          >
            💾 Save
          </button>
        </div>
      </div>

      {/* 3D CANVAS */}
      <div className="relative flex-1 bg-black">
        <Canvas ref={canvasRef} camera={{ fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
          <WebGLCanvasCapture webglRef={webglRef} />
          <CameraReset position={MODEL_CONFIG[tab].camera} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls
            ref={orbitRef}
            enableZoom
            enablePan={mode === "view"}
            enableRotate={mode === "view"}
            minDistance={1.2}
            maxDistance={8}
            enableDamping
            dampingFactor={0.1}
          />

          {/* Models */}
          <group visible={tab === "Ear"} scale={MODEL_CONFIG.Ear.scale}><EarModel /></group>
          <group visible={tab === "Nose"} scale={MODEL_CONFIG.Nose.scale}><NoseModel /></group>
          <group visible={tab === "Throat"} scale={MODEL_CONFIG.Throat.scale}><ThroatModel /></group>

          {/* Hotspots */}
          {templates[tab].map((h) => (
            <mesh
              key={h.name}
              position={h.position}
              onPointerDown={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setArea(h.name); }}
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={area === h.name ? "yellow" : "red"} />
            </mesh>
          ))}

          {/* Transparent plane for 3D drawing */}
          {mode === "draw" && (
            <mesh
              position={[0, 0.8, 0]}
              scale={[5, 5, 5]}
              onPointerDown={start3DStroke}
              onPointerMove={draw3DStroke}
              onPointerUp={end3DStroke}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          )}

          {/* Persistent 3D strokes (all tabs) */}
          {Object.entries(data).map(([t, areas]) =>
            Object.values(areas).map((a, i) =>
              a.strokes.map((stroke, j) =>
                stroke[0]?.is3D ? (
                  <Line
                    key={`persistent-${t}-${i}-${j}`}
                    points={smoothPointsRealtime(stroke)}
                    color={soapColor[stroke[0]?.soap ?? "O"]}
                    lineWidth={STROKE_WIDTH}
                    visible={t === tab}
                  />
                ) : null
              )
            )
          )}

          {/* Temporary 3D strokes (current tab only) */}
          {Object.values(tempData[tab]).map((a, i) =>
            a.strokes.map((stroke, j) =>
              stroke[0]?.is3D ? (
                <Line
                  key={`temp-${i}-${j}`}
                  points={smoothPointsRealtime(stroke)}
                  color={soapColor[stroke[0]?.soap ?? "O"]}
                  lineWidth={STROKE_WIDTH}
                />
              ) : null
            )
          )}
        </Canvas>

        {/* 2D overlay (draw mode only) */}
        {mode === "draw" && (
          <canvas
            ref={overlayRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            onPointerDown={start2DStroke}
            onPointerMove={draw2DStroke}
            onPointerUp={end2DStroke}
            onPointerLeave={end2DStroke}
          />
        )}
      </div>
    </Modal>
  );
}
