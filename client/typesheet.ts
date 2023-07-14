type Application = {
    id: number;
    role: string;
	status: string;
	process: string[];
	platform: string;
	assessment: string;
	uid: number;
	cid: number;
}

type Company = {
    id: number;
    name: string;
    industry: string;
    description: string;
    url: string;
};

type Resource = {
    ID: number;
    title: string;
    description: string;
    url: string;
    Userid: number;
}

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

export type {Company, Resource, LoginInput, SignupInput, InitialState, AuthState};