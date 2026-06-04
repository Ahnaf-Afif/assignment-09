export const facilitiesData = [
  {
    _id: "1",
    name: "Pro Football Arena",
    facility_type: "Football",
    location: "Mirpur, Dhaka",
    price_per_hour: 1500,
    capacity: 22,
    available_slots: ["06:00-08:00", "16:00-18:00", "20:00-22:00"],
    description:
      "Premium 5-a-side and 7-a-side turf with FIFA-quality artificial grass, stadium floodlights, and modern changing rooms. The perfect venue for competitive matches and friendly games alike.",
    owner_email: "john@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop",
    booking_count: 124,
  },
  {
    _id: "2",
    name: "Smash Badminton Club",
    facility_type: "Badminton",
    location: "Gulshan, Dhaka",
    price_per_hour: 800,
    capacity: 4,
    available_slots: ["07:00-09:00", "17:00-19:00", "19:00-21:00"],
    description:
      "Professional badminton courts with premium wooden flooring, standard net setup, excellent ventilation, and proper LED lighting for competitive and casual play.",
    owner_email: "mary@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
    booking_count: 89,
  },
  {
    _id: "3",
    name: "AquaZone Swimming Center",
    facility_type: "Swimming",
    location: "Banani, Dhaka",
    price_per_hour: 1200,
    capacity: 30,
    available_slots: ["06:00-08:00", "10:00-12:00", "16:00-18:00"],
    description:
      "Olympic-standard swimming pool with heated water, timing systems, lane dividers, and professional lifeguards on duty at all times. Suitable for all skill levels.",
    owner_email: "alex@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&auto=format&fit=crop",
    booking_count: 156,
  },
  {
    _id: "4",
    name: "Ace Tennis Court",
    facility_type: "Tennis",
    location: "Dhanmondi, Dhaka",
    price_per_hour: 1000,
    capacity: 4,
    available_slots: ["07:00-09:00", "15:00-17:00", "17:00-19:00"],
    description:
      "Premium hard-surface tennis courts with professional net setup, accurate baseline markings, courtside player seating, and secure equipment storage.",
    owner_email: "sarah@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop",
    booking_count: 67,
  },
  {
    _id: "5",
    name: "Cricket Premier Ground",
    facility_type: "Cricket",
    location: "Uttara, Dhaka",
    price_per_hour: 2000,
    capacity: 22,
    available_slots: ["08:00-12:00", "14:00-18:00"],
    description:
      "Full-size cricket ground with well-maintained pitch, multiple practice nets, fielding area, scoreboard, and spectator seating. Ideal for all match formats.",
    owner_email: "raj@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1540747913346-19212a4fd5b7?w=800&auto=format&fit=crop",
    booking_count: 43,
  },
  {
    _id: "6",
    name: "Slam Basketball Court",
    facility_type: "Basketball",
    location: "Mohammadpur, Dhaka",
    price_per_hour: 900,
    capacity: 10,
    available_slots: ["16:00-18:00", "18:00-20:00", "20:00-22:00"],
    description:
      "Full-size indoor basketball court with hardwood flooring, NBA-standard hoops, digital scoreboards, shot clocks, and a comfortable spectator gallery.",
    owner_email: "mike@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
    booking_count: 78,
  },
  {
    _id: "7",
    name: "Thunder Volleyball Court",
    facility_type: "Volleyball",
    location: "Wari, Dhaka",
    price_per_hour: 700,
    capacity: 12,
    available_slots: ["08:00-10:00", "17:00-19:00", "19:00-21:00"],
    description:
      "Indoor volleyball court with sand and hardwood options, professional net and antenna setup, and dedicated player rest areas.",
    owner_email: "lisa@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop",
    booking_count: 55,
  },
  {
    _id: "8",
    name: "SpinMaster Table Tennis",
    facility_type: "Table Tennis",
    location: "Tejgaon, Dhaka",
    price_per_hour: 500,
    capacity: 4,
    available_slots: ["10:00-12:00", "14:00-16:00", "18:00-20:00"],
    description:
      "Multiple ITTF-standard table tennis tables in an air-conditioned hall with excellent lighting, rubber flooring, and paddle rental available.",
    owner_email: "tom@sportnest.com",
    image:
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop",
    booking_count: 91,
  },
];

export const bookingsData = [
  {
    _id: "b1",
    facility_id: "1",
    facility_name: "Pro Football Arena",
    facility_image:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop",
    facility_type: "Football",
    booking_date: "2026-06-10",
    time_slot: "16:00-18:00",
    hours: 2,
    total_price: 3000,
    status: "pending",
  },
  {
    _id: "b2",
    facility_id: "3",
    facility_name: "AquaZone Swimming Center",
    facility_image:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&auto=format&fit=crop",
    facility_type: "Swimming",
    booking_date: "2026-06-12",
    time_slot: "06:00-08:00",
    hours: 2,
    total_price: 2400,
    status: "confirmed",
  },
];

export const sportCategories = [
  { name: "Football", icon: "⚽", color: "bg-green-100 text-green-700 border-green-200" },
  { name: "Badminton", icon: "🏸", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "Swimming", icon: "🏊", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { name: "Tennis", icon: "🎾", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { name: "Cricket", icon: "🏏", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "Basketball", icon: "🏀", color: "bg-red-100 text-red-700 border-red-200" },
  { name: "Volleyball", icon: "🏐", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "Table Tennis", icon: "🏓", color: "bg-pink-100 text-pink-700 border-pink-200" },
];
