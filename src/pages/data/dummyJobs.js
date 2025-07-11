// src/data/dummyJobs.js

const dummyJobs = [
  {
    id: 'job-1',
    title: 'Fix leaking kitchen sink',
    description: 'The kitchen sink has been leaking near the pipe joint for 2 days. Need urgent assistance.',
    budget: 'GHS 150',
    scheduledAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    location: 'Accra, Spintex Road',
    clientName: 'Ama Mensah',
    clientPhone: '0244123456',
    clientEmail: 'ama.mensah@example.com',
    status: 'pending',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/sink_leak_1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1690000000/sink_leak_2.jpg'
    ],
  },
  {
    id: 'job-2',
    title: 'Electrical wiring for new shop',
    description: 'Need complete wiring for a small retail shop. Must include installation of lights and sockets.',
    budget: 'Negotiable',
    scheduledAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    location: 'Kumasi, Adum',
    clientName: 'Kwame Boateng',
    clientPhone: '0209876543',
    clientEmail: 'kwame.boateng@example.com',
    status: 'accepted',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/shop_wiring_1.jpg'
    ],
  },
  {
    id: 'job-3',
    title: 'Air conditioning installation',
    description: 'Looking to install air conditioners in two rooms. Prefer an experienced technician.',
    budget: 'GHS 800',
    scheduledAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    location: 'Takoradi, Market Circle',
    clientName: 'Efua Owusu',
    clientPhone: '0261234567',
    clientEmail: 'efua.owusu@example.com',
    status: 'completed',
    completedAt: new Date().toISOString(),
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1690000000/ac_install_1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1690000000/ac_install_2.jpg'
    ],
  },
];

export default dummyJobs;
