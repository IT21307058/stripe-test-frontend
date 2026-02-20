import axios from "../../api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFiles = createAsyncThunk("files/fetchFiles", async () => {
    const res = await axios.get("/api/content");
    return res.data;
});

export const uploadFile = createAsyncThunk(
    "files/uploadFile",
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/api/content", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log("Progress:", progress);
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Upload failed");
        }
    }
);

export const downloadFile = createAsyncThunk("files/download", async (id) => {
    const response = await axios.get(`/api/content/${id}`, {
        responseType: "blob", // so we get binary file data
    });

    // Create a temporary URL to open the blob
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));

    // Open file in a new tab
    window.open(fileURL, "_blank");
});


export const deleteFile = createAsyncThunk("files/deleteFile", async (id) => {
    console.log("Deleting file with id:", id);
    await axios.delete(`/api/content/${id}`);
    return id;
});
