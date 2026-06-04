"use client";
import { useRouter } from "next/navigation";
import { MapPin, Users, Clock, Zap } from "lucide-react";
import { authClient } from "../app/lib/auth-client";

const sportBadgeColors = {
  Football: "bg-green-100 text-green-700",
  Badminton: "bg-blue-100 text-blue-700",
  Swimming: "bg-cyan-100 text-cyan-700",
  Tennis: "bg-yellow-100 text-yellow-700",
  Cricket: "bg-orange-100 text-orange-700",
  Basketball: "bg-red-100 text-red-700",
  Volleyball: "bg-purple-100 text-purple-700",
  "Table Tennis": "bg-pink-100 text-pink-700",
};

const FacilityCard = ({ facility }) => {
  const {
    _id,
    name,
    facility_type,
    location,
    price_per_hour,
    capacity,
    image,
    available_slots,
  } = facility;
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleBookNow = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push(`/facilities/${_id}`);
    }
  };

  const badgeColor =
    sportBadgeColors[facility_type] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}
        >
          {facility_type}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
          {name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {capacity} players
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {available_slots?.length} slots
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ৳{price_per_hour}
            </span>
            <span className="text-gray-400 text-xs ml-1">/hr</span>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
