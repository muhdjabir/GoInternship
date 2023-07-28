import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application, InitialApplicationState } from "@/typesheet";

const initialState = {
    value: [] as Application[]
} as InitialApplicationState;

export const application = createSlice({
    name: "application",
    initialState: initialState,
    reducers: {
        getApplications: (state, action: PayloadAction<Application[]>) => {
            return {
                value: action.payload,
            }
        },
        createApplication: (state, action: PayloadAction<Application>) => {
            return {
                ...state,
                value: [...state.value, action.payload,]
            }
        },
        deleteApplication: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                value: [...state.value.filter((application) => application.ID !== action.payload)]
            }
        },
        updateApplication: (state, action: PayloadAction<Application>) => {
            return {
                ...state,
                value: [...state.value.filter((application) => application.ID !== action.payload.ID), action.payload]
            }
            // const updatedApplication = action.payload;
            // const index = state.value.findIndex(
            // (app) => app.ID === updatedApplication.ID
            // );

            // if (index !== -1) {
            //  // If the application is found, replace it with the updated application
            //  state.value[index] = updatedApplication;
            // }
        },
        resetApplications: () => {
            return initialState;
        },
    },
});

export const { getApplications, createApplication, deleteApplication, updateApplication, resetApplications } = application.actions;
export default application.reducer;