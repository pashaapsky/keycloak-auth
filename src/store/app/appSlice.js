import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        token: JSON.parse(localStorage.getItem('tokens')),
        options: null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
          state.token = action.payload
        },
        setUser: (state, action) => {
          state.user = action.payload
        }
    }
});

export const {
    setToken,
    setUser
} = appSlice.actions;

export default appSlice.reducer;