import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, InitialCompanyState } from "@/typesheet";

const initialState = {
    value: [] as Company[]
} as InitialCompanyState;

export const company = createSlice({
    name: "company",
    initialState: initialState,
    reducers: {
        getCompanies: (state, action: PayloadAction<Company[]>) => {
            return {
                value: action.payload,
            }
        },
        createCompany: (state, action: PayloadAction<Company>) => {
            return {
                ...state,
                value: [...state.value, action.payload,]
            }
        },
        deleteCompany: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                value: [...state.value.filter((company) => company.ID !== action.payload)]
            }
        },
        updateCompany: (state, action: PayloadAction<Company>) => {
            return {
                ...state,
                value: [...state.value.filter((company) => company.ID !== action.payload.ID), action.payload]
            }
        }
    },
});

export const { getCompanies, createCompany, deleteCompany, updateCompany } = company.actions;
export default company.reducer;