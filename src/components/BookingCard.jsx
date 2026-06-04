"use client";
import { useState } from "react";
import { authClient } from "../app/lib/auth-client";
import toast from "react-hot-toast";
import { Calendar, Clock, CreditCard } from "lucide-react";

const BookingCard = ({ facility }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);

  const { _id, name, price_per_hour, available_slots, image, facility_type } =
    facility;
  const totalPrice = price_per_hour * hours;

  const handleBooking = async () => {
    if (!bookingDate || !timeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    const bookingData = {
      facility_id: _id,
      facility_name: name,
      facility_image: image,
      facility_type,
      userId: user?.id,
      user_email: user?.email,
      booking_date: bookingDate,
      time_slot: timeSlot,
      hours,
      total_price: totalPrice,
      status: "pending",
    };

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/booking`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );
      if (!res.ok) throw new Error("Failed to book facility");
    } catch {
      toast.error("Failed to book facility. Please try again.");
      return;
    }

    toast.success("Facility booked successfully!");
    setBookingDate("");
    setTimeSlot("");
    setHours(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-w-[280px] h-fit">
      <p className="text-sm text-gray-400 mb-1">Starting from</p>
      <h2 className="text-3xl font-bold text-green-600">৳{price_per_hour}</h2>
      <p className="text-xs text-gray-400 mb-6">per hour</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facility
          </label>
          <input
            value={name}
            disabled
            className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-3.5 h-3.5" /> Booking Date
          </label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
            <Clock className="w-3.5 h-3.5" /> Time Slot
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a time slot</option>
            {available_slots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours
          </label>
          <input
            type="number"
            min={1}
            max={4}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="bg-green-50 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <CreditCard className="w-4 h-4 text-green-600" /> Total Price
          </div>
          <span className="font-bold text-green-600 text-xl">
            ৳{totalPrice}
          </span>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
