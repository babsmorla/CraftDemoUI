
export const jobs = [
  {
    id: "job-1",
    title: "Fix leaking kitchen sink",
    description:
      "The kitchen sink has been leaking near the pipe joint for 2 days. Need urgent assistance.",
    budget: "GHS 150",
    scheduledAt: "2023-07-25T10:00:00Z",
    createdAt: "2023-07-20T08:30:00Z",
    location: "Accra, Spintex Road",
    userId: "user_123",
    artisanId: "art_789",
    status: "declined",
    declineReason: "I cant Make it", // Added for artisan declines
    cancellationReason: "I have urgent thing to do", // Added for homeowner cancellations
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1690000000/sink_leak_1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1690000000/sink_leak_2.jpg",
    ],
    reviewId: "rev_001",
  },
  {
    id: "job-2",
    title: "Electrical wiring for new shop",
    description:
      "Need complete wiring for a small retail shop. Must include installation of lights and sockets.",
    budget: "Negotiable",
    scheduledAt: "2023-07-28T14:00:00Z",
    createdAt: "2023-07-18T09:45:00Z",
    location: "Kumasi, Adum",
    userId: "user_456",
    artisanId: "art_012",
    status: "accepted",
    declineReason: "", // Added for artisan declines
    cancellationReason: "", // Added for homeowner cancellations
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1690000000/shop_wiring_1.jpg",
    ],
    reviewId: "rev_002",
  },
  {
    id: "job-3",
    title: "Air conditioning installation",
    description:
      "Looking to install air conditioners in two rooms. Prefer an experienced technician.",
    budget: "GHS 800",
    scheduledAt: "2023-07-22T09:00:00Z",
    createdAt: "2023-07-15T11:20:00Z",
    location: "Takoradi, Market Circle",
    userId: "user_123",
    artisanId: "art_012",
    status: "pending",
    declineReason: "", // Added for artisan declines
    cancellationReason: "", // Added for homeowner cancellations
    completedAt: "2023-07-22T16:30:00Z",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1690000000/ac_install_1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1690000000/ac_install_2.jpg",
    ],
  },
  {
    id: "job-4",
    title: "Furniture assembly",
    description: "Need help assembling IKEA furniture",
    budget: "GHS 120",
    scheduledAt: "2023-07-30T10:00:00Z",
    createdAt: "2023-07-25T08:30:00Z",
    location: "Accra, East Legon",
    userId: "user_123",
    artisanId: "art_789",
    status: "pending",
    declineReason: "", // Added for artisan declines
    cancellationReason: "", // Added for homeowner cancellations
    completedAt: "2023-07-30T12:00:00Z",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1690000000/furniture_assembly_1.jpg",
    ],
  },
];