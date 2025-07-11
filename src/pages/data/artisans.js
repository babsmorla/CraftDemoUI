const artisans = [
  {
    id: "1",
    name: "Kwame Mensah",
    email: "kwame@craftconnect.com",        // Added for login
    password: "password123",                // Added for login
    businessName: "Kwame Mensah Plumbing",
    description:
      "Professional plumber with 12 years of experience. Specializing in pipe repairs, installations, and maintenance. Available for both residential and commercial projects.",
    rating: 4.7,
    reviewCount: 142,
    hourlyRate: 25,
    specialties: [
      "Pipe Repair",
      "Installation",
      "Leak Detection",
      "Water Heater",
    ],
    location: "Kumasi, Ashanti Region",
    experience: "12 years",
    isVerified: true,
    profileImage:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+233201234567",
    phone: "+233201234567",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    reviews: [
      {
        id: "1",
        name: "Ama Johnson",
        date: "June 15, 2023",
        rating: 5,
        title: "Excellent pipe repair service",
        content:
          "Kwame arrived on time and fixed our kitchen pipe leak efficiently. He was professional, courteous, and cleaned up after finishing the job. Highly recommended!",
      },
      {
        id: "2",
        name: "Samuel Owusu",
        date: "June 10, 2023",
        rating: 4.5,
        title: "Great installation work",
        content:
          "Kwame installed new bathroom fixtures for us. The work was done professionally and he offered helpful advice on maintenance. Will definitely hire again.",
      },
    ],
    available: true,
    // availability: {
    //   monday: { start: "08:00", end: "17:00" },
    //   tuesday: { start: "08:00", end: "17:00" },
    //   wednesday: { start: "08:00", end: "17:00" },
    //   thursday: { start: "08:00", end: "17:00" },
    //   friday: { start: "08:00", end: "17:00" },
    //   saturday: { start: "09:00", end: "14:00" },
    //   sunday: null,
    // },
  },
  {
    id: "2",
    name: "Adwoa Asante",
    email: "adwoa@craftconnect.com",        // Added for login
    password: "password123",                // Added for login
    businessName: "Adwoa's Plumbing Services",
    description:
      "Residential plumbing specialist with focus on kitchen and bathroom installations. Quick response time and affordable rates for all plumbing needs.",
    rating: 4.2,
    reviewCount: 87,
    hourlyRate: 20,
    specialties: ["Residential", "Bathroom", "Kitchen", "Installation"],
    location: "Accra, Greater Accra",
    experience: "8 years",
    isVerified: false,
    profileImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+233201234568",
    phone: "+233201234568",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1556911220-ef412aeaedf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    reviews: [
      {
        id: "1",
        name: "Kofi Boateng",
        date: "May 28, 2023",
        rating: 4,
        title: "Reliable service",
        content:
          "Adwoa fixed our bathroom leak quickly and at a fair price. Would recommend her services.",
      },
    ],
    available: true,
    // availability: {
    //   monday: { start: "08:00", end: "17:00" },
    //   tuesday: { start: "08:00", end: "17:00" },
    //   wednesday: { start: "08:00", end: "17:00" },
    //   thursday: { start: "08:00", end: "17:00" },
    //   friday: { start: "08:00", end: "17:00" },
    //   saturday: { start: "09:00", end: "14:00" },
    //   sunday: null,
    // },
  },
  {
    id: "3",
    name: "Yaw Osei",
    email: "yaw@craftconnect.com",          // Added for login
    password: "password123",                // Added for login
    businessName: "Osei Electrical Solutions",
    description:
      "Certified electrician with 15 years of experience in residential and commercial electrical work. Specializing in wiring, installations, and repairs.",
    rating: 4.9,
    reviewCount: 210,
    hourlyRate: 30,
    specialties: ["Wiring", "Installations", "Repairs", "Safety Inspections"],
    location: "Accra, Greater Accra",
    experience: "15 years",
    isVerified: true,
    profileImage:
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    whatsapp: "+233201234569",
    phone: "+233201234569",
    portfolio: [
      "https://images.unsplash.com/photo-1581093458799-ef0a6b5a0d0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581094794329-3c5d6b5e5b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    reviews: [
      {
        id: "1",
        name: "Nana Ama",
        date: "July 2, 2023",
        rating: 5,
        title: "Outstanding work!",
        content:
          "Yaw rewired our entire house and did an amazing job. Professional, punctual, and reasonably priced.",
      },
    ],
    available: true,
    // availability: {
    //   monday: { start: "08:00", end: "17:00" },
    //   tuesday: { start: "08:00", end: "17:00" },
    //   wednesday: { start: "08:00", end: "17:00" },
    //   thursday: { start: "08:00", end: "17:00" },
    //   friday: { start: "08:00", end: "17:00" },
    //   saturday: { start: "09:00", end: "14:00" },
    //   sunday: null,
    // },
  },
];

export default artisans;
