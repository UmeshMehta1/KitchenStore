import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../services/api';

// Async thunks
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/admin/login', credentials);
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null,
    token: localStorage.getItem('adminToken') || null,
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
