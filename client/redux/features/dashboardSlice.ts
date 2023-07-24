import { Dashboard, InitialDashboardState } from "@/typesheet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: {
        offered: 0,
        rejected: 0,
        pending: 0,
        companies: 0,
        sankey: [],
    } as Dashboard
} as InitialDashboardState;

export const dashboard = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        getDashboard: (state, action: PayloadAction<Dashboard>) => {
            return {
                value: action.payload,
            }
        },
    },
});

export const { getDashboard } = dashboard.actions;
export default dashboard.reducer;