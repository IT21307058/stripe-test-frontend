import { createSlice } from "@reduxjs/toolkit";
import { fetchFiles, uploadFile, deleteFile } from "./fileThunks";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Upload
            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.list = state.list.filter((f) => f.id !== action.payload);
            });
    },
});

export default fileSlice.reducer;
