const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Login User Function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    // Store token and user info in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { success: true, token: data.token, user: data.user };
  } catch (error) {
    console.error("Error during login:", error.message);
    return { success: false, message: "Network error. Please try again." };
  }
};

// Retrieve Auth Token
const getAuthToken = () => localStorage.getItem("token");

// Get Logged-In User Info
export const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check Authentication
export const isAuthenticated = () => !!getAuthToken();

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Fetch All Users (Admin Only)
export const getAllUsers = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, message: "Not authorized - No token provided" };
    }

    const response = await fetch(`${API_BASE_URL}/api/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to fetch users" };
    }

    return { success: true, users: data.users };
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return { success: false, message: "Network error. Please try again." };
  }
};

// Fetch User Meetings
export const getUserMeetings = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/meeting/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch meetings" };
      }
  
      return { success: true, meetings: data.meetings };
    } catch (error) {
      console.error("Error fetching meetings:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };


// Fetch Friend Requests
export const getFriendRequests = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/friend/requests/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch friend requests" };
      }
  
      return { success: true, requests: data.requests };
    } catch (error) {
      console.error("Error fetching friend requests:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };
  
  // Fetch Friend List
  export const getFriendList = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/friend/list/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch friend list" };
      }
  
      return { success: true, friends: data.friends };
    } catch (error) {
      console.error("Error fetching friend list:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Fetch Wallet Data
export const getWalletData = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/wallet/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch wallet data" };
      }
  
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error fetching wallet data:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };
  
  // Add Money to Wallet
  // Add Money to Wallet
export const addMoneyToWallet = async (userId, amount) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/wallet/add/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to add money to wallet" };
      }
  
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error adding money to wallet:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Fetch Payment Transactions
export const getPaymentTransactions = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/payments/all/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch payment transactions" };
      }
  
      return { success: true, transactions: data.transactions };
    } catch (error) {
      console.error("Error fetching payment transactions:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };
  
  // Create a Payment
  export const createPayment = async (paymentData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to create payment" };
      }
  
      return { success: true, payment: data.payment };
    } catch (error) {
      console.error("Error creating payment:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Block User
export const blockUser = async (userId, blockReason) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/block/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blockReason }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to block user" };
      }
  
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error blocking user:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };
  
  // Unblock User
  export const unblockUser = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/unblock/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to unblock user" };
      }
  
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error unblocking user:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Update User Online Status
export const updateOnlineStatus = async (userId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/online-status/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data.message || "Failed to update online status" };
      }
  
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Error updating online status:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
  };


export const getDashboardData = async () => {
    try {
      const token = getAuthToken(); // Assuming the token is stored in localStorage
      if (!token) {
        throw new Error('Not authorized - No token provided');
      }
  
      const response = await fetch(`${API_BASE_URL}/api/dashboard/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
  
      return data; // Return only the `data` part of the response
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
      throw new Error(error.message || 'Network error. Please try again.');
    }
  };

  // api.js
export const fetchChatRoomData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat-room/dashboard/all`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat room data:', error);
    throw error;
  }
};

export const fetchPaymentsData = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, message: "Not authorized - No token provided" };
    }

    const response = await fetch(`${API_BASE_URL}/api/payments/all/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to fetch payments data" };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error fetching payments data:", error.message);
    return { success: false, message: "Network error. Please try again." };
  }
};

export const getPromotedUsers = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, message: "Not authorized - No token provided" };
    }

      const response = await fetch(`${API_BASE_URL}/api/users/promote/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || "Failed to fetch payments data" };
      }
  
      return { success: true, data: data.users };  
    }catch (error) {
      console.error("Error fetching payments data:", error.message);
      return { success: false, message: "Network error. Please try again." };
    }
};

export const getUserReviews = async (userId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, message: 'Not authorized - No token provided' };
    }

    const response = await fetch(`${API_BASE_URL}/api/users/reviews/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch reviews' };
    }

    return { success: true, data: data.data }; // Ensure `data` contains `reviews` and `averageRating`
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const getReviewsData = async () => {
  try {
    const token = getAuthToken(); // Assuming you have a function to get the auth token
    if (!token) {
      throw new Error('Not authorized - No token provided');
    }

    const response = await fetch(`${API_BASE_URL}/api/users/dashboard/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch reviews data');
    }

    return data; // Return the entire response data
  } catch (error) {
    console.error('Error fetching reviews data:', error.message);
    throw new Error(error.message || 'Network error. Please try again.');
  }
};