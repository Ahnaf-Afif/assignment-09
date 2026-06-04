"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { EditModal } from "../../components/EditModal";
import { DeleteAlert } from "../../components/DeleteAlert";
import { MapPin, Users, Plus } from "lucide-react";

const ManageFacilitiesPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchMyFacilities = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/destination?owner=${user?.email}`,
          { headers: { authorization: `Bearer ${tokenData?.token}` } },
        );
        if (res.ok) {
          const data = await res.json();
          setFacilities(data);
        } else {
          throw new Error();
        }
      } catch {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyFacilities();
  }, [user?.email, session]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  if (!session) return null;

  const handleDelete = (id) => {
    setFacilities((prev) => prev.filter((f) => f._id !== id));
  };

  const handleUpdate = (updated) => {
    setFacilities((prev) =>
      prev.map((f) => (f._id === updated._id ? updated : f)),
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage My Facilities
          </h1>
          <p className="text-gray-500">
            Update or remove the facilities you've listed on SportNest
          </p>
        </div>
        <Link
          href="/add-facility"
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
      ) : facilities.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg mb-4">
            You haven't listed any facilities yet.
          </p>
          <Link
            href="/add-facility"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Add Your First Facility
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full sm:w-48 h-40 sm:h-auto object-cover shrink-0"
              />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                      {facility.facility_type}
                    </span>
                    <h3 className="font-bold text-xl text-gray-900 mt-2 mb-1">
                      {facility.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin className="w-3.5 h-3.5" /> {facility.location}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-green-600">
                      ৳{facility.price_per_hour}
                    </p>
                    <p className="text-xs text-gray-400">per hour</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {facility.capacity}{" "}
                    players
                  </span>
                  <span>{facility.available_slots?.length} time slots</span>
                  <span className="text-green-600 font-medium">
                    {facility.booking_count || 0} bookings
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                  <EditModal facility={facility} onUpdate={handleUpdate} />
                  <DeleteAlert facility={facility} onDelete={handleDelete} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFacilitiesPage;
