import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, InitialState } from "@/typesheet";

const initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: 0,
        token: "",
    } as AuthState
} as InitialState

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<AuthState>) => {
            return {
                value: action.payload
            }
        }
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;