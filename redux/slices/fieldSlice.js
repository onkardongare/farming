import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../api/api";

// Create a new field
export const createField = createAsyncThunk("fields/createField", async (fieldData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/field/createField', fieldData, { withCredentials: true });
    console.log('erere',response)
    return response.data;
  } catch (error) {
    console.log(error.message)
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Get all fields
export const getAllFields = createAsyncThunk("fields/getAllFields", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/fields', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ✅ Get a single field by ID
export const getFieldById = createAsyncThunk("fields/getFieldById", async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`field/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ✅ Update a field
export const updateField = createAsyncThunk("fields/updateField", async ({ id, fieldData }, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`field/${id}`, fieldData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ✅ Delete a field
export const deleteField = createAsyncThunk("fields/deleteField", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${apiClient}/${id}`, { withCredentials: true });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const fieldSlice = createSlice({
  name: "fields",
  initialState: {
    fields: [],
    field: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createField.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createField.fulfilled, (state, action) => { state.loading = false; state.fields.push(action.payload); })
      .addCase(createField.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getAllFields.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllFields.fulfilled, (state, action) => { state.loading = false; state.fields = action.payload; })
      .addCase(getAllFields.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getFieldById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getFieldById.fulfilled, (state, action) => { state.loading = false; state.field = action.payload; })
      .addCase(getFieldById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateField.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateField.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = state.fields.map((field) => (field._id === action.payload._id ? action.payload : field));
      })
      .addCase(updateField.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteField.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = state.fields.filter((field) => field._id !== action.payload);
      })
      .addCase(deleteField.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default fieldSlice.reducer;

