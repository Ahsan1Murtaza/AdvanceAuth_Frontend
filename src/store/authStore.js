import {create} from 'zustand'
import axios from 'axios'

const API_URL = `${import.meta.env.SERVER_URL}/api/auth`

axios.defaults.withCredentials = true

export const authStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (name, email, password) => {
        set({isLoading: true, error: null})

        try {
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || 'Signup failed', isLoading: false})
            throw error
        }
    },

    login: async (email, password) => {
        set({isLoading: true, error: null})

        try {
            const response = await axios.post(`${API_URL}/login`, {email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || 'Login failed', isLoading: false})
            throw error
        }
    },

    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error logging out", isLoading: false });
			throw error;
		}
	},

    verifyEmail: async (code) => {
        set({isLoading: true, error: null})

        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || 'Email verification failed', isLoading: false})
            throw error
        }
    },

    checkAuth: async () => {
        set({isCheckingAuth: true, error: null})
        try {
            const response = await axios.get(`${API_URL}/check-auth`)
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false})

        } catch (error) {
            set({error: error.response.data.message || 'Error checking authentication', isCheckingAuth: false})
        }
    },

    forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},

    resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},

}))