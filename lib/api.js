import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Base API URL (Update this based on your backend)
const API_BASE_URL = 'http://192.168.39.29:5000';

// 🔹 Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// 🔹 Function to get JWT token
const getToken = async () => await AsyncStorage.getItem('jwtToken');

// 🚀 User Authentication
export const signUp = async (email, password, username) => {
    try {
        const response = await api.post('/auth/signup', { email, password, username });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const signIn = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log(response)
        await AsyncStorage.setItem('jwtToken', response.data.token); // Save token
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const logout = async () => {
    try {
        await api.get('/auth/logout');
        await AsyncStorage.removeItem('jwtToken'); // Remove token from storage
        return { message: 'Logged out successfully' };
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const checkAuth = async () => {
    try {
        const token = await getToken();
        if (!token) throw { message: 'No token found' };
        
        const response = await api.get('/auth/check', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// 🚀 User Data
export const getCurrentUser = async () => {
    try {
        const token = await getToken();
        if (!token) throw { message: 'No token found' };
        
        const response = await api.get('/user/', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// 🚀 Video Management
export const createVideoPost = async (form) => {
    try {
        const token = await getToken();
        const response = await api.post('/videos/create', form, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getAllPosts = async () => {
    try {
        const response = await api.get('/videos/all');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getUserPosts = async (userId) => {
    try {
        const response = await api.get(`/videos/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const searchPosts = async (query) => {
    try {
        const response = await api.get(`/videos/search?query=${query}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getLatestPosts = async () => {
    try {
        const response = await api.get('/videos/latest');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// 🚀 File Upload
export const uploadFile = async (file) => {
    try {
        const token = await getToken();
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await api.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
