"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { BookingCancelAlert } from "../../components/BookingCancelAlert";
import { CalendarCheck, Clock, CreditCard } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/booking/${user?.id}`,
          { headers: { authorization: `Bearer ${tokenData?.token}` } },
        );
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          throw new Error();
        }
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id, session]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  if (!session) return null;

  const handleCancel = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-500">
          Track and manage all your sports facility bookings
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">
            No bookings yet. Start exploring facilities!
          </p>
          <Link
            href="/facilities"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-block"
          >
            Explore Facilities
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              {booking.facility_image && (
                <img
                  src={booking.facility_image}
                  alt={booking.facility_name}
                  className="w-full sm:w-44 h-36 sm:h-auto object-cover shrink-0"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">
                      {booking.facility_name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[booking.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {booking.status?.charAt(0).toUpperCase() +
                        booking.status?.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ৳{booking.total_price}
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.hours} hour{booking.hours > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <CalendarCheck className="w-4 h-4 text-green-600" />
                    {new Date(booking.booking_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-green-600" />
                    {booking.time_slot}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    Booking ID: {booking._id}
                  </span>
                </div>

                {booking.status !== "cancelled" && (
                  <div>
                    <BookingCancelAlert
                      bookingId={booking._id}
                      onCancel={handleCancel}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
