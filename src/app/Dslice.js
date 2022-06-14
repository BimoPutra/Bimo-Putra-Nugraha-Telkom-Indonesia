import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataRepo = createAsyncThunk("repos/list",
    async (users, {rejectWithValue, getState, dispatch}) => {
        try {
        // Call API
        const {data} = await axios.get(`https://api.github.com/users/${users}/repos?per_page=20&sort=asc`);
        return data;
    }   
        catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
        }
    }
);

// Profile
export const fetchDataUsers = createAsyncThunk("profile/list",
    async (users, {rejectWithValue, getState, dispatch}) => {
        try {
        // Call API
        const {data} = await axios.get(`https://api.github.com/users/${users}`);
        return data;
            
    }   
        catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
        }
    }
);

// Slices
const repoSlice = createSlice ({
    name:  'repos',
    initialState: {},
    extraReducers: builder => {
        // Repos 
        builder.addCase(fetchDataRepo.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(fetchDataRepo.fulfilled, (state, action) => {
            state.loading = false;
            state.repositList =  action?.payload;
            state.error =  undefined
        });
        builder.addCase(fetchDataRepo.rejected, (state, action) => {
            state.loading = false;
            state.repositList = undefined;
            state.error = action?.payload;
        });

        // Profiles
        builder.addCase(fetchDataUsers.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(fetchDataUsers.fulfilled, (state, action) =>{
            state.loading = false;
            state.profile =  action?.payload;
            state.error = undefined;
        });
        builder.addCase(fetchDataUsers.rejected, (state, action) =>{
            state.loading = false;
            state.profile = undefined;
            state.error = action?.payload;
        });
    },
});

// Reducers
export default repoSlice.reducer;