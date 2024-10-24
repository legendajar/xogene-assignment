import { createSlice } from "@reduxjs/toolkit";

const drugsSlice = createSlice({
    name: "drugs",
    initialState: { 
        singleDrug: null,
    },

    reducers: {
        setSingleDrug: (state, action) => {
            state.singleDrug = action.payload;
        },
    },
});

export const { setSingleDrug } = drugsSlice.actions;

export default drugsSlice.reducer;
