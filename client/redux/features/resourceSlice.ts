import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource, InitialResourceState } from "@/typesheet";

const initialState = {
    value: [] as Resource[]
} as InitialResourceState;

export const resource = createSlice({
    name: "resource",
    initialState: initialState,
    reducers: {
        getResources: (state, action: PayloadAction<Resource[]>) => {
            return {
                value: action.payload,
            }
        },
        createResource: (state, action: PayloadAction<Resource>) => {
            return {
                ...state,
                value: [...state.value, action.payload,]
            }
        },
        deleteResource: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                value: [...state.value.filter((resource) => resource.ID !== action.payload)]
            }
        },
    },
});

export const { getResources, createResource, deleteResource } = resource.actions;
export default resource.reducer;