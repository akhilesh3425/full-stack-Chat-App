import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LogIn, LogOut, Users } from "lucide-react";
import { data } from "react-router-dom";
// import { disconnect, get } from "mongoose";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
// const BASE_URL = "https://chat-app-backend-1.onrender.com";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({
        authUser: res.data,
      });
      get().connectSocket(); // Call the socket connection method here
    } catch (error) {
      console.log("Error checking auth:", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formdata) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", formdata);
      set({ authUser: res.data });
      toast.success("Account created successfully!");

      get().connectSocket(); // Call the socket connection method here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error signing up:", error.response || error.message);
        console.error("Error signing up:", error);
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      } else {
        console.error("Error signing up:", error);
        toast.error("Something went wrong");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      get().disconnectSocket(); // Call the socket disconnection method here
    } catch (error) {
      toast.error("Something went wrong");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/updateprofile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("error.response.data.message || 'Something went wrong'");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return; // Don't connect if not authenticated

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
