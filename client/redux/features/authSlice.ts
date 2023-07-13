import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: string;
    token: string;
}

const initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
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
        logIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    uid: "12312",
                    token: "21312",
                }
            }
        }
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;