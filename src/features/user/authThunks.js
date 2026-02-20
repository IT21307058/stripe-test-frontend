import axios from "../../api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", { username, password });
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);