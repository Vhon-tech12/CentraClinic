
"use client";
 
import { useState } from "react";
import { EducationalMaterial } from "@/types/EducationalMaterial";
 
interface EducationalMaterialModalProps {
  open: boolean;
  onClose: () => void;
  onAttach: (materials: EducationalMaterial[]) => void;
  selected: EducationalMaterial[];
}
 
const CATEGORIES = ["My Library", "Ear", "Nose", "Throat", "Aesthetics","Allergy"];
 
const MOCK_MATERIALS: EducationalMaterial[] = [
  {
    id: 1,
    title: "Ear Infection Guide",
    category: "Ear",
    thumbnail:
      "/image.png",
    fileUrl: "/ear-infection-guide.pdf",
  },
  {
    id: 2,
    title: "Ear Infection Guide",
    category: "Ear",
    thumbnail:
      "/clean.jpg",
    fileUrl: "/ear-infection-guide.pdf",
  },
  {
    id: 3,
    title: "Ear Infection Guide",
    category: "Ear",
    thumbnail:
      "/Pain.jpg",
    fileUrl: "/ear-infection-guide.pdf",
  },
  {
    id: 4,
    title: "Ear Infection Guide",
    category: "Ear",
    thumbnail:
      "/ear.jpg",
    fileUrl: "/ear-infection-guide.pdf",
  },
  {
    id: 5,
    title: "Allergy",
    category: "Allergy",
    thumbnail:
      "/easy.jpg",
    fileUrl: "/allergy-guide.pdf",
  },
  {
    id: 6,
    title: "Environment",
    category: "Allergy",
    thumbnail:
      "/e.jpg",
    fileUrl: "/environment-guide.pdf",
  },
  {
    id: 7,
    title: "Avoiding Allergens",
    category: "Allergy",
    thumbnail:
      "/a.jpg",
    fileUrl: "/avoiding-allergens.pdf",
  },
  {
    id: 8,
    title: "Symptoms of Allergies",
    category: "Allergy",
    thumbnail:
      "/s.jpg",
    fileUrl: "/allergy-symptoms.pdf",
  },
  {
    id: 9,
    title: "You should know about Allergies",
    category: "Allergy",
    thumbnail:
      "/y.jpg",
    fileUrl: "/allergy-facts.pdf",
  },
  {
    id: 10,
    title: "Gluta",
    category: "Aesthetics",
    thumbnail:
      "/Gluta.jpg",
    fileUrl: "/gluta-guide.pdf",
  },
  {
    id: 11,
    title: "Drip Nutrition",
    category: "Aesthetics",
    thumbnail:
      "/Tap.jpg",
    fileUrl: "/drip-nutrition-guide.pdf",
  },
   {
    id: 12,
    title: "Lips",
    category: "Aesthetics",
    thumbnail:
      "/Lips.jpg",
    fileUrl: "/lips-guide.pdf",
  },
 
];
 
export default function EducationalMaterialModal({
  open,
  onClose,
  onAttach,
  selected,
}: EducationalMaterialModalProps) {
  const [activeCategory, setActiveCategory] = useState("My Library");
  const [localSelected, setLocalSelected] = useState<EducationalMaterial[]>(selected);
 
  // Filter materials based on category
  const filteredMaterials =
    activeCategory === "My Library"
      ? MOCK_MATERIALS
      : MOCK_MATERIALS.filter((m) => m.category === activeCategory);
 
  const toggleMaterial = (material: EducationalMaterial) => {
    setLocalSelected((prev) =>
      prev.find((m) => m.id === material.id)
        ? prev.filter((m) => m.id !== material.id)
        : [...prev, material]
    );
  };
 
  const handleAttach = () => {
    onAttach(localSelected);
    onClose();
  };
 
  if (!open) return null;
 
  return (
    /* Modal Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
 
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Educational Materials Library
            </h2>
            <p className="text-sm text-gray-500">
              Select materials to attach to patient record
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
 
        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-56 bg-white border-r p-4">
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Categories
            </h3>
 
            <div className="space-y-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition
                    ${
                      activeCategory === category
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>
 
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeCategory}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredMaterials.length} materials)
                </span>
              </h3>
 
              <button
                onClick={handleAttach}
                disabled={localSelected.length === 0}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    localSelected.length > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Attach Selected ({localSelected.length})
              </button>
            </div>
 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Create New Card */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-all group">
                <div className="text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    ＋
                  </div>
                  <p className="text-sm font-medium">Create New</p>
                </div>
              </div>
 
              {/* Material Cards */}
              {filteredMaterials.map((material) => {
                const isChecked = localSelected.some((m) => m.id === material.id);
 
                return (
                  <div
                    key={material.id}
                    onClick={() => toggleMaterial(material)}
                    className={`relative bg-white border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg
                      ${
                        isChecked
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : "hover:border-gray-300"
                      }
                    `}
                  >
                    {/* Checkbox Overlay */}
                    <div
                      className={`absolute top-3 left-3 z-10 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors
                        ${
                          isChecked
                            ? "bg-blue-500 border-blue-500"
                            : "bg-white/90 border-gray-300"
                        }
                      `}
                    >
                      {isChecked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
 
                    {/* Thumbnail Image */}
                    <div className="h-36 overflow-hidden">
                      <img
                        src={material.thumbnail}
                        alt={material.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
 
                    {/* Title */}
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {material.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {material.category}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Footer Info */}
            <div className="mt-6 pt-4 border-t text-sm text-gray-500">
              {localSelected.length > 0
                ? `${localSelected.length} material${localSelected.length > 1 ? "s" : ""} selected`
                : "Click on a card to select materials"}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
 