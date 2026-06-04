"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, AlertTriangle } from "lucide-react";
import { authClient } from "../app/lib/auth-client";

export function DeleteAlert({ facility, onDelete }) {
  const [showDialog, setShowDialog] = useState(false);
  const { _id, name } = facility;

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to delete facility");
    } catch {
      toast.error("Failed to delete facility. Please try again.");
      return;
    }

    toast.success(`"${name}" has been deleted`);
    setShowDialog(false);
    if (onDelete) onDelete(_id);
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="flex items-center gap-1.5 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" /> Delete
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2.5 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Delete Facility?
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              This will permanently delete{" "}
              <strong className="text-gray-800">"{name}"</strong> and all its
              booking data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
