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
  export const addMoneyToWallet = async (amount) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: "Not authorized - No token provided" };
      }
  
      const response = await fetch(`${API_BASE_URL}/api/users/wallet/add`, {
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