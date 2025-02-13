export const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demouser@gmail.com',
    dob: '05-08-1993',
    gender: 'Male',
    profileImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    interests: ['Cricket', 'Love', 'Song', 'Photography', 'Shopping'],
    earnings: {
      call: '300/30min',
      chat: '100/30min',
      video: '500/30min',
      instaTalk: '5/min',
      liveFeed: '300min',
    },
    paymentDetails: {
      transactions: [
        { type: 'payment', description: 'Payment for meeting', amount: 150, date: '2025-02-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 200, date: '2025-03-17' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
      ],
    },
    wallet: {
      balance: 3,
      transactions: [
        { type: 'payment', description: 'Payment for meeting', amount: 300, date: '2024-03-15' },
        { type: 'tipping', description: 'Tip received', amount: 50, date: '2024-03-14' },
        { type: 'promote', description: 'Profile promotion', amount: -100, date: '2024-03-13' },
      ],
    },
    ratings: [
      { stars: 5, review: 'Great conversation!', date: '2024-03-15' },
      { stars: 4, review: 'Very helpful', date: '2024-03-14' },
    ],
    status: 'Live',
    friends: [2, 3, 4], // IDs of friends
    friendRequests: [5, 6], // Pending friend requests

    // Meetings Section
    meetings: {
      upcoming: [{ id: 2, name: 'Sarah Parker', type: 'Video Call', amount: 450, time: 'In 29 min' }],
      previous: [{ id: 3, name: 'John Doe', type: 'Voice Call', amount: 300, time: 'Started 15 min ago' }],
    },

    // Promote Profile Feature
    promoteProfile: {
      package: 'Premium Boost', // Basic Boost | Premium Boost | Ultra Boost
      startDate: '2025-02-10',
      endDate: '2025-02-20',
      views: 1200,
      clicks: 150,
    },
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    status: 'Offline',
    promoteProfile: {
      package: 'Basic Boost',
      startDate: '2025-02-05',
      endDate: '2025-02-15',
      views: 800,
      clicks: 90,
    },
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'Live',
    promoteProfile: {
      package: 'Ultra Boost',
      startDate: '2025-02-12',
      endDate: '2025-02-22',
      views: 2000,
      clicks: 320,
    },
  },
  {
    id: 4,
    name: 'Mike Johnson',
    email: 'mikejohnson@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'Live',
    promoteProfile: {
      package: 'Premium Boost',
      startDate: '2025-02-08',
      endDate: '2025-02-18',
      views: 1450,
      clicks: 170,
    },
  },
  {
    id: 5,
    name: 'Sarah Lee',
    email: 'sarahlee@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    status: 'Pending',
    promoteProfile: {
      package: 'Basic Boost',
      startDate: '2025-02-03',
      endDate: '2025-02-13',
      views: 670,
      clicks: 60,
    },
  },
  {
    id: 6,
    name: 'Emma Watson',
    email: 'emmawatson@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: 'Pending',
    promoteProfile: {
      package: 'Ultra Boost',
      startDate: '2025-02-14',
      endDate: '2025-02-24',
      views: 2500,
      clicks: 400,
    },
  },
];
