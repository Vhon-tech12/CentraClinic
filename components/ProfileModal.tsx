"use client";
import { useState } from "react";

type ProfileModalProps = {
  onSaved: () => void;
};

export default function ProfileModal({ onSaved }: ProfileModalProps) {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
  });

  function handleSave() {
    localStorage.setItem(
      "user_profile",
      JSON.stringify({
        ...form,
        profileCompleted: true,
      })
    );

    onSaved();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[420] text-black">
        <h2 className="font-semibold mb-3">Complete your profile</h2>

        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Full name"
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
