export const users = [
    {
      id: 1,
      name: 'Demo User',
      email: 'demouser@gmail.com',
      dob: '05-08-1993',
      gender: 'Male',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      interests: ['Cricket', 'Love', 'Song', 'Photography', 'Shopping'],
      earnings: {
        call: '300/30min',
        chat: '100/30min',
        video: '500/30min',
        instaTalk: '5/min',
        liveFeed: '300min'
      },
      paymentDetails: {
        transactions: [
        { type: 'payment', description: 'Payment for meeting', amount: 150, date: '2025-02-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 200, date: '2025-03-17' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        { type: 'withdrawal', description: 'withdrawal to bank', amount: 330, date: '2025-06-15' },
        ]
      },
      wallet: {
        balance: 3,
        transactions: [
          { type: 'payment', description: 'Payment for meeting', amount: 300, date: '2024-03-15' },
          { type: 'tipping', description: 'Tip received', amount: 50, date: '2024-03-14' },
          { type: 'promote', description: 'Profile promotion', amount: -100, date: '2024-03-13' },
          { type: 'subscription', description: 'Live subscription', amount: 200, date: '2024-03-12' }
        ]
      },
      ratings: [
        { stars: 5, review: 'Great conversation!', date: '2024-03-15' },
        { stars: 4, review: 'Very helpful', date: '2024-03-14' }
      ],
      status: 'Live',
    friends: [2, 3, 4], // IDs of friends
    friendRequests: [5, 6] // Pending friend requests
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    status: 'Offline'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'Live'
  },
  {
    id: 4,
    name: 'Mike Johnson',
    email: 'mikejohnson@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'Live'
  },
  {
    id: 5,
    name: 'Sarah Lee',
    email: 'sarahlee@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    status: 'Pending'
  },
  {
    id: 6,
    name: 'Emma Watson',
    email: 'emmawatson@gmail.com',
    profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: 'Pending'
  }
];