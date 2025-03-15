import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

console.log(apiClient)

// Function to classify spraying conditions
const classifySprayingCondition = (weatherData) => {
    if (!weatherData || !weatherData.hourly) return []; // Avoid crashes
  
    return weatherData.hourly.map((entry) => {
      const { time, temp, humidity, wind_speed } = entry;
      let status = "Not Suitable";
  
      if (temp > 32 || humidity < 30 || wind_speed > 5) {
        status = "Not Suitable";
      } else if ((temp >= 30 && temp <= 32) || (humidity >= 30 && humidity < 50) || (wind_speed >= 3 && wind_speed <= 5)) {
        status = "Moderate";
      } else if (temp < 30 && humidity >= 50 && wind_speed <= 3) {
        status = "Good";
      }
      console.log("status :",status)
  
      return { time, temp, humidity, wind_speed, status };
    });
  };
  

// Async thunk to fetch all weather data
export const fetchWeather = createAsyncThunk(
    "fetchWeather",
    async ({latitude, longitude}, { rejectWithValue }) => {
      try {
        const response = await apiClient.get(`/weather/weather?latitude=${latitude}&longitude=${longitude}`);
        return response.data;
      } catch (error) {
        console.log("Weather Fetch Error:", error); // Debug log
        return rejectWithValue(error.response?.data || "Failed to fetch weather data");
      }
    }
  );
  
// Weather slice
const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weatherData: null,
        sprayingConditions: null, // New state to store spraying conditions
        loading: false,
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // Fetch all weather data
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.weatherData = action.payload;
                state.sprayingConditions = classifySprayingCondition(action.payload); // Process spraying conditions
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default weatherSlice.reducer;

