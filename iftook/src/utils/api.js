const API_BASE_URL = "https://iftook-backend.vercel.app";

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
