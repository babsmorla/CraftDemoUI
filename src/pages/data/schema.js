export const artisanProfile = {
  // String fields
  id: "art_789", // string (UUID format)
  name: "Kofi Mensah", // string
  email: "kofi@example.com", // string (valid email format)
  profilePic: "/profiles/artisan1.jpg", // string (URL path)
  role: "artisan", // string (fixed enum: 'artisan')
  businessName: "Adinkra Crafts", // string
  craft: "Wood Carving", // string
  description: "Professional wood carver with 10 years...", // string (long text)
  location: "Kumasi, Ashanti Region", // string
  experience: "10 years", // string
  whatsapp: "+233201234567", // string (phone format)
  phone: "+233201234567", // string (phone format)
  verificationStatus: "verified", // string (enum: ['verified', 'pending', 'unverified'])
  status: "active", // string (enum: ['active', 'inactive', 'suspended'])

  // Number fields
  rating: 4.7, // number (float, 1-5 range)
  reviewCount: 42, // number (integer)
  hourlyRate: 25, // number (float)

  // Boolean field
  isVerified: true, // boolean

  // Array fields
  specialties: ["Traditional Carvings", "Furniture", "Sculptures"], // string[]
  portfolio: [
    // string[] (URLs)
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  ],

  // Date fields (ISO 8601 strings)
  joinedDate: "2023-04-10T09:20:00Z", // string (date-time)
  lastLogin: "2023-07-19T16:30:00Z", // string (date-time)

  // Stats object
  stats: {
    completedJobs: 42, // number (integer)
    pendingJobs: 3, // number (integer)
    declinedJobs: 2, // number (integer)
    cancellationRate: 4.7, // number (float, percentage)
  },

  // Jobs array (array of objects)
  jobs: [
    {
      id: "job-101", // string
      title: "Kitchen Plumbing Repair", // string
      description: "Client needs help...", // string
      budget: "GHS 300", // string (currency format)
      scheduledAt: "2023-11-10T09:00:00Z", // string (date-time)
      createdAt: "2023-11-05T14:20:00Z", // string (date-time)
      location: "Accra, Osu", // string
      status: "pending", // string (enum: ['pending', 'accepted', 'completed', 'declined', 'cancelled'])
      images: [
        // string[] (URLs)
        "https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f",
      ],
      user: {
        // object
        id: "user_501", // string
        name: "Ama Serwaa", // string
        phone: "+233 24 765 4321", // string
        email: "ama.serwaa@example.com", // string
        location: "Accra, Osu", // string
      },
    },
    // ... additional job objects
  ],

  // Reviews array (array of objects)
  reviews: [
    {
      id: "rev_001", // string
      jobId: "job-1", // string
      userId: "user_123", // string
      userName: "Kwame Asare", // string
      rating: 4, // number (integer, 1-5)
      comment: "Excellent craftsmanship...", // string
      date: "2023-07-12T14:30:00Z", // string (date-time)
      userProfilePic: "/profiles/user1.jpg", // string (URL path)
    },
    // ... additional review objects
  ],

  // Notifications array (array of objects)
  notifications: [
    {
      id: "notif_101", // string
      type: "new_job", // string (enum: ['new_job', 'message', 'review', etc.])
      title: "New Job Request", // string
      message: "You have a new job request...", // string
      date: "2023-11-05T14:25:00Z", // string (date-time)
      read: false, // boolean (optional, default: false)
    },
    // ... additional notification objects
  ],
};

// EXAMPLE OF ARTISAN PROFILE

export const artisanProfile = {
  id: "art_789",
  name: "Kofi Mensah",
  email: "kofi@example.com",
  profilePic: "/profiles/artisan1.jpg",
  role: "artisan",
  businessName: "Adinkra Crafts",
  craft: "Wood Carving",
  description:
    "Professional wood carver with 10 years of experience. Specializing in traditional Adinkra symbols and custom designs.",
  rating: 4.7,
  reviewCount: 42,
  hourlyRate: 25,
  specialties: ["Traditional Carvings", "Furniture", "Sculptures"],
  location: "Kumasi, Ashanti Region",
  experience: "10 years",
  isVerified: true,
  whatsapp: "+233201234567",
  phone: "+233201234567",
  portfolio: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  ],
  joinedDate: "2023-04-10T09:20:00Z",
  lastLogin: "2023-07-19T16:30:00Z",
  status: "active",
  verificationStatus: "verified",
  stats: {
    completedJobs: 42,
    pendingJobs: 3,
    declinedJobs: 2,
    cancellationRate: 4.7,
  },
  jobs: [
    {
      id: "job-101",
      title: "Kitchen Plumbing Repair",
      description: "Client needs help with a leaking kitchen sink pipe...",
      budget: "GHS 300",
      scheduledAt: "2023-11-10T09:00:00Z",
      createdAt: "2023-11-05T14:20:00Z",
      location: "Accra, Osu",
      status: "pending",
      images: ["https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f"],
      user: {
        id: "user_501",
        name: "Ama Serwaa",
        phone: "+233 24 765 4321",
        email: "ama.serwaa@example.com",
        location: "Accra, Osu",
      },
    },
    {
      id: "job-102",
      title: "Custom Wooden Stool",
      description: "Need a custom stool with Adinkra symbols...",
      budget: "GHS 450",
      scheduledAt: "2023-11-15T10:00:00Z",
      createdAt: "2023-11-08T11:30:00Z",
      location: "Kumasi, Ashanti Region",
      status: "accepted",
      images: [],
      user: {
        id: "user_205",
        name: "Kwabena Osei",
        phone: "+233 27 123 4567",
        email: "kwabena.osei@example.com",
        location: "Kumasi, Ashanti Region",
      },
    },
  ],
  reviews: [
    {
      id: "rev_001",
      jobId: "job-1",
      userId: "user_123",
      userName: "Kwame Asare",
      rating: 4,
      comment:
        "Excellent craftsmanship! The wood carving was exactly as described and delivered on time.",
      date: "2023-07-12T14:30:00Z",
      userProfilePic: "/profiles/user1.jpg",
    },
    {
      id: "rev_002",
      jobId: "job-2",
      userId: "user_456",
      userName: "Esi Coleman",
      rating: 5,
      comment:
        "Absolutely beautiful work! Will definitely Request Service again.",
      date: "2023-08-05T10:15:00Z",
      userProfilePic: "/profiles/user2.jpg",
    },
  ],

  notifications: [
    {
      id: "notif_101",
      type: "new_job",
      title: "New Job Request",
      message: "You have a new job request for Kitchen Plumbing Repair",
      date: "2023-11-05T14:25:00Z",
    },
  ],
};

// For Easy Calling
// Get All Jobs from users by An Artisan when logged in
artisanJobs = [
  {
    id: "job-101", // string
    title: "Kitchen Plumbing Repair", // string
    description: "Client needs help...", // string
    budget: "GHS 300", // string (currency format)
    scheduledAt: "2023-11-10T09:00:00Z", // string (date-time)
    createdAt: "2023-11-05T14:20:00Z", // string (date-time)
    location: "Accra, Osu", // string
    status: "pending", // string (enum: ['pending', 'accepted', 'completed', 'declined', 'cancelled'])
    images: [
      // string[] (URLs)
      "https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f",
    ],
    user: {
      // object
      id: "user_501", // string
      name: "Ama Serwaa", // string
      phone: "+233 24 765 4321", // string
      email: "ama.serwaa@example.com", // string
      location: "Accra, Osu", // string
    },
  },
  // ... additional artisanJob objects
];

// For Easy Calling
// Get All Reviews from users by An Artisan when logged in
artisanReviews = [
  {
    id: "rev_001", // string
    jobId: "job-1", // string
    userId: "user_123", // string
    userName: "Kwame Asare", // string
    rating: 4, // number (integer, 1-5)
    comment: "Excellent craftsmanship...", // string
    date: "2023-07-12T14:30:00Z", // string (date-time)
    userProfilePic: "/profiles/user1.jpg", // string (URL path)
  },
  // ... additional review objects
];

// For Easy Calling
// Get Notifically Automatically base on Backed Logic
artisanNotifications = [
  {
    id: "notif_101", // string
    type: "new_job", // string (enum: ['new_job', 'message', 'review', etc.])
    title: "New Job Request", // string
    message: "You have a new job request...", // string
    date: "2023-11-05T14:25:00Z", // string (date-time)
  },
  // ... additional notification objects
];
