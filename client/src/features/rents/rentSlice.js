// rentsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getRents = createAsyncThunk(
  "rents/getRents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/rents`); // Предположим, что у вас есть эндпоинт /rents для получения списка аренд
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const rentsSlice = createSlice({
  name: "rents",
  initialState: {
    list: [], // Убедимся, что здесь присутствует свойство list
    isLoading: false,
    error: null,
  },
  reducers: {
    // Здесь вы можете добавить другие reducers, если это необходимо
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getRents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default rentsSlice.reducer;
