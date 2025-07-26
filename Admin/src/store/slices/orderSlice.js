import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../services/api';

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/admin/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/admin/orders/${id}`, { orderStatus: status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    selectedOrder: null,
    isLoading: false,
    error: null,
    totalOrders: 0,
    totalRevenue: 0,
    stats: {
      pending: 0,
      delivered: 0,
      cancelled: 0,
      ontheway: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    calculateStats: (state) => {
      state.stats = {
        pending: state.items.filter(order => order.orderStatus === 'pending').length,
        delivered: state.items.filter(order => order.orderStatus === 'delivered').length,
        cancelled: state.items.filter(order => order.orderStatus === 'cancelled').length,
        ontheway: state.items.filter(order => order.orderStatus === 'ontheway').length,
      };
      state.totalRevenue = state.items
        .filter(order => order.orderStatus === 'delivered')
        .reduce((total, order) => total + order.totalAmount, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || [];
        state.totalOrders = action.payload.data?.length || 0;
        orderSlice.caseReducers.calculateStats(state);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
          orderSlice.caseReducers.calculateStats(state);
        }
      });
  },
});

export const { clearError, setSelectedOrder, calculateStats } = orderSlice.actions;
export default orderSlice.reducer;
