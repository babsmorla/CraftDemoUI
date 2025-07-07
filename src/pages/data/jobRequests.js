// src/data/jobRequests.js

const jobRequests = [
  {
    id: "1",
    title: "Pipe repair in kitchen",
    createdAt: "2025-07-04T10:30:00Z",
    homeownerId: "h1",
    artisanId: null, // null means unassigned/pending
    status: "pending", // pending | accepted | completed | declined
    clientName: "Ama Johnson",
    clientLocation: "East Legon",
    description: "Kitchen sink pipe is leaking and needs urgent repair. Water is dripping under the sink cabinet.",
    budget: "$50 - $100",
    scheduledAt: null,
    completedAt: null,
    rating: null
  },
  {
    id: "2",
    title: "Install new bathroom sink",
    createdAt: "2025-07-03T16:15:00Z",
    homeownerId: "h2",
    artisanId: null,
    status: "pending",
    clientName: "Kofi Boateng",
    clientLocation: "Airport Residential",
    description: "Need installation of a new bathroom sink in guest bathroom. Already purchased the sink.",
    budget: "$80 - $120",
    scheduledAt: null,
    completedAt: null,
    rating: null
  },
  {
    id: "3",
    title: "Water heater installation",
    createdAt: "2025-06-28T08:00:00Z",
    homeownerId: "h3",
    artisanId: "a1",
    status: "accepted",
    clientName: "Samuel Owusu",
    clientLocation: "Tema",
    description: "Install a new tankless water heater in master bathroom. All materials provided.",
    budget: "$150 - $200",
    scheduledAt: "2025-07-05T10:00:00Z",
    completedAt: null,
    rating: null
  },
  {
    id: "4",
    title: "Fix leaking pipe",
    createdAt: "2025-06-20T14:00:00Z",
    homeownerId: "h4",
    artisanId: "a1",
    status: "completed",
    clientName: "Esi Mensah",
    clientLocation: "Kumasi",
    description: "Fixed leaking pipe under kitchen sink that was causing water damage.",
    budget: "$75",
    scheduledAt: "2025-06-21T09:00:00Z",
    completedAt: "2025-06-22T12:00:00Z",
    rating: 5
  }
];

export default jobRequests;
