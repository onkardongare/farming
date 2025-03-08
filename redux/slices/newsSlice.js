import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

// Async thunk to fetch all news
export const fetchNews = createAsyncThunk("news/fetchNews", async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get("/news/getAll");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch news");
    }
});

// Async thunk to fetch news by ID
export const fetchNewsById = createAsyncThunk("news/fetchNewsById", async (id, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/news/get/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch news");
    }
});

// News slice
const newsSlice = createSlice({
    name: "news",
    initialState: {
        newsList: [],
        newsItem: null,
        loading: false,
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // Fetch all news
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.newsList = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch news by ID
            .addCase(fetchNewsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.loading = false;
                state.newsItem = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default newsSlice.reducer;
