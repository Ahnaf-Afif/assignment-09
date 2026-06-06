"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const sportTypes = [
  "Football",
  "Badminton",
  "Swimming",
  "Tennis",
  "Cricket",
  "Basketball",
  "Volleyball",
  "Table Tennis",
];

const timeSlotOptions = [
  "06:00-08:00",
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
];

const AddFacilityPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const slots = formData.getAll("available_slots");

    const { data: tokenData } = await authClient.token();

    try {
      const imageData = new FormData();
      imageData.append("image", formData.get("image"));

      const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: imageData,
        },
      );
      const imageResult = await imageRes.json();

      const facilityData = {
        ...Object.fromEntries(formData.entries()),
        image: imageResult.data.url,
        available_slots: slots,
        price_per_hour: Number(formData.get("price_per_hour")),
        capacity: Number(formData.get("capacity")),
        owner_email: session.user.email,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/facility`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(facilityData),
        },
      );
      if (res.ok) {
        toast.success("Facility added successfully!");
        router.push("/manage-facilities");
        return;
      }
      throw new Error("Failed to add facility");
    } catch {
      toast.error("Failed to add facility. Please try again.");
    }
  };

  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Facility
        </h1>
        <p className="text-gray-500">
          List your sports facility on SportNest and start accepting bookings
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Facility Name *
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Pro Football Arena"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Facility Type *
              </label>
              <select
                name="facility_type"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select a sport type</option>
                {sportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location *
              </label>
              <input
                name="location"
                required
                placeholder="e.g. Mirpur, Dhaka"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price Per Hour (৳) *
              </label>
              <input
                type="number"
                name="price_per_hour"
                required
                min={100}
                placeholder="1500"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Capacity (max players) *
              </label>
              <input
                type="number"
                name="capacity"
                required
                min={1}
                placeholder="22"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Facility Image *
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlotOptions.map((slot) => (
                  <label
                    key={slot}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      name="available_slots"
                      value={slot}
                      className="accent-green-600 w-4 h-4"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      {slot}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe your facility — equipment, amenities, rules, etc."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Owner Email
              </label>
              <input
                value={session.user.email}
                disabled
                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Facility
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacilityPage;
