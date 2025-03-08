import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import weatherReducer from './slices/weatherSlice'
import fieldReducer from './slices/fieldSlice' 
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        news: newsReducer,
        weather: weatherReducer,
        field: fieldReducer,
        auth: authReducer
    },
});

export default store;
