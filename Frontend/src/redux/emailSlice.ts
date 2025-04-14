import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { Email } from '../types/email';

interface Filters {
    account: string;
    folder: string;
    category: string;
    query: string;
  }
  

interface EmailState {
  loading: boolean;
  data: Email[];
  total: number;
  page: number;
  filters: Filters;
}

const initialState: EmailState = {
  loading: false,
  data: [],
  total: 0,
  page: 1,
  filters: {
    account: '',
    folder: '',
    category: '',
    query: '',
  },
};

export const fetchEmails = createAsyncThunk(
  'emails/fetchEmails',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { page, filters } = state.emails;

    const { data } = await axios.get('/api/emails/search', {
      params: {
        page,
        ...filters,
      },
    });

    return data;
  }
);

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.total = action.payload.total;
      })
      .addCase(fetchEmails.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setPage, setFilters } = emailSlice.actions;
export default emailSlice.reducer;
