"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BookingCard from "../../../components/BookingCard";
import { DeleteAlert } from "../../../components/DeleteAlert";
import { EditModal } from "../../../components/EditModal";
import { authClient } from "../../lib/auth-client";
import { MapPin, Users, Clock, Star, ArrowLeft } from "lucide-react";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }
    const fetchFacility = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/destination/${id}`,
          { headers: { authorization: `Bearer ${tokenData?.token}` } },
        );
        if (res.ok) {
          const data = await res.json();
          setFacility(data);
        } else {
          throw new Error("Not found");
        }
      } catch {
        setFacility(null);
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [id, session]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  if (!session) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg mb-4">Facility not found.</p>
        <Link
          href="/facilities"
          className="text-green-600 font-medium hover:underline"
        >
          Back to Facilities
        </Link>
      </div>
    );
  }

  const isOwner = user?.email === facility.owner_email;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back */}
      <Link
        href="/facilities"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Facilities
      </Link>

      {/* Owner Controls */}
      {isOwner && (
        <div className="flex items-center gap-3 justify-end mb-4">
          <EditModal facility={facility} onUpdate={setFacility} />
          <DeleteAlert
            facility={facility}
            onDelete={() => router.push("/manage-facilities")}
          />
        </div>
      )}

      {/* Hero Image */}
      <img
        src={facility.image}
        alt={facility.name}
        className="w-full h-72 md:h-[420px] object-cover rounded-2xl mb-8"
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              {facility.facility_type}
            </span>
            <span className="flex items-center gap-1 text-sm text-yellow-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" /> 4.8 (120 reviews)
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {facility.name}
          </h1>

          <div className="flex items-center gap-1.5 text-gray-500 mb-6">
            <MapPin className="w-4 h-4" />
            <span>{facility.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Users className="w-5 h-5 text-green-600 mx-auto mb-1.5" />
              <p className="font-bold text-gray-900">{facility.capacity}</p>
              <p className="text-xs text-gray-400">Max Players</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Clock className="w-5 h-5 text-green-600 mx-auto mb-1.5" />
              <p className="font-bold text-gray-900">
                {facility.available_slots?.length}
              </p>
              <p className="text-xs text-gray-400">Time Slots</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <p className="text-green-600 font-bold text-lg mb-0.5">৳</p>
              <p className="font-bold text-gray-900">
                {facility.price_per_hour}
              </p>
              <p className="text-xs text-gray-400">Per Hour</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            About This Facility
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {facility.description}
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Available Time Slots
          </h2>
          <div className="flex flex-wrap gap-2">
            {facility.available_slots?.map((slot) => (
              <span
                key={slot}
                className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:w-80 shrink-0">
          <BookingCard facility={facility} />
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
