type Company = {
    id: number;
    name: string;
    industry: string;
    description: string;
    url: string;
};

type LoginInput = {
    username: string;
    password: string;
}

type SignupInput = {
    username: string;
    email: string;
    password: string;
}


type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: number;
    token: string;
}

export type {Company, LoginInput, SignupInput, InitialState, AuthState};